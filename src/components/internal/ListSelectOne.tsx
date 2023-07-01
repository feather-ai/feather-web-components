import React from "react";
import Dropdown from "./Dropdown";
import RadioComponent from "./Radio";
import DisplayCard from "./DisplayCard";

export type ListSelectOneProps = {
  title?: string;
  description?: string;
  items: string[];
  style: "dropdown" | "radio";
  fileIndex?: number;
  selectedIndex?: number;
  setSelectedIndex?: (fileIndex: number, newValueIndex: number) => void;
};

// This component needs to lift state up to a parent component,
// Occasionally the parent component (e.g. ImageWithSelectOne) has multiple files/images
// And "fileIndex", "initSelectedIndex" and "setSelectedIndex" are props which the parent component would pass in
// These props are usually states on the parent component.
// To render just the list in isolation, we have a parent component called <ListSelectOneWrapper />
// That component implements state which keeps track of the selected values.
// Use that component instead of this one for when an isolated SelectOne is required
const ListSelectOne: React.FC<ListSelectOneProps> = ({
  style,
  items,
  title,
  description,
  fileIndex,
  selectedIndex,
  setSelectedIndex,
}) => {
  return (
    <div>
      <DisplayCard title={title} description={description}>
        {style === "dropdown" && (
          <Dropdown
            title={title}
            list={items}
            fileIndex={fileIndex}
            initSelectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        )}
        {style === "radio" && (
          <RadioComponent
            title={title}
            list={items}
            fileIndex={fileIndex}
            initSelectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        )}
      </DisplayCard>
    </div>
  );
};

export default ListSelectOne;
