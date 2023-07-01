import { Grid } from "@material-ui/core";
import ScrollableSelector from "../../internal/ScrollableSelector";
import React, { useEffect, useState } from "react";
import DisplayCard from "../../internal/DisplayCard";
import { BaseProps } from "../../../utils/typeUtils";
import ListSelectMulti, { ListItemsType } from "../../internal/ListSelectMulti";
import TwoCardComponentContainer from "../../internal/TwoCardComponent";

type Schema = {
  attributes: ListItemsType[];
  data: string; // need to support numpy
  name: string;
};

export type ImageWithSelectMultiProps = BaseProps & {
  images: Schema[];
};

const ImageWithSelectMulti: React.FC<ImageWithSelectMultiProps> = ({
  step,
  index,
  name,
  title,
  description,
  images,
  masterStateCopy,
  setMasterState,
}) => {
  const lists = images.map((image) => image.attributes);
  const data = images.map((image) => image.data);
  const filenames = images.map((image, i) =>
    image.name !== "None" ? image.name : `Image ${i + 1}`
  );

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const handleNewImageSelect = (imageIndex: number) => {
    setSelectedImage(imageIndex);
  };

  // This creates an array of objects.
  // Each object in this array represents the checkbox list for each image
  // So array.length == images.length
  // Each object has as many k,v pairs as there are 'options' in the list for that particular image
  // k is the index of the option, and v is the boolean value
  const initOptionsBoolIndexObj = lists.map((list) =>
    list.reduce<{ [index: number]: boolean }>((acc, curr, index) => {
      acc[index] = curr.selected;
      return acc;
    }, {})
  );

  const [selectedOptions, setSelectedOptions] = useState(
    initOptionsBoolIndexObj
  );

  const handleImageSwitch = (
    imageIndex: number,
    updatedIndexes: { [index: number]: boolean }
  ) => {
    const currState = selectedOptions;
    currState[imageIndex] = updatedIndexes;
    setSelectedOptions([...currState]);
  };

  useEffect(() => {
    const schemaAttributeArr: ListItemsType[][] = lists.map((list, i) => {
      const oneAttributeArr: ListItemsType[] = list.map((item, j) => {
        const itemName = item.item;
        const selected = selectedOptions[i][j];
        return { item: itemName, selected };
      });
      return oneAttributeArr;
    });
    const fullArr: Schema[] = images.map((image, i) => ({
      data: image.data,
      name: image.name,
      attributes: schemaAttributeArr[i],
    }));
    const fullState = { name, images: fullArr };
    try {
      const currMasterState = masterStateCopy;
      currMasterState[step][index].input = fullState;
      setMasterState(currMasterState);
      console.log(
        "in Image.WithSelectMulti. currMasterState:",
        currMasterState
      );
    } catch {
      console.log(
        "unable to update Image.WithSelectMulti - waiting for global state propagation"
      );
    }
  }, [selectedOptions]);

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
            <ListSelectMulti
              step={step}
              index={index}
              name={"fromImageSelectMulti"}
              key={`selectionList-${selectedImage}`}
              title={`Image ${selectedImage + 1}`}
              fileIndex={selectedImage}
              initSelectedOptions={selectedOptions[selectedImage]}
              setSelectedOptions={handleImageSwitch}
              list={lists[selectedImage]}
            />
          </Grid>
        </TwoCardComponentContainer>
      </DisplayCard>
    </>
  );
};

export default ImageWithSelectMulti;
