import "../App.css";
import Title from "../components/layout/Title";
import { Divider, List, Typography } from "antd";
import { Link, useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";

import { GET_PERSON_WITH_CARS } from "../graphql/queries";


const Person = () => {


  const { id } = useParams();
  const { loading, error, data, refetch} = useQuery(GET_PERSON_WITH_CARS, {
    variables: {id: id}
  });

  // refetch for latest updates
  refetch();

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :</p>

  console.log(data);


  const { person, cars } = data.personWithCars;


  return (
    <div className="App">
      {/* Title */}
      <Title />
      <Divider />
      {/* Link to home */}
      <Divider>
        <Link to="/">GO BACK HOME</Link>
      </Divider>
      {/* Display Person's info */}

      <h2>{person.firstName + " " + person.lastName}</h2>

      <List
      header={<div>Cars of the person</div>}
      bordered
      dataSource={cars}
      renderItem={(item) => (
        <List.Item>
          {`${item.year} ${item.make} ${item.model} -> $ ${parseFloat(item.price).toLocaleString()}`}
        </List.Item>
      )}
    />
    </div>
  );
};

export default Person;
