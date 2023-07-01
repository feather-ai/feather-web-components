import React from "react";

type GenericTitleDescriptionProps = {
  title?: string;
  description?: string;
};

const GenericTitleDescription: React.FC<GenericTitleDescriptionProps> = ({
  title,
  description,
}) => {
  return (
    <div className="text-center">
      {title && (
        <div className="font-size-md mb-1 font-weight-bold">{title}</div>
      )}
      {description && <div className="font-size-md mb-1">{description}</div>}
    </div>
  );
};

export default GenericTitleDescription;
