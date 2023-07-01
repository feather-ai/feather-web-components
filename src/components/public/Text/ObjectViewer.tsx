import React, { useEffect, useRef } from "react";
import { jsonSyntaxHighlight } from "../../../utils/utils";
import "./objectViewer.css";

type ObjectViewerProps = {
  json: string;
};

const ObjectViewer: React.FC<ObjectViewerProps> = ({ json }) => {
  const jsonObj = JSON.parse(json);
  const jsonString = JSON.stringify(jsonObj, undefined, 4);
  const htmlToRenderJson = jsonSyntaxHighlight(jsonString);
  const preJsonRef = useRef<any>(null);

  useEffect(() => {
    preJsonRef.current.innerHTML = htmlToRenderJson;
  }, [preJsonRef.current]);

  return (
    <>
      <pre className="pre" ref={preJsonRef} />{" "}
    </>
  );
};

export default ObjectViewer;
