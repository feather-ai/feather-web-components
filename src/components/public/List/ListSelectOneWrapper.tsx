import ListSelectOne from "../../internal/ListSelectOne";
import React, { useEffect, useState } from "react";
import { BaseProps } from "../../../utils/typeUtils";

export type ListSelectOneWrapperProps = BaseProps & {
  items: string[];
  selectedIndex: number;
  style: "dropdown" | "radio";
};

const ListSelectOneWrapper: React.FC<ListSelectOneWrapperProps> = ({
  step,
  index,
  name,
  items,
  selectedIndex,
  style,
  title,
  description,
  masterStateCopy,
  setMasterState,
}) => {
  const [selectedIndexState, setSelectedIndex] = useState(selectedIndex);

  const handleNewOptionSelect = (_: number, newIndex: number) => {
    setSelectedIndex(newIndex);
    console.log("New selected item is:", items[newIndex]);
  };

  useEffect(() => {
    const fullState = {
      name,
      items,
      selectedIndex: selectedIndexState,
    };
    try {
      const currMasterState = masterStateCopy;
      console.log("inside ListSelectOneWrapper. Step", step, "Index", index);
      console.log(
        "pre: in List.SelectOne (Wrapper). currMasterState:",
        JSON.stringify(currMasterState)
      );
      currMasterState[step][index].input = fullState;
      setMasterState(currMasterState);
      console.log(
        "post: in List.SelectOne (Wrapper). currMasterState:",
        JSON.stringify(currMasterState)
      );
    } catch {
      console.log(
        "unable to update List.SelectOne (Wrapper) - waiting for global state propagation"
      );
    }
  }, [selectedIndexState]);

  return (
    <ListSelectOne
      title={title}
      description={description}
      items={items}
      style={style}
      selectedIndex={selectedIndexState}
      setSelectedIndex={handleNewOptionSelect}
    />
  );
};

export default ListSelectOneWrapper;
