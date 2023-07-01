import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@material-ui/core";
import ScrollableSelector from "../../internal/ScrollableSelector";
import { BaseProps } from "../../../utils/typeUtils";
import DisplayCard from "../../internal/DisplayCard";
import TwoCardComponentContainer from "../../internal/TwoCardComponent";
import _ from "lodash";

type Schema = {
  data: string;
  name: string;
  text: string;
};

export type DocumentWithTextInProps = BaseProps & {
  documents: Schema[];
  maxChars: number | null;
};

const DocumentWithTextIn: React.FC<DocumentWithTextInProps> = ({
  step,
  index,
  name,
  title,
  description,
  documents,
  maxChars,
  masterStateCopy,
  setMasterState,
}) => {
  const defaultText = documents.map((document) => document.text || "");
  const data = documents.map((document) => document.data);
  const filenames = documents.map((document, i) =>
    document.name ? document.name : `Document ${i + 1}`
  );

  const [selectedDocument, setSelectedDocument] = useState<number>(0);
  const handleNewDocumentSelect = (documentIndex: number) => {
    setSelectedDocument(documentIndex);
  };

  const labels: string[] = [];
  for (let i = 0; i < documents.length; i++) {
    let label = "";
    if (title) {
      label += title;
    }
    if (maxChars) {
      label += ` (Maximum Length: ${maxChars})`;
    }
    labels.push(label);
  }

  const [enteredText, setEnteredText] = useState(defaultText);
  useEffect(() => {
    if (!_.isEqual(defaultText, enteredText)) {
      setEnteredText(defaultText);
    }
  }, [defaultText]);

  const handleDocumentSwitch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    documentIndex: number
  ) => {
    event.preventDefault();
    const newText = event.target.value;
    const currState = enteredText;
    currState[documentIndex] = newText;
    setEnteredText([...currState]);
  };

  useEffect(() => {
    const fullArr: Schema[] = documents.map((document, i) => ({
      data: document.data,
      name: filenames[i],
      text: enteredText[i],
    }));
    const fullState = {
      name,
      documents: fullArr,
    };

    try {
      const currMasterState = masterStateCopy;
      currMasterState[step][index].input = fullState;
      setMasterState(currMasterState);
      console.log("in Document.WithTextIn. currMasterState:", currMasterState);
    } catch {
      console.log(
        "unable to update Document.WithTextIn - waiting for global state propagation"
      );
    }
  }, [enteredText]);

  return (
    <>
      <DisplayCard title={title} description={description}>
        <TwoCardComponentContainer>
          <Grid item md={5}>
            <ScrollableSelector
              content={data}
              type="document"
              title="Documents"
              filenames={filenames}
              handleNewFileSelect={handleNewDocumentSelect}
            />
          </Grid>
          <Grid item md={5}>
            <DisplayCard title={filenames[selectedDocument]}>
              {data[selectedDocument]}
              <TextField
                key={`textbox-${selectedDocument}`}
                className="my-3"
                multiline
                inputProps={{
                  maxLength: maxChars,
                }}
                fullWidth
                onChange={(e) => handleDocumentSwitch(e, selectedDocument)}
                id="standard-basic"
                label="Enter Text"
                value={enteredText[selectedDocument]}
                variant="outlined"
              />
            </DisplayCard>
          </Grid>
        </TwoCardComponentContainer>
      </DisplayCard>
    </>
  );
};

export default DocumentWithTextIn;
