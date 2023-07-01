import {
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import React from "react";

type DropdownProps = {
  title?: string;
  list: string[];
  fileIndex?: number;
  initSelectedIndex?: number;
  setSelectedIndex?: (fileIndex: number, newValueIndex: number) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
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

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    // setSelected(event.target.value as string);
    const selectedIndex = parseInt(event.target.value as string);
    setInternalSelectedIndex(selectedIndex);
    setSelectedIndex && setSelectedIndex(componentFileIndex, selectedIndex);
  };
  return (
    <FormControl>
      <Select
        value={internalSelectedIndex}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="" disabled>
          Select Option
        </MenuItem>
        {list.map((option, index) => (
          <MenuItem key={`option-${index}`} value={index}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {title && <FormHelperText>{title}</FormHelperText>}
    </FormControl>
  );
};

export default Dropdown;
