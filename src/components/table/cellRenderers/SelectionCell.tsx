import React, { useState, useEffect, useCallback } from "react";
import type { CellRendererProps } from "./CellRendererTypes";

const SelectionCell: React.FC<CellRendererProps> = ({
  value,
  column,
  rowData,
  onValueChange,
  inputRef,
  isEditingProp,
}) => {
  const [SelectValue, setSelectValue] = useState<string>(
    value !== undefined ? value : ""
  );

  useEffect(() => {
    setSelectValue(value !== undefined ? value : "");
  }, [value]);

  useEffect(() => {
    if (isEditingProp && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditingProp, inputRef]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;
      onValueChange(rowData.id, column.id, newValue);
    },
    [
      column.id,
      //, onStopEdit
      onValueChange,
      rowData.id,
    ]
  );

  // unique id
  const selectId = `edit-cell-${rowData.id}-${column.id}`;

  if (isEditingProp) {
    //edit mode
    return (
      <select
        ref={inputRef as React.RefObject<HTMLSelectElement>}
        id={selectId}
        name={column.id}
        value={SelectValue}
        onChange={handleChange}
        //onBlur={handleBlur}
        className="cell-edit-select"
      >
        <option value="">
          {column.options?.length ? "Select..." : "No options"}
        </option>
        {column.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  } else {
    //display mode
    const selectedOption = column.options?.find((opt) => opt === value);
    return <div className="cell-display-value">{selectedOption || "N/A"}</div>;
  }
};

export default SelectionCell;
