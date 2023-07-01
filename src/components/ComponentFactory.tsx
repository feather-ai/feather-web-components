import React from "react";
import { DocumentView, DocumentWithTextIn } from "./public/Document";
import { FileUpload, FileDownload } from "./public/File";
import {
  ImageView,
  ImageWithSelectMulti,
  ImageWithSelectOne,
  ImageWithTextIn,
} from "./public/Image";
import { ListSelectOneWrapper, ListSelectMultiWrapper } from "./public/List";
import { TextIn, TextView } from "./public/Text";
import { AppContextType } from "./containers/FeatherModel";

type ComponentFactoryType = {
  component: string;
  name: string;
  props: Record<string, unknown>;
  payload: Record<string, unknown>;
  step: number;
  index: number;
  masterStateCopy: AppContextType[][];
  setMasterState: React.Dispatch<React.SetStateAction<AppContextType[][]>>;
};

const ComponentFactory: React.FC<ComponentFactoryType> = ({
  component,
  name,
  props,
  payload,
  step,
  index,
  masterStateCopy,
  setMasterState,
}) => {
  // TODO: Refactor to remove reliance on switch statement -- possible static enum/dictionary of all supported types?
  const build = (component: string, props: any) => {
    const key = `${component}-${props.name}-${props.step}-${props.index}`;
    const operationalObj = {
      key,
      step,
      index,
      masterStateCopy,
      setMasterState,
    };
    console.log(
      "Inside ComponentFactory (operationalObj)...",
      JSON.stringify(operationalObj)
    );
    console.log("Inside ComponentFactory...", component, props);
    switch (component) {
      case "Document.View":
        return <DocumentView {...props} {...operationalObj} />;
      case "Document.WithTextIn":
        return <DocumentWithTextIn {...props} {...operationalObj} />;
      case "File.Upload":
        return <FileUpload {...props} {...operationalObj} />;
      case "File.Download":
        return <FileDownload {...props} {...operationalObj} />;
      case "Image.View":
        return <ImageView {...props} {...operationalObj} />;
      case "Image.WithSelectOne":
        return <ImageWithSelectOne {...props} {...operationalObj} />;
      case "Image.WithSelectMulti":
        return <ImageWithSelectMulti {...props} {...operationalObj} />;
      case "Image.WithTextIn":
        return <ImageWithTextIn {...props} {...operationalObj} />;
      case "List.SelectOne":
        return <ListSelectOneWrapper {...props} {...operationalObj} />;
      case "List.SelectMulti":
        return <ListSelectMultiWrapper {...props} {...operationalObj} />;
      case "Text.In":
        return <TextIn {...props} {...operationalObj} />;
      case "Text.View":
        return <TextView {...props} {...operationalObj} />;
      default:
        return props["opaqueValue"] ? null : ( // render nothing if the component is opaque
          <div>Unknown component: {component}</div>
        );
    }
  };

  return build(component, { name, ...props, ...payload, step, index });
};

export default ComponentFactory;
