import { Grid } from "@material-ui/core";
import ScrollableSelector from "../../internal/ScrollableSelector";
import React, { useState, useEffect } from "react";
import { BaseProps } from "../../../utils/typeUtils";
import DisplayCard from "../../internal/DisplayCard";
import TwoCardComponentContainer from "../../internal/TwoCardComponent";

type Schema = {
  data: string;
  name: string | null;
  text: string;
};

export type DocumentViewProps = BaseProps & {
  documents: Schema[];
};

const DocumentView: React.FC<DocumentViewProps> = ({
  name,
  step,
  index,
  title,
  description,
  documents,
  masterStateCopy,
  setMasterState,
}) => {
  const filenames = documents.map((document, i) =>
    document.name ? document.name : `Document ${i + 1}`
  );

  const data = documents.map((document) => document.data);
  const texts = documents.map((document) => document.text || "");
  const [selectedDocument, setSelectedDocument] = useState<number>(0);
  const handleNewdocumentselect = (DocumentIndex: number) => {
    setSelectedDocument(DocumentIndex);
  };

  useEffect(() => {
    const fullState = { name, documents };
    try {
      const currMasterState = masterStateCopy;
      currMasterState[step][index].input = fullState;
      setMasterState(currMasterState);
      console.log("in Document.View. currMasterState:", currMasterState);
    } catch {
      console.log(
        "unable to update Document.View - waiting for global state propagation"
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
              type="document"
              title="Documents"
              filenames={filenames}
              handleNewFileSelect={handleNewdocumentselect}
            />
          </Grid>
          <Grid item md={5}>
            <DisplayCard title={filenames[selectedDocument]}>
              <p>{data[selectedDocument]}</p>{" "}
              <p>
                <b>{texts[selectedDocument]}</b>
              </p>
            </DisplayCard>
          </Grid>
        </TwoCardComponentContainer>
      </DisplayCard>
    </>
  );
};

export default DocumentView;
