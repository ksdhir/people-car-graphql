import { Divider } from "antd";

const Title = () => {
  const styles = getStyles();

  return <h1 style={styles.title}>People and their cars!</h1>;
};

const getStyles = () => ({
  title: {
    fontSize: 40,
    padding: "15px",
    marginBottom: "20px",
  },
});

export default Title;
