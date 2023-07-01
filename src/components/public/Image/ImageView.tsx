import { Grid } from "@material-ui/core";
import ScrollableSelector from "../../internal/ScrollableSelector";
import React, { useState, useEffect } from "react";
import { BaseProps } from "../../../utils/typeUtils";
import DisplayCard from "../../internal/DisplayCard";
import TwoCardComponentContainer from "../../internal/TwoCardComponent";

type Schema = {
  data: string;
  text: string;
  name: string;
};

export type ImageViewProps = BaseProps & {
  images: Schema[];
};

const ImageView: React.FC<ImageViewProps> = ({
  name,
  step,
  index,
  title,
  description,
  images,
  masterStateCopy,
  setMasterState,
}) => {
  const data = images.map((image) => image.data);
  const texts = images.map((image) => image.text || "");
  const filenames = images.map((image, i) =>
    image.name ? image.name : `Image ${i + 1}`
  );

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const handleNewImageSelect = (imageIndex: number) => {
    setSelectedImage(imageIndex);
  };

  const componentFilenames =
    filenames ||
    Array(images.length)
      .fill("")
      .map((_, i) => `Image ${i + 1}`);

  useEffect(() => {
    const fullState = { name, images };
    try {
      const currMasterState = masterStateCopy;
      currMasterState[step][index].input = fullState;
      setMasterState(currMasterState);
      console.log("in Image.View. currMasterState:", currMasterState);
    } catch {
      console.log(
        "unable to update Image.View - waiting for global state propagation"
      );
    }
  }, []);

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
            <DisplayCard title={componentFilenames[selectedImage]}>
              <img
                key={`textbox-${selectedImage}`}
                className="mb-3 w-100"
                src={data[selectedImage]}
              />
              {texts && texts[selectedImage]}
            </DisplayCard>
          </Grid>
        </TwoCardComponentContainer>
      </DisplayCard>
    </>
  );
};

export default ImageView;
