import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { REMOVE_CAR, GET_PEOPLE_WITH_CARS } from "../../graphql/queries";

const RemoveCar = ({ id }) => {

  function deleteCarById(data, carIdToDelete) {
    // Find the person with the car to delete
    const personIndexToDelete = data.findIndex(personWithCar =>
      personWithCar.cars.some(car => car.id === carIdToDelete)
    );
  
    if (personIndexToDelete !== -1) {
      // Create a copy of the person
      const updatedPerson = { ...data[personIndexToDelete] };
      
      // Filter out the car to delete from the person's cars array
      updatedPerson.cars = updatedPerson.cars.filter(car => car.id !== carIdToDelete);
  
      // Create a new data array with the updated person
      const updatedData = [...data];
      updatedData[personIndexToDelete] = updatedPerson;
  
      return updatedData;
    }
  
    return data;
  }

  const [removeCar] = useMutation(REMOVE_CAR, {
    update: (cache, { data: { removeCar } }) => {
      const data = cache.readQuery({ query: GET_PEOPLE_WITH_CARS });
      const peopleWithCars = data.peopleWithCars;
      const filteredData = deleteCarById(peopleWithCars, id);
      cache.writeQuery({
        query: GET_PEOPLE_WITH_CARS,
        data: {
          peopleWithCars: [...filteredData],
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this car?");

    if (result) {
      removeCar({
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

export default RemoveCar;
