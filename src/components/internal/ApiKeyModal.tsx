import React from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Link,
} from "@material-ui/core";

type ApiKeyModalProps = {
  display: boolean;
  displayHandler: (display: boolean) => void;
  keyHandler: (key: string) => void;
  publishHandler: () => void;
};

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  display,
  displayHandler,
  keyHandler,
  publishHandler,
}) => {
  return (
    <Dialog
      classes={{ paper: "modal-content bg-deep-sky rounded-lg modal-dark" }}
      open={display}
      onClose={() => displayHandler(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Enter your API key</DialogTitle>
      <DialogContent className="p-4">
        <DialogContentText>
          <Typography>
            <p>
              To publish your system to feather, you need to enter your API key
              from your feather account.
            </p>
            <p>
              <Link
                href="https://feather-ai.com/creator"
                rel="noopener"
                target="_blank"
                className="text-white"
                underline="always"
              >
                <u>Click here to find your API key or create a new account.</u>
              </Link>
            </p>
          </Typography>
        </DialogContentText>
        <DialogContentText className="mb-0">
          <TextField
            className="text-white-50"
            variant="outlined"
            size="small"
            autoFocus
            margin="dense"
            id="api-key-form"
            label="API Key"
            type="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              keyHandler(e.target.value)
            }
            fullWidth
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions className="p-4">
        <Button
          onClick={() => displayHandler(false)}
          variant="text"
          className="bg-white-10 text-white mr-3 shadow-none hover-scale-lg"
        >
          Cancel
        </Button>
        <Button
          onClick={publishHandler}
          className="btn-success shadow-none hover-scale-lg"
        >
          Publish Model
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApiKeyModal;
