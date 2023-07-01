import ListSelectMulti, { ListItemsType } from "../../internal/ListSelectMulti";
import React, { useEffect, useState } from "react";
import { BaseProps } from "../../../utils/typeUtils";

export type ListSelectMultiWrapperProps = BaseProps & {
  items: ListItemsType[];
};

const ListSelectMultiWrapper: React.FC<ListSelectMultiWrapperProps> = ({
  step,
  index,
  name,
  items,
  title,
  description,
  masterStateCopy,
  setMasterState,
}) => {
  const initOptionsBoolIndexObj = items.reduce<{ [index: number]: boolean }>(
    (acc, curr, index) => {
      acc[index] = curr.selected;
      return acc;
    },
    {}
  );

  const [selectedIndex, setSelectedIndex] = useState(initOptionsBoolIndexObj);

  const handleNewOptionSelect = (
    _: number,
    updatedIndexes: { [index: number]: boolean }
  ) => {
    setSelectedIndex(updatedIndexes);
    console.log("Updated checkbox list is:", updatedIndexes);
  };

  useEffect(() => {
    const schemaAttributeArr: ListItemsType[] = items.map((item, i) => {
      const itemName = item.item;
      const selected = selectedIndex[i];
      return {
        item: itemName,
        selected,
      };
    });
    const fullArr = schemaAttributeArr;
    const fullState = { name, items: fullArr };
    try {
      const currMasterState = masterStateCopy;
      currMasterState[step][index].input = fullState;
      setMasterState(currMasterState);
      console.log(
        "in List.SelectMulti (Wrapper). currMasterState:",
        currMasterState
      );
    } catch {
      console.log(
        "unable to update List.SelectMulti (Wrapper) - waiting for global state propagation"
      );
    }
  }, [selectedIndex]);

  return (
    <ListSelectMulti
      title={title}
      description={description}
      list={items}
      initSelectedOptions={initOptionsBoolIndexObj}
      setSelectedOptions={handleNewOptionSelect}
    />
  );
};

export default ListSelectMultiWrapper;
