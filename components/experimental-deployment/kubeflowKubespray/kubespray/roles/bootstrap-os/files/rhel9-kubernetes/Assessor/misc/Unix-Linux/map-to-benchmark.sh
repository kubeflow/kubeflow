#!/bin/bash

map_to_benchmark()
{
        _DISTRO=$1
        _VER=$2

        if [ $_DISTRO != "Ubuntu" ]; then
          _VER=${_VER%.*}
        fi

        case $_DISTRO in
                OSX)
                        # -- The following OSX benchmarks are not supported in v4:
                        # OSX 10.5
                        # OSX 10.6
                        # OSX 10.8
                        # OSX 10.9
                        # OSX 10.10
                        # OSX 10.11
                        # OSX 10.12
                        # OSX 10.13
                        # OSX 10.14

                        # OSX 10.15
                        if [ `expr $_VER \>= 19 \& $_VER \< 20` -eq 1 ]
                        then
                                BENCHMARK="CIS_Apple_macOS_10.15_Catalina_Benchmark_v3.0.0-xccdf.xml"
                                PROFILE1="Level 1"
                                PROFILE2="Level 2"
                                ARFORXML="-x"
                        fi

                        # OSX 11.0
                        if [ `expr $_VER \>= 20 \& $_VER \< 21` -eq 1 ]
                        then
                                BENCHMARK="CIS_Apple_macOS_11.0_Big_Sur_Benchmark_v3.1.0-xccdf.xml"
                                PROFILE1="Level 1"
                                PROFILE2="Level 2"
                                ARFORXML="-x"
                        fi

                        # OSX 12.0
                        if [ `expr $_VER \>= 21 \& $_VER \< 22` -eq 1 ]
                        then
                                BENCHMARK="CIS_Apple_macOS_12.0_Monterey_Benchmark_v2.1.0-xccdf.xml"
                                PROFILE1="Level 1"
                                PROFILE2="Level 2"
                                ARFORXML="-x"
                        fi

                        # OSX 13.0
                        if [ `expr $_VER \>= 22` -eq 1 ]
                        then
                                BENCHMARK="CIS_Apple_macOS_13.0_Ventura_Benchmark_v1.1.0-xccdf.xml"
                                PROFILE1="Level 1"
                                PROFILE2="Level 2"
                                ARFORXML="-x"
                        fi

                        ;;
                Debian)
                        if [ `expr $_VER \>= 9 \& $_VER \< 10` -eq 1 ]
                        then
                                BENCHMARK="CIS_Debian_Linux_9_Benchmark_v1.0.1-xccdf.xml"
                                PROFILE1="Level 1 - Server"
                                PROFILE2="Level 2 - Server"
                        elif [  `expr $_VER \>= 10 \& $_VER \< 11` -eq 1  ];
                        then
                                BENCHMARK="CIS_Debian_Linux_10_Benchmark_v2.0.0-xccdf.xml"
                                PROFILE1="Level 1 - Server"
                                PROFILE2="Level 2 - Server"
                        elif [  `expr $_VER \>= 11 \& $_VER \< 12` -eq 1  ];
                        then
                                BENCHMARK="CIS_Debian_Linux_11_Benchmark_v1.0.0-xccdf.xml"
                                PROFILE1="Level 1 - Server"
                                PROFILE2="Level 2 - Server"
                        else
                                echo "No benchmark found for Debian '$_VER'"
                        fi
                        ;;
                Ubuntu)
                	# Ubuntu 14.04
                        if [ `expr $_VER == 14.04` -eq 1 ]
                        then
                          BENCHMARK="CIS_Ubuntu_Linux_14.04_LTS_Benchmark_v2.0.0-xccdf.xml"
                          PROFILE1="Level 1 - Server"
                          PROFILE2="Level 2 - Server"
                        fi
                        
                        # Ubuntu 16.04
                        if [ `expr $_VER == 16.04` -eq 1 ]
                        then
                                BENCHMARK="CIS_Ubuntu_Linux_16.04_LTS_Benchmark_v2.0.0-xccdf.xml"
                                PROFILE1="Level 1 - Server"
                                PROFILE2="Level 2 - Server"
                        fi
                        
                        # Ubuntu 18.04
                        if [ `expr $_VER == 18.04` -eq 1 ]
                        then
                                BENCHMARK="CIS_Ubuntu_Linux_18.04_LTS_Benchmark_v2.1.0-xccdf.xml"
                                PROFILE1="Level 1 - Server"
                                PROFILE2="Level 2 - Server"
                        fi

                        # Ubuntu 20.04
                        if [ `expr $_VER == 20.04` -eq 1 ]
                        then
                                BENCHMARK="CIS_Ubuntu_Linux_20.04_LTS_Benchmark_v2.0.1-xccdf.xml"
                                PROFILE1="Level 1 - Server"
                                PROFILE2="Level 2 - Server"
                        fi

                        # Ubuntu 22.04
                        if [ `expr $_VER == 22.04` -eq 1 ]
                        then
                                BENCHMARK="CIS_Ubuntu_Linux_22.04_LTS_Benchmark_v1.0.0-xccdf.xml"
                                PROFILE1="Level 1 - Server"
                                PROFILE2="Level 2 - Server"
                        fi
			
			;;
                RedHat)
                        # RHEL 6
                        if [ `expr $_VER \>= 6 \& $_VER \< 7` -eq 1 ]
                        then
                                BENCHMARK="CIS_Red_Hat_Enterprise_Linux_6_Benchmark_v3.0.0-xccdf.xml"
                                PROFILE1="Level 1 - ${ROLE}"
                                PROFILE2="Level 2 - ${ROLE}"
                        fi

                        # RHEL 7
                        if [ `expr $_VER \>= 7 \& $_VER \< 8` -eq 1 ]
                        then
                                BENCHMARK="CIS_Red_Hat_Enterprise_Linux_7_Benchmark_v3.1.1-xccdf.xml"
                                PROFILE1="Level 1 - ${ROLE}"
                                PROFILE2="Level 2 - ${ROLE}"
                        fi

                        # RHEL 8
                        if [ `expr $_VER \>= 8 \& $_VER \< 9` -eq 1 ]
                        then
                                BENCHMARK="CIS_Red_Hat_Enterprise_Linux_8_Benchmark_v2.0.0-xccdf.xml"
                                PROFILE1="Level 1 - ${ROLE}"
                                PROFILE2="Level 2 - ${ROLE}"
                        fi

                        # RHEL 9
                        if [ `expr $_VER \>= 9 \& $_VER \< 10` -eq 1 ]
                        then
                                BENCHMARK="CIS_Red_Hat_Enterprise_Linux_9_Benchmark_v1.0.0-xccdf.xml"
                                PROFILE1="Level 1 - ${ROLE}"
                                PROFILE2="Level 2 - ${ROLE}"
                        fi

                        ;;
                Oracle)
                        # Oracle 6
                        if [ `expr $_VER \>= 6 \& $_VER \< 7` -eq 1 ]
                        then
                                BENCHMARK="CIS_Oracle_Linux_6_Benchmark_v2.0.0-xccdf.xml"
                                PROFILE1="Level 1 - ${ROLE}"
                                PROFILE2="Level 2 - ${ROLE}"
                        fi
                        
                        # Oracle 7
                        if [ `expr $_VER \>= 7 \& $_VER \< 8` -eq 1 ]
                        then
                                BENCHMARK="CIS_Oracle_Linux_7_Benchmark_v3.1.1-xccdf.xml"
                                PROFILE1="Level 1 - ${ROLE}"
                                PROFILE2="Level 2 - ${ROLE}"
                        fi

                        # Oracle 8
                        if [ `expr $_VER \>= 8 \& $_VER \< 9` -eq 1 ]
                        then
                                BENCHMARK="CIS_Oracle_Linux_8_Benchmark_v2.0.0-xccdf.xml"
                                PROFILE1="Level 1 - ${ROLE}"
                                PROFILE2="Level 2 - ${ROLE}"
                        fi

                        # Oracle 9
                        if [ `expr $_VER \>= 9 \& $_VER \< 10` -eq 1 ]
                        then
                                BENCHMARK="CIS_Oracle_Linux_9_Benchmark_v1.0.0-xccdf.xml"
                                PROFILE1="Level 1 - ${ROLE}"
                                PROFILE2="Level 2 - ${ROLE}"
                        fi
                        
                        ;; 
                CentOS)
                	# CentOS 6
                  if [ `expr $_VER \>= 6 \& $_VER \< 7` -eq 1 ]
                  then
                    BENCHMARK="CIS_CentOS_Linux_6_Benchmark_v3.0.0-xccdf.xml"
                    PROFILE1="Level 1 - ${ROLE}"
                    PROFILE2="Level 2 - ${ROLE}"
                  fi
			
                	# CentOS 7
                  if [ `expr $_VER \>= 7 \& $_VER \< 8` -eq 1 ]
                  then
                    BENCHMARK="CIS_CentOS_Linux_7_Benchmark_v3.1.2-xccdf.xml"
                    PROFILE1="Level 1 - ${ROLE}"
                    PROFILE2="Level 2 - ${ROLE}"
                  fi

			
                        ;;
                SUSE)
                        # SUSE 15
                        if [ `expr $_VER \>= 15 \& $_VER \< 16` -eq 1 ]
                        then
                                BENCHMARK="CIS_SUSE_Linux_Enterprise_15_Benchmark_v1.1.1-xccdf.xml"
                                PROFILE1="Level 1 - Workstation"
                                PROFILE2="Level 2 - Workstation"
                        fi

                        # SUSE 12
                        if [ `expr $_VER \>= 12 \& $_VER \< 13` -eq 1 ]
                        then
                                BENCHMARK="CIS_SUSE_Linux_Enterprise_12_Benchmark_v3.1.0-xccdf.xml"
                                PROFILE1="Level 1 - Workstation"
                                PROFILE2="Level 2 - Workstation"
                        fi

                        ;;
                Aliyun)
                        # Aliyun Linux 2
                        if [ `expr $_VER \>= 1 \& $_VER \< 3` -eq 1 ]
                        then
                                BENCHMARK="CIS_Aliyun_Linux_2_Benchmark_v1.0.0-xccdf.xml"
                                PROFILE1="Level 1"
                                PROFILE2="Level 2"
                        fi

                        ;;
        esac
}
