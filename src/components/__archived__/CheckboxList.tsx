import React from "react";
import { Card, Checkbox, FormGroup, FormControlLabel } from "@material-ui/core";

import PerfectScrollbar from "react-perfect-scrollbar";

type CheckboxListProps = {
  title?: string;
  options: string[];
  optionValues?: boolean[]; // if provided, needs to be the same length as options. Defaults to false if not provided
};

const CheckboxList: React.FC<CheckboxListProps> = ({
  title,
  options,
  optionValues,
}) => {
  let resolvedOptionValues: boolean[];
  if (optionValues === undefined) {
    resolvedOptionValues = options.map(() => false);
  } else {
    resolvedOptionValues = optionValues;
  }
  const initOptionsBoolValObj = options.reduce<{ [key: string]: boolean }>(
    (acc, curr, index) => {
      acc[curr] = resolvedOptionValues[index];
      return acc;
    },
    {}
  );
  const [optionsBoolValObj, setOptionsBoolValObj] = React.useState(
    initOptionsBoolValObj
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptionsBoolValObj({
      ...optionsBoolValObj,
      [event.target.name]: event.target.checked,
    });
    console.log("called!", event.target.checked);
  };
  return (
    <>
      <Card className="card-box p-0 overflow-hidden w-100">
        {title && (
          <div className="card-header bg-secondary">
            <div>
              <h5 className="font-size-lg mb-0 line-height-1 py-2 font-weight-bold">
                {title}
              </h5>
            </div>
          </div>
        )}
        <PerfectScrollbar options={{ wheelPropagation: false }}>
          <div className="px-4 py-3">
            <FormGroup>
              {Object.keys(optionsBoolValObj).map((obj, i) => {
                return (
                  <FormControlLabel
                    key={"obj_" + i}
                    control={
                      <Checkbox
                        checked={optionsBoolValObj[obj]}
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
