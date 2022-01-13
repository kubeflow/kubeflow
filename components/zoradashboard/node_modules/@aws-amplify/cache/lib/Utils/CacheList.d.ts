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
    private head;
    private tail;
    private hashtable;
    private length;
    /**
     * initialization
     */
    constructor();
    /**
     * insert node to the head of the list
     *
     * @param node
     */
    private insertNodeToHead;
    /**
     * remove node
     *
     * @param node
     */
    private removeNode;
    /**
     * @return true if list is empty
     */
    isEmpty(): boolean;
    /**
     * refresh node so it is rotated to the head
     *
     * @param key - key of the node
     */
    refresh(key: string): void;
    /**
     * insert new node to the head and add it in the hashtable
     *
     * @param key - the key of the node
     */
    insertItem(key: string): void;
    /**
     * @return the LAST Recently Visited key
     */
    getLastItem(): string;
    /**
     * remove the cache key from the list and hashtable
     * @param key - the key of the node
     */
    removeItem(key: string): void;
    /**
     * @return length of the list
     */
    getSize(): number;
    /**
     * @return true if the key is in the hashtable
     * @param key
     */
    containsKey(key: string): boolean;
    /**
     * clean up the list and hashtable
     */
    clearList(): void;
    /**
     * @return all keys in the hashtable
     */
    getKeys(): string[];
    /**
     * mainly for test
     *
     * @param key
     * @return true if key is the head node
     */
    isHeadNode(key: string): boolean;
    /**
     * mainly for test
     *
     * @param key
     * @return true if key is the tail node
     */
    isTailNode(key: string): boolean;
}
