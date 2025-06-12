import type { TableData, ColumnSchema, RowData } from "../types/tableTypes"; 

/**
 * Simulates a network request to fetch initial table data.
 * ceates mock data
 * @returns Promise<TableData>
 */
export const getInitialTableData = async (): Promise<TableData> => {
  await new Promise((resolve) => setTimeout(resolve, 500)); //has a 500ms delay

  // Mock data
  const columns: ColumnSchema[] = [
    {
      id: "id",
      ordinalNo: 0,
      title: "ID",
      type: "string",
      width: 50,
      isEditable: false,
    },
    {
      id: "firstName",
      ordinalNo: 1,
      title: "First Name",
      type: "string",
      width: 150,
      isEditable: true,
    },
    {
      id: "lastName",
      ordinalNo: 2,
      title: "Last Name",
      type: "string",
      width: 150,
      isEditable: true,
    },
    {
      id: "age",
      ordinalNo: 3,
      title: "Age",
      type: "number",
      width: 80,
      isEditable: true,
    },
    {
      id: "isActive",
      ordinalNo: 4,
      title: "Active",
      type: "boolean",
      width: 70,
      isEditable: true,
    },
    {
      id: "city",
      ordinalNo: 5,
      title: "City",
      type: "selection",
      width: 120,
      options: ["Tel Aviv", "Jerusalem", "Haifa", "Be'er Sheva"],
      isEditable: true,
    },
    {
      id: "email",
      ordinalNo: 6,
      title: "Email",
      type: "string",
      width: 200,
      isEditable: false,
    },
    {
      id: "phone",
      ordinalNo: 7,
      title: "Phone",
      type: "string",
      width: 120,
      isEditable: true,
    },
    {
      id: "occupation",
      ordinalNo: 8,
      title: "Occupation",
      type: "string",
      width: 150,
      isEditable: true,
    },
    {
      id: "registered",
      ordinalNo: 9,
      title: "Registered",
      type: "boolean",
      width: 100,
      isEditable: true,
    },
  ];

  const data: RowData[] = Array.from({ length: 20 }, (_, i) => ({
    id: `row-${i + 1}`,
    firstName: `John${i + 1}`,
    lastName: `Doe${i + 1}`,
    age: 20 + i,
    isActive: i % 2 === 0,
    city: ["Tel Aviv", "Jerusalem", "Haifa", "Be'er Sheva"][i % 4],
    email: `john.doe${i + 1}@example.com`,
    phone: `050-12345${i + 1}`,
    occupation: `Engineer ${i + 1}`,
    registered: i % 3 === 0,
  }));

  return { columns, data };
};

//simulated database
let currentTableData: TableData;

//set the initial table data
export const initializeMockDb = async (): Promise<TableData> => {
  if (!currentTableData) {
    currentTableData = await getInitialTableData();
  }
  return currentTableData;
};

/**
 * simulate request to update a cell value in the database
 * @param rowId
 * @param columnId 
 * @param newValue 
 * @returns Promise<TableData> - the updated table data after the change
 */
export const updateCellValueInDb = async (
  rowId: string,
  columnId: string,
  newValue: any
): Promise<TableData> => {
  await new Promise((resolve) => setTimeout(resolve, 300)); 
  const rowIndex = currentTableData.data.findIndex((row) => row.id === rowId);

  if (rowIndex === -1) {
    console.warn(`Row with ID ${rowId} not found in mock database.`);
    return currentTableData; 
  }

  const updatedData = currentTableData.data.map((row, index) => {
    if (index === rowIndex) {
      return {
        ...row,
        [columnId]: newValue,
      };
    }
    return row;
  });

  //updte the "db"
  currentTableData = {
    ...currentTableData,
    data: updatedData,
  };

  return currentTableData;
};
