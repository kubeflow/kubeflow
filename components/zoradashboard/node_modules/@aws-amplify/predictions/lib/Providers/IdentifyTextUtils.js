"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
function getBoundingBox(geometry) {
    if (!geometry)
        return undefined;
    return Utils_1.makeCamelCase(geometry.BoundingBox);
}
function getPolygon(geometry) {
    if (!geometry)
        return undefined;
    return Utils_1.makeCamelCaseArray(Array.from(geometry.Polygon));
}
/**
 * Organizes blocks from Rekognition API to each of the categories and and structures
 * their data accordingly.
 * @param {BlockList} source - Array containing blocks returned from Textract API.
 * @return {IdentifyTextOutput} -  Object that categorizes each block and its information.
 */
function categorizeRekognitionBlocks(blocks) {
    // Skeleton IdentifyText API response. We will populate it as we iterate through blocks.
    var response = {
        text: {
            fullText: '',
            words: [],
            lines: [],
            linesDetailed: [],
        },
    };
    // We categorize each block by running a forEach loop through them.
    blocks.forEach(function (block) {
        switch (block.Type) {
            case 'LINE':
                response.text.lines.push(block.DetectedText);
                response.text.linesDetailed.push({
                    text: block.DetectedText,
                    polygon: getPolygon(block.Geometry),
                    boundingBox: getBoundingBox(block.Geometry),
                    page: null,
                });
                break;
            case 'WORD':
                response.text.fullText += block.DetectedText + ' ';
                response.text.words.push({
                    text: block.DetectedText,
                    polygon: getPolygon(block.Geometry),
                    boundingBox: getBoundingBox(block.Geometry),
                });
                break;
        }
    });
    // remove trailing space of fullText
    response.text.fullText = response.text.fullText.substr(0, response.text.fullText.length - 1);
    return response;
}
exports.categorizeRekognitionBlocks = categorizeRekognitionBlocks;
/**
 * Organizes blocks from Textract API to each of the categories and and structures
 * their data accordingly.
 * @param {BlockList} source - Array containing blocks returned from Textract API.
 * @return {IdentifyTextOutput} -  Object that categorizes each block and its information.
 */
function categorizeTextractBlocks(blocks) {
    // Skeleton IdentifyText API response. We will populate it as we iterate through blocks.
    var response = {
        text: {
            fullText: '',
            words: [],
            lines: [],
            linesDetailed: [],
        },
    };
    // if blocks is an empty array, ie. textract did not detect anything, return empty response.
    if (blocks.length === 0)
        return response;
    /**
     * We categorize each of the blocks by running a forEach loop through them.
     *
     * For complex structures such as Tables and KeyValue, we need to trasverse through their children. To do so,
     * we will post-process them after the for each loop. We do this by storing table and keyvalues in arrays and
     * mapping other blocks in `blockMap` (id to block) so we can reference them easily later.
     *
     * Note that we do not map `WORD` and `TABLE` in `blockMap` because they will not be referenced by any other
     * block except the Page block.
     */
    var tableBlocks = Array();
    var keyValueBlocks = Array();
    var blockMap = {};
    blocks.forEach(function (block) {
        switch (block.BlockType) {
            case 'LINE':
                response.text.lines.push(block.Text);
                response.text.linesDetailed.push({
                    text: block.Text,
                    polygon: getPolygon(block.Geometry),
                    boundingBox: getBoundingBox(block.Geometry),
                    page: block.Page,
                });
                break;
            case 'WORD':
                response.text.fullText += block.Text + ' ';
                response.text.words.push({
                    text: block.Text,
                    polygon: getPolygon(block.Geometry),
                    boundingBox: getBoundingBox(block.Geometry),
                });
                blockMap[block.Id] = block;
                break;
            case 'SELECTION_ELEMENT':
                var selectionStatus = block.SelectionStatus === 'SELECTED' ? true : false;
                if (!response.text.selections)
                    response.text.selections = [];
                response.text.selections.push({
                    selected: selectionStatus,
                    polygon: getPolygon(block.Geometry),
                    boundingBox: getBoundingBox(block.Geometry),
                });
                blockMap[block.Id] = block;
                break;
            case 'TABLE':
                tableBlocks.push(block);
                break;
            case 'KEY_VALUE_SET':
                keyValueBlocks.push(block);
                blockMap[block.Id] = block;
                break;
            default:
                blockMap[block.Id] = block;
        }
    });
    // remove trailing space in fullText
    response.text.fullText = response.text.fullText.substr(0, response.text.fullText.length - 1);
    // Post-process complex structures if they exist.
    if (tableBlocks.length !== 0) {
        var tableResponse_1 = Array();
        tableBlocks.forEach(function (table) {
            tableResponse_1.push(constructTable(table, blockMap));
        });
        response.text.tables = tableResponse_1;
    }
    if (keyValueBlocks.length !== 0) {
        var keyValueResponse_1 = Array();
        keyValueBlocks.forEach(function (keyValue) {
            // We need the KeyValue blocks of EntityType = `KEY`, which has both key and value references.
            var entityTypes = Array.from(keyValue.EntityTypes);
            if (entityTypes.indexOf('KEY') !== -1) {
                keyValueResponse_1.push(constructKeyValue(keyValue, blockMap));
            }
        });
        response.text.keyValues = keyValueResponse_1;
    }
    return response;
}
exports.categorizeTextractBlocks = categorizeTextractBlocks;
/**
 * Constructs a table object using data from its children cells.
 * @param {Block} table - Table block that has references (`Relationships`) to its cells
 * @param {[id: string]: Block} blockMap - Maps block Ids to blocks.
 */
