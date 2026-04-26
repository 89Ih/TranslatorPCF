import * as React from "react";
import { Button, Tooltip } from "@fluentui/react-components";
import { Dismiss12Regular } from "@fluentui/react-icons";


interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  className: any;
  option: string;
  index: number;
  comboId: string;
  onRemove: (option: string, index: number) => void;
}

const TagItem: React.FC<Props> = ({ option, index, comboId, onRemove ,className}) => {
  return (
    <li>
    <Tooltip content={option} relationship={"label"}>
      <Button
        className={className}
        size="small"
        shape="circular"
        appearance="outline"
        icon={<Dismiss12Regular />}
        iconPosition="after"
        onClick={() => onRemove(option, index)}
        id={`${comboId}-remove-${index}`}
        aria-labelledby={`${comboId}-remove ${comboId}-remove-${index}`}
      >
        {option.slice(0, 8) + "..."}
      </Button>
      </Tooltip>
    </li>
  );
};

export default TagItem;