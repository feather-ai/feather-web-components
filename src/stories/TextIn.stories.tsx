import React, { useState } from "react";
import TextIn, { TextInProps } from "../components/public/Text/TextIn";

export default {
  title: "Components/TextIn",
  component: TextIn,
};

const props: Partial<TextInProps> = {
  step: 0,
  index: 0,
  name: "myTextIn",
  title: "Enter Name",
  description: "Enter your name!",
  text: [""],
  maxChars: null,
};

const Template = (props: TextInProps) => {
  const [state, setState] = useState([[{ cache: {}, input: [] }]]);

  return (
    <>
      <div style={{ width: "50%", margin: "auto" }}>
        <TextIn {...props} masterStateCopy={state} setMasterState={setState} />
      </div>
    </>
  );
};

export const SingleTextInWithTitleAndDescription = Template.bind({});
SingleTextInWithTitleAndDescription.args = props;

export const SingleTextInWithDefault = Template.bind({});
SingleTextInWithDefault.args = { ...props, text: ["Nihir"] };

export const SingleTextInWithMaxChars = Template.bind({});
SingleTextInWithMaxChars.args = { ...props, maxChars: 20 };

const multiProps: TextInProps = {
  step: 0,
  index: 0,
  name: "myTextIn",
  title: "Captions",
  description: "Enter captions for each image",
  numInputs: 3,
  text: ["Caption 1", "Caption 2", "caption 3"],
  maxChars: null,
};

export const MultiTextInMultiDefault = Template.bind({});
MultiTextInMultiDefault.args = {
  ...multiProps,
};
