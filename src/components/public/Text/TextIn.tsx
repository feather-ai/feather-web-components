import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import GenericTitleDescription from "../../internal/GenericTitleDescription";
import { BaseProps } from "../../../utils/typeUtils";
import _ from "lodash";

export type TextInProps = BaseProps & {
  numInputs?: number;
  maxChars: number | null;
  text: string[];
};

const TextIn: React.FC<TextInProps> = ({
  step,
  index,
  name,
  title,
  description,
  numInputs,
  maxChars,
  text,
  masterStateCopy,
  setMasterState,
}) => {
  const textBoxes = [];
  numInputs = numInputs || 1;

  text = text || Array.from({ length: numInputs }, () => "");
  const [textboxState, setTextboxState] = useState(text);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    i: number
  ) => {
    const currState = [...textboxState];
    currState[i] = e.target.value;
    setTextboxState(currState);
  };

  useEffect(() => {
    if (!_.isEqual(text, textboxState)) {
      setTextboxState(text);
    }
  }, [text]);

  useEffect(() => {
    const fullState = { name, text: [...textboxState] };

    try {
      const currMasterState = masterStateCopy;
      currMasterState[step][index].input = fullState;
      setMasterState(currMasterState);
      console.log("in Text.In. currMasterState:", currMasterState);
    } catch {
      console.log(
        "unable to update Text.In - waiting for global state propagation"
      );
    }
  }, [textboxState]);

  for (let i = 0; i < numInputs; i++) {
    let label = "";
    if (title) {
      label += title;
    }
    if (maxChars) {
      label += ` (Maximum Length: ${maxChars})`;
    }

    // Set default value if provided
    // let text = textboxState?.[i];
    // if (!text) {
    //   if (Array.isArray(text)) text = text?.[i] || "";
    //   else text = text || "";
    // }
    textBoxes.push(
      <TextField
        key={`textbox-${i}`}
        className="mb-3"
        multiline
        inputProps={{
          maxLength: maxChars,
        }}
        fullWidth
        id={name}
        label={label}
        value={textboxState[i]}
        variant="outlined"
        onChange={(e) => handleChange(e, i)}
      />
    );
  }

  return (
    <>
      <GenericTitleDescription title={title} description={description} />
      {textBoxes.map((textBox) => textBox)}
    </>
  );
};

export default TextIn;
