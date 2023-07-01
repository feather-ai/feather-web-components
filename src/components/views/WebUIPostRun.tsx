import { Button, Typography } from "@material-ui/core";
import React from "react";

type WebUIPostRunProps = {
  onClick: () => void;
};
const WebUIPostRun: React.FC<WebUIPostRunProps> = ({ onClick }) => {
  return (
    <>
      <Button
        onClick={() => {
          window.location = (window.location.href +
            "#refresh") as unknown as Location;
          window.location.reload();
        }}
        className="btn-success font-weight-bold rounded hover-scale-lg mx-1 px-3"
        size="large"
      >
        <span className="btn-wrapper--label">Try another sample</span>
      </Button>
      <div className="mt-3">
        <Typography variant="caption">
          Like the output? Want to use this in your app/program?
        </Typography>{" "}
        <br />
        <Button
          className="btn-primary hover-scale-lg rounded ox-3"
          variant="contained"
          onClick={() => {
            window.location =
              "https://feather-ai.com/aiaas" as unknown as Location;
          }}
        >
          Use as a service
        </Button>
      </div>
      <div className="mt-3">
        <Typography variant="caption">
          You can find similar models on our marketplace
        </Typography>{" "}
        <br />
        <Button
          className="btn-first hover-scale-lg rounded ox-3"
          onClick={() =>
            (window.location.href = "https://feather-ai.com/marketplace")
          }
          variant="contained"
        >
          Go to marketplace
        </Button>
      </div>
    </>
  );
};

export default WebUIPostRun;
