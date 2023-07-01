import React, { useEffect } from "react";
import { Card, Checkbox, FormGroup, FormControlLabel } from "@material-ui/core";

import PerfectScrollbar from "react-perfect-scrollbar";

type CheckboxProps = {
  imageIndex: number;
  objObject: { [key: string]: boolean };
  handleObjectSelection: (i: number, obj: { [key: string]: boolean }) => void;
};

const CheckboxList: React.FC<CheckboxProps> = ({
  imageIndex,
  objObject,
  handleObjectSelection,
}) => {
  const [objObjectState, setObjObjectState] = React.useState(objObject);

  useEffect(() => {
    setObjObjectState(objObject);
  }, [objObject]);

  useEffect(() => {
    handleObjectSelection(imageIndex, objObjectState);
    const allTrue = Object.keys(objObjectState).every(function (k) {
      return objObjectState[k];
    });
    setAllState(allTrue);
  }, [handleObjectSelection, imageIndex, objObjectState]);

  const [allState, setAllState] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setObjObjectState({
      ...objObjectState,
      [event.target.name]: event.target.checked,
    });
    console.log("called!", event.target.checked);
    // handleObjectSelection(imageIndex, objObjectState);
  };

  const toggleAll = () => {
    const newObjState = Object.keys(objObjectState).reduce<{
      [key: string]: boolean;
    }>((acc, curr) => {
      acc[curr] = !allState;
      return acc;
    }, {});

    setObjObjectState(newObjState);
    setAllState(!allState);
  };
  return (
    <>
      <Card className="card-box p-0 overflow-hidden w-100">
        <div className="card-header bg-secondary">
          <div>
            <h5 className="font-size-lg mb-0 line-height-1 py-2 font-weight-bold">
              Image {imageIndex + 1}
            </h5>
          </div>
        </div>
        <PerfectScrollbar
          className="scroll-area-md"
          options={{ wheelPropagation: false }}
        >
          <div className="px-4 py-3">
            <FormControlLabel
              control={
                <Checkbox checked={allState} onChange={toggleAll} name="All" />
              }
              label="All"
            />{" "}
            <div className="divider" />
            <FormGroup>
              {Object.keys(objObjectState).map((obj, i) => {
                return (
                  <FormControlLabel
                    key={"obj_" + i}
                    control={
                      <Checkbox
                        checked={objObjectState[obj]}
                        onChange={handleChange}
                        name={obj}
                      />
                    }
                    label={obj}
                  />
                );
              })}
            </FormGroup>
          </div>
        </PerfectScrollbar>
      </Card>
    </>
  );
};

export default CheckboxList;
