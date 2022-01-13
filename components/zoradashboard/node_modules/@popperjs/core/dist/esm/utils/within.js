import { max as mathMax, min as mathMin } from "./math.js";
export default function within(min, value, max) {
  return mathMax(min, mathMin(value, max));
}