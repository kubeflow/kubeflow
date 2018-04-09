{
  all(params):: {
    kind: "ConfigMap",
    apiVersion: "v1",
    metadata: {
      name: "openmpi-assets",
      labels: {
        app: params.name,
      },
    },
    data: {
      "gen_hostfile.sh": |||
        set -exv

        # Download kubectl
        apk add --update ca-certificates
        apk add --update -t deps curl
        curl -L https://storage.googleapis.com/kubernetes-release/release/v1.9.6/bin/linux/amd64/kubectl -o /usr/local/bin/kubectl
        chmod +x /usr/local/bin/kubectl

        # Look up hosts and prepare hostfile for openmpi
        hostfile=/kubeflow/openmpi/workdir/hostfile
        until [ "$(wc -l < ${hostfile})" -eq "%(workers)d" ]; do
          rm -f ${hostfile}
          pod_names=$(kubectl -n %(namespace)s get pod --selector=role=worker --field-selector=status.phase=Running -o=jsonpath='{.items[*].metadata.name}')
          for p in ${pod_names}; do
            # NOTE: must set MCA parameter orte_keep_fqdn_hostnames=t to force openmpi to use FQDN.
            echo "${p}.%(name)s.%(namespace)s.svc.cluster.local" >> ${hostfile}
          done

        done
      ||| % {name: params.name, namespace: params.namespace, workers: params.workers},

      "init.sh": |||
        set -exv

        # Configure openmpi
        mkdir -p /root/.openmpi
        mca_confg=/root/.openmpi/mca-params.conf
        echo "hwloc_base_binding_policy = none" > ${mca_confg}
        echo "rmaps_base_mapping_policy = slot" >> ${mca_confg}
        echo "btl_tcp_if_exclude = lo,docker0" >> ${mca_confg}
        echo "orte_keep_fqdn_hostnames=t" >> ${mca_confg}

        # Set up ssh config
        mkdir -p /root/.ssh
        cp /kubeflow/openmpi/secrets/* /root/.ssh

        # Start sshd in non-daemon mode
        /usr/sbin/sshd -D -e -f /kubeflow/openmpi/assets/sshd_config
      |||,

      'sshd_config': |||
        # Package generated configuration file
        # See the sshd_config(5) manpage for details

        # What ports, IPs and protocols we listen for
        Port 2022
        # Use these options to restrict which interfaces/protocols sshd will bind to
        #ListenAddress ::
        #ListenAddress 0.0.0.0
        Protocol 2

        #Privilege Separation is turned on for security
        UsePrivilegeSeparation no

        # Lifetime and size of ephemeral version 1 server key
        KeyRegenerationInterval 3600
        ServerKeyBits 768

        # Logging
        SyslogFacility AUTH
        LogLevel INFO

        # Authentication:
        LoginGraceTime 120
        PermitRootLogin yes
        StrictModes yes

        RSAAuthentication yes
        PubkeyAuthentication yes

        # Don't read the user's ~/.rhosts and ~/.shosts files
        IgnoreRhosts yes
        # For this to work you will also need host keys in /etc/ssh_known_hosts
        RhostsRSAAuthentication no
        # similar for protocol version 2
        HostbasedAuthentication no
        # Uncomment if you don't trust ~/.ssh/known_hosts for RhostsRSAAuthentication
        #IgnoreUserKnownHosts yes

        # To enable empty passwords, change to yes (NOT RECOMMENDED)
        PermitEmptyPasswords no

        # Change to yes to enable challenge-response passwords (beware issues with
        # some PAM modules and threads)
        ChallengeResponseAuthentication no

        X11Forwarding yes
        X11DisplayOffset 10
        PrintMotd no
        PrintLastLog yes
        TCPKeepAlive yes
        #UseLogin no

        # Allow client to pass locale environment variables
        AcceptEnv LANG LC_*

        Subsystem sftp /usr/lib/openssh/sftp-server

        # Set this to 'yes' to enable PAM authentication, account processing,
        # and session processing. If this is enabled, PAM authentication will
        # be allowed through the ChallengeResponseAuthentication and
        # PasswordAuthentication.  Depending on your PAM configuration,
        # PAM authentication via ChallengeResponseAuthentication may bypass
        # the setting of "PermitRootLogin without-password".
        # If you just want the PAM account and session checks to run without
        # PAM authentication, then enable this but set PasswordAuthentication
        # and ChallengeResponseAuthentication to 'no'.
        UsePAM no

        # Enabling environment processing may enable users to bypass access
        # restrictions in some configurations using mechanisms such as LD_PRELOAD.
        PermitUserEnvironment yes
      |||,
    },
  },
}
