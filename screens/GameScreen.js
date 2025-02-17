import { StyleSheet, View, Text, Alert } from "react-native";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import { useEffect, useState } from "react";
import PrimaryButton from "./../components/ui/PrimaryButton";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

const range = {
  min: 1,
  max: 100,
};

const GameScreen = ({ userNumber, changeScreen }) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(range.min, range.max, userNumber)
  );
  const changeNumberHandler = (direction) => {
    // 'higher' or 'lower'
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    } else if (direction === "lower") {
      range.max = currentGuess;
    } else {
      range.min = currentGuess + 1;
    }
    const newRandomNumber = generateRandomBetween(
      range.min,
      range.max,
      currentGuess
    );
    setCurrentGuess(newRandomNumber);
  };

  useEffect(() => {
    if (currentGuess === userNumber) changeScreen("over");
  }, [currentGuess, userNumber, changeScreen]);

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or Lower</Text>
        <View>
          <PrimaryButton onPress={() => changeNumberHandler("higher")}>
            +
          </PrimaryButton>
          <PrimaryButton onPress={() => changeNumberHandler("lower")}>
            -
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
});
