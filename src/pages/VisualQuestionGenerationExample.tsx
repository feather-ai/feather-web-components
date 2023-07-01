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

import FileUpload from "../components/public/File/FileUpload";
import ImageView from "../components/public/Image/ImageView";
import ImageWithSelectMulti from "../components/public/Image/ImageWithSelectMulti";

const Step1 = () => {
  const fileUploadTitle = "Upload your pictures";
  const [state, setState] = useState([[{ cache: {}, input: [] }]]);

  return (
    <>
      <Container>
        <div className="p-4">
          <h5 className="font-size-xl mb-1 font-weight-bold">Description</h5>
          <p className="text-black-50 mb-4">
            This Visual Question Generation tool allows you to upload an image
            and have a model generate a question. Optionally you may select
            which objects/concepts in the image you want the model to generate
            questions for.
          </p>
          <Grid container spacing={6}>
            <Grid item md={12}>
              <FileUpload
                title={fileUploadTitle}
                step={0}
                index={0}
                name="myFileUpload"
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

const Step2 = () => {
  const [state, setState] = useState([
    [{ cache: {}, input: [] }],
    [{ cache: {}, input: [] }],
  ]);

  const imageUrls = [
    "https://images1.westend61.de/0001012337pw/alsatian-dog-catching-frisbee-ISF18166.jpg",
    "https://pbs.twimg.com/media/DCnBDANUIAAdMEQ?format=jpg&name=large",
    "https://www.thedailymeal.com/sites/default/files/story/eating%20pizza-iStock-ThinkstockPhotos-470336604.jpg",
  ];
  const lists = [
    [
      { item: "Dog", selected: true },
      { item: "Frisbee", selected: false },
      { item: "Person", selected: true },
      { item: "Tree", selected: false },
    ],
    [
      { item: "Faucet", selected: false },
      { item: "Cat", selected: false },
      { item: "Bottle", selected: false },
      { item: "Sponge", selected: false },
      { item: "Gloves", selected: false },
      { item: "Sink", selected: false },
    ],
    [
      { item: "People", selected: true },
      { item: "Box", selected: true },
      { item: "Pizza", selected: true },
      { item: "Sofa", selected: true },
    ],
  ];

  const images = [
    {
      data: imageUrls[0],
      attributes: lists[0],
      name: "myImage1.jpg",
    },
    {
      data: imageUrls[1],
      attributes: lists[1],
      name: "myCustomImage2.png",
    },
    {
      data: imageUrls[2],
      attributes: lists[2],
      name: "lol.gif",
    },
  ];

  return (
    <>
      <Container>
        <div className="p-4">
          <h5 className="font-size-xl mb-1 font-weight-bold">Select objects</h5>
          <Typography
            color="textSecondary"
            variant="body1"
            className="text-left m-4"
          >
            This model can allow you to generate questions based on specific
            objects in the image. For each image you have uploaded, optionally
            select a subset of objects you'd like the model to generate a
            question on.
          </Typography>
          <ImageWithSelectMulti
            images={images}
            step={1}
            index={0}
            name="myFileUpload"
            masterStateCopy={state}
            setMasterState={setState}
          />
        </div>
      </Container>
    </>
  );
};

const FinishedStep = () => {
  const [state, setState] = useState([
    [{ cache: {}, input: [] }],
    [{ cache: {}, input: [] }],
    [{ cache: {}, input: [] }],
  ]);

  const imageUrls = [
    "https://images1.westend61.de/0001012337pw/alsatian-dog-catching-frisbee-ISF18166.jpg",
    "https://pbs.twimg.com/media/DCnBDANUIAAdMEQ?format=jpg&name=large",
    "https://www.thedailymeal.com/sites/default/files/story/eating%20pizza-iStock-ThinkstockPhotos-470336604.jpg",
  ];

  const images = [
    { data: imageUrls[0], text: "What breed of dog is in the picture?" },
    { data: imageUrls[1], text: "What colour are the gloves?" },
    { data: imageUrls[2], text: "How many people are in the picture?" },
  ];

  return (
    <>
      <Container>
        <h5 className="font-size-xl mb-4 font-weight-bold">
          Click on an image to view a question
        </h5>
        <ImageView
          images={images}
          step={2}
          index={0}
          name="myFileUpload"
          masterStateCopy={state}
          setMasterState={setState}
        />
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
    2: <SettingsIcon />,
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
  return ["Step 1", "Step 2"];
};

const getStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    default:
      return <Step1 />;
  }
};

const VisualQuestionGeneration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleMoreInfo = () => {
    console.info("You clicked the info icon.");
  };

  return (
    <div className="bg-composed-wrapper--content align-self-center p-4 p-xl-5">
      <Card className="card-box-hover-rise card-box-hover rounded-lg text-center mb-4 mb-md-0 d-block">
        <AppBar position="static" className="bg-deep-sky">
          <Toolbar>
            <Typography className="text-white" color="textPrimary" variant="h6">
              Visual Question Generation
            </Typography>
          </Toolbar>
        </AppBar>
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
            <div className="text-center mb-3 p-4">
              <FinishedStep />
              <div className="pt-4">
                <Button
                  onClick={handleReset}
                  className="btn-warning font-weight-bold rounded hover-scale-sm mx-1"
                  size="large"
                >
                  <span className="btn-wrapper--label">Try another sample</span>
                </Button>
                <div className="mt-3">
                  <Typography variant="caption">
                    Like the output? Want to use this in your app/program?
                  </Typography>{" "}
                  <br />
                  <Button
                    className="btn-info hover-scale-sm rounded"
                    variant="contained"
                  >
                    Use as a service
                  </Button>
                </div>
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
                  className="btn-primary font-weight-bold rounded hover-scale-lg"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Run Model" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default VisualQuestionGeneration;
