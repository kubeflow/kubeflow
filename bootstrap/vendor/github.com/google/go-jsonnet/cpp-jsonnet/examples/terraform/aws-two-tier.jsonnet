// These can split into separate files, come from environment variables / commandline etc., as
// desired.
local aws_region = 'us-east-1';
local key_name = 'key_name';
local key_path = 'key_path';
local access_key = 'XXX';
local secret_key = 'YYY';

// Ubuntu Precise 12.04 LTS (x64)
local aws_amis = {
  'eu-west-1': 'ami-b1cf19c6',
  'us-east-1': 'ami-de7ab6b6',
  'us-west-1': 'ami-3f75767a',
  'us-west-2': 'ami-21f78e11',
};


{
  // Specify the provider and access details
  provider: {
    aws: {
      region: aws_region,
      access_key: access_key,
      secret_key: secret_key,
    },
  },

  resource: {
    aws_security_group: {
      // Our default security group to access
      // the instances over SSH and HTTP
      default: {
        name: 'terraform_example',
        description: 'Used in the terraform',

        ingress: [
          // SSH access from anywhere
          {
            from_port: 22,
            to_port: 22,
            protocol: 'tcp',
            cidr_blocks: ['0.0.0.0/0'],
          },
          // HTTP access from anywhere
          {
            from_port: 80,
            to_port: 80,
            protocol: 'tcp',
            cidr_blocks: ['0.0.0.0/0'],
          },
        ],
      },
    },

    aws_elb: {
      web: {
        name: 'terraform-example-elb',

        // The same availability zone as our instance
        availability_zones: ['${aws_instance.web.availability_zone}'],

        listener: {
          instance_port: 80,
          instance_protocol: 'http',
          lb_port: 80,
          lb_protocol: 'http',
        },

        // The instance is registered automatically
        instances: ['${aws_instance.web.id}'],
      },
    },

    aws_instance: {
      web: {
        // The connection block tells our provisioner how to
        // communicate with the resource (instance)
        connection: {
          // The default username for our AMI
          user: 'ubuntu',

          // The path to your keyfile
          key_file: key_path,
        },

        instance_type: 'm1.small',

        // Lookup the correct AMI based on the region
        // we specified
        ami: aws_amis[aws_region],

        // The name of our SSH keypair you've created and downloaded
        // from the AWS console.
        //
        // https://console.aws.amazon.com/ec2/v2/home?region=us-west-2#KeyPairs:
        //
        key_name: key_name,

        // Our Security group to allow HTTP and SSH access
        security_groups: [$.resource.aws_security_group.default.name],

        // We run a remote provisioner on the instance after creating it.
        // In this case, we just install nginx and start it. By default,
        // this should be on port 80
        provisioner: {
          'remote-exec': {
            inline: [
              'sudo apt-get -y update',
              'sudo apt-get -y install nginx',
              'sudo service nginx start',
            ],
          },
        },
      },
    },

  },

  output: {
    address: {
      value: '${aws_elb.web.dns_name}',
    },
  },
}
