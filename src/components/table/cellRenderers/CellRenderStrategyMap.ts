import type { CellRenderStrategy } from "./CellRendererTypes";
import StringNumberCell from './StringNumberCell'; 
import BooleanCell from './BooleanCell';    
import SelectionCell from './SelectionCell';  

export const CellRenderStrategyMap: Record<string, CellRenderStrategy> = {
string: { Component: StringNumberCell },
number: { Component: StringNumberCell },
boolean: { Component: BooleanCell },
selection: { Component: SelectionCell },

};

export const getCellRenderStrategy = (type: string): CellRenderStrategy => {
  return CellRenderStrategyMap[type] || StringNumberCell//StringNumberCell is the default;
};
