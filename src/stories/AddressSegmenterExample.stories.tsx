import React from "react";

import AddressSegmenterExample from "../pages/AddressSegmenterExample";

export default {
  title: "Pages/AddressSegmenterExample",
  component: AddressSegmenterExample,
};

const args = {
  environment: "web",
};
const Template = (args) => {
  return <AddressSegmenterExample {...args} />;
};

export const WebUI = Template.bind({});
WebUI.args = args;

export const LocalUI = Template.bind({});
LocalUI.args = { environment: "local" };