function constructTable(table, blockMap) {
    var e_1, _a, e_2, _b;
    var tableMatrix;
    tableMatrix = [];
    try {
        // visit each of the cell associated with the table's relationship.
        for (var _c = __values(table.Relationships), _d = _c.next(); !_d.done; _d = _c.next()) {
            var tableRelation = _d.value;
            try {
                for (var _e = (e_2 = void 0, __values(tableRelation.Ids)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var cellId = _f.value;
                    var cellBlock = blockMap[cellId];
                    var row = cellBlock.RowIndex - 1; // textract starts indexing at 1, so subtract it by 1.
                    var col = cellBlock.ColumnIndex - 1; // textract starts indexing at 1, so subtract it by 1.
                    // extract data contained inside the cell.
                    var content = extractContentsFromBlock(cellBlock, blockMap);
                    var cell = {
                        text: content.text,
                        boundingBox: getBoundingBox(cellBlock.Geometry),
                        polygon: getPolygon(cellBlock.Geometry),
                        selected: content.selected,
                        rowSpan: cellBlock.RowSpan,
                        columnSpan: cellBlock.ColumnSpan,
                    };
                    if (!tableMatrix[row])
                        tableMatrix[row] = [];
                    tableMatrix[row][col] = cell;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var rowSize = tableMatrix.length;
    var columnSize = tableMatrix[0].length;
    // Note that we leave spanned cells undefined for distinction
    return {
        size: { rows: rowSize, columns: columnSize },
        table: tableMatrix,
        boundingBox: getBoundingBox(table.Geometry),
        polygon: getPolygon(table.Geometry),
    };
}
exports.constructTable = constructTable;
/**
 * Constructs a key value object from its children key and value blocks.
 * @param {Block} KeyValue - KeyValue block that has references (`Relationships`) to its children.
 * @param {[id: string]: Block} blockMap - Maps block Ids to blocks.
 */
function constructKeyValue(keyBlock, blockMap) {
    var e_3, _a, e_4, _b;
    var keyText = '';
    var valueText = '';
    var valueSelected;
    try {
        for (var _c = __values(keyBlock.Relationships), _d = _c.next(); !_d.done; _d = _c.next()) {
            var keyValueRelation = _d.value;
            if (keyValueRelation.Type === 'CHILD') {
                // relation refers to key
                var contents = extractContentsFromBlock(keyBlock, blockMap);
                keyText = contents.text;
            }
            else if (keyValueRelation.Type === 'VALUE') {
                try {
                    // relation refers to value
                    for (var _e = (e_4 = void 0, __values(keyValueRelation.Ids)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var valueId = _f.value;
                        var valueBlock = blockMap[valueId];
                        var contents = extractContentsFromBlock(valueBlock, blockMap);
                        valueText = contents.text;
                        if (contents.selected != null)
                            valueSelected = contents.selected;
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return {
        key: keyText,
        value: { text: valueText, selected: valueSelected },
        polygon: getPolygon(keyBlock.Geometry),
        boundingBox: getBoundingBox(keyBlock.Geometry),
    };
}
exports.constructKeyValue = constructKeyValue;
/**
 * Extracts text and selection from input block's children.
 * @param {Block}} block - Block that we want to extract contents from.
 * @param {[id: string]: Block} blockMap - Maps block Ids to blocks.
 */
function extractContentsFromBlock(block, blockMap) {
    var e_5, _a, e_6, _b;
    var words = '';
    var isSelected;
    if (!block.Relationships) {
        // some block might have no content
        return { text: '', selected: undefined };
    }
    try {
        for (var _c = __values(block.Relationships), _d = _c.next(); !_d.done; _d = _c.next()) {
            var relation = _d.value;
            try {
                for (var _e = (e_6 = void 0, __values(relation.Ids)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var contentId = _f.value;
                    var contentBlock = blockMap[contentId];
                    if (contentBlock.BlockType === 'WORD') {
                        words += contentBlock.Text + ' ';
                    }
                    else if (contentBlock.BlockType === 'SELECTION_ELEMENT') {
                        isSelected = contentBlock.SelectionStatus === 'SELECTED' ? true : false;
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_5) throw e_5.error; }
    }
    words = words.substr(0, words.length - 1); // remove trailing space.
    return { text: words, selected: isSelected };
}
exports.extractContentsFromBlock = extractContentsFromBlock;
//# sourceMappingURL=IdentifyTextUtils.js.map