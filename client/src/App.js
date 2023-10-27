import "./App.css";
import Title from "./components/layout/Title";
import UpsertPerson from "./components/forms/UpsertPerson";
import UpsertCar from "./components/forms/UpsertCar";

import RecordsSection from "./components/sections/Record";

import { Divider } from "antd";

const App = () => {
  return (
    <div className="App">
      <Title />
      <Divider />
      <Divider>
        <h2>Add Person</h2>
      </Divider>
      <UpsertPerson type={"Add"} />
      {/* <Contacts /> */}
      <Divider>
        <h2>Add Car</h2>
      </Divider>
      <UpsertCar type={"Add"} />
      {/* Records Section */}
      <Divider>
        <h2>Records</h2>
      </Divider>
      <RecordsSection />
    </div>
  );
};

export default App;
