import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import {
  ADD_PERSON,
  GET_PEOPLE_WITH_CARS,
  UPDATE_PERSON,
} from "../../graphql/queries";

const UpsertPerson = ({ onButtonClick, id, type, firstName, lastName }) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [addPerson] = useMutation(ADD_PERSON);
  const [updatePerson] = useMutation(UPDATE_PERSON);

  useEffect(() => {
    forceUpdate({});
  }, []);

  function addNewPerson(values) {
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
  }

  function updateExistingPerson(values) {
    console.log(values);
    console.log(id);
    console.log("update values of existing person");

    const { firstName, lastName } = values;

    updatePerson({
      variables: {
        id,
        firstName,
        lastName,
      },
      update: (cache, { data: { updatePerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE_WITH_CARS });

        const updatedData = data.peopleWithCars.map((personObj) => {
          if (personObj.person.id === id) {
            return {
              person: updatePerson,
              cars: personObj.cars,
            };
          } else {
            return personObj;
          }
        });

        cache.writeQuery({
          query: GET_PEOPLE_WITH_CARS,
          data: {
            peopleWithCars: [...updatedData],
          },
        });
      },
    });
  }

  const onFinish = (values) => {
    if (type === "Add") {
      addNewPerson(values);
    } else {
      updateExistingPerson(values);
      onButtonClick();
    }
  };

  return (
    <Form
      name={`${type}-person-form-${id}`}
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
            {type === "Add" ? "Add Person" : "Update Person"}
          </Button>
        )}
      </Form.Item>

      {type === "Update" && <Button onClick={onButtonClick}>Cancel</Button>}
    </Form>
  );
};

export default UpsertPerson;
