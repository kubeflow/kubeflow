#!/usr/bin/env bash
#
# CIS-LBK general Function
# ~/CIS-LBK/functions/general/nix_warning_banner.sh
# 
# Name                Date       Description
# ------------------------------------------------------------------------------------------------
# Eric Pinnell       09/08/20    General Function "Warning banner"
#
WARBNR()
{
	echo ""
	echo ""
	echo "  *************************************************************** "
	echo "  *******WARNING*******WARNING*******WARNING*******WARNING******* "
	echo "  *************************************************************** "
	echo "  * *                                                         * * "
	echo "  * *    This Linux Build Kit makes changes to your system    * * "
	echo "  *W*    These changes could cause loss of functionality!     *W* "
	echo "  *A*                                                         *A* "
	echo "  *R*    Please ensure that this Linux Build Kit is tested    *R* "
	echo "  *N*    in your testing environment before running it on a   *N* "
	echo "  *I*    production system.                                   *I* "
	echo "  *N*                                                         *N* "
	echo "  *G*    Failure to employ proper testing may lead to         *G* "
	echo "  * *    service interruption!                                * * "
	echo "  * *                                                         * * "
	echo "  *************************************************************** "
	echo "  *******WARNING*******WARNING*******WARNING*******WARNING******* "
	echo "  *************************************************************** "
	echo ""
	echo ""
	CONFIRM
}
# End of Warning Banner