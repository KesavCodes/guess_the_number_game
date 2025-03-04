import { StyleSheet, Text } from "react-native";

const Title = ({ children }) => {
  return <Text style={style.title}>{children}</Text>;
};

export default Title;

const style = StyleSheet.create({
  title: {
    fontFamily: "OpenSansBold",
    fontSize: 24,
    color: 'white',
    textAlign: "center",
    borderWidth: 3,
    borderColor: 'white',
    padding: 12,
  },
});
