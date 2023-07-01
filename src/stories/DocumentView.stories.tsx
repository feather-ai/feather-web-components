import React, { useState } from "react";

import DocumentView, {
  DocumentViewProps,
} from "../components/public/Document/DocumentView";

export default {
  title: "Components/DocumentView",
  component: DocumentView,
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

const props: Partial<DocumentViewProps> = {
  step: 0,
  index: 0,
  name: "myDocumentView",
  documents,
};

const Template: React.FC<DocumentViewProps> = (props) => {
  const [state, setState] = useState([[{ cache: {}, input: [] }]]);

  return (
    <DocumentView
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
  { data: myDocuments[0], name: "", text: "Text for doc1" },
  { data: myDocuments[1], name: "", text: "Text for doc2" },
  { data: myDocuments[2], name: "", text: "Text for doc3" },
];

export const WithTexts = Template.bind({});
WithTexts.args = {
  ...props,
  documents,
};

documents = [
  { data: myDocuments[0], text: "Text for doc1", name: "doc1.txt" },
  { data: myDocuments[1], text: "Text for doc2", name: "doc2.txt" },
  { data: myDocuments[2], text: "Text for doc3", name: "doc3.txt" },
];

export const WithFilenamesTitleDescription = Template.bind({});
WithFilenamesTitleDescription.args = {
  ...props,
  documents,
  title: "Choose a document",
  description: "To view it",
};
