import { useQuery } from "@apollo/client";
import { GET_PEOPLE_WITH_CARS } from "../../graphql/queries";
import { List } from "antd";
import PersonCard from "../listItems/PersonCard";
// import  from '../listItems/ContactCard'

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

const Record = () => {
  const styles = getStyles();
  const { loading, error, data } = useQuery(GET_PEOPLE_WITH_CARS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {/* {data.contacts.map(({ id, firstName, lastName }) => (
        <List.Item key={id}>
          <ContactCard id={id} firstName={firstName} lastName={lastName} />
        </List.Item>
      ))} */}

      {data.peopleWithCars.map(({ person, cars }) => (
        <List.Item key={person.id}>
          <PersonCard
            id={person.id}
            firstName={person.firstName}
            lastName={person.lastName}
            cars={cars}
          />
        </List.Item>
      ))}

    </List>
  );
};

export default Record;
