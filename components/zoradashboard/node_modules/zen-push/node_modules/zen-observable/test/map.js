export default {

  "Basics" (test, { Observable }) {
    let list = [];

    return Observable.from([1, 2, 3])
      .map(x => x * 2)
      .forEach(x => list.push(x))
      .then(() => test.equals(list, [2, 4, 6]));
  },

};
