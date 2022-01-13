import { IndexedDbStorage } from "./IndexedDbStorage";
import { InMemoryStorage } from "./InMemoryStorage";
import { Storage } from "./Storage";

const inMemoryStorage = new InMemoryStorage();

export function localStorage(): Storage {
  if (typeof self === "object" && self.indexedDB) {
    return new IndexedDbStorage();
  }

  if (typeof window === "object" && window.localStorage) {
    return window.localStorage;
  }

  return inMemoryStorage;
}
