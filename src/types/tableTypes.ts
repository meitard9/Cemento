// src/types.ts

/**
 * @typedef {Object} ColumnSchema
 * @property {string} id - The unique identifier for the column. Should match the one on the data rows.
 * @property {number} ordinalNo - The position of the column in the table.
 * @property {string} title - The display name of the column.
 * @property {string} type - The type of data in the column (e.g., 'string', 'number', 'boolean', 'selection').
 * @property {number} [width] - Optional width of the column.
 * @property {string[]} [options] - Optional array of options for 'selection' type columns.
 */
export interface ColumnSchema {
  id: string;
  ordinalNo: number;
  title: string;
  type: "string" | "number" | "boolean" | "selection";
  width?: number;
  options?: string[]; // Used for 'selection' type columns
  isEditable?: boolean; //if not exist the default is true
}

/**
 * @typedef {Object} RowData
 * @property {string} id - RowID
 * @property {any} [columnId] - Data for a specific column in the row. The key should match a column's id.
 */
export interface RowData {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [columnId: string]: any;
}

/**
 * @typedef {Object} TableData
 * @property {ColumnSchema[]} columns - The array of column definitions.
 * @property {RowData[]} data - The array of data rows.
 */
export interface TableData {
  columns: ColumnSchema[];
  data: RowData[];
}
