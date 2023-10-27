import { useMutation } from "@apollo/client";
import { Button, Form, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { ADD_CAR, GET_PEOPLE_WITH_CARS, UPDATE_CAR } from "../../graphql/queries";

// import components
import SelectPerson from "../inputs/SelectItem";

const UpsertCar = ({ type, year, make, model, price, id, onButtonClick, person }) => {

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [addCar] = useMutation(ADD_CAR);
  const [updateCar] = useMutation(UPDATE_CAR);

  useEffect(() => {
    forceUpdate({});
  }, []);


  function insertCarIntoPerson(data, personId, newCar) {
    // Clone the existing data to avoid modifying it directly
    const newData = JSON.parse(JSON.stringify(data));
  
    // Find the person by their ID
    const person = newData.peopleWithCars.find(
      (personWithCars) => personWithCars.person.id === personId
    );
  
    // If the person is found, insert the new car into their cars array
    if (person) {
      if (!person.cars) {
        person.cars = [];
      }
      person.cars.push(newCar);
    }
  
    return newData;
  }
  


  function addNewCar(values) {
    const { personId, make, model, price, year } = values;

    addCar({
      variables: {
        id: uuidv4(),
        personId,
        make,
        model,
        price: price.toString(),
        year: year.toString(),
      },

      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE_WITH_CARS });

        const newData = insertCarIntoPerson(data, personId, addCar);
        cache.writeQuery({
          query: GET_PEOPLE_WITH_CARS,
          data: {
            ...newData,
          }
        })
      }
    });
  }

  function updateCarById(data, carIdToUpdate, updatedCarData) {
    // Clone the existing data to avoid modifying it directly
    const newData = JSON.parse(JSON.stringify(data));
  
    // Find the person with the car to update
    for (const personWithCars of newData.peopleWithCars) {
      const carToUpdate = personWithCars.cars.find((car) => car.id === carIdToUpdate);
      if (carToUpdate) {
        // Update the car data
        Object.assign(carToUpdate, updatedCarData);
        break;
      }
    }
  
    return newData;
  }

  function updateExistingCar(values) {

    const { personId, make, model, price, year } = values;

    updateCar({
      variables: {
        id,
        personId,
        make,
        model,
        price: price.toString(),
        year: year.toString(),
      },
      update: (cache, { data: { updateCar } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE_WITH_CARS });

        console.log(data)
        // const updatedData = updateCarById(data, updateCar.id, updateCar);

        // cache.writeQuery({
        //   query: GET_PEOPLE_WITH_CARS,
        //   data: {
        //     ...updatedData,
        //   }
        // })


      }
    });

  }


  const onFinish = (values) => {

    if (type === "Update") {
      updateExistingCar(values);
      //onButtonClick();
    } else {
      addNewCar(values);
    }   
  };

  function handleSelectedPerson(val) {
    //console.log(val)
  }

  return (
    <Form
      name={`${type}-car-form-${id}`}
      layout="inline"
      size="large"
      style={{ marginBottom: "30px" }}
      form={form}
      onFinish={onFinish}
    >
      {/* The year of the car */}
      <Form.Item
        label="Year"
        name="year"
        rules={[{ required: true, message: "Please enter an year" }]}
      >
        <InputNumber
          defaultValue={year}
          style={{
            width: 80,
          }}
          placeholder="Year"
          min={0}
        />
      </Form.Item>

      {/* The make of the car */}
      <Form.Item
        label="Make"
        name="make"
        rules={[{ required: true, message: "Please enter the make" }]}
      >
        <Input defaultValue={make} placeholder="Make" />
      </Form.Item>

      {/* The model of the car */}
      <Form.Item
        label="Model"
        name="model"
        rules={[{ required: true, message: "Please enter the model" }]}
      >
        <Input defaultValue={model} placeholder="Model" />
      </Form.Item>

      {/* The price of the car */}
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please enter the price" }]}
      >
        <InputNumber
          defaultValue={price}
          prefix="$"
          style={{
            width: 80,
          }}
          min={0}
        />
      </Form.Item>

      {/* Select a person */}

      <Form.Item label="Person" name="personId">
        <SelectPerson type={type} defaultSelectedPerson={person} onChange={handleSelectedPerson}  />
      </Form.Item>

      {/* Form Update Button */}
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (type === "Update" ? undefined :
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length)
            }
          >
            {type === "Add" ? "Add Car" : "Update Car"}
          </Button>
        )}
      </Form.Item>
      {type === "Update" && <Button onClick={onButtonClick}>Cancel</Button>}
    </Form>
  );
};

export default UpsertCar;
