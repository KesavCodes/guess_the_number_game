import { StyleSheet, Text, View, Dimensions } from "react-native";
import Colors from "../../constants/colors";

const NumberContainer = ({children}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
};

export default NumberContainer;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500, 
    padding: deviceWidth < 380 || deviceHeight < 400 ? 12 : 24,
    margin: deviceWidth < 380 || deviceHeight < 400 ? 12 : 24,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontFamily: "OpenSansBold",
    color: Colors.accent500,
    fontSize: deviceWidth < 380 || deviceHeight < 400 ? 20 : 36,
  },
});
