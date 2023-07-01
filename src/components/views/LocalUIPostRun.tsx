import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Link,
} from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ApiKeyModal from "../internal/ApiKeyModal";
import PublishProgress from "../internal/PublishProgress";
import { FeatherApi, IPublishStatus } from "../../api/FeatherApi";

type LocalUIPostRunProps = {
  systemId: string;
  resetStates: () => void;
};

const LocalUIPostRun: React.FC<LocalUIPostRunProps> = ({
  systemId,
  resetStates,
}) => {
  const api = FeatherApi.instance({ isLocal: true });

  const [showModal, setShowModal] = useState(false);

  const [apiKey, setApiKey] = useState<string | undefined>(undefined);

  const [publishProgress, setPublishProgress] = useState<
    IPublishStatus | undefined
  >(undefined);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [publishedLink, setPublishedLink] = useState("#");

  const publish = async () => {
    if (!apiKey || apiKey === "") {
      alert("Please enter an API key");
      return;
    }

    setShowModal(false);
    setIsPublishing(true);

    try {
      const [publishResult, _poll, _interval] = await Promise.all([
        api.publish(systemId, apiKey),
        setTimeout(() => {
          pollPublish();
        }, 500),
        setInterval(() => {
          pollPublish();
        }, 5000),
      ]);
      clearInterval(_interval);
      const link = `https://feather-ai.com/user/${publishResult.user}/${publishResult.system}`;
      setPublishedLink(link);
      setIsPublished(true);
    } catch (error) {
      console.error("Axios error", error);
    }

    setIsPublishing(false);
  };

  const pollPublish = async () => {
    try {
      const result = await api.pollPublish(systemId);
      console.log("pollPublish result:", result);
      if (result) {
        setPublishProgress({ ...result });
      }
    } catch (error) {
      console.error("Axios error", error);
    }
  };

  const renderPrePublish = () => {
    if (isPublishing)
      return (
        <PublishProgress
          currFile={publishProgress?.currFile || 1}
          totalFiles={publishProgress?.totalFiles || "?"}
        />
      );
    return (
      <>
        <Typography variant="h5">Your model ran successfully!</Typography>
        <Typography variant="h5">Happy with the output?</Typography>
        <Button
          onClick={() => setShowModal(true)}
          className="btn-success font-weight-bold rounded hover-scale-lg m-3 px-3"
          size="large"
        >
          Publish Model
        </Button>
        <Button
          onClick={resetStates}
          className="btn-success font-weight-bold rounded hover-scale-lg mx-1 px-3"
        >
          <span className="btn-wrapper--label">Try another sample</span>
        </Button>

        {isPublishing ? <div>Publishing...</div> : null}

        <ApiKeyModal
          display={showModal}
          displayHandler={setShowModal}
          keyHandler={setApiKey}
          publishHandler={publish}
        />
      </>
    );
  };

  const renderPostPublish = () => {
    return (
      <>
        <Typography variant="h5" gutterBottom={true}>
          Upload Successful!
        </Typography>
        <Typography paragraph={true}>Your feather link is:</Typography>
        <div className="w-50 m-auto">
          <TextField
            id="filled-adornment-password"
            variant="filled"
            value={publishedLink}
            disabled
            label="feather link"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="copy feather link"
                    edge="end"
                    onClick={() => navigator.clipboard.writeText(publishedLink)}
                  >
                    <FileCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography paragraph={true} className="mt-3">
            You may safely close this page
          </Typography>
          <Typography paragraph={true} className="font-size-sm mt-3">
            View and edit more details about your uploaded model at <br />
            <Link
              href="https://feather-ai.com/creator/models"
              rel="noopener"
              target="_blank"
            >
              https://feather-ai.com/creator/models
            </Link>
          </Typography>
        </div>
      </>
    );
  };

  return <>{isPublished ? renderPostPublish() : renderPrePublish()}</>;
};

export default LocalUIPostRun;
