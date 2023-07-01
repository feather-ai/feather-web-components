import React, { useState } from "react";

import ImageView, {
  ImageViewProps,
} from "../components/public/Image/ImageView";

export default {
  title: "Components/ImageView",
  component: ImageView,
};

const imageUrls = [
  "https://images1.westend61.de/0001012337pw/alsatian-dog-catching-frisbee-ISF18166.jpg",
  "https://pbs.twimg.com/media/DCnBDANUIAAdMEQ?format=jpg&name=large",
  "https://www.thedailymeal.com/sites/default/files/story/eating%20pizza-iStock-ThinkstockPhotos-470336604.jpg",
];

let images = [
  { data: imageUrls[0], name: "", text: "" },
  { data: imageUrls[1], name: "", text: "" },
  { data: imageUrls[2], name: "", text: "" },
];

const props: Partial<ImageViewProps> = {
  name: "myImageView",
  step: 0,
  index: 0,
  images,
};

const Template: React.FC<ImageViewProps> = (props) => {
  const [state, setState] = useState([[{ cache: {}, input: [] }]]);

  return (
    <ImageView {...props} masterStateCopy={state} setMasterState={setState} />
  );
};

export const NoFilenames = Template.bind({});
NoFilenames.args = {
  ...props,
};

images = [
  { data: imageUrls[0], name: "", text: "Image Caption 1" },
  { data: imageUrls[1], name: "", text: "Image Caption 2" },
  { data: imageUrls[2], name: "", text: "Image Caption 3" },
];

export const WithText = Template.bind({});
WithText.args = {
  ...props,
  images,
};

images = [
  { data: imageUrls[0], name: "myImage1.jpg", text: "" },
  { data: imageUrls[1], name: "myCustomImage2.png", text: "" },
  { data: imageUrls[2], name: "lol.gif", text: "" },
];

export const WithFilenames = Template.bind({});
WithFilenames.args = {
  ...props,
  images,
};
