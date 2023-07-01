import { Grid } from "@material-ui/core";
import ScrollableSelector from "../../internal/ScrollableSelector";
import React, { useEffect, useState } from "react";
import { BaseProps } from "../../../utils/typeUtils";
import ListSelectOne from "../../internal/ListSelectOne";
import DisplayCard from "../../internal/DisplayCard";
import TwoCardComponentContainer from "../../internal/TwoCardComponent";

type Schema = {
  attributes: string[];
  data: string; // need to support numpy
  name: string;
  selectedIndex: number;
};

export type ImageWithSelectOneProps = BaseProps & {
  style: "radio" | "dropdown";
  images: Schema[];
};

const ImageWithSelectOne: React.FC<ImageWithSelectOneProps> = ({
  step,
  index,
  name,
  title,
  description,
  images,
  style,
  masterStateCopy,
  setMasterState,
}) => {
  const data = images.map((image) => image.data);
  const filenames = images.map((image, i) =>
    image.name ? image.name : `Image ${i + 1}`
  );
  const listForEachImage = images.map((image) => image.attributes);
  const selectedIndexes = images.map((image) => image.selectedIndex);

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const handleNewImageSelect = (imageIndex: number) => {
    setSelectedImage(imageIndex);
  };

  const [selectedIndex, setSelectedIndex] = useState(selectedIndexes);

  const handleImageSwitch = (imageIndex: number, newValueIndex: number) => {
    const currState = selectedIndex;
    currState[imageIndex] = newValueIndex;
    setSelectedIndex([...currState]);
  };

  useEffect(() => {
    const fullArr: Schema[] = images.map((image, i) => ({
      data: image.data,
      name: image.name,
      attributes: listForEachImage[i],
      selectedIndex: selectedIndex[i],
    }));
    const fullState = { name, images: fullArr };
    try {
      const currMasterState = masterStateCopy;
      currMasterState[step][index].input = fullState;
      setMasterState(currMasterState);
      console.log("in Image.WithSelectOne. currMasterState:", currMasterState);
    } catch {
      console.log(
        "unable to update Image.WithSelectOne - waiting for global state propagation"
      );
    }
  }, [selectedIndex]);

  return (
    <>
      <DisplayCard title={title} description={description}>
        <TwoCardComponentContainer>
          <Grid item md={5}>
            <ScrollableSelector
              content={data}
              type="image"
              title="Images"
              filenames={filenames}
              handleNewFileSelect={handleNewImageSelect}
            />
          </Grid>
          <Grid item md={5}>
            <ListSelectOne
              key={`selectionList-${selectedImage}`}
              title={`Image ${selectedImage + 1}`}
              style={style}
              fileIndex={selectedImage}
              selectedIndex={selectedIndex[selectedImage]}
              setSelectedIndex={handleImageSwitch}
              items={listForEachImage[selectedImage]}
            />
          </Grid>
        </TwoCardComponentContainer>
      </DisplayCard>
    </>
  );
};

export default ImageWithSelectOne;
