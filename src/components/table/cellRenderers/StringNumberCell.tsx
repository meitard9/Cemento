import React, { useState, useEffect, useCallback } from "react";
import { type CellRendererProps } from "./CellRendererTypes";

const StringNumberCell: React.FC<CellRendererProps> = ({
  value,
  column,
  rowData,
  onStopEdit,
  inputRef,
  isEditingProp,
}) => {

  const [strValue, setStrValue] = useState<string>(value?.toString() || "");
  const inputId = `edit-cell-${rowData.id}-${column.id}`;

  //triggered on value change
  useEffect(() => {
    setStrValue(value?.toString() || "");
  }, [value]);

  //triggered on focus change
  useEffect(() => {
    if (isEditingProp && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditingProp, inputRef]);

  const handleBlur = useCallback(() => {
    if (onStopEdit) onStopEdit(strValue);
  }, [strValue, onStopEdit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        if (inputRef && inputRef.current) {
          inputRef.current.blur();
        }
      }
    },
    [inputRef]
  );

  

  if (isEditingProp) {
    //edit mode
    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        id={inputId}
        name={column.id}
        type={column.type === "number" ? "number" : "text"}
        value={strValue}
        onChange={(e) => setStrValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="cell-edit-input"
      />
    );
  } else {
    //display mode
    return (
      <div className="cell-display-value">
        {value !== undefined ? value.toString() : ""}
      </div>
    );
  }
};

export default StringNumberCell;
