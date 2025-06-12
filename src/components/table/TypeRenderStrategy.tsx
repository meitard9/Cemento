// import type { JSX } from "react";

//   interface RenderProps{
//     inputRef: React.RefObject<HTMLInputElement | HTMLSelectElement | null>;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     currentValue: any;
//     handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
//     handleStopEdit: () => void;
//     handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => void;
// }

// const defaultRenderStrategy = ({ inputRef, currentValue, handleInputChange, handleStopEdit, handleKeyDown }: RenderProps) => {
//     return (
//         <input
//             ref={inputRef as React.RefObject<HTMLInputElement>}
//             type="text"
//             value={currentValue !== undefined ? currentValue : ''}
//             onChange={handleInputChange}
//             onBlur={handleStopEdit}
//             onKeyDown={handleKeyDown}
//             className="cell-edit-input"
//         />
//     );
// }

// export const initialMap = new Map<string,(a:RenderProps) => JSX.Element>([
//     ['default', defaultRenderStrategy],
//     //....
// ]);
