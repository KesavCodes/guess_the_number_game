import { Image, StyleSheet, Text, View } from "react-native";
import Title from "./../components/ui/Title";
import Colors from "./../constants/colors";
import PrimaryButton from "./../components/ui/PrimaryButton";

const GameOverScreen = ({ roundsNumber, userNumber, onStarNewGame }) => {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/success.png")}
          style={styles.image}
        />
      </View>
      <Text style={styles.summaryTxt}>
        Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
        rounds to guess the number{" "}
        <Text style={styles.highlight}>{userNumber}</Text>.
      </Text>
      <PrimaryButton onPress={onStarNewGame}>Start New Game</PrimaryButton>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
  },
  imageContainer: {
    height: 320,
    width: 320,
    borderRadius: 160,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    marginVertical: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryTxt: {
    fontFamily: "OpenSansRegular",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    fontFamily: "OpenSansBold",
    color: Colors.primary800,
  },
});
