import { runTests } from "./tc39";
import { Observable } from "../src/Observable.js";
import { TestRunner } from "moon-unit";

import reduceTests from "./reduce.js";
import mapTests from "./map.js";
import filterTests from "./filter.js";
import speciesTests from "./species.js";

// Silence setTimeout so errors aren't thrown
global.setTimeout = function() {};

runTests(Observable).then(() => {
  return new TestRunner().inject({ Observable }).run({
    "map": mapTests,
    "reduce": reduceTests,
    "filter": filterTests,
    "species": speciesTests,
  });
});
