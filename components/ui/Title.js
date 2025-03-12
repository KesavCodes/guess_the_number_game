import { StyleSheet, Text, Platform } from "react-native";

const Title = ({ children }) => {
  return <Text style={style.title}>{children}</Text>;
};

export default Title;

const style = StyleSheet.create({
  title: {
    fontFamily: "OpenSansBold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    // borderWidth: Platform.OS === "android" ? 3 : 0,
    borderWidth: Platform.select({ ios: 0, android: 3 }),
    borderColor: "white",
    padding: 12,
    width: 300,
    maxWidth: "80%", // Dynamic width for smaller devices
    alignSelf: "center",
  },
});
