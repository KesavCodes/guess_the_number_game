import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "./../components/ui/PrimaryButton";
import Card from "./../components/ui/Card";
import Colors from "../constants/colors";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, excludeNum = []) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (excludeNum.includes(rndNum)) {
    return generateRandomBetween(min, max, excludeNum);
  } else {
    return rndNum;
  }
}

const range = {
  min: 1,
  max: 100,
};

const GameScreen = ({ userNumber, changeScreen, increaseGuessCount }) => {
  const [currentGuess, setCurrentGuess] = useState(null);
  const [guessRounds, setGuessRounds] = useState([]);
  const { height } = useWindowDimensions();
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
    console.log(currentGuess, range, userNumber);
    const newRandomNumber = generateRandomBetween(
      range.min,
      range.max,
      guessRounds
    );
    increaseGuessCount();
    setCurrentGuess(newRandomNumber);
    setGuessRounds((prevState) => [newRandomNumber, ...prevState]);
  };

  useEffect(() => {
    if (currentGuess === userNumber) {
      range.min = 1;
      range.max = 100;
      changeScreen("over");
    }
  }, [currentGuess, userNumber, changeScreen]);

  useEffect(() => {
    const initialGuess = generateRandomBetween(range.min, range.max, [
      userNumber,
    ]);
    setCurrentGuess(initialGuess);
    setGuessRounds([initialGuess]);
    increaseGuessCount();
  }, []);

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <Text style={styles.instructionTxt}>Higher or Lower</Text>
        <View style={styles.btnsContainer}>
          <View style={styles.btnContainer}>
            <PrimaryButton onPress={() => changeNumberHandler("higher")}>
              <Ionicons name="add" size={24} />
            </PrimaryButton>
          </View>
          <View style={styles.btnContainer}>
            <PrimaryButton onPress={() => changeNumberHandler("lower")}>
              <Ionicons name="remove" size={24} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (height < 400) {
    content = (
      <>
        <Card>
          <View
            style={[
              styles.btnsContainer,
              { alignItems: "center", marginTop: 0 },
            ]}
          >
            <View style={styles.btnContainer}>
              <PrimaryButton onPress={() => changeNumberHandler("higher")}>
                <Ionicons name="add" size={24} />
              </PrimaryButton>
            </View>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View style={styles.btnContainer}>
              <PrimaryButton onPress={() => changeNumberHandler("lower")}>
                <Ionicons name="remove" size={24} />
              </PrimaryButton>
            </View>
          </View>
        </Card>
      </>
    );
  }
  return (
    <View
      style={[
        styles.screen,
        height < 400
          ? { paddingTop: 0, paddingBottom: 16, flexDirection: "row", alignItems: "center", justifyContent: "center" }
          : {},
      ]}
    >
      <View style={{flex: 1}}>
        <Title>Opponent's Guess</Title>
        {content}
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={({ item, index }) => (
            <GuessLogItem
              guess={item}
              roundNumbers={guessRounds.length - index}
            />
          )}
          keyExtractor={(item) => item}
        />
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
  instructionTxt: {
    fontFamily: "OpenSansRegular",
    color: Colors.accent500,
    fontSize: 24,
    textAlign: "center",
  },
  btnsContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  btnContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
