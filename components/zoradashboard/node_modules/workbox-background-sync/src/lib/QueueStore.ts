/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import {assert} from 'workbox-core/_private/assert.js';
import {DBWrapper} from 'workbox-core/_private/DBWrapper.js';
import {RequestData} from './StorableRequest.js';
import '../_version.js';


const DB_VERSION = 3;
const DB_NAME = 'workbox-background-sync';
const OBJECT_STORE_NAME = 'requests';
const INDEXED_PROP = 'queueName';

export interface UnidentifiedQueueStoreEntry {
  requestData: RequestData;
  timestamp: number;
  id?: number;
  queueName?: string;
  metadata?: object;
}

export interface QueueStoreEntry extends UnidentifiedQueueStoreEntry {
  id: number;
}

/**
 * A class to manage storing requests from a Queue in IndexedDB,
 * indexed by their queue name for easier access.
 *
 * @private
 */
export class QueueStore {
  private readonly _queueName: string;
  private readonly _db: DBWrapper;

  /**
   * Associates this instance with a Queue instance, so entries added can be
   * identified by their queue name.
   *
   * @param {string} queueName
   * @private
   */
  constructor(queueName: string) {
    this._queueName = queueName;
    this._db = new DBWrapper(DB_NAME, DB_VERSION, {
      onupgradeneeded: this._upgradeDb,
    });
  }

  /**
   * Append an entry last in the queue.
   *
   * @param {Object} entry
   * @param {Object} entry.requestData
   * @param {number} [entry.timestamp]
   * @param {Object} [entry.metadata]
   * @private
   */
  async pushEntry(entry: UnidentifiedQueueStoreEntry) {
    if (process.env.NODE_ENV !== 'production') {
      assert!.isType(entry, 'object', {
        moduleName: 'workbox-background-sync',
        className: 'QueueStore',
        funcName: 'pushEntry',
        paramName: 'entry',
      });
      assert!.isType(entry.requestData, 'object', {
        moduleName: 'workbox-background-sync',
        className: 'QueueStore',
        funcName: 'pushEntry',
        paramName: 'entry.requestData',
      });
    }

    // Don't specify an ID since one is automatically generated.
    delete entry.id;
    entry.queueName = this._queueName;

    await this._db.add!(OBJECT_STORE_NAME, entry);
  }

  /**
   * Prepend an entry first in the queue.
   *
   * @param {Object} entry
   * @param {Object} entry.requestData
   * @param {number} [entry.timestamp]
   * @param {Object} [entry.metadata]
   * @private
   */
  async unshiftEntry(entry: UnidentifiedQueueStoreEntry) {
    if (process.env.NODE_ENV !== 'production') {
      assert!.isType(entry, 'object', {
        moduleName: 'workbox-background-sync',
        className: 'QueueStore',
        funcName: 'unshiftEntry',
        paramName: 'entry',
      });
      assert!.isType(entry.requestData, 'object', {
        moduleName: 'workbox-background-sync',
        className: 'QueueStore',
        funcName: 'unshiftEntry',
        paramName: 'entry.requestData',
      });
    }

    const [firstEntry] = await this._db.getAllMatching(OBJECT_STORE_NAME, {
      count: 1,
    });

    if (firstEntry) {
      // Pick an ID one less than the lowest ID in the object store.
      entry.id = firstEntry.id - 1;
    } else {
      // Otherwise let the auto-incrementor assign the ID.
      delete entry.id;
    }
    entry.queueName = this._queueName;

    await this._db.add!(OBJECT_STORE_NAME, entry);
  }

  /**
   * Removes and returns the last entry in the queue matching the `queueName`.
   *
   * @return {Promise<Object>}
   * @private
   */
  async popEntry(): Promise<QueueStoreEntry> {
    return this._removeEntry({direction: 'prev'});
  }

  /**
   * Removes and returns the first entry in the queue matching the `queueName`.
   *
   * @return {Promise<Object>}
   * @private
   */
  async shiftEntry(): Promise<QueueStoreEntry> {
    return this._removeEntry({direction: 'next'});
  }

  /**
   * Returns all entries in the store matching the `queueName`.
   *
   * @param {Object} options See {@link module:workbox-background-sync.Queue~getAll}
   * @return {Promise<Array<Object>>}
   * @private
   */
  async getAll(): Promise<QueueStoreEntry[]> {
    return await this._db.getAllMatching(OBJECT_STORE_NAME, {
      index: INDEXED_PROP,
      query: IDBKeyRange.only(this._queueName),
    });
  }

  /**
   * Deletes the entry for the given ID.
   *
   * WARNING: this method does not ensure the deleted enry belongs to this
   * queue (i.e. matches the `queueName`). But this limitation is acceptable
   * as this class is not publicly exposed. An additional check would make
   * this method slower than it needs to be.
   *
   * @private
   * @param {number} id
   */
  async deleteEntry(id: number) {
    await this._db.delete!(OBJECT_STORE_NAME, id);
  }

  /**
   * Removes and returns the first or last entry in the queue (based on the
   * `direction` argument) matching the `queueName`.
   *
   * @return {Promise<Object>}
   * @private
   */
  async _removeEntry({direction}: {direction?: IDBCursorDirection}) {
    const [entry] = await this._db.getAllMatching(OBJECT_STORE_NAME, {
      direction,
      index: INDEXED_PROP,
      query: IDBKeyRange.only(this._queueName),
      count: 1,
    });

    if (entry) {
      await this.deleteEntry(entry.id);
      return entry;
    }
  }

  /**
   * Upgrades the database given an `upgradeneeded` event.
   *
   * @param {Event} event
   * @private
   */
  private _upgradeDb(event: IDBVersionChangeEvent) {
    const db = (event.target as IDBOpenDBRequest).result;

    if (event.oldVersion > 0 && event.oldVersion < DB_VERSION) {
      if (db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
        db.deleteObjectStore(OBJECT_STORE_NAME);
      }
    }

    const objStore = db.createObjectStore(OBJECT_STORE_NAME, {
      autoIncrement: true,
      keyPath: 'id',
    });
    objStore.createIndex(INDEXED_PROP, INDEXED_PROP, {unique: false});
  }
}
