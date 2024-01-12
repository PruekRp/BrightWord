"use client"
import { FC, ReactNode, useState } from "react";

export type dropDownOptions = { label: string; onClick(): void }[];

interface Props {
  options: dropDownOptions;
  head: ReactNode;
}

const DropdownOptions: FC<Props> = ({ head, options }): JSX.Element => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <button
      onBlur={() => setShowOptions(false)}
      onMouseDown={() => setShowOptions(!showOptions)}
      className="relative"
    >
      {head}
      {showOptions && (
        <div className="min-w-max absolute top-full mt-4 right-2 z-40 border-2 text-black bg-white ">
          <ul className="p-3 space-y-3">
            {options.map(({ label, onClick }, index) => {
              return (
                <li
                  className="text-dark bg-white"
                  key={label + index}
                  onMouseDown={onClick}
                >
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </button>
  );
};

export default DropdownOptions;
