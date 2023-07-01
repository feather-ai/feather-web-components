import React from "react";

import { Card, CardContent } from "@material-ui/core";

type DisplayCardProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};
const DisplayCard: React.FC<DisplayCardProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <>
      {title || description ? (
        <Card>
          <div className="card-header bg-secondary card-box">
            <div className="card-header--title card-header-alt">
              {title && (
                <h5 className="font-size-lg mb-0 line-height-1 py-2 font-weight-bold">
                  {title}
                </h5>
              )}
              {description && (
                <p className="text-black-50 mb-0">{description}</p>
              )}
            </div>
          </div>
          <CardContent className="p-4">{children}</CardContent>
        </Card>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default DisplayCard;
