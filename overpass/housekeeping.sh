#!/bin/bash

#
#   This script cleans older instance directories of overpass
#   must be run with root permissions from cron
#
#   assumes overpass containers are installed below /opt/overpass
#
#   INSTALL AT YOUR OWN RISK
#


set -ex

for dir in $(find /opt/overpass -name "20*" -type d -mtime +3); do

    [[ "$dir" =~ ^\/opt\/overpass\/20 ]] || break
    echo "$dir"
    rm -rf "$dir"
done

