import React, { useState } from "react";
import ListSelectMultiWrapper, {
  ListSelectMultiWrapperProps,
} from "../components/public/List/ListSelectMultiWrapper";

export default {
  title: "Components/ListSelectMultiWrapper",
  component: ListSelectMultiWrapper,
};

const props: Partial<ListSelectMultiWrapperProps> = {
  step: 0,
  index: 0,
  name: "mySelectMulti",
  items: [
    { item: "Red", selected: true },
    { item: "Blue", selected: false },
    { item: "Green", selected: true },
  ],
};

const Template = (props: ListSelectMultiWrapperProps) => {
  const [state, setState] = useState([[{ cache: {}, input: [] }]]);

  return (
    <>
      <ListSelectMultiWrapper
        {...props}
        masterStateCopy={state}
        setMasterState={setState}
      />
    </>
  );
};

export const WithoutTitleDescription = Template.bind({});
WithoutTitleDescription.args = props;

export const WithTitleDescription = Template.bind({});
WithTitleDescription.args = {
  ...props,
  title: "Select multiple colours",
  description: "Here's a description!",
};
