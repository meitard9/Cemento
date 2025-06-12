import { useState, useCallback, useEffect } from "react";
import type { TableData, ColumnSchema, RowData } from "../../types/tableTypes";
import {
  initializeMockDb,
  updateCellValueInDb,
} from "../../services/mockDatabase";
import TableCell from "./TableCell";
import "./Table.css";
import "./TableCell.css";

const Table = () => {
  const [tableData, setTableData] = useState<TableData>({
    columns: [],
    data: [],
  });

  const [filteredRowsData, setFilteredRowsData] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toogleAll, setToggleAll] = useState(true);

  const { columns, data: originalRows } = tableData;

  // Map<columnId, searchTerm>
  const [searchTerms, setSearchTerms] = useState<Map<string, string>>(
    new Map()
  );

  const [visibleColumnIds, setVisibleColumnIds] = useState<Set<string>>(
    new Set()
  );

  const displayedColumns = columns
    .filter((column) => visibleColumnIds.has(column.id))
    .sort((a, b) => a.ordinalNo - b.ordinalNo);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const data = await initializeMockDb();
        setVisibleColumnIds(new Set(data.columns.map((col) => col.id)));
        setTableData({ ...data });
        setFilteredRowsData(data.data);
      } catch (err) {
        console.error("Failed to fetch initial table data:", err);
        setError("Failed to load table data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, []);

  const getFilterFunc = useCallback((type: string) => {
    if (type === "string") {
      return (searchStr: string) => {
        return (cellValue: any) => {
          if (cellValue === null || cellValue === undefined) return false;
          return String(cellValue)
            .toLowerCase()
            .includes(searchStr.toLowerCase());
        };
      };
    }

    return (searchStr: string) => {
      return (cellValue: any) => {
        if (cellValue === null || cellValue === undefined) return false;
        if (searchStr === "") return true;
        return String(cellValue).toLowerCase() === searchStr.toLowerCase();
      };
    };
  }, []);

  const filterData = useCallback(() => {
    let currentFilteredData = [...originalRows];

    searchTerms.forEach((searchTerm, columnId) => {
      if (searchTerm) {
        const column = columns.find((col) => col.id === columnId);
        if (column) {
          const filterByColumn = getFilterFunc(column.type)(searchTerm);
          currentFilteredData = currentFilteredData.filter((row) =>
            filterByColumn(row[column.id])
          );
        }
      }
    });

    setFilteredRowsData(currentFilteredData);
  }, [originalRows, columns, searchTerms, getFilterFunc]);

  useEffect(() => {
    filterData();
  }, [searchTerms, originalRows, filterData]);

  const handleSearchChange = useCallback((columnId: string, value: string) => {
    setSearchTerms((prevTerms) => {
      const newTerms = new Map(prevTerms);
      if (value) {
        newTerms.set(columnId, value);
      } else {
        newTerms.delete(columnId);
      }
      return newTerms;
    });
  }, []);

  const handleCellValueChange = useCallback(
    async (rowId: string, columnId: string, newValue: any) => {
      if (!tableData) return;

      try {
        const updatedFullTableData = await updateCellValueInDb(
          rowId,
          columnId,
          newValue
        );
        setTableData(updatedFullTableData);
        console.log(
          `Cell updated: rowId=${rowId}, columnId=${columnId}, newValue=${newValue}`
        );
      } catch (err) {
        console.error("Failed to update cell value:", err);
      }
    },
    [tableData]
  );

  const handleColumnVisibilityChange = useCallback(
    (columnId: string, isChecked: boolean) => {
      setVisibleColumnIds((prevIds) => {
        const newIds = new Set(prevIds);
        if (isChecked) {
          newIds.add(columnId);
        } else {
          newIds.delete(columnId);
        }
        return newIds;
      });
    },
    []
  );

  if (loading) {
    return <div className="loading-message">Loading table data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!tableData || !tableData.columns.length) {
    return <div className="no-data-message">No table data available.</div>;
  }

  const handleToggleAll = () => {
    if (toogleAll) {
      setVisibleColumnIds(new Set());
    } else {
      setVisibleColumnIds(new Set(tableData.columns.map((col) => col.id)));
    }
    setToggleAll(!toogleAll);
  };

  return (
    <div className="table-wrapper">
      <div className="column-filter-controls">
        <h3>Filter Columns:</h3>
        {columns.map((column) => (
          <div key={column.id}>
            {" "}
            <label className="column-filter-label">
              <input
                type="checkbox"
                id={`filter-visibility-${column.id}`}
                name={`filter-visibility-${column.id}`}
                checked={visibleColumnIds.has(column.id)}
                onChange={(e) =>
                  handleColumnVisibilityChange(column.id, e.target.checked)
                }
              />
              {column.title}
            </label>
            <label className="column-search-label">
              {column.type === "boolean" ? (
                <input
                  type="checkbox"
                  id={`search-column-${column.id}`}
                  name={`search-column-${column.id}`}
                  checked={searchTerms.get(column.id) === "true"}
                  onChange={(e) =>
                    handleSearchChange(column.id, e.target.checked.toString())
                  }
                />
              ) : column.type === "selection" && column.options ? (
                <select
                  id={`search-column-${column.id}`}
                  name={`search-column-${column.id}`}
                  value={(searchTerms.get(column.id) as string) || ""}
                  onChange={(e) =>
                    handleSearchChange(column.id, e.target.value)
                  }
                >
                  <option value="">All</option>
                  {column.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={column.type === "number" ? "number" : "text"}
                  id={`search-column-${column.id}`}
                  name={`search-column-${column.id}`}
                  placeholder={`Search ${column.title}...`}
                  value={(searchTerms.get(column.id) as string) || ""}
                  onChange={(e) =>
                    handleSearchChange(column.id, e.target.value)
                  }
                />
              )}
            </label>
          </div>
        ))}
        <button onClick={handleToggleAll}>All</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {displayedColumns.map((column: ColumnSchema) => (
                <th key={column.id} style={{ width: column.width }}>
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRowsData.map((row: RowData) => (
              <tr key={row.id}>
                {displayedColumns.map((column: ColumnSchema) => (
                  <TableCell
                    key={`${row.id}-${column.id}`}
                    value={row[column.id]}
                    column={column}
                    rowData={row}
                    onValueChange={handleCellValueChange}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
