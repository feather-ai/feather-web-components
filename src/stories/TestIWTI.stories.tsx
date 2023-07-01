import React, { useState } from "react";

import ImageWithTextIn, {
  ImageWithTextInProps,
} from "../components/public/Image/ImageWithTextIn";
import { TextField } from "@material-ui/core";

export default {
  title: "Components/TestImageWithTextIn",
  component: ImageWithTextIn,
};

const imageUrls = [
  "https://images1.westend61.de/0001012337pw/alsatian-dog-catching-frisbee-ISF18166.jpg",
  "https://pbs.twimg.com/media/DCnBDANUIAAdMEQ?format=jpg&name=large",
  "https://www.thedailymeal.com/sites/default/files/story/eating%20pizza-iStock-ThinkstockPhotos-470336604.jpg",
];

const images = [
  { data: imageUrls[0], text: "Hello1", name: "1.jog" },
  { data: imageUrls[1], text: "Hello2", name: "2.on" },
];

const reduceArrayForView = <T extends unknown>(arr: T[]) => {
  return `[${arr.reduce((acc, curr, i) => {
    return i == 0 ? (acc = `"${curr}"`) : (acc += ", " + `"${curr}"`);
  }, "")}]`;
};

const Template: React.FC<ImageWithTextInProps> = () => {
  const [state, setState] = useState([[{ cache: {}, input: [] }]]);

  const [imageWithTextInState, setImageWithTextInState] = useState({
    images: [
      {
        name: "cat.jpg",
        data: "<VALID NUMPY IMAGE ARRAY (HxWx3)>",
        text: "A <MASK> sitting in a sink",
      },
      {
        name: "dog.png",
        data: "<VALID NUMPY IMAGE ARRAY (HxWx3)>",
        text: "A dog <MASK> in a field",
      },
    ],
    title: "Enter <MASK> tokens",
    maxChars: 256,
    description: "Enter masked tokens for multimodal language modelling",
    latestOutputTextType: "array",
  });

  const displayForImageWithTextInDefaultText = () => {
    if (imageWithTextInState.latestOutputTextType === "array") {
      return reduceArrayForView(
        imageWithTextInState.images.map((doc) => doc.text)
      );
    } else {
      return imageWithTextInState.images[0].text;
    }
  };

  const handleImageWithTextInStateDefaultTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let enteredText: string[];
    const currState = { ...imageWithTextInState };
    try {
      enteredText = JSON.parse(event.target.value);
      currState.images[0].text = enteredText[0];
      currState.images[1].text = enteredText[1];
      setImageWithTextInState({
        ...currState,
        latestOutputTextType: "array",
      });
    } catch (err) {
      // if caught, then we have a string.
      currState.images[0].text = event.target.value;
      currState.images[1].text = event.target.value;
      setImageWithTextInState({
        ...currState,
        latestOutputTextType: "string",
      });
    }
  };

  return (
    <>
      <TextField
        value={displayForImageWithTextInDefaultText()}
        onChange={handleImageWithTextInStateDefaultTextChange}
        variant="outlined"
        fullWidth
      />

      <ImageWithTextIn
        {...imageWithTextInState}
        step={0}
        index={0}
        name="myImageWithTextIn"
        maxChars={20}
        masterStateCopy={state}
        setMasterState={setState}
      />
    </>
  );
};

export const TextboxesWithDefaults = Template.bind({});
TextboxesWithDefaults.args = {};
