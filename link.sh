#!/bin/bash

currentDir=$(pwd)

# 遍历文件夹
for d in "$currentDir"/packages/*/
do
  cd "$d"
  if [ -f "package.json" ]
  then
    npm link
  fi
done
