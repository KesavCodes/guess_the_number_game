import { StyleSheet, View } from "react-native";
import Colors from "../../constants/colors";

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    marginTop: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 8, // To apply box shadow in Android
    shadowColor: "black", // To apply box shadow in IOS
    shadowOffset: { width: 0, height: 2 }, // To apply box shadow in IOS
    shadowRadius: 6, // To apply box shadow in IOS
    shadowOpacity: 0.25, // To apply box shadow in IOS
  },
});
