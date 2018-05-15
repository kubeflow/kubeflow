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

// Can also give an explicit list of indexes, or a list of names
local web_indexes = std.range(1, 4);

{
  // Specify the provider and access details
  provider: {
    aws: {
      region: aws_region,
      access_key: 'XXX',
      secret_key: 'YYY',
    },
  },

  resource: {
    aws_elb: {
      web: {
        name: 'terraform-example-elb',

        // The same availability zone as our instances
        // (Array comprehension syntax, as in Python)
        availability_zones: ['${aws_instance.web-%d.availability_zone}' % i for i in web_indexes],

        listener: {
          instance_port: 80,
          instance_protocol: 'http',
          lb_port: 80,
          lb_protocol: 'http',
        },

        // The instances are registered automatically
        instances: ['${aws_instance.web-%d.id}' % i for i in web_indexes],
      },
    },

    aws_instance: {

      // Object comprehension syntax (similar to Python)
      ['web-%d' % i]: {
        // i is a scoped variable here
        instance_type: 'm1.small',
        ami: aws_amis[aws_region],
      }
      for i in web_indexes
    },

  },
  output: {
    address: {
      value: 'Instances: ' + std.join(', ', ['${aws_instance.web-%d.id}' % i for i in web_indexes]),
    },
  },
}
