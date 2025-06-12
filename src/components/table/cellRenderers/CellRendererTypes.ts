/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import type { ColumnSchema, RowData } from '../../../types/tableTypes';

export interface CellRendererProps {
  value: any;
  column: ColumnSchema;
  rowData: RowData;
  onValueChange: (rowId: string, columnId: string, newValue: any) => void;
  onStopEdit?: (newValue: any) => void;
  onStartEdit?: () => void;
  inputRef?: React.RefObject<HTMLInputElement | HTMLSelectElement | null>;
  isEditingProp?: boolean;
}

export interface CellRenderStrategy {
  Component: React.FC<CellRendererProps>;
}