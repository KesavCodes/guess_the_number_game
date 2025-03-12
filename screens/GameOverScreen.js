import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Title from "./../components/ui/Title";
import Colors from "./../constants/colors";
import PrimaryButton from "./../components/ui/PrimaryButton";

const GameOverScreen = ({ roundsNumber, userNumber, onStarNewGame }) => {
  const { width, height } = useWindowDimensions();
  const imageStyles = {
    height: width < 380 || height < 400 ? 200 : 320,
    width: width < 380 || height < 400 ? 200 : 320,
    borderRadius: width < 380 || height < 400 ? 100 : 160,
  };
  return (
    <View
      style={[
        styles.rootContainer,
        height < 400 ? { justifyContent: "center" } : {},
      ]}
    >
      <Title>GAME OVER!</Title>
      <View
        style={[
          height < 400
            ? { flexDirection: "row", alignItems: "center", gap: 16 }
            : {},
        ]}
      >
        <View style={[styles.imageContainer, imageStyles]}>
          <Image
            source={require("../assets/images/success.png")}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={styles.summaryTxt}>
            Your phone needed{" "}
            <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess
            the number <Text style={styles.highlight}>{userNumber}</Text>.
          </Text>
          <PrimaryButton onPress={onStarNewGame}>Start New Game</PrimaryButton>
        </View>
      </View>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
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
