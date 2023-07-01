import React from "react";
import { Card, Container, Button } from "@material-ui/core";

import PerfectScrollbar from "react-perfect-scrollbar";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export type ScrollableSelectorProps = {
  content: string[];
  type: "image" | "document" | "file";
  filenames?: string[];
  title: string;
  handleNewFileSelect: (i: number) => void;
};

const ScrollableSelector: React.FC<ScrollableSelectorProps> = ({
  content,
  filenames,
  type,
  title,
  handleNewFileSelect,
}) => {
  return (
    <>
      <Card className="card-box p-0 overflow-hidden">
        <div className="card-header bg-secondary">
          <div>
            <h5 className="font-size-lg mb-0 line-height-1 py-2 font-weight-bold">
              {title}
            </h5>
          </div>
        </div>
        <PerfectScrollbar
          className="scroll-area-md"
          options={{ wheelPropagation: false }}
        >
          {content.map((item, i) => {
            return (
              <div key={"item_" + i}>
                <Container
                  component={Button}
                  onClick={() => handleNewFileSelect(i)}
                  className="d-flex align-content-center justify-content-between px-4 py-3 card-box-hover-rise card-box-hover rounded-lg text-center mb-4 mb-md-0 d-block"
                >
                  <div className="d-flex w-100">
                    <div className="d-flex align-items-center w-100">
                      {type === "image" && (
                        <div className="image-selector">
                          <div className="avatar-icon">
                            <img alt="..." src={item} />
                          </div>
                        </div>
                      )}
                      <div>
                        <span className="text-black-50 d-block ml-2">
                          {filenames ? (
                            <>{filenames[i]}</>
                          ) : (
                            <>
                              {type[0].toUpperCase() + type.slice(1)}{" "}
                              {(i + 1).toString()}
                            </>
                          )}
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

export default ScrollableSelector;
