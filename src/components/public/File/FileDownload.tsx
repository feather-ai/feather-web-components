import { Grid } from "@material-ui/core";
import ScrollableSelector from "../../internal/ScrollableSelector";
import React, { useState, useEffect } from "react";
import { BaseProps } from "../../../utils/typeUtils";
import DisplayCard from "../../internal/DisplayCard";
import TwoCardComponentContainer from "../../internal/TwoCardComponent";

type Schema = {
  data: string;
  name: string;
};

export type FileDownloadProps = BaseProps & {
  files: Schema[];
  outputFilenames?: string[];
  title?: string;
  description?: string;
};

const FileDownload: React.FC<FileDownloadProps> = ({
  name,
  step,
  index,
  files,
  outputFilenames,
  title,
  description,
  masterStateCopy,
  setMasterState,
}) => {
  const originalFilenames = files.map((file) => file.name || "");
  const data = files.map((file) => file.data);
  const [selectedFile, setSelectedFile] = useState<number>();
  const handleNewFileSelect = (fileIndex: number) => {
    setSelectedFile(fileIndex);
  };

  useEffect(() => {
    const fullState = { name, files };
    try {
      const currMasterState = masterStateCopy;
      currMasterState[step][index].input = fullState;
      setMasterState(currMasterState);
      console.log("in File.Download. currMasterState:", currMasterState);
    } catch {
      console.log(
        "unable to update File.Download - waiting for global state propagation"
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
              filenames={originalFilenames}
              type="file"
              title="Files"
              handleNewFileSelect={handleNewFileSelect}
            />
          </Grid>
          <Grid item md={5}>
            {selectedFile || selectedFile === 0 ? (
              <DisplayCard
                title={
                  (originalFilenames && originalFilenames[selectedFile]) ||
                  `File ${selectedFile + 1}`
                }
              >
                <a
                  download={
                    (outputFilenames && outputFilenames[selectedFile]) ||
                    (originalFilenames && originalFilenames[selectedFile]) ||
                    `File ${selectedFile + 1}`
                  }
                  href={
                    "data:application/octet-stream;base64," + data[selectedFile]
                  }
                >
                  <u>
                    {(outputFilenames && outputFilenames[selectedFile]) ||
                      (originalFilenames && originalFilenames[selectedFile]) ||
                      `File ${selectedFile + 1}`}
                  </u>
                </a>

                {/* {data[selectedFile]} */}
              </DisplayCard>
            ) : (
              <span className="align-self-center">
                Select an image from the left
              </span>
            )}
          </Grid>
        </TwoCardComponentContainer>
      </DisplayCard>
    </>
  );
};

export default FileDownload;
