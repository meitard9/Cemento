# Cemento


### Additional fields added to ColumnSchema:

```ts
export interface ColumnSchema {
  id: string;
  ordinalNo: number;
  title: string;
  type: "string" | "number" | "boolean" | "selection";
  width?: number;
  options?: string[]; // Used for 'selection' type columns
  isEditable?: boolean; //if not exist the default is true
}
```
`options` and `isEditable` added to the column schema because both are a static info about the column.
Knowing them alow this componenet to be more reusable in more cases.

### Simulate DB
I wanted this project to be closer to realworld, so i created service called `mockDatabase.ts` which contains the mock data and fake fetch calls on init and on cell update.
This help the components be ready do work with real db.

### How to run the project
```bash
  npm install
  npm run dev
```
