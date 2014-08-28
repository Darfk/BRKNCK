#!/bin/bash

rm -r build/
mkdir build/
cp index.build.html build/index.html
find -maxdepth 1 -type f -name "*.svg" -exec inkscape --file={} --export-plain-svg=build/{} \;
minify *.js > build/a.js
zip build/js13k-darfk.zip build/*

stat --format="Build is %s bytes" build/js13k-darfk.zip
