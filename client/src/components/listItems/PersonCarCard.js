import { Card } from "antd";
// import RemoveContact from '../buttons/RemoveContact'
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import RemoveCar from "../buttons/RemoveCar";
import UpsertCar from "../forms/UpsertCar";

const PersonCardCard = ({ year, price, make, model, id, person }) => {
  const [editMode, setEditMode] = useState(false);
  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      {editMode ? (
        <UpsertCar
          type={"Update"}
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          person={person}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          type="inner"
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar id={id} />,
          ]}
          title={`${year} ${make} ${model} -> $ ${parseFloat(price).toLocaleString()}`}
        ></Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  card: {
    width: "800px",
  },
});

export default PersonCardCard;
