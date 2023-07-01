import { Grid, TextField } from "@material-ui/core";
import ScrollableSelector from "../../internal/ScrollableSelector";
import React, { useEffect, useState } from "react";
import { BaseProps } from "../../../utils/typeUtils";
import DisplayCard from "../../internal/DisplayCard";
import TwoCardComponentContainer from "../../internal/TwoCardComponent";
import _ from "lodash";

type Schema = {
  data: string;
  name: string;
  text: string;
};

export type ImageWithTextInProps = BaseProps & {
  images: Schema[];
  maxChars: number | null;
};

const ImageWithTextIn: React.FC<ImageWithTextInProps> = ({
  step,
  index,
  name,
  title,
  description,
  images,
  maxChars,
  masterStateCopy,
  setMasterState,
}) => {
  const defaultText = images.map((image) => image.text || "");
  const data = images.map((image) => image.data);
  const filenames = images.map((image, i) =>
    image.name ? image.name : `Image ${i + 1}`
  );

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const handleNewImageSelect = (imageIndex: number) => {
    setSelectedImage(imageIndex);
  };

  const labels: string[] = [];
  for (let i = 0; i < images.length; i++) {
    let label = "";
    if (title) {
      label += title;
    }
    if (maxChars) {
      label += ` (Maximum Length: ${maxChars})`;
    }
    labels.push(label);
  }

  const [enteredText, setEnteredText] = useState(defaultText);

  useEffect(() => {
    if (!_.isEqual(defaultText, enteredText)) {
      setEnteredText(defaultText);
    }
  }, [defaultText]);

  const handleImageSwitch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    imageIndex: number
  ) => {
    event.preventDefault();
    const newText = event.target.value;
    const currState = enteredText;
    currState[imageIndex] = newText;
    setEnteredText([...currState]);
  };

  useEffect(() => {
    const fullArr: Schema[] = images.map((image, i) => ({
      data: image.data,
      text: enteredText[i],
      name: filenames[i],
    }));
    const fullState = { name, images: fullArr };
    try {
      const currMasterState = masterStateCopy;
      currMasterState[step][index].input = fullState;
      setMasterState(currMasterState);
      console.log("in Image.WithTextIn. currMasterState:", currMasterState);
    } catch {
      console.log(
        "unable to update Image.WithTextIn - waiting for global state propagation"
      );
    }
  }, [enteredText]);

  const componentFilenames =
    filenames ||
    Array(images.length)
      .fill("")
      .map((_, i) => `Image ${i + 1}`);

  return (
    <div>
      <DisplayCard title={title} description={description}>
        <TwoCardComponentContainer>
          <Grid item md={5}>
            <ScrollableSelector
              content={data}
              type="image"
              title="Images"
              filenames={componentFilenames}
              handleNewFileSelect={handleNewImageSelect}
            />
          </Grid>
          <Grid item md={5}>
            <DisplayCard title={componentFilenames[selectedImage]}>
              <TextField
                key={`textbox-${selectedImage}`}
                className="mb-3"
                multiline
                inputProps={{
                  maxLength: maxChars,
                }}
                fullWidth
                onChange={(e) => handleImageSwitch(e, selectedImage)}
                id="standard-basic"
                label={labels[selectedImage]}
                value={enteredText[selectedImage]}
                variant="outlined"
              />
            </DisplayCard>
          </Grid>
        </TwoCardComponentContainer>
      </DisplayCard>
    </div>
  );
};

export default ImageWithTextIn;
