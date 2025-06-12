import { useCallback } from "react";
import type { CellRendererProps } from "./CellRendererTypes";

const BooleanCell = ({ value, column, rowData, onValueChange }:CellRendererProps) => {

  const handleCellClick = useCallback(() => {
    const newValue = !value;
    onValueChange(rowData.id, column.id, newValue);
  }, [value, column.id, rowData.id, onValueChange]);

  const checkboxId = `edit-cell-${rowData.id}-${column.id}`;
  
  return (
    <div className="boolean-cell-wrapper" onClick={handleCellClick}>
      <input
        type="checkbox"
        id={checkboxId}
        name={column.id}
        checked={!!value}
        readOnly
        className="cell-checkbox-display"
      />
    </div>
  );
};

export default BooleanCell;
