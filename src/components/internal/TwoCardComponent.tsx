import { Grid } from "@material-ui/core";
import React from "react";

type TwoCardComponentContainerProps = {
  children: React.ReactNode;
};

const TwoCardComponentContainer: React.FC<TwoCardComponentContainerProps> = ({
  children,
}) => {
  return (
    <Grid container spacing={6} className="justify-content-center">
      {children}
    </Grid>
  );
};

export default TwoCardComponentContainer;
