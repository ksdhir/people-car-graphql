import { useMutation } from "@apollo/client";
import { Button, Form, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { ADD_CAR, GET_PEOPLE_WITH_CARS } from "../../graphql/queries";

// import components
import SelectPerson from "../inputs/SelectItem";

const UpsertCar = ({ type, year, make, model, price, person }) => {

  const [id] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [addCar] = useMutation(ADD_CAR);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {


    const { personId, make, model, price, year } = values;

    console.log(values)
    return

    addCar({
      variables: {
        id,
        personId,
        make,
        model,
        price: price.toString(),
        year: year.toString(),
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE_WITH_CARS });
        console.log(data);

        console.log("PENDING UPDATE");
        // cache.writeQuery({
        //   query: GET_PEOPLE,
        //   data: {
        //     ...data,
        //     contacts: [...data.contacts, addPerson]
        //   }
        // })
      }
    });
  };

  function handleSelectedPerson(val) {
    //console.log(val)
  }

  return (
    <Form
      name="add-car-form"
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
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            {type === "Add" ? "Add Car" : "Update Car"}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default UpsertCar;
