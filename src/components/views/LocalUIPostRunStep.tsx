import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import {
  Typography,
  Button,
  InputAdornment,
  IconButton,
  TextField,
} from "@material-ui/core";
import MDEditor from "@uiw/react-md-editor";
import FileCopyIcon from "@material-ui/icons/FileCopy";

type LocalUIPostRunStepProps = {
  type: string; // "playground" | "private"
  title: string;
};
export const LocalUIPostRunStep: React.FC<LocalUIPostRunStepProps> = ({
  type,
  title,
}) => {
  const hardCodedUrl = "feather-ai.com/user/<username>/<model-name>";
  const [uploadComplete, setUploadComplete] = useState(false);

  const initMDString = `<!-- This is a markdown editor! -->  
# ${title}

This model does...

It was trained on ... data

The architecture of the model is...

For more information ...
`;

  const [value, setValue] = React.useState<string | undefined>(initMDString);
  return (
    <>
      <span onClick={() => setUploadComplete(!uploadComplete)}>
        DEV ONLY. CLICK HERE TO TOGGLE UPLOAD COMPLETE
      </span>
      {uploadComplete ? (
        <div className="w-75 m-auto">
          <CircularProgressbar
            value={100}
            text="✅"
            strokeWidth={8}
            className="m-3 circular-progress-lg circular-progress-primary"
          />

          <Typography className="font-size-xl mt-3 mb-1 font-weight-bold">
            Upload Successful!
          </Typography>
          <Typography className="font-size-xl mt-3 mb-1">
            Your feather link is:
          </Typography>
          <div className="w-50 m-auto">
            <TextField
              id="filled-adornment-password"
              variant="filled"
              value={hardCodedUrl}
              disabled
              label="feather link"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="copy feather link" edge="end">
                      <FileCopyIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography className="font-size-xl mt-3 mb-1">
              You may safely close this page
            </Typography>
            <Typography className="font-size-sm mt-5 mb-3">
              View and edit more details about your uploaded model at{" "}
              <a href="https://feather-ai.com/creator/models">
                https://feather-ai.com/creator/models
              </a>
            </Typography>
          </div>
        </div>
      ) : (
        <div>
          <CircularProgressbar
            value={28}
            text={28 + "%"}
            strokeWidth={8}
            className="m-3 circular-progress-lg circular-progress-primary"
          />
          <Typography className="font-size-xl mb-1 font-weight-bold">
            Model Uploading...
          </Typography>

          {type === "playground" && (
            <>
              <Typography>
                In the mean time, why not fill out some information about your
                model?
              </Typography>
              <div className="mt-3 mb-5">
                <div className="w-75 text-center m-auto">
                  <div>
                    <Typography className="font-size-l mb-1 font-weight-bold">
                      Model Description
                    </Typography>
                    <MDEditor height={400} value={value} onChange={setValue} />
                  </div>
                  <Button
                    className="btn-success font-weight-bold rounded hover-scale-lg m-3 px-3"
                    size="large"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default LocalUIPostRunStep;
