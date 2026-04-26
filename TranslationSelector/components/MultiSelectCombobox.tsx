import * as React from "react";
import {
  Combobox,
  Option,
  ComboboxProps,
} from "@fluentui/react-components";

interface Props {
  options: string[];
  selectedOptions: string[];
  onSelect: ComboboxProps["onOptionSelect"];
  labelledBy: string;
  comboboxRef: React.RefObject<HTMLInputElement>;
}

const MultiSelectCombobox: React.FC<Props> = ({
  options,
  selectedOptions,
  onSelect,
  labelledBy,
  comboboxRef,
}) => {
  return (
    <Combobox
      className="w-full"
      aria-labelledby={labelledBy}
      multiselect
      placeholder="Select one or more animals"
      selectedOptions={selectedOptions}
      onOptionSelect={onSelect}
      ref={comboboxRef}
    >
      {options.map((value) => (
        <Option key={value}>{value}</Option>
      ))}
    </Combobox>
  );
};

export default MultiSelectCombobox;