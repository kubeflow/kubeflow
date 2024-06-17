#!/bin/sh

# Absolute path to this script, e.g. /home/user/bin/foo.sh
SCRIPT="$(readlink -f "$0")"
# Absolute path this script is in, thus /home/user/bin
SCRIPTPATH="$(dirname "$SCRIPT")"
# Setting the base directory of the Assessor bundle
DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi
NEW_DIR=$( cd -P "$( dirname "$DIR" )" >/dev/null 2>&1 && pwd )
BASE_DIR=${NEW_DIR%/*/*}

#Setting Java to the bundled jre one
JAVA="$BASE_DIR/jre/Home/jre/bin/java"
MAX_RAM_IN_MB=2048
DEBUG=0

which "$JAVA" 2>&1 > /dev/null

if [ $? -ne "0" ]; then
        echo "Error: Java is not in the jre folder."
        exit 1
fi

if [ $DEBUG -eq "1" ]; then
        echo "Executing CIS-CAT Pro Assessor from $JAVA"
        "$JAVA" -Xmx${MAX_RAM_IN_MB}M -jar "$BASE_DIR/Assessor-CLI.jar" "$@" --verbose
else
        "$JAVA" -Xmx${MAX_RAM_IN_MB}M -jar "$BASE_DIR/Assessor-CLI.jar" "$@"
fi
