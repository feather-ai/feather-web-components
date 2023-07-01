import React, { useEffect } from "react";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";
import { BaseProps } from "../../utils/typeUtils";
import DisplayCard from "./DisplayCard";

export type ListItemsType = {
  item: string;
  selected: boolean;
};

export type ListSelectMultiProps = Omit<
  BaseProps,
  "masterStateCopy" | "setMasterState"
> & {
  list: ListItemsType[];
  initSelectedOptions: { [index: number]: boolean };
  setSelectedOptions: (
    fileIndex: number,
    updatedIndexes: { [index: number]: boolean }
  ) => void;
  fileIndex?: number;
};

const ListSelectMulti: React.FC<ListSelectMultiProps> = ({
  title,
  description,
  list,
  fileIndex,
  initSelectedOptions,
  setSelectedOptions,
}) => {
  const componentFileIndex = fileIndex || 0;

  const [internalOptionsBoolIndexObj, setInternalOptionsBoolIndexObj] =
    React.useState(initSelectedOptions);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedOptionsBoolIndexObj = {
      ...internalOptionsBoolIndexObj,
      [parseInt(event.target.name)]: event.target.checked,
    };

    setInternalOptionsBoolIndexObj(updatedOptionsBoolIndexObj);
    setSelectedOptions &&
      setSelectedOptions(componentFileIndex, updatedOptionsBoolIndexObj);
  };

  useEffect(() => {
    const allTrue = Object.keys(internalOptionsBoolIndexObj).every(
      (k) => internalOptionsBoolIndexObj[parseInt(k)]
    );
    setAllState(allTrue);
  }, [internalOptionsBoolIndexObj]);

  const [allState, setAllState] = React.useState(false);

  const toggleAll = () => {
    const newObjState = Object.keys(internalOptionsBoolIndexObj).reduce<{
      [index: number]: boolean;
    }>((acc, curr) => {
      acc[curr] = !allState;
      return acc;
    }, {});

    setInternalOptionsBoolIndexObj(newObjState);
    setSelectedOptions && setSelectedOptions(componentFileIndex, newObjState);
    setAllState(!allState);
  };

  return (
    <>
      <DisplayCard title={title} description={description}>
        <FormControl component="fieldset" className="w-100">
          {/* {title && <FormLabel component="legend">{title}</FormLabel>} */}
          <FormControlLabel
            control={
              <Checkbox checked={allState} onChange={toggleAll} name="All" />
            }
            label="All"
          />{" "}
          <div className="divider" />
          <FormGroup>
            {list.map((option, i) => {
              return (
                <FormControlLabel
                  key={"option" + i}
                  control={
                    <Checkbox
                      checked={internalOptionsBoolIndexObj[i]}
                      onChange={handleChange}
                      name={i.toString()}
                    />
                  }
                  label={option.item}
                />
              );
            })}
          </FormGroup>
        </FormControl>
      </DisplayCard>
    </>
  );
};

export default ListSelectMulti;
