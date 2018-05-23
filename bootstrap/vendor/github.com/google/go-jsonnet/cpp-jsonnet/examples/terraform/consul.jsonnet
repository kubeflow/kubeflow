// These can split into separate files, come from environment variables / commandline etc., as
// desired.
local aws_region = 'us-east-1';

// Ubuntu Precise 12.04 LTS (x64)
local aws_amis = {
  'eu-west-1': 'ami-b1cf19c6',
  'us-east-1': 'ami-de7ab6b6',
  'us-west-1': 'ami-3f75767a',
  'us-west-2': 'ami-21f78e11',
};

{
  provider: {
    // Setup the Consul provisioner to use the demo cluster
    consul: {
      address: 'demo.consul.io:80',
      datacenter: 'nyc1',
      scheme: 'http',
    },
    // Setup an AWS provider
    aws: {
      region: aws_region,
      access_key: 'XXX',
      secret_key: 'YYY',
    },
  },

  resource: {
    aws_instance: {

      // Object comprehension syntax (similar to Python)
      test: {
        // i is a scoped variable here
        instance_type: '${consul_keys.input.var.size}',
        ami: aws_amis[aws_region],
      },
    },

    consul_keys: {
      // Setup a key in Consul to provide inputs
      input: {
        key: {
          name: 'size',
          path: 'tf_test/size',
          default: 'm1.small',
        },
      },

      // Setup a key in Consul to store the instance id and
      // the DNS name of the instance
      test: {
        key: [
          {
            name: 'id',
            path: 'tf_test/id',
            value: '${aws_instance.test.id}',
            delete: true,
          },
          {
            name: 'address',
            path: 'tf_test/public_dns',
            value: '${aws_instance.test.public_dns}',
            delete: true,
          },
        ],
      },
    },
  },
}
