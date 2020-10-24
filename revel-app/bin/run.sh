#!/bin/sh

SCRIPTPATH=$(cd "$(dirname "$0")"; pwd)
"$SCRIPTPATH/revel-app.exe" -importPath revel-app -srcPath "$SCRIPTPATH/src" -runMode dev
