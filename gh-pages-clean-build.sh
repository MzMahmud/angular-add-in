#!/bin/bash

echo "Cleaning docs..."
rm -rf docs

echo "Running Build..."
npm run build
mv ./docs/browser/* ./docs
rm ./docs/3rdpartylicenses.txt
rm -rf ./docs/browser
