import React, { useState } from "react";
import TextView, { TextViewProps } from "../components/public/Text/TextView";

export default {
  title: "Components/TextView",
  component: TextView,
};

const props: Partial<TextViewProps> = {
  step: 0,
  index: 0,
  name: "myTextView",
  title: "Note!",
  text: ["Make sure the inputs you provide to the model... Lipsum"],
};

const Template = (props: TextViewProps) => {
  const [state, setState] = useState([[{ cache: {}, input: [] }]]);

  return (
    <>
      <div style={{ width: "50%", margin: "auto" }}>
        <TextView
          {...props}
          masterStateCopy={state}
          setMasterState={setState}
        />
      </div>
    </>
  );
};

export const TextViewWithoutTitle = Template.bind({});
TextViewWithoutTitle.args = { ...props, title: undefined };

export const TextViewWithTitle = Template.bind({});
TextViewWithTitle.args = props;
