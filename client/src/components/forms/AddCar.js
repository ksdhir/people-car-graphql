import { useMutation } from "@apollo/client";
import { Button, Form, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { ADD_PERSON, GET_PEOPLE } from "../../graphql/queries";

// import components
import SelectPerson from "../inputs/SelectItem";

const AddCar = (props) => {


  const type = props.type;

  const [id] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [addPerson] = useMutation(ADD_PERSON);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    addPerson({
      variables: {
        id,
        firstName,
        lastName,
      },

      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE });
        console.log(data);

        console.log("PENDING UPDATE");
        // cache.writeQuery({
        //   query: GET_PEOPLE,
        //   data: {
        //     ...data,
        //     contacts: [...data.contacts, addPerson]
        //   }
        // })
      },
    });
  };

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
        <Input placeholder="Make" />
      </Form.Item>

      {/* The model of the car */}
      <Form.Item
        label="Model"
        name="model"
        rules={[{ required: true, message: "Please enter the model" }]}
      >
        <Input placeholder="Model" />
      </Form.Item>

      {/* The price of the car */}
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please enter the price" }]}
      >
        <InputNumber
          prefix="$"
          style={{
            width: 80,
          }}
          min={0}
        />
      </Form.Item>

      {/* Select a person */}

      <Form.Item label="Person" name="Person">
        <SelectPerson type={type} defaultSelectedPerson={null} />
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
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddCar;
