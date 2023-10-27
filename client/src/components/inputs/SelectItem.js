import { Select } from "antd";

import { GET_PEOPLE } from '../../graphql/queries'
import { useQuery } from "@apollo/client";

const SelectItem = (props) => {


  const handleChange = (value) => {
    console.log(value)
    props.onChange(value)
  };

  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const peopleList = data.peopleWithCars.map((person) => {
    return {
      value: person.person.id,
      label: `${person.person.firstName} ${person.person.lastName}`,
    };
  });

  console.log(peopleList)

  console.log(props.defaultSelectedPerson)

  return (
    <Select
     defaultValue={props.defaultSelectedPerson}
      placeholder="Select a person"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={peopleList}
    />
  );
};

export default SelectItem;
