import React from "react";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  Grid,
  Card,
  Badge,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseTwoToneIcon from "@material-ui/icons/CloseTwoTone";
import CheckIcon from "@material-ui/icons/Check";
import PublishTwoToneIcon from "@material-ui/icons/PublishTwoTone";
import GenericTitleDescription from "../../internal/GenericTitleDescription";
import { BaseProps } from "../../../utils/typeUtils";
import { getImageUrl } from "../../../utils/utils";

interface OverwriteFile extends File {
  preview?: string;
  path?: string;
}
const MAXFILES_LIM = 5;

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      cursor: "pointer",
    },
  })
)(Badge);

const mapTypesPropToDropzoneAccepted = (types?: SupportedFileTypes) => {
  let dropzoneString = "";
  types?.forEach((type) => {
    switch (type) {
      case "image":
      case "images":
        dropzoneString += "image/*";
        dropzoneString += ",";
        break;
      case "video":
      case "videos":
        dropzoneString += "video/*";
        dropzoneString += ",";
        break;
      case "audio":
      case "audios":
        dropzoneString += "audio/*";
        dropzoneString += ",";
        break;
      default:
        dropzoneString += type;
        dropzoneString += ",";
    }
  });
  return dropzoneString || undefined; // returns undefined if types is undefined
};

type SupportedFileTypes = (
  | "images"
  | "videos"
  | "audios"
  | "image"
  | "video"
  | "audio"
  | ".csv"
  | ".gif"
  | ".jpg"
  | ".json"
  | ".mp3"
  | ".mp4"
  | ".mpeg"
  | ".png"
  | ".tsv"
  | ".txt"
)[];
export type FileUploadProps = BaseProps & {
  types?: SupportedFileTypes;
  minFiles?: number; // We don't do anything with min files since react-dropzone doesn't have a minFiles arg
  maxFiles?: number; // we cap this at 5
};

