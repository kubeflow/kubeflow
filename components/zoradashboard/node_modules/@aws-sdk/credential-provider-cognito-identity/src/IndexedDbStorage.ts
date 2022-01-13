import { Storage } from "./Storage";

const STORE_NAME = "IdentityIds";

export class IndexedDbStorage implements Storage {
  constructor(private readonly dbName: string = "aws:cognito-identity-ids") {}

  getItem(key: string): Promise<string | null> {
    return this.withObjectStore("readonly", (store) => {
      const req = store.get(key);

      return new Promise<string | null>((resolve) => {
        req.onerror = () => resolve(null);

        req.onsuccess = () => resolve(req.result ? req.result.value : null);
      });
    }).catch(() => null);
  }

  removeItem(key: string): Promise<void> {
    return this.withObjectStore("readwrite", (store) => {
      const req = store.delete(key);

      return new Promise<void>((resolve, reject) => {
        req.onerror = () => reject(req.error);

        req.onsuccess = () => resolve();
      });
    });
  }

  setItem(id: string, value: string): Promise<void> {
    return this.withObjectStore("readwrite", (store) => {
      const req = store.put({ id, value });

      return new Promise<void>((resolve, reject) => {
        req.onerror = () => reject(req.error);

        req.onsuccess = () => resolve();
      });
    });
  }

  private getDb(): Promise<IDBDatabase> {
    const openDbRequest = self.indexedDB.open(this.dbName, 1);
    return new Promise((resolve, reject) => {
      openDbRequest.onsuccess = () => {
        resolve(openDbRequest.result);
      };

      openDbRequest.onerror = () => {
        reject(openDbRequest.error);
      };

      openDbRequest.onblocked = () => {
        reject(new Error("Unable to access DB"));
      };

      openDbRequest.onupgradeneeded = () => {
        const db = openDbRequest.result;
        db.onerror = () => {
          reject(new Error("Failed to create object store"));
        };

        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      };
    });
  }

  private withObjectStore<R>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => Promise<R>): Promise<R> {
    return this.getDb().then((db) => {
      const tx = db.transaction(STORE_NAME, mode);
      tx.oncomplete = () => db.close();

      return new Promise<R>((resolve, reject) => {
        tx.onerror = () => reject(tx.error);

        resolve(action(tx.objectStore(STORE_NAME)));
      }).catch((err) => {
        db.close();
        throw err;
      });
    });
  }
}
