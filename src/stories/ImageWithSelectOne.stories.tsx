import React, { useState } from "react";

import ImageWithSelectOne, {
  ImageWithSelectOneProps,
} from "../components/public/Image/ImageWithSelectOne";

export default {
  title: "Components/ImageWithSelectOne",
  component: ImageWithSelectOne,
};

const imageUrls = [
  "https://images1.westend61.de/0001012337pw/alsatian-dog-catching-frisbee-ISF18166.jpg",
  "https://pbs.twimg.com/media/DCnBDANUIAAdMEQ?format=jpg&name=large",
  "https://www.thedailymeal.com/sites/default/files/story/eating%20pizza-iStock-ThinkstockPhotos-470336604.jpg",
];
const listForEachImage = [
  ["Dog", "Frisbee", "Person", "Tree"],
  ["Faucet", "Cat", "Bottle", "Sponge", "Gloves", "Sink"],
  ["People", "Box", "Pizza", "Sofa"],
];

let images = [
  {
    name: "",
    data: imageUrls[0],
    attributes: listForEachImage[0],
    selectedIndex: 0,
  },
  {
    name: "",
    data: imageUrls[1],
    attributes: listForEachImage[1],
    selectedIndex: 1,
  },
  {
    name: "",
    data: imageUrls[2],
    attributes: listForEachImage[2],
    selectedIndex: 2,
  },
];

const props: Partial<ImageWithSelectOneProps> = {
  step: 0,
  index: 0,
  name: "myImageSelectOne",
  images,
  style: "radio",
};

const Template: React.FC<ImageWithSelectOneProps> = (props) => {
  const [state, setState] = useState([[{ cache: {}, input: [] }]]);

  return (
    <ImageWithSelectOne
      {...props}
      masterStateCopy={state}
      setMasterState={setState}
    />
  );
};

export const WithRadio = Template.bind({});
WithRadio.args = props;

images = [
  {
    data: imageUrls[0],
    attributes: listForEachImage[0],
    selectedIndex: 0,
    name: "myImage1.jpg",
  },
  {
    data: imageUrls[1],
    attributes: listForEachImage[1],
    selectedIndex: 1,
    name: "myCustomImage2.png",
  },
  {
    data: imageUrls[2],
    attributes: listForEachImage[2],
    selectedIndex: 2,
    name: "lol.gif",
  },
];

export const WithFilenames = Template.bind({});
WithFilenames.args = {
  ...props,
  images,
};

export const WithDropdownAndTitleDescription = Template.bind({});
WithDropdownAndTitleDescription.args = {
  ...props,
  title: "Select an object from the image",
  description: "Select an object from the image",
  style: "dropdown",
};
