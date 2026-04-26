import * as React from "react";
import TagItem from "./TagItem";

interface Props {
  selectedOptions: string[];
  comboId: string;
  listId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styles: any;
  listRef: React.RefObject<HTMLUListElement>;
  onRemove: (option: string, index: number) => void;
}

const SelectedTagsList: React.FC<Props> = ({
  selectedOptions,
  comboId,
  listId,
  styles,
  listRef,
  onRemove,
}) => {
  if (!selectedOptions.length) return null;

  return (
    <ul id={listId} className={styles.tagsList} ref={listRef}>
      {selectedOptions.map((option, i) => (
        <TagItem
              className={styles.button}
              key={option}
              option={option}
              index={i}
              comboId={comboId}
              onRemove={onRemove}        />
      ))}
    </ul>
  );
};

export default SelectedTagsList;