#!/bin/sh

# Absolute path to this script, e.g. /home/user/bin/foo.sh
SCRIPT="$(readlink -f "$0")"
# Absolute path this script is in, thus /home/user/bin
SCRIPTPATH="$(dirname "$SCRIPT")"


#Setting Java to the bundled jre one
JAVA="$SCRIPTPATH/jre/bin/java"
MAX_RAM_IN_MB=2048
DEBUG=0

which "$JAVA" 2>&1 > /dev/null

if [ $? -ne "0" ]; then
        echo "Error: Java is not in the jre folder."
        exit 1
fi

JAVA_VERSION_RAW=`"$JAVA" -version 2>&1`

echo "$JAVA_VERSION_RAW" | grep 'version\s*\"\(\(1\.8\.\)\|\(9\.\)\|\([1-9][0-9]\.\)\)' 2>&1 > /dev/null

if [ $? -eq "1" ]; then

        echo "Error: The version of Java you are attempting to use is not compatible with CISCAT:"
        echo ""
        echo "$JAVA_VERSION_RAW"
        echo ""
        echo "You must use Java 1.8.x, or higher. The most recent version of Java is recommended."
        exit 1;
fi

if [ $DEBUG -eq "1" ]; then
        echo "Executing CIS-CAT Pro Assessor from $SCRIPTPATH"
        "$JAVA" -Xmx${MAX_RAM_IN_MB}M -jar "$SCRIPTPATH/Assessor-CLI.jar" "$@" --verbose
else
        "$JAVA" -Xmx${MAX_RAM_IN_MB}M -jar "$SCRIPTPATH/Assessor-CLI.jar" "$@"
fi
