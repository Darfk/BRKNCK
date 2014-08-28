#!/bin/bash

rm -r build/
mkdir build/
cp index.build.html build/index.html
cp *.svg build/
minify *.js > build/a.js
rm build/js13k-darfk.zip
zip build/js13k-darfk.zip build/*
