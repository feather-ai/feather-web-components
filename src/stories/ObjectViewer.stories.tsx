import React from "react";
import ObjectViewer from "../components/public/Text/ObjectViewer";

export default {
  title: "Components/ObjectViewer",
  component: ObjectViewer,
};

const myJson = JSON.stringify({
  "House Number": 123,
  "House Name": "",
  "Building Name": "FlatHouse Place",
  "Road Name": "Residence Road",
  City: "London",
  County: "London",
  Country: "UK",
  Postcode: "F4K3 P0C0",
});

const Template = () => (
  <>
    <div style={{ width: "50%", margin: "auto" }}>
      <ObjectViewer json={myJson} />
    </div>
  </>
);

export const Main = Template.bind({});
