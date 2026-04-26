import * as React from "react";
import { FC } from "react";
import {FluentProvider,webLightTheme,ComboboxProps,useId} from "@fluentui/react-components";
import { IInputs } from "./generated/ManifestTypes";
import { result } from "./static/data";

import MultiSelectCombobox from "./components/MultiSelectCombobox";
import SelectedTagsList from "./components/SelectedTagsList";
import { useSelectorStyles } from "./components/styles";


export interface ISelector {
  context: ComponentFramework.Context<IInputs>;
  updateValue :(v:string)=> void; 
}

const Selector: FC<ISelector> = (props) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const styles = useSelectorStyles();

  const comboId = useId("combo-multi");
  const selectedListId = `${comboId}-selection`;

  const selectedListRef = React.useRef<HTMLUListElement>(null);
  const comboboxInputRef = React.useRef<HTMLInputElement>(null);

  const onSelect: ComboboxProps["onOptionSelect"] = (_, data) => {
    setSelectedOptions(data.selectedOptions);
    props.updateValue(selectedOptions.join(";"))

  };

  const handleRemove = React.useCallback((option: string, index: number) => {
    setSelectedOptions((prev) => prev.filter((o) => o !== option));
    props.updateValue(selectedOptions.join(";"))
    const indexToFocus = index === 0 ? 1 : index - 1;
    const next = selectedListRef.current?.querySelector(
      `#${comboId}-remove-${indexToFocus}`
    );

    if (next) {
      (next as HTMLButtonElement).focus();
    } else {
      comboboxInputRef.current?.focus();
    }
  },[props.updateValue]);

  const labelledBy =
    selectedOptions.length > 0 ? `${comboId} ${selectedListId}` : comboId;
React.useEffect(()=>{
  props.updateValue(selectedOptions.length > 0 ? selectedOptions.join(";"): "")
},[props.updateValue])
  return (
    <FluentProvider theme={webLightTheme} className="w-full">
      <main className="w-full">
        <MultiSelectCombobox
          options={result.map((r) => r.value)}
          selectedOptions={selectedOptions}
          onSelect={onSelect}
          labelledBy={labelledBy}
          comboboxRef={comboboxInputRef}
        />

        <SelectedTagsList
          selectedOptions={selectedOptions}
          comboId={comboId}
          listId={selectedListId}
          styles={styles}
          listRef={selectedListRef}
          onRemove={handleRemove}
        />
      </main>
    </FluentProvider>
  );
};

export default Selector;