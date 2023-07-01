import React, { useState } from "react";

import FileUpload, {
  FileUploadProps,
} from "../components/public/File/FileUpload";

export default {
  title: "Components/FileUpload",
  component: FileUpload,
};

const props: Partial<FileUploadProps> = {
  step: 0,
  index: 0,
  name: "myFileUpload",
  title: "Upload your files",
  description: "Get a rating of pets cuteness!",
  types: ["images", ".txt", "video"],
  maxFiles: 3,
};

const Template = (props: FileUploadProps) => {
  const [state, setState] = useState([[{ cache: {}, input: [] }]]);

  return (
    <>
      <FileUpload
        {...props}
        masterStateCopy={state}
        setMasterState={setState}
      />
    </>
  );
};

export const WithProps = Template.bind({});
WithProps.args = props;

export const WithoutProps = Template.bind({});
WithoutProps.args = {};
