import { Card, List } from "antd";
// import RemoveContact from '../buttons/RemoveContact'
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import RemovePerson from "../buttons/RemovePerson";
import UpsertPerson from "../forms/UpsertPerson";
import PersonCardCard from "./PersonCarCard";

const PersonCard = (props) => {
  const [editMode, setEditMode] = useState(false);
  const { id, firstName, lastName, cars } = props;
  const personId = id;
  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      {editMode ? (
        <UpsertPerson
          type={"Update"}
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson id={id} />,
          ]}
          title={`${firstName} ${lastName}`}
        >
          {cars.map(({ id, year, make, model, price }) => (
            <List.Item key={id}>
              <PersonCardCard
                id={id}
                year={year}
                make={make}
                model={model}
                price={price}
                person={{value: personId, label: firstName + " " + lastName}}
              />
            </List.Item>
          ))}
        </Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  card: {
  },
});

export default PersonCard;
