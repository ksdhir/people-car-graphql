import { Select } from "antd";
import { useState } from "react";

const SelectItem = (props) => {
  

  const handleChange = (value) => {
    console.log(value);
    // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  };

  return (
    <Select
     defaultValue={props.defaultValue}
      placeholder="Select a person"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: "jack",
          label: "Jack (100)",
        },
        {
          value: "lucy",
          label: "Lucy (101)",
        },
      ]}
    />
  );
};

export default SelectItem;
