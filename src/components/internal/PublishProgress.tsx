import React from "react";
import { CircularProgress, Typography } from "@material-ui/core";

type PublishProgressProps = {
  currFile: number;
  totalFiles: number | string;
};

const PublishProgress: React.FC<PublishProgressProps> = ({
  currFile = 1,
  totalFiles = "?",
}) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom={true}>
        Your model is now uploading to feather
      </Typography>
      <CircularProgress className="mt-2" />
      <div>
        <Typography paragraph={true}>
          Uploading file {currFile} of {totalFiles}
        </Typography>
        <Typography paragraph={true}>
          Large models may take a long time to process.
        </Typography>

        <Typography paragraph={true}>
          Closing this page will not stop your upload.
        </Typography>
      </div>
    </div>
  );
};

export default PublishProgress;
