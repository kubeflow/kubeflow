// See: https://github.com/google/jsonnet/issues/299
{
  someOther():: 42,
  collCorrect1: [{
    name: 'Good',
  }],
  collCorrect2: [{
    name: 'Bad',
  }, self.someOther(),
  ],
  collCorrect2a: [{
    name: 'Bad',
  }, self.someOther(),],
  collCorrect2b: [
    {
    name: 'Bad',
    }, self.someOther(),],
  collCorrect2c: [
    {
    name: 'Bad',
    }, self.someOther(),
  ],
  collCorrect2d: [
    {
    name: 'Bad',
    },
    self.someOther(),],
  collCorrect2e: [
    {
    name: 'Bad',
    },
    self.someOther(),
  ],
  collCorrect3: { a: {
  }},
  collCorrect3a: { a: {
      }
  },
  collWeird: [{
                name: 'Bad',
              },
              self.someOther(),
  ],
  collWeird2: [{
      name: 'Bad',
          },
     self.someOther(),
  ],
}
