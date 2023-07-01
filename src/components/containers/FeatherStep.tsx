import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import ComponentFactory from "../ComponentFactory";
import LocalUIPostRun from "../views/LocalUIPostRun";
import WebUIPostRun from "../views/WebUIPostRun";
import { IStepInfo } from "../../api/FeatherApi";
import _ from "lodash";
import { AppContextType } from "./FeatherModel";

type FeatherStepType = {
  systemId: string;
  step: number;
  stepInfo: IStepInfo;
  isFinalStep: boolean;
  resetSteps: () => void;
  masterState: AppContextType[][];
  setMasterState: React.Dispatch<React.SetStateAction<AppContextType[][]>>;
  isLocal: boolean;
};

const FeatherStep: React.FC<FeatherStepType> = ({
  systemId,
  step,
  stepInfo,
  isFinalStep = false,
  resetSteps,
  masterState,
  setMasterState,
  isLocal,
}) => {
  console.log("FeatherStep:", stepInfo, "step", step);
  console.log("FeatherStep masterState:", JSON.stringify(masterState));

  const [toPreventRerenderMasterState, setToPreventRerenderMasterState] =
    useState(masterState);
  useEffect(() => {
    setToPreventRerenderMasterState(masterState);
    console.log(
      "FeatherStep toPreventRerenderMasterState:",
      JSON.stringify(toPreventRerenderMasterState)
    );
  }, [masterState]);

  const renderDescription = () => {
    return (
      <div className="mb-4">
        {stepInfo?.title && (
          <h5 className="font-size-xl mb-1 font-weight-bold">
            {stepInfo.title}
          </h5>
        )}
        {stepInfo?.description && (
          <p className="text-black-50 mb-4">{stepInfo.description}</p>
        )}
      </div>
    );
  };

  return (
    <Container>
      <div className="p-4">
        {renderDescription()}

        {stepInfo?.inputs.map(({ componentType, name, props, payload }, i) => {
          return (
            <div className="mb-4" key={`${name}-container`}>
              <ComponentFactory
                masterStateCopy={toPreventRerenderMasterState}
                setMasterState={setMasterState}
                name={name}
                component={componentType}
                props={props}
                payload={payload}
                step={step}
                index={i}
              />
            </div>
          );
        })}

        {isFinalStep ? (
          isLocal ? (
            <LocalUIPostRun resetStates={resetSteps} systemId={systemId} />
          ) : (
            <WebUIPostRun onClick={window.location.reload} />
          )
        ) : null}
      </div>
    </Container>
  );
};

export default FeatherStep;
