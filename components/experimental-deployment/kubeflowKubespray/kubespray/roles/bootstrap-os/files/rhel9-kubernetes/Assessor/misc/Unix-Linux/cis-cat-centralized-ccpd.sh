#!/bin/bash

DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi
. "$DIR/make-jre-directories.sh"
. "$DIR/detect-os-variant.sh"
. "$DIR/map-to-benchmark.sh"

#
# This script is intended to reside on a centralized file share that is accessible by the computers
# to be assess by CIS-CAT. 
#
# The default configuration of this script expects the following target-facing file structure:
# 
#        /cis
#        /cis/Assessor
#        ...      
#        /cis/Assessor/Assessor-CLI.jar
#        ...
#        /cis/reports
#        /cis/jres
#        /cis/jres/AIX
#        ...
#        /cis/jres/AIX/bin/java
#        ...
#        /cis/jres/Debian
#        /cis/jres/HPUX
#        /cis/jres/Linux
#        /cis/jres/OSX
#        /cis/jres/RedHat
#        /cis/jres/Solaris
#        /cis/jres/SolarisSparc
#        /cis/jres/SUSE

#
#       Note: cis-cat-centralized.sh --make-jre-directories  will create the jres/* directories. However,
#                you will need to download and unzip the appropriate JRE into these folders. JREs can be
#                obtained from the following URLS:
#
#                === IBM AIX === 
#                URL:
#                http://www.ibm.com/developerworks/java/jdk/aix/service.html
# 
#                Notes: 
#                IBM creates a redistributable "latest" JRE .bin. They also have a JRE .tar. 
# 
#                === Linux ===# 
#                URL: http://java.com/en/download/manual.jsp
# 
#                Note: This JRE is expected to work for RedHat, Debian, and SUSE.
# 
#                === Solaris ===# 
#                URL: http://java.com/en/download/manual.jsp
# 
#                Notes: one for SPARC and one for X86
#  
#                === HP-UX ===
#                URL: http://h18012.www1.hp.com/java/
#                URL: https://h20392.www2.hp.com/portal/swdepot/displayProductInfo.do?productNumber=HPUXJAVAHOME
# 
#                === Apple OSX === 
#                URL: http://support.apple.com/downloads/Java_for_Mac_OS_X_10_5_Update_4
#                URL: http://support.apple.com/kb/DL1360
#                URL: http://support.apple.com/kb/DL1421
#

#
# Modify this environment variable to the location on the network share, of the Assessor folder
#
CISCAT_DIR=/cis/Assessor

#
# The URL for the CIS-CAT Pro Dashboard API to which CIS-CAT reports are POST'ed
# The resource for CIS-CAT Pro Dashboard upload is ALWAYS mapped to the /api/reports/upload 
# location, so the path to the application is all that should be modified here, 
# for example: http://applications.example.org/CCPD/api/reports/upload
#
CCPD_URL=http://[YOUR-SERVER]/CCPD/api/reports/upload

#modify the value below to a different directory if you would like to use your own JAVA/JRE and not the bundled one
JRE_BASE=$CISCAT_DIR/jre

#
# There is no need to make modifications below this point unless you want to override the benchmark profile 
# CIS-CAT uses. The default configuration of this script will cause CIS-CAT to run the "Level 2" equivalent
# profile, which includes all "Level 1" profile checks. 
#

# determine if this execution is setting up jre directories or not. 
if [ $1 ]; then
	if [ "$1" == "--make-jre-directories" ]; then
		make_jre_directories;
		exit 1;
	fi
fi

SSLF='0'
BENCHMARK='<UnknownBenchmark>'
PROFILE1='<UnknownProfile>'
PROFILE2='<UnknownProfile>'
DISTRO='<UnknownDistribution>'
VER='<UnknownVersion>'
OSV='<UnknownOSVersion>'
ARFORXML='-arf'
AUTHENTICATION_TOKEN='<Generate_An_Authentication_Token_In_CCPD>'

# sets DISTRO and VER
detect_os_variant

JAVA_HOME=$JRE_BASE

# sets BENCHMARK and PROFILE
map_to_benchmark $DISTRO $VER

#
# Configure the Assessor's command-line options
#
CISCAT_OPTS=" -nrf -ui -u $CCPD_URL -b $CISCAT_DIR/benchmarks/$BENCHMARK -D ciscat.post.parameter.ccpd.token=$AUTHENTICATION_TOKEN "

CISCAT_CMD="$JAVA_HOME/bin/java -Xmx2048M -jar $CISCAT_DIR/Assessor-CLI.jar $CISCAT_OPTS"

echo
echo "Detected OS as $DISTRO $VER"
echo "Using JRE located at '$JAVA_HOME'"
echo "Using CISCAT located at '$CISCAT_DIR/Assessor-CLI.jar'"
echo "Using Benchmark '$BENCHMARK'"
if [ "$SSLF" -eq "1" ]; then
	echo "Using Profile '$PROFILE2'"
else
	echo "Using Profile '$PROFILE1'"
fi
echo "POST'ing Reports to '$CCPD_URL'"
echo

GOOD=1

if [ ! -d "$CISCAT_DIR" ]; then
        echo "ERROR: CISCAT_DIR does not point to a valid directory"
        GOOD=0
fi

if [ ! -e "$CISCAT_DIR/Assessor-CLI.jar" ]; then
        echo "ERROR: Assessor-CLI.jar does not exist at '$CISCAT_DIR/Assessor-CLI.jar'"
        GOOD=0
fi

if [ ! -d "$JRE_BASE" ]; then
        echo "ERROR: JRE_BASE does not point to a valid directory"
        GOOD=0
fi

if [ ! -d "$JAVA_HOME" ]; then
        echo "ERROR: JAVA_HOME does not point to a valid directory"
        GOOD=0
fi

if [ ! -e "$JAVA_HOME/bin/java" ]; then
        echo "ERROR: java does not exist at '$JAVA_HOME/bin/java'"
        GOOD=0
fi

if [ ! -e "$CISCAT_DIR/benchmarks/$BENCHMARK" ]; then
        echo "ERROR: Benchmark '$BENCHMARK' does not exist in directory '$CISCAT_DIR/benchmarks'  "
        GOOD=0
fi

if [ "$GOOD" -eq "1" ]; then
        echo
        echo "Running CISCAT with the following options: "
        echo
        
        if [ "$SSLF" -eq "1" ]; then
		echo "  $CISCAT_OPTS" -p "$PROFILE2"
		echo

		$CISCAT_CMD -p "$PROFILE2"
	else
		echo "  $CISCAT_OPTS" -p "$PROFILE1"
		echo
		
		$CISCAT_CMD -p "$PROFILE1"
	fi
else
        echo
        echo "Please review errors listed above, make corrective actions, and retry."
        echo
fi
