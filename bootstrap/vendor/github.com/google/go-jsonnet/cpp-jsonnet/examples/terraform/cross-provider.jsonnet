// These can split into separate files, come from environment variables / commandline etc., as
// desired.
local dnsimple_domain = 'foo.com';

// Ubuntu Precise 12.04 LTS (x64)
local aws_amis = {
  'eu-west-1': 'ami-b1cf19c6',
  'us-east-1': 'ami-de7ab6b6',
  'us-west-1': 'ami-3f75767a',
  'us-west-2': 'ami-21f78e11',
};


{
  resource: {
    // Create our Heroku application. Heroku will
    // automatically assign a name.
    heroku_app: {
      web: {
      },
    },

    // Create our DNSimple record to point to the
    // heroku application.
    dnsimple_record: {
      web: {
        domain: dnsimple_domain,

        name: 'terraform',

        // heroku_hostname is a computed attribute on the heroku
        // application we can use to determine the hostname
        value: '${heroku_app.web.heroku_hostname}',

        type: 'CNAME',
        ttl: 3600,
      },
    },

    // The Heroku domain, which will be created and added
    // to the heroku application after we have assigned the domain
    // in DNSimple
    heroku_domain: {
      foobar: {
        app: '${heroku_app.web.name}',
        hostname: '${dnsimple_record.web.hostname}',
      },
    },
  },

  output: {
    address: {
      value: '${dnsimple_record.web.hostname}',
    },
  },
}