const FileUpload: React.FC<FileUploadProps> = ({
  step,
  index,
  name,
  types,
  title,
  description,
  maxFiles,
  masterStateCopy,
  setMasterState,
}) => {
  console.log("Calling File.Upload, masterStateCopy", masterStateCopy);

  let dropzoneMaxFiles = 0;
  if (maxFiles) {
    dropzoneMaxFiles = maxFiles > MAXFILES_LIM ? MAXFILES_LIM : maxFiles;
  } else {
    dropzoneMaxFiles = MAXFILES_LIM;
  }
  const [files, setFiles] = useState<OverwriteFile[]>([]);
  const [b64files, setb64Files] = useState<string[]>(
    Array.from({ length: dropzoneMaxFiles }, () => "")
  );

  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
    fileRejections,
  } = useDropzone({
    accept: mapTypesPropToDropzoneAccepted(types),
    maxFiles: dropzoneMaxFiles,
    onDrop: (acceptedFiles: OverwriteFile[]) => {
      const stateFilePreviews = files.map((f) => f.preview);
      const newFiles = acceptedFiles.filter(
        (f) => !stateFilePreviews.includes(f.preview)
      );
      const newFilesForState: OverwriteFile[] = newFiles.map(
        (file: OverwriteFile) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        }
      );
      setFiles([...files, ...newFilesForState]);
    },
  });

  const removeFileFromState = (file: OverwriteFile) => {
    const newFiles = files.filter((f) => f.preview !== file.preview);
    console.log("newFiles", newFiles);
    setFiles(newFiles);
  };

  // HACK: file is of type any to get around the "preview" does not exist on file
  const thumbs = files.map((file: OverwriteFile) => (
    <Grid item md={3} className="p-2 position-relative" key={file.name}>
      <StyledBadge
        color="secondary"
        badgeContent={
          <CloseTwoToneIcon
            fontSize="small"
            onClick={() => removeFileFromState(file)}
          />
        }
      >
        <div className="p-2 bg-white shadow-xxl border-dark card-box d-flex overflow-hidden rounded-sm">
          {file.type.startsWith("image/") ? (
            <img
              className="img-fluid img-fit-container rounded-sm"
              src={file.preview}
              alt="..."
            />
          ) : (
            <div className="badge badge-primary w-100">{file.name}</div>
          )}
        </div>
      </StyledBadge>
    </Grid>
  ));

  useEffect(() => {
    files.forEach((file: OverwriteFile) => URL.revokeObjectURL(file.preview!));

    const resizeImageWrapper = async () => {
      const currState = [...b64files];
      files.map(async (file, i) => {
        if (file.type.startsWith("image/")) {
          const resizedImage = await getImageUrl(file);
          console.log("resizedImage", i, resizedImage.slice(-10));
          currState[i] = resizedImage;
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = async () => {
            currState[i] = reader.result as string;
          };
          reader.onerror = console.log;
        }
        setb64Files([...currState]);
      });
    };
    resizeImageWrapper();
  }, [files]);

  useEffect(() => {
    const fullArr = files.map((file, i) => {
      return {
        name: file.name,
        data: b64files[i].split(",")[1],
      };
    });
    const fullState = { name, files: fullArr };

    try {
      const currMasterState = masterStateCopy;
      currMasterState[step][index].input = fullState;
      setMasterState(currMasterState);
      console.log("in File.Upload. currMasterState:", currMasterState);
    } catch {
      console.log(
        "unable to update File.Upload - waiting for global state propagation"
      );
    }
  }, [b64files]);

  return (
    <>
      <GenericTitleDescription title={title} description={description} />
      <Card className="mt-4 shadow-xxl">
        <div className="p-3 p-lg-5">
          <div className="dropzone">
            <div
              {...getRootProps({
                className: "dropzone-upload-wrapper",
              })}
            >
              <input {...getInputProps()} />
              <div className="dropzone-inner-wrapper bg-white">
                {isDragAccept && (
                  <div>
                    <div className="d-140 hover-scale-lg icon-blob icon-blob-animated btn-icon text-success mx-auto">
                      <svg
                        className="d-140 opacity-2"
                        viewBox="0 0 600 600"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g transform="translate(300,300)">
                          <path
                            d="M170.4,-137.2C213.2,-82.3,234.8,-11.9,223.6,56.7C212.4,125.2,168.5,191.9,104.3,226.6C40.2,261.3,-44.1,264,-104,229.8C-163.9,195.7,-199.4,124.6,-216.2,49.8C-233,-25.1,-231,-103.9,-191.9,-158C-152.7,-212.1,-76.4,-241.6,-6.3,-236.6C63.8,-231.6,127.7,-192.2,170.4,-137.2Z"
                            fill="currentColor"
                          />
                        </g>
                      </svg>
                      <div className="blob-icon-wrapper">
                        <CheckIcon className="d-50" />
                      </div>
                    </div>
                    <div className="font-size-sm text-success">
                      All files will be uploaded!
                    </div>
                  </div>
                )}
                {isDragReject && (
                  <div>
                    <div className="d-140 hover-scale-lg icon-blob icon-blob-animated btn-icon text-danger mx-auto">
                      <svg
                        className="d-140 opacity-2"
                        viewBox="0 0 600 600"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g transform="translate(300,300)">
                          <path
                            d="M169,-144C206.7,-87.5,216.5,-18,196.9,35.7C177.3,89.4,128.3,127.1,75.2,150.7C22,174.2,-35.4,183.5,-79.7,163.1C-124,142.7,-155.1,92.6,-164.1,40.9C-173.1,-10.7,-160.1,-64,-129,-118.9C-98,-173.8,-49,-230.4,8.3,-237.1C65.7,-243.7,131.3,-200.4,169,-144Z"
                            fill="currentColor"
                          />
                        </g>
                      </svg>
                      <div className="blob-icon-wrapper">
                        <CloseTwoToneIcon className="d-50" />
                      </div>
                    </div>
                    <div className="font-size-sm text-danger">
                      Some files will be rejected!
                    </div>
                  </div>
                )}
                {!isDragActive && (
                  <div>
                    <div className="d-140 hover-scale-lg icon-blob btn-icon text-first mx-auto">
                      <svg
                        className="d-140 opacity-2"
                        viewBox="0 0 600 600"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g transform="translate(300,300)">
                          <path
                            d="M171.2,-128.5C210.5,-87.2,223.2,-16.7,205.1,40.4C186.9,97.5,137.9,141.1,81.7,167.2C25.5,193.4,-38,202.1,-96.1,181.2C-154.1,160.3,-206.7,109.7,-217.3,52.7C-227.9,-4.4,-196.4,-68,-153.2,-110.2C-110,-152.4,-55,-173.2,5.5,-177.5C65.9,-181.9,131.9,-169.8,171.2,-128.5Z"
                            fill="currentColor"
                          />
                        </g>
                      </svg>
                      <div className="blob-icon-wrapper">
                        <PublishTwoToneIcon className="d-50" />
                      </div>
                    </div>
                    <div className="font-size-sm mb-1">
                      Drag and drop some files, or click to upload. Accepted
                      file types are:{" "}
                      <b>
                        {types?.reduce<string>((acc, currType, i) => {
                          if (i === types.length - 1) {
                            acc += "and " + `'${currType}'`;
                          } else {
                            acc += " " + `'${currType}'` + ", ";
                          }
                          return acc;
                        }, "") || "everything!"}
                      </b>
                    </div>
                    <div className="font-size-sm mb-1">
                      Maximum {dropzoneMaxFiles} files allowed
                      {fileRejections.length > 0 && (
                        <div className="text-danger font-weight-bold">
                          Errors
                        </div>
                      )}
                      {fileRejections.map(({ file, errors }) => {
                        return (
                          <div className="text-danger">
                            {file.name} - {errors.map((error) => error.message)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer p-4 bg-secondary">
          <div>
            <div className="font-weight-bold mb-3 text-uppercase text-dark font-size-sm text-center">
              Uploaded Files
            </div>
            {thumbs.length <= 0 && (
              <div className="text-first text-center font-size-sm">
                You have not uploaded any images yet!
              </div>
            )}
            {thumbs.length > 0 && (
              <div>
                <Alert severity="success" className="text-center mb-3">
                  You have uploaded <b>{thumbs.length}</b> files!
                </Alert>
                <Grid container spacing={0}>
                  {thumbs}
                </Grid>
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export { FileUpload };
export default FileUpload;
