import { IdentifyTextOutput, Table, KeyValue, Content } from '../types';
import { Block, BlockList, TextDetectionList } from '../types/AWSTypes';
/**
 * Organizes blocks from Rekognition API to each of the categories and and structures
 * their data accordingly.
 * @param {BlockList} source - Array containing blocks returned from Textract API.
 * @return {IdentifyTextOutput} -  Object that categorizes each block and its information.
 */
export declare function categorizeRekognitionBlocks(blocks: TextDetectionList): IdentifyTextOutput;
/**
 * Organizes blocks from Textract API to each of the categories and and structures
 * their data accordingly.
 * @param {BlockList} source - Array containing blocks returned from Textract API.
 * @return {IdentifyTextOutput} -  Object that categorizes each block and its information.
 */
export declare function categorizeTextractBlocks(blocks: BlockList): IdentifyTextOutput;
/**
 * Constructs a table object using data from its children cells.
 * @param {Block} table - Table block that has references (`Relationships`) to its cells
 * @param {[id: string]: Block} blockMap - Maps block Ids to blocks.
 */
export declare function constructTable(table: Block, blockMap: {
    [key: string]: Block;
}): Table;
/**
 * Constructs a key value object from its children key and value blocks.
 * @param {Block} KeyValue - KeyValue block that has references (`Relationships`) to its children.
 * @param {[id: string]: Block} blockMap - Maps block Ids to blocks.
 */
export declare function constructKeyValue(keyBlock: Block, blockMap: {
    [key: string]: Block;
}): KeyValue;
/**
 * Extracts text and selection from input block's children.
 * @param {Block}} block - Block that we want to extract contents from.
 * @param {[id: string]: Block} blockMap - Maps block Ids to blocks.
 */
export declare function extractContentsFromBlock(block: Block, blockMap: {
    [id: string]: Block;
}): Content;
