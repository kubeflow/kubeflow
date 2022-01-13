/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var DoubleLinkedNode = /** @class */ (function () {
    function DoubleLinkedNode(keyVal) {
        this.key = keyVal ? keyVal : '';
        this.prevNode = null;
        this.nextNode = null;
    }
    return DoubleLinkedNode;
}());
/**
 * double linked list plus a hash table inside
 * each key in the cache stored as a node in the list
 * recently visited node will be rotated to the head
 * so the Last Recently Visited node will be at the tail
 *
 * @member head - dummy head of the linked list
 * @member tail - dummy tail of the linked list
 * @member hashtable - the hashtable which maps cache key to list node
 * @member length - length of the list
 */
var CacheList = /** @class */ (function () {
    /**
     * initialization
     */
    function CacheList() {
        this.head = new DoubleLinkedNode();
        this.tail = new DoubleLinkedNode();
        this.hashtable = {};
        this.length = 0;
        this.head.nextNode = this.tail;
        this.tail.prevNode = this.head;
    }
    /**
     * insert node to the head of the list
     *
     * @param node
     */
    CacheList.prototype.insertNodeToHead = function (node) {
        var tmp = this.head.nextNode;
        this.head.nextNode = node;
        node.nextNode = tmp;
        node.prevNode = this.head;
        tmp.prevNode = node;
        this.length = this.length + 1;
    };
    /**
     * remove node
     *
     * @param node
     */
    CacheList.prototype.removeNode = function (node) {
        node.prevNode.nextNode = node.nextNode;
        node.nextNode.prevNode = node.prevNode;
        node.prevNode = null;
        node.nextNode = null;
        this.length = this.length - 1;
    };
    /**
     * @return true if list is empty
     */
    CacheList.prototype.isEmpty = function () {
        return this.length === 0;
    };
    /**
     * refresh node so it is rotated to the head
     *
     * @param key - key of the node
     */
    CacheList.prototype.refresh = function (key) {
        var node = this.hashtable[key];
        this.removeNode(node);
        this.insertNodeToHead(node);
    };
    /**
     * insert new node to the head and add it in the hashtable
     *
     * @param key - the key of the node
     */
    CacheList.prototype.insertItem = function (key) {
        var node = new DoubleLinkedNode(key);
        this.hashtable[key] = node;
        this.insertNodeToHead(node);
    };
    /**
     * @return the LAST Recently Visited key
     */
    CacheList.prototype.getLastItem = function () {
        return this.tail.prevNode.key;
    };
    /**
     * remove the cache key from the list and hashtable
     * @param key - the key of the node
     */
    CacheList.prototype.removeItem = function (key) {
        var removedItem = this.hashtable[key];
        this.removeNode(removedItem);
        delete this.hashtable[key];
    };
    /**
     * @return length of the list
     */
    CacheList.prototype.getSize = function () {
        return this.length;
    };
    /**
     * @return true if the key is in the hashtable
     * @param key
     */
    CacheList.prototype.containsKey = function (key) {
        return key in this.hashtable;
    };
    /**
     * clean up the list and hashtable
     */
    CacheList.prototype.clearList = function () {
        var e_1, _a;
        try {
            for (var _b = __values(Object.keys(this.hashtable)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (this.hashtable.hasOwnProperty(key)) {
                    delete this.hashtable[key];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.head.nextNode = this.tail;
        this.tail.prevNode = this.head;
        this.length = 0;
    };
    /**
     * @return all keys in the hashtable
     */
    CacheList.prototype.getKeys = function () {
        return Object.keys(this.hashtable);
    };
    /**
     * mainly for test
     *
     * @param key
     * @return true if key is the head node
     */
    CacheList.prototype.isHeadNode = function (key) {
        var node = this.hashtable[key];
        return node.prevNode === this.head;
    };
    /**
     * mainly for test
     *
     * @param key
     * @return true if key is the tail node
     */
    CacheList.prototype.isTailNode = function (key) {
        var node = this.hashtable[key];
        return node.nextNode === this.tail;
    };
    return CacheList;
}());
export default CacheList;
//# sourceMappingURL=CacheList.js.map