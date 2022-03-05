#!/bin/bash

if [ $# -eq 0 ]; then
 echo "please name the sketch"
 exit 1
fi
cp ./sketches/dN.js "./sketches/$1.js"
echo "{$1}.js is created."
