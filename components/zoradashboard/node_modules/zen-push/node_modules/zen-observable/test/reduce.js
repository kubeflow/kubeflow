export default {

  "No seed" (test, { Observable }) {
    return Observable.from([1, 2, 3, 4, 5, 6]).reduce((a, b) => {
      return a + b;
    }).forEach(x => {
      test.equals(x, 21);
    });
  },

  "No seed - one value" (test, { Observable }) {
    return Observable.from([1]).reduce((a, b) => {
      return a + b;
    }).forEach(x => {
      test.equals(x, 1);
    });
  },

  "No seed - empty (throws)" (test, { Observable }) {
    return Observable.from([]).reduce((a, b) => {
      return a + b;
    }).forEach(() => null)
    .then(
      () => test.assert(false),
      () => test.assert(true));
  },

  "Seed" (test, { Observable }) {
    return Observable.from([1, 2, 3, 4, 5, 6]).reduce((a, b) => {
      return a + b;
    }, 100).forEach(x => {
      test.equals(x, 121);
    });
  },

  "Seed - empty" (test, { Observable }) {
    return Observable.from([]).reduce((a, b) => {
      return a + b;
    }, 100).forEach(x => {
      test.equals(x, 100);
    });
  },

};
