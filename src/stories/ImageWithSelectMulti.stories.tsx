import React, { useState } from "react";

import ImageWithSelectMulti, {
  ImageWithSelectMultiProps,
} from "../components/public/Image/ImageWithSelectMulti";

export default {
  title: "Components/ImageWithSelectMulti",
  component: ImageWithSelectMulti,
};

const imageUrls = [
  "https://images1.westend61.de/0001012337pw/alsatian-dog-catching-frisbee-ISF18166.jpg",
  "https://pbs.twimg.com/media/DCnBDANUIAAdMEQ?format=jpg&name=large",
  "https://www.thedailymeal.com/sites/default/files/story/eating%20pizza-iStock-ThinkstockPhotos-470336604.jpg",
];
const lists = [
  [
    { item: "Dog", selected: true },
    { item: "Frisbee", selected: false },
    { item: "Person", selected: true },
    { item: "Tree", selected: false },
  ],
  [
    { item: "Faucet", selected: false },
    { item: "Cat", selected: false },
    { item: "Bottle", selected: false },
    { item: "Sponge", selected: false },
    { item: "Gloves", selected: false },
    { item: "Sink", selected: false },
  ],
  [
    { item: "People", selected: true },
    { item: "Box", selected: true },
    { item: "Pizza", selected: true },
    { item: "Sofa", selected: true },
  ],
];

const images = [
  {
    data: imageUrls[0],
    attributes: lists[0],
    name: "myImage1.jpg",
  },
  {
    data: imageUrls[1],
    attributes: lists[1],
    name: "myCustomImage2.png",
  },
  {
    data: imageUrls[2],
    attributes: lists[2],
    name: "lol.gif",
  },
];

const props: Partial<ImageWithSelectMultiProps> = {
  step: 0,
  index: 0,
  name: "myImageWithSelectMulti",
  images,
};

const Template: React.FC<ImageWithSelectMultiProps> = (props) => {
  const [state, setState] = useState([[{ cache: {}, input: [] }]]);

  return (
    <>
      <ImageWithSelectMulti
        {...props}
        masterStateCopy={state}
        setMasterState={setState}
      />
    </>
  );
};

export const Main = Template.bind({});
Main.args = {
  ...props,
};

export const WithTitleDescription = Template.bind({});
WithTitleDescription.args = {
  ...props,
  title: "Select your objects",
  description: "Select objects you want to condition the generator with",
};
