import React from "react";
import { Card, Container, Button } from "@material-ui/core";

import PerfectScrollbar from "react-perfect-scrollbar";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export type ScrollableImageSelectorProps = {
  images: string[];
  handleNewImageSelect: (i: number) => void;
};

const ScrollableImageSelector: React.FC<ScrollableImageSelectorProps> = ({
  images,
  handleNewImageSelect,
}) => {
  return (
    <>
      <Card className="card-box p-0 overflow-hidden">
        <div className="card-header bg-secondary">
          <div>
            <h5 className="font-size-lg mb-0 line-height-1 py-2 font-weight-bold">
              Images
            </h5>
          </div>
        </div>
        <PerfectScrollbar
          className="scroll-area-md"
          options={{ wheelPropagation: false }}
        >
          {images.map((image, i) => {
            return (
              <div key={"image_" + i}>
                <Container
                  component={Button}
                  onClick={() => handleNewImageSelect(i)}
                  className="d-flex align-items-center justify-content-between px-4 py-3 card-box-hover-rise card-box-hover rounded-lg text-center mb-4 mb-md-0 d-block"
                >
                  <div className="d-flex w-100">
                    <div className="d-flex align-items-center w-100">
                      <div className="image-selector mr-2">
                        <div className="avatar-icon">
                          <img alt="..." src={image} />
                        </div>
                      </div>
                      <div>
                        <span className="text-black-50 d-block ml-2">
                          Image {(i + 1).toString()}
                        </span>
                      </div>
                      <div className="ml-auto">
                        <ArrowForwardIosIcon />
                      </div>
                    </div>
                  </div>
                </Container>
                <div className="divider" />
              </div>
            );
          })}
        </PerfectScrollbar>
      </Card>
    </>
  );
};

export default ScrollableImageSelector;
