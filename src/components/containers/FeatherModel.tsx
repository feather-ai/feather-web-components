import React, { useState, useEffect, useMemo } from "react";
import _ from "lodash";
import {
  Card,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import StepConnector from "@material-ui/core/StepConnector";
import { ISystemInfo, IStepInfo, FeatherApi } from "../../api/FeatherApi";
import FeatherStep from "./FeatherStep";
import { ordinalSuffixOf } from "../../utils/utils";
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";

export type AppContextType = {
  input: any;
};

type MasterStateType = {
  currStep: number;
  state: AppContextType[][];
};

type CacheType = {
  stepName: string;
  cacheArr: any;
};

type FeatherModelLocalType = {
  isLocal: true;
  systemId?: undefined;
};
type FeatherModelWebType = {
  isLocal: false;
  systemId: string;
};

const FeatherModel: React.FC<FeatherModelLocalType | FeatherModelWebType> = ({
  isLocal = true,
  systemId = undefined,
}) => {
  if (!isLocal && !systemId) return null;

  const api = FeatherApi.instance({ isLocal });

  // masterState is an array of arrays.
  // The outer array elements will be initialised to steps.length
  // And the inner array elements will be of inputs.length
  // The value of the inner elements is the state for the individual component
  // at i=step;j=index
  const [masterState, setMasterState] = useState<AppContextType[][]>([[]]);

  // TODO: finish changing masterState to this
  // const [masterState, setMasterState] = useState<MasterStateType>({
  //   currStep: 0,
  //   state: [[]],
  // });

  const [sysInfo, setSysInfo] = useState<ISystemInfo>();
  const [step, setStep] = useState<number>(0);
  const [stepInfo, setStepInfo] = useState<IStepInfo>();
  const [isComplete, setIsComplete] = useState(false);
  const [displayLoadingModal, setDisplayLoadingModal] = useState(false);
  const [comingSoonModal, setComingSoonModal] = useState(false);
  const [formErrorModal, setFormErrorModal] = useState(false);
  const [errorsOnStep, setErrorsOnStep] =
    useState<{ componentType: string; name: string; message: string }[]>();

  const [cache, setCache] = useState<CacheType[]>([]);
  const [countdown, setCountdown] = useState(15);
  const [countdownModal, setCountdownModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
  }, [countdown]);

  const getStepInfo = async (
    systemId: string,
    step: number,
    payloads: any[] | null = null
  ) => {
    console.log(
      "getStepInfo currMasterState (initial)",
      JSON.stringify(masterState)
    );

    setStep(step);

    let stepInfo;

    if (isLocal) {
      // Call local API
      try {
        stepInfo = await api.getStepInfo(systemId, step);
      } catch (error) {
        console.error("Axios error", error);
      }
    } else {
      // We already have full schema in web environment - skip GET
      if (step === sysInfo?.numSteps) {
        // FINAL step on webUI
        const finalStepInputs = { inputs: sysInfo?.schema?.finalOutputs };
        stepInfo = finalStepInputs as IStepInfo;
      } else {
        stepInfo = sysInfo?.schema?.steps[step] as IStepInfo;
      }
    }

    console.log("getStepInfo, step", step);
    console.log("getStepInfo stepInfo:", stepInfo);
    if (!stepInfo) return;

    // Assign payloads to input objects
    for (let i = 0; i < stepInfo.inputs.length; i++) {
      const input = stepInfo.inputs[i];
      console.log("getStepInfo input for i", i, input);
      input.payload = null;
      if (step == 0) {
        input.payload = stepInfo.staticData![i]; // staticData exists because step 0
      } else {
        console.log("getStepInfo payloads", payloads);
        if (payloads?.[i]) input.payload = payloads[i];
      }

      if (masterState[step][i] == undefined) {
        console.log("inside getStepInfo. Step (+1), i:", step - 1, i);
        const currMasterState = masterState;
        console.log(
          "getStepInfo currMasterState (pre)",
          JSON.stringify(currMasterState)
        );
        currMasterState[step] = [
          ...currMasterState[step],
          {
            input: { name: input.name, ...input.payload },
          },
        ];
        console.log(
          "getStepInfo currMasterState (post)",
          JSON.stringify(currMasterState)
        );

        setMasterState(currMasterState);
      }
    }

    setStepInfo(stepInfo);

    console.log("Finished getStepInfo");
    return stepInfo;
  };

  const createStepsUI = () => {
    if (!sysInfo?.numSteps) return;

    const steps = [];
    for (let i = 0; i < sysInfo?.numSteps; i++) {
      steps.push(
        <Step key={`step-${i}`}>
          <StepLabel>{`Step ${i + 1}`}</StepLabel>
        </Step>
      );
    }
    return steps;
  };

  const resetSteps = async () => {
    setComingSoonModal(true);
    // setIsComplete(false);
    // const sysInfo = await api.getSysInfo();
    // setSysInfo(sysInfo);
    // await getStepInfo(sysInfo.systemId, 0, context[0]?.result);
    // setStep(0);
  };

  const validateSteps = (
    inputsArray: { componentType: string; [key: string]: any }[]
  ) => {
    const invalidComponents = inputsArray.map((input) => {
      const componentInfo = {
        component: input.componentType,
        name: input.name,
      };
      switch (input.componentType) {
        case "Document.View":
          break;
        case "Document.WithTextIn":
          return input.documents.map(
            (document: any, i: number) =>
              !document.text && {
                ...componentInfo,
                message: `${componentInfo.component} (${
                  componentInfo.name
                }) - missing text input on the ${ordinalSuffixOf(
                  i + 1
                )} textbox`,
              }
          );
        case "File.Upload":
          return (
            input.files &&
            input.files.length == 0 && {
              ...componentInfo,
              message: `${componentInfo.component} (${componentInfo.name}) - no files uploaded`,
            }
          );

        case "File.Download":
          break;
        case "Image.View":
          break;
        case "Image.WithSelectOne":
          return input.images.map(
            (image: any, i: number) =>
              image.selectedIndex == -1 && {
                ...componentInfo,
                message: `${componentInfo.component} (${
                  componentInfo.name
                }) - missing an item selection on the ${ordinalSuffixOf(
                  i + 1
                )} image`,
              }
          );
        case "Image.WithSelectMulti":
          break;
        case "Image.WithTextIn":
          return input.images.map(
            (image: any, i: number) =>
              !image.text && {
                ...componentInfo,
                message: `${componentInfo.component} (${
                  componentInfo.name
                }) - missing text input for the ${ordinalSuffixOf(
                  i + 1
                )} image`,
              }
          );
        case "List.SelectOne":
          return (
            input.selectedIndex == -1 && {
              ...componentInfo,
              message: `${componentInfo.component} (${componentInfo.name}) - missing an item selection`,
            }
          );
        case "List.SelectMulti":
          break;
        case "Text.In":
          return input.text.map(
            (t: string, i: number) =>
              !t && {
                ...componentInfo,
                message: `${componentInfo.component} (${
                  componentInfo.name
                }) - missing text input for the ${ordinalSuffixOf(
                  i + 1
                )} textbox`,
              }
          );

        case "Text.View":
          break;
        default:
          break;
      }
    });

    const flattenedInvalidComponents = invalidComponents.flat().filter(Boolean);
    return flattenedInvalidComponents;
  };

  const getOutupts = async (result: any) => {
    if (result.outputs.length > 0) {
      return result.outputs;
    } else {
      // if 'outputs' isn't populated, that means we have an outputLocation
      // we need to fetch and return the contents of the json in outputLocation
      const outputLocation = result.outputLocation;
      const response = await fetch(outputLocation);
      const json = await response.json();
      return json;
    }
  };

  const handleNext = async () => {
    if (!sysInfo || !stepInfo) return;
    if (!sysInfo?.systemId) return;
    if (step >= sysInfo?.numSteps) return;

    const componentTypes = stepInfo.inputs.map(
      ({ componentType }) => componentType
    );
    const inputsArray: { componentType: string; [key: string]: any }[] =
      masterState[step].map((appContextObj, i) => ({
        componentType: componentTypes[i],
        ...appContextObj.input,
      }));

    const invalidComponents = validateSteps(inputsArray);
    if (invalidComponents.length !== 0) {
      setFormErrorModal(true);
      setErrorsOnStep(invalidComponents);
      return;
    }
    setDisplayLoadingModal(true);

    // Run current step
    console.log("Running step...", step);
    let result: any[] | null | undefined | any; // NV: last any shouldn't be there. {outputs: any[]} was throwing an error on line 270 still
    try {
      result = await api.runStep(
        sysInfo.systemId,
        step,
        stepInfo.name,
        inputsArray
      );
    } catch (error) {
      console.error("Axios error", error);
    }

    console.log("in handleNext pre result", result);
    // Save result to cache
    if (result) {
      if (!isLocal) {
        console.log("in if result but not local", result);
        result = await getOutupts(result); // type of result = {outputs: any[]}
      }
      console.log("runStep result:", result);

      const cacheUpToCurrentStep = cache.slice(0, step);
      cacheUpToCurrentStep.push({
        stepName: stepInfo.name,
        cacheArr: inputsArray,
      });
      setCache(cacheUpToCurrentStep);

      const masterStateCopy = _.cloneDeep(masterState);
      masterStateCopy[step].map((appContextObj, i) => ({
        input: appContextObj.input,
      }));
      // setStep(step + 1);
      setMasterState(masterStateCopy);
    }
    // Progress to next step
    getStepInfo(sysInfo.systemId, step + 1, result);
    if (step >= sysInfo.numSteps) setIsComplete(true);
    setDisplayLoadingModal(false);
  };

  const handleRefresh = async () => {
    if (!sysInfo || !stepInfo) return;
    if (!sysInfo?.systemId) return;
    if (step <= 0) return;

    console.log("Inside handleRefresh...");

    if (countdown > 0) {
      setCountdownModal(true);
    } else {
      console.log("all cache (handleRefresh)", cache);
      console.log("previous steps cache (handleRefresh)", cache[step - 1]);

      const previousStepCache = cache[step - 1];

      // Run current step
      setDisplayLoadingModal(true);
      console.log("Running step (refresh)...");
      let result: any[] | null | undefined | any; // NV: last any shouldn't be there. {outputs: any[]} was throwing an error on line 270 still
      try {
        result = await api.runStep(
          sysInfo.systemId,
          step - 1,
          previousStepCache.stepName,
          previousStepCache.cacheArr
        );
      } catch (error) {
        console.error("Axios error", error);
      }
      if (result) {
        if (!isLocal) {
          result = await getOutupts(result); // type of result = {outputs: any[]}
        }
        console.log("runStep result (handleRefresh):", JSON.stringify(result));

        const masterStateCopy = _.cloneDeep(masterState);
        const currentStepInMasterStateCopy = masterStateCopy[step].map(
          (appContextObj, i) => {
            return { input: appContextObj.input };
          }
        );
        masterStateCopy[step] = currentStepInMasterStateCopy;
        console.log(
          "masterStateCopy (handleRefresh)",
          JSON.stringify(masterStateCopy)
        );
        setMasterState(masterStateCopy);
      }

      getStepInfo(sysInfo.systemId, step, result);

      setDisplayLoadingModal(false);
      setCountdown(15);
    }
  };

  const handleBack = async () => {
    setComingSoonModal(true);

    // if (!sysInfo || !stepInfo) return;
    // if (!sysInfo?.systemId) return;
    // if (step <= 0) return;

    // console.log("Inside handleBack...");
    // console.log("Current step:", step, masterState[step]);

    // // Run previous step
    // console.log("Previous step:", step - 1, masterState[step - 1]);
    // console.log("Retrieving stepInfo...");
    // const caches = masterState[step - 1].map(
    //   (appContextObj) => appContextObj.cache
    // );
    // await getStepInfo(sysInfo.systemId, step - 1, caches);
    // setIsComplete(false);
    // setStep(step - 1);
  };

  useEffect(() => {
    const getSysInfo = async () => {
      let sysInfo;
      try {
        if (isLocal) {
          sysInfo = await api.getSysInfo();
        } else if (systemId) {
          sysInfo = await api.getPublicSysInfo(systemId);
        } else {
          console.error("No systemID supplied for web UI");
        }
      } catch (error) {
        console.error("Axios error", error);
      }

      console.log("sysInfo:", sysInfo);
      setSysInfo(sysInfo);

      if (sysInfo?.numSteps) {
        for (let i = 0; i < sysInfo.numSteps; i++) {
          const currMasterState = masterState;
          currMasterState.push([]);
          setMasterState(currMasterState);

          const currCache = cache;
          currCache.push({ stepName: "", cacheArr: {} });
          setCache(currCache);
        }
      }
    };

    getSysInfo();
  }, []);

  useEffect(() => {
    if (sysInfo?.systemId) {
      getStepInfo(sysInfo.systemId, step, null);
    }
  }, [sysInfo]);

  return (
    <div className="bg-composed-wrapper--content align-self-center p-4 p-xl-5">
      <Card className="card-box-hover-rise card-box-hover rounded-lg text-center mb-4 mb-md-0 d-block">
        {/* Top Bar */}
        <AppBar position="static" className="bg-deep-sky">
          <Toolbar className="justify-flex-end">
            <Typography
              className="text-white mr-auto"
              color="textPrimary"
              variant="h6"
            >
              {sysInfo?.name}
            </Typography>
            {step !== 0 && (
              <div style={{ cursor: "pointer" }} onClick={handleRefresh}>
                <ReplayIcon style={{ color: "white" }} />
              </div>
            )}
          </Toolbar>
        </AppBar>

        {/* Stepper */}
        <div className="bg-secondary mb-3 p-4">
          <Stepper
            className="stepper-horizontal-1"
            alternativeLabel
            activeStep={step}
            connector={<StepConnector />}
          >
            {createStepsUI()}
          </Stepper>
        </div>

        {console.log(
          "masterState (in render):",
          JSON.stringify(masterState),
          "step",
          step
        )}

        {/* Body */}
        {stepInfo ? (
          <FeatherStep
            masterState={masterState}
            setMasterState={setMasterState}
            systemId={sysInfo?.systemId || ""}
            step={step}
            stepInfo={stepInfo}
            isFinalStep={isComplete}
            resetSteps={resetSteps}
            isLocal={isLocal}
          />
        ) : null}

        {/* Footer */}
        <div className="card-footer mt-4 p-4 d-flex justify-content-between bg-secondary">
          {step > 0 ? (
            <Button
              className="btn-primary font-weight-bold rounded hover-scale-sm"
              onClick={handleBack}
            >
              Back
            </Button>
          ) : null}
          <>
            {/* BEGIN Dialogs */}
            <Dialog
              classes={{
                paper: "modal-content bg-deep-sky rounded-lg modal-dark",
              }}
              open={displayLoadingModal}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Loading</DialogTitle>
              <DialogContent className="text-center">
                <CircularProgress className="mt-2" style={{ color: "white" }} />
              </DialogContent>
            </Dialog>
            <Dialog
              classes={{
                paper: "modal-content bg-deep-sky rounded-lg modal-dark",
              }}
              open={comingSoonModal}
              onClose={() => setComingSoonModal(false)}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Feature coming soon
                <div style={{ position: "absolute", right: "8px", top: "8px" }}>
                  <IconButton
                    aria-label="close"
                    onClick={() => setComingSoonModal(false)}
                  >
                    <CloseIcon style={{ color: "white" }} />
                  </IconButton>
                </div>
              </DialogTitle>
              <DialogContent className="p-4">
                <DialogContentText>
                  <Typography>
                    <p>Coming soon - this feature is not yet available</p>
                  </Typography>
                </DialogContentText>
              </DialogContent>
            </Dialog>

            <Dialog
              classes={{
                paper: "modal-content bg-deep-sky rounded-lg modal-dark",
              }}
              open={formErrorModal}
              onClose={() => setFormErrorModal(false)}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Correct errors before submission
                <div style={{ position: "absolute", right: "8px", top: "8px" }}>
                  <IconButton
                    aria-label="close"
                    onClick={() => setFormErrorModal(false)}
                  >
                    <CloseIcon style={{ color: "white" }} />
                  </IconButton>
                </div>
              </DialogTitle>
              <DialogContent className="p-4">
                <DialogContentText>
                  {errorsOnStep?.map((error) => (
                    <Typography>{error.message}</Typography>
                  ))}
                </DialogContentText>
              </DialogContent>
            </Dialog>

            <Dialog
              classes={{
                paper: "modal-content bg-deep-sky rounded-lg modal-dark",
              }}
              open={countdownModal}
              onClose={() => setCountdownModal(false)}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Please wait
                <div style={{ position: "absolute", right: "8px", top: "8px" }}>
                  <IconButton
                    aria-label="close"
                    onClick={() => setCountdownModal(false)}
                  >
                    <CloseIcon style={{ color: "white" }} />
                  </IconButton>
                </div>
              </DialogTitle>
              <DialogContent className="p-4">
                <DialogContentText>
                  <Typography>
                    {countdown > 0 ? (
                      <>
                        Please wait {countdown} seconds before refreshing the
                        step
                      </>
                    ) : (
                      <Button
                        onClick={() => {
                          handleRefresh();
                          setCountdownModal(false);
                        }}
                        className="btn-success shadow-none hover-scale-lg text-center"
                      >
                        Refresh
                      </Button>
                    )}
                  </Typography>
                </DialogContentText>
              </DialogContent>
            </Dialog>

            {/* END Dialogs */}
            {isComplete ? null : (
              <Button
                className="btn-primary font-weight-bold rounded hover-scale-sm ml-auto"
                onClick={handleNext}
              >
                {step + 1 === sysInfo?.numSteps ? "Run Model" : "Next"}
              </Button>
            )}
          </>
        </div>
      </Card>
    </div>
  );
};

export default FeatherModel;
