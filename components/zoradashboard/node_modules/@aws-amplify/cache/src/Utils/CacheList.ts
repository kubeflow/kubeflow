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

class DoubleLinkedNode {
	key: string;
	prevNode: DoubleLinkedNode | null;
	nextNode: DoubleLinkedNode | null;

	constructor(keyVal?: string) {
		this.key = keyVal ? keyVal : '';
		this.prevNode = null;
		this.nextNode = null;
	}
}

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
export default class CacheList {
	private head: DoubleLinkedNode;
	private tail: DoubleLinkedNode;
	private hashtable: object;
	private length: number;

	/**
	 * initialization
	 */
	constructor() {
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
	private insertNodeToHead(node: DoubleLinkedNode) {
		const tmp: DoubleLinkedNode = this.head.nextNode;
		this.head.nextNode = node;
		node.nextNode = tmp;
		node.prevNode = this.head;
		tmp.prevNode = node;

		this.length = this.length + 1;
	}

	/**
	 * remove node
	 *
	 * @param node
	 */
	private removeNode(node: DoubleLinkedNode): void {
		node.prevNode.nextNode = node.nextNode;
		node.nextNode.prevNode = node.prevNode;

		node.prevNode = null;
		node.nextNode = null;

		this.length = this.length - 1;
	}

	/**
	 * @return true if list is empty
	 */
	public isEmpty(): boolean {
		return this.length === 0;
	}

	/**
	 * refresh node so it is rotated to the head
	 *
	 * @param key - key of the node
	 */
	public refresh(key: string): void {
		const node: DoubleLinkedNode = this.hashtable[key];
		this.removeNode(node);
		this.insertNodeToHead(node);
	}

	/**
	 * insert new node to the head and add it in the hashtable
	 *
	 * @param key - the key of the node
	 */
	public insertItem(key: string): void {
		const node: DoubleLinkedNode = new DoubleLinkedNode(key);
		this.hashtable[key] = node;
		this.insertNodeToHead(node);
	}

	/**
	 * @return the LAST Recently Visited key
	 */
	public getLastItem(): string {
		return this.tail.prevNode.key;
	}

	/**
	 * remove the cache key from the list and hashtable
	 * @param key - the key of the node
	 */
	public removeItem(key: string): void {
		const removedItem: DoubleLinkedNode = this.hashtable[key];
		this.removeNode(removedItem);
		delete this.hashtable[key];
	}

	/**
	 * @return length of the list
	 */
	public getSize(): number {
		return this.length;
	}

	/**
	 * @return true if the key is in the hashtable
	 * @param key
	 */
	public containsKey(key: string): boolean {
		return key in this.hashtable;
	}

	/**
	 * clean up the list and hashtable
	 */
	public clearList(): void {
		for (const key of Object.keys(this.hashtable)) {
			if (this.hashtable.hasOwnProperty(key)) {
				delete this.hashtable[key];
			}
		}
		this.head.nextNode = this.tail;
		this.tail.prevNode = this.head;
		this.length = 0;
	}

	/**
	 * @return all keys in the hashtable
	 */
	public getKeys(): string[] {
		return Object.keys(this.hashtable);
	}

	/**
	 * mainly for test
	 *
	 * @param key
	 * @return true if key is the head node
	 */
	public isHeadNode(key: string): boolean {
		const node = this.hashtable[key];
		return node.prevNode === this.head;
	}

	/**
	 * mainly for test
	 *
	 * @param key
	 * @return true if key is the tail node
	 */
	public isTailNode(key: string): boolean {
		const node = this.hashtable[key];
		return node.nextNode === this.tail;
	}
}
