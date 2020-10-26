#!/bin/sh

SCRIPTPATH=$(cd "$(dirname "$0")"; pwd)
"$SCRIPTPATH/Final-Task-Revel.exe" -importPath revel-app -srcPath "$SCRIPTPATH/src" -runMode dev
