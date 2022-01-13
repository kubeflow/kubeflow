export default {

  "Basics" (test, { Observable }) {

    let list = [];

    return Observable.from([1, 2, 3, 4])
      .filter(x => x > 2)
      .forEach(x => list.push(x))
      .then(() => test.equals(list, [3, 4]));
  },

};
