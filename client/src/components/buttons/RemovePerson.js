import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { REMOVE_PERSON, GET_PEOPLE_WITH_CARS } from "../../graphql/queries";

const RemovePerson = ({ id }) => {
  const [removeContact] = useMutation(REMOVE_PERSON, {

    update: (cache, { data: { removeContact } }) => {
      const data = cache.readQuery({ query: GET_PEOPLE_WITH_CARS });

      const filteredData = data.peopleWithCars.filter((personObj) => {
        return personObj.person.id !== id;
      });

      cache.writeQuery({
        query: GET_PEOPLE_WITH_CARS,
        data: {
          peopleWithCars: [...filteredData],
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (result) {
      removeContact({
        variables: {
          id,
        },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      style={{ color: "red" }}
    />
  );
};

export default RemovePerson;
