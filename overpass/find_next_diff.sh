#!/usr/bin/env bash
set -euo pipefail

BASE="https://planet.openstreetmap.org/replication/day"

if [[ $# -ne 1 ]]; then
    echo "Aufruf: $0 YYYY-MM-DDTHH:MM:SSZ" >&2
    exit 1
fi

TARGET=$(date -u -d "$1" +%s) || {
    echo "Invalid timestamp: $1" >&2
    exit 1
}

# get state.txt for a given sequence no.
get_state() {
    local seq=$1
    local padded path data timestamp number

    printf -v padded '%09d' "$seq"
    path="${padded:0:3}/${padded:3:3}/${padded:6:3}"

    data=$(curl -LfsS --retry 2 "$BASE/$path.state.txt") || return 1

    number=$(awk -F= '$1=="sequenceNumber" {print $2}' <<< "$data")
    timestamp=$(sed -n 's/^timestamp=//p' <<< "$data" |
                head -n 1 | sed 's/\\:/:/g')

    [[ "$number" =~ ^[0-9]+$ && -n "$timestamp" ]] || return 1

    STATE_SEQ=$number
    STATE_TS=$timestamp
    STATE_EPOCH=$(date -u -d "$timestamp" +%s) || return 1
}

# get highest available sequence no.
data=$(curl -LfsS --retry 2 "$BASE/state.txt")
LATEST=$(awk -F= '$1=="sequenceNumber" {print $2}' <<< "$data")
[[ "$LATEST" =~ ^[0-9]+$ ]] || {
    echo "could not read seq number" >&2
    exit 1
}

# Is there a newer diff?
get_state "$LATEST"
if (( STATE_EPOCH <= TARGET )); then
    echo "No newer daily diff available"
    exit 0
fi

# binary seek: find first squence no. with timestamp > TARGET
LOW=0
HIGH=$LATEST

while (( LOW < HIGH )); do
    MID=$(( (LOW + HIGH) / 2 ))
    get_state "$MID"

    if (( STATE_EPOCH > TARGET )); then
        HIGH=$MID
    else
        LOW=$(( MID + 1 ))
    fi
done

get_state "$LOW"

printf 'Timestamp: %s\n' "$STATE_TS"
printf 'Sequence no:       %s\n' "$STATE_SEQ"

printf -v PADDED '%09d' "$STATE_SEQ"
PATH_SEQ="${PADDED:0:3}/${PADDED:3:3}/${PADDED:6:3}"

echo "State: $BASE/$PATH_SEQ.state.txt"
echo "Diff:  $BASE/$PATH_SEQ.osc.gz"

