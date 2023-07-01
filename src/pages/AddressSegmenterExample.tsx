import React, { useState } from "react";
import {
  Grid,
  Card,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import Check from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import StepConnector from "@material-ui/core/StepConnector";
import clsx from "clsx";
import TextIn from "../components/public/Text/TextIn";
import { EnvironmentType } from "../utils/utils";
import WebUIPostRun from "../components/views/WebUIPostRun";
import LocalUIPostRun from "../components/views/LocalUIPostRun";
import LocalUIPostRunStep from "../components/views/LocalUIPostRunStep";

const Step1 = () => {
  const [state, setState] = useState([[{ cache: {}, input: [] }]]);

  return (
    <>
      <Container>
        <div className="p-4">
          <h5 className="font-size-xl mb-1 font-weight-bold">Description</h5>
          <p className="text-black-50 mb-4">
            <Typography
              color="textSecondary"
              variant="body1"
              className="text-left m-4"
            >
              Address Segmentation allows you to enter an unstructured address
              (e.g. 123 Residence Road, UK, F4K3 P0C0) and have it return a
              structured address. For example: <br />
              <b>House Number:</b> 123, <br />
              <b>House Name:</b> "", <br />
              <b>Building Name:</b> FlatHouse Place, <br />
              <b>Road Name:</b> Residence Road, <br />
              <b>City:</b> London, <br />
              <b>County:</b> London, <br />
              <b>Country:</b> UK, <br />
              <b>Postcode:</b> F4K3 P0C0
            </Typography>
          </p>
          <Grid container spacing={6}>
            <Grid item md={12}>
              <TextIn
                title="Enter Address"
                text={["456, L4M B0 UK"]}
                step={0}
                index={0}
                name="myTextIn"
                maxChars={256}
                masterStateCopy={state}
                setMasterState={setState}
              />
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};
const FinishedStep = () => {
  return (
    <>
      <Container>
        <div className="d-flex justify-content-center">
          <Typography variant="body1" className="text-left align-center">
            <b>House Number:</b> 456, <br />
            <b>House Name:</b> Pinnacle House, <br />
            <b>Building Name:</b> <br />
            <b>Road Name:</b> Fake Road, <br />
            <b>City:</b> Lancaster, <br />
            <b>County:</b> Lancashire, <br />
            <b>Country:</b> UK, <br />
            <b>Postcode:</b> L4M B0
          </Typography>
        </div>
      </Container>
    </>
  );
};

interface StepIconProps {
  active: boolean;
  completed: boolean;
  icon: number;
}

interface IconsType {
  [key: number]: JSX.Element;
}

const StepIcon: React.FC<StepIconProps> = ({ active, completed, icon }) => {
  const icons: IconsType = {
    1: <SettingsIcon />,
  };

  return (
    <div
      className={clsx(
        "d-50 transition-base d-flex align-items-center bg-gray-400 justify-content-center rounded",
        {
          "d-80 bg-primary text-white shadow-primary-sm": active,
          "d-50 bg-success text-white shadow-success-sm": completed,
        }
      )}
    >
      {completed ? <Check className="completed" /> : icons[icon]}
    </div>
  );
};

const getSteps = () => {
  return ["Step 1"];
};

const getStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <Step1 />;
    default:
      return <Step1 />;
  }
};

type AddressSegmentationProps = EnvironmentType;
const AddressSegmentation: React.FC<AddressSegmentationProps> = ({
  environment,
}) => {
  const title = "Address Segmentation";
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const [LOCALUI_postRunState, LOCALUI_setPostRunStep] = useState({
    active: false,
    type: "",
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const WEBUI_handleReset = () => {
    setActiveStep(0);
  };

  const LOCALUI_handleReset = () => {
    setActiveStep(0);
  };

  const LOCALUI_showUpload = (type: string) => {
    LOCALUI_setPostRunStep({ active: true, type });
  };

  const renderComponentBasedOnEnvironment = () => {
    switch (environment) {
      case "local":
        return (
          <LocalUIPostRun
            contextId="fakeContextId"
            resetStates={LOCALUI_handleReset}
          />
        );
        break;
      case "web":
        return <WebUIPostRun onClick={WEBUI_handleReset} />;
        break;
    }
  };

  return (
    <div className="bg-composed-wrapper--content align-self-center p-4 p-xl-5">
      <Card className="card-box-hover-rise card-box-hover rounded-lg text-center mb-4 mb-md-0 d-block">
        <AppBar position="static" className="bg-deep-sky">
          <Toolbar>
            <Typography className="text-white" color="textPrimary" variant="h6">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        {LOCALUI_postRunState.active ? (
          <LocalUIPostRunStep type={LOCALUI_postRunState.type} title={title} />
        ) : (
          <div>
            <div className="bg-secondary mb-3 p-4">
              <Stepper
                className="stepper-horizontal-1"
                alternativeLabel
                activeStep={activeStep}
                connector={<StepConnector />}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            {activeStep === steps.length ? (
              <div className="text-center p-5">
                <FinishedStep />
                <div className="pt-4">
                  {renderComponentBasedOnEnvironment()}
                </div>
              </div>
            ) : (
              <div>
                <div>{getStepContent(activeStep)}</div>
                <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                  <Button
                    disabled={activeStep === 0}
                    className="btn-primary font-weight-bold rounded hover-scale-sm"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    className="btn-primary font-weight-bold rounded hover-scale-lg px-3"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Run Model" : "Next"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AddressSegmentation;
