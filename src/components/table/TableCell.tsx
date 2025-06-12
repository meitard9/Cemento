/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnSchema, RowData } from "../../types/tableTypes";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { getCellRenderStrategy } from './cellRenderers/CellRenderStrategyMap';
import type { CellRendererProps } from './cellRenderers/CellRendererTypes';
import './TableCell.css';

interface TableCellProps {
  value: any;
  column: ColumnSchema;
  rowData: RowData;
  onValueChange: (rowId: string, columnId: string, newValue: any) => void;
}

const TableCell: React.FC<TableCellProps> = ({ value, column, rowData, onValueChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState<any>(value);
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

  const isColumnEditable = column.isEditable === undefined ? true : column.isEditable;


  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleStartEdit = useCallback(() => {
    if (isColumnEditable && column.type !== 'boolean') {
      setIsEditing(true);
    }
  }, [isColumnEditable, column.type]);

  const handleStopEdit = useCallback(
    (newValue: any) => {
      setIsEditing(false);
      if (isColumnEditable && newValue !== value) {
        onValueChange(rowData.id, column.id, newValue);
      }
    },
    [isColumnEditable, value, onValueChange, rowData.id, column.id]
  );

  const shouldRenderInEditMode = isEditing && isColumnEditable && column.type !== 'boolean';
  const { Component: CellRendererComponent } = getCellRenderStrategy(column.type);

  const commonRendererProps: CellRendererProps = {
    value: currentValue,
    column,
    rowData,
    onValueChange,
    inputRef,
    onStopEdit: handleStopEdit,
    onStartEdit: handleStartEdit,
    isEditingProp: shouldRenderInEditMode,
  };

  return (
    <td
      className={`table-cell ${isColumnEditable ? '' : 'non-editable-cell'}`}
      onClick={isColumnEditable && !isEditing && column.type !== 'boolean' ? handleStartEdit : undefined}
    >
      <CellRendererComponent {...commonRendererProps} /> 
    </td>
  );
};

export default React.memo(TableCell);