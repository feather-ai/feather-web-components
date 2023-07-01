import { Grid } from "@material-ui/core";
import ScrollableImageSelector from "./ScrollableImageSelector";
import CheckboxObjectList from "./CheckboxObjectList";
import React, { useState } from "react";

export type ScrollableImageSelectorWithCheckboxObjectListProps = {
  imageUrls: string[];
  objList: string[][]; // List of lists. Each nested list contains the detected objects (via an object detection model) in an image
};
const ScrollableImageSelectorWithCheckboxObjectList: React.FC<ScrollableImageSelectorWithCheckboxObjectListProps> =
  ({ imageUrls, objList }) => {
    const objObject = objList.map((ol) => {
      return ol.reduce<{ [key: string]: boolean }>((acc, curr) => {
        acc[curr] = true;
        return acc;
      }, {});
    });
    const [allObjObjectState, setAllObjObjectState] = useState(objObject);
    const [selectedImage, setSelectedImage] = useState<number>();

    const handleNewImageSelect = (imageIndex: number) => {
      setSelectedImage(imageIndex);
    };

    const handleObjectSelection = (
      objectIndex: number,
      newObjObject: { [key: string]: boolean }
    ) => {
      const currState = allObjObjectState;
      currState[objectIndex] = newObjObject;
      setAllObjObjectState(currState);
    };

    return (
      <>
        <Grid item md={5}>
          <ScrollableImageSelector
            images={imageUrls}
            handleNewImageSelect={handleNewImageSelect}
          />
        </Grid>
        <Grid item md={5} className="d-flex w-100">
          {selectedImage || selectedImage === 0 ? (
            <CheckboxObjectList
              objObject={allObjObjectState[selectedImage]}
              handleObjectSelection={handleObjectSelection}
              imageIndex={selectedImage}
            />
          ) : (
            <span className="align-self-center">
              Select an image from the left
            </span>
          )}
        </Grid>
      </>
    );
  };

export default ScrollableImageSelectorWithCheckboxObjectList;
