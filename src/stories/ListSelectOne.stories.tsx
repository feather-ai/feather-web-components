import React, { useState } from "react";

import ListSelectOneWrapper, {
  ListSelectOneWrapperProps,
} from "../components/public/List/ListSelectOneWrapper";

export default {
  title: "Components/ListSelectOneWrapper",
  component: ListSelectOneWrapper,
};

const props: Partial<ListSelectOneWrapperProps> = {
  step: 0,
  index: 0,
  name: "myListSelectOne",
  items: ["Red", "Blue", "Green"],
  style: "radio",
  selectedIndex: 0,
};

const Template = (props: ListSelectOneWrapperProps) => {
  const [state, setState] = useState([[{ cache: {}, input: [] }]]);

  return (
    <>
      <ListSelectOneWrapper
        {...props}
        masterStateCopy={state}
        setMasterState={setState}
      />
    </>
  );
};

export const Radio = Template.bind({});
Radio.args = {
  ...props,
  title: "Select a colour",
  description: "Radio button is the default if no 'style' prop is provided!",
};

export const DropdownWithoutTitleDescription = Template.bind({});
DropdownWithoutTitleDescription.args = { ...props, style: "dropdown" };
