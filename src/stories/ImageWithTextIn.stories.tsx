import React, { useState } from "react";

import ImageWithTextIn, {
  ImageWithTextInProps,
} from "../components/public/Image/ImageWithTextIn";

export default {
  title: "Components/ImageWithTextIn",
  component: ImageWithTextIn,
};

const imageUrls = [
  "https://images1.westend61.de/0001012337pw/alsatian-dog-catching-frisbee-ISF18166.jpg",
  "https://pbs.twimg.com/media/DCnBDANUIAAdMEQ?format=jpg&name=large",
  "https://www.thedailymeal.com/sites/default/files/story/eating%20pizza-iStock-ThinkstockPhotos-470336604.jpg",
];

let images = [
  { data: imageUrls[0], text: "", name: "" },
  { data: imageUrls[1], text: "", name: "" },
  { data: imageUrls[2], text: "", name: "" },
];

const props: Partial<ImageWithTextInProps> = {
  step: 0,
  index: 0,
  name: "myImageWithTextIn",
  images,
  maxChars: 20,
};

const Template: React.FC<ImageWithTextInProps> = (props) => {
  const [state, setState] = useState([[{ cache: {}, input: [] }]]);
  return (
    <ImageWithTextIn
      {...props}
      masterStateCopy={state}
      setMasterState={setState}
    />
  );
};

export const BlankTextboxes = Template.bind({});
BlankTextboxes.args = {
  ...props,
};

images = [
  { data: imageUrls[0], text: "", name: "myImage1.jpg" },
  { data: imageUrls[1], text: "", name: "myCustomImage2.png" },
  { data: imageUrls[2], text: "", name: "lol.gif" },
];

export const BlankTextboxesWithFilenames = Template.bind({});
BlankTextboxesWithFilenames.args = {
  ...props,
  images,
};

export const BlankTextboxesWithTitleDescription = Template.bind({});
BlankTextboxesWithTitleDescription.args = {
  ...props,
  title: "Enter Text",
  description: "For some reason!",
};

images = [
  { data: imageUrls[0], text: "Hello 1", name: "myImage1.jpg" },
  { data: imageUrls[1], text: "Hello 2", name: "myCustomImage2.png" },
  { data: imageUrls[2], text: "Hello 3", name: "lol.gif" },
];

export const TextboxesWithDefaults = Template.bind({});
TextboxesWithDefaults.args = {
  ...props,
  images,
};
