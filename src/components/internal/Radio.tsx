import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import React from "react";

type RadioComponentProps = {
  title?: string;
  list: string[];
  fileIndex?: number;
  initSelectedIndex?: number;
  setSelectedIndex?: (fileIndex: number, newValueIndex: number) => void;
};

const RadioComponent: React.FC<RadioComponentProps> = ({
  title,
  list,
  fileIndex,
  initSelectedIndex,
  setSelectedIndex,
}) => {
  const componentFileIndex = fileIndex || 0;

  const [internalSelectedIndex, setInternalSelectedIndex] = React.useState(
    initSelectedIndex || 0
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedIndex = parseInt((event.target as HTMLInputElement).value);
    setInternalSelectedIndex(selectedIndex);
    setSelectedIndex && setSelectedIndex(componentFileIndex, selectedIndex);
  };

  return (
    <FormControl component="fieldset">
      {/* {title && <FormLabel component="legend">{title}</FormLabel>} */}
      <RadioGroup
        aria-label={title || "Radio Group"}
        value={internalSelectedIndex}
        onChange={handleChange}
      >
        {list.map((option, index) => (
          <FormControlLabel
            key={`option-${index}`}
            value={index}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioComponent;
