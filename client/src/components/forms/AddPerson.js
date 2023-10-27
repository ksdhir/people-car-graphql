import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { ADD_PERSON, GET_PEOPLE_WITH_CARS } from "../../graphql/queries";

const AddPerson = () => {
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
        id: uuidv4(),
        firstName,
        lastName,
      },

      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE_WITH_CARS });

        cache.writeQuery({
          query: GET_PEOPLE_WITH_CARS,
          data: {
            peopleWithCars: [
              ...data.peopleWithCars,
              {
                person: addPerson,
                cars: [],
              },
            ],
          },
        });
      },
    });

    // clear form
    form.resetFields();
  };

  return (
    <Form
      name="add-person-form"
      layout="inline"
      size="large"
      style={{ marginBottom: "30px" }}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "Please enter a first name" }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please enter a last name" }]}
      >
        <Input placeholder="Last Name" />
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
            Add Person
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddPerson;
