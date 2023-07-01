import React, { useState } from "react";

import DocumentWithTextIn, {
  DocumentWithTextInProps,
} from "../components/public/Document/DocumentWithTextIn";

export default {
  title: "Components/DocumentWithTextIn",
  component: DocumentWithTextIn,
};

const myDocuments = [
  "This is document 1",
  "This is document 2",
  "This is document 3",
];

let documents = [
  { data: myDocuments[0], name: "", text: "" },
  { data: myDocuments[1], name: "", text: "" },
  { data: myDocuments[2], name: "", text: "" },
];

const props: Partial<DocumentWithTextInProps> = {
  step: 0,
  index: 0,
  name: "myDocumentWithTextIn",
  documents,
  maxChars: 256,
};

const Template: React.FC<DocumentWithTextInProps> = (props) => {
  const [state, setState] = useState([[{ cache: {}, input: [] }]]);

  return (
    <DocumentWithTextIn
      {...props}
      masterStateCopy={state}
      setMasterState={setState}
    />
  );
};

export const NoFilenames = Template.bind({});
NoFilenames.args = {
  ...props,
};

documents = [
  { data: myDocuments[0], name: "doc1.txt", text: "" },
  { data: myDocuments[1], name: "doc2.txt", text: "" },
  { data: myDocuments[2], name: "doc3.txt", text: "" },
];

export const WithFilenamesTitleDescription = Template.bind({});
WithFilenamesTitleDescription.args = {
  ...props,
  documents,
  title: "Choose a document",
  description: "And enter a question",
};

documents = [
  { data: myDocuments[0], name: "", text: "Hello1" },
  { data: myDocuments[1], name: "", text: "Hello2" },
  { data: myDocuments[2], name: "", text: "Hello3" },
];

export const WithDefaultText = Template.bind({});
WithDefaultText.args = {
  ...props,
  documents,
};
