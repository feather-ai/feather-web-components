import React, { useEffect } from "react";
import GenericTitleDescription from "../../internal/GenericTitleDescription";
import { BaseProps } from "../../../utils/typeUtils";

export type TextViewProps = BaseProps & {
  text: string[];
};

const TextView: React.FC<TextViewProps> = ({
  name,
  step,
  index,
  title,
  description,
  text,
  masterStateCopy,
  setMasterState,
}) => {
  useEffect(() => {
    const fullState = { name, text };

    try {
      console.log("in Text.View. masterStateCopy:", masterStateCopy);
      const currMasterState = masterStateCopy;
      currMasterState[step][index].input = fullState;
      setMasterState(currMasterState);
      console.log("in Text.View. currMasterState:", currMasterState);
    } catch {
      console.log(
        "unable to update Text.View - waiting for global state propagation"
      );
    }
  }, []);

  return (
    <>
      <GenericTitleDescription title={title} description={description} />
      {text.map((t, i) => (
        <p key={`textview-${i}`}>{t}</p>
      ))}
    </>
  );
};

export default TextView;
