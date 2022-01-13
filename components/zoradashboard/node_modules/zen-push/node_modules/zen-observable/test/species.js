export default {

  "uses Observable when constructor is undefined" (test, { Observable }) {
    let instance = new Observable(() => {});
    instance.constructor = undefined;
    test.equals(instance.map(x => x) instanceof Observable, true);
  },

  "uses Observable if species is null" (test, { Observable }) {
    let instance = new Observable(() => {});
    instance.constructor = { [Symbol.species]: null };
    test.equals(instance.map(x => x) instanceof Observable, true);
  },

  "uses Observable if species is undefined" (test, { Observable }) {
    let instance = new Observable(() => {});
    instance.constructor = { [Symbol.species]: undefined };
    test.equals(instance.map(x => x) instanceof Observable, true);
  },

  "uses value of Symbol.species" (test, { Observable }) {
    function ctor() {}
    let instance = new Observable(() => {});
    instance.constructor = { [Symbol.species]: ctor };
    test.equals(instance.map(x => x) instanceof ctor, true);
  },

};
