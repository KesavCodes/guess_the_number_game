import {
  TextInput,
  View,
  StyleSheet,
  Settings,
  Alert,
  Text,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "./../components/ui/Title";
import Card from "../components/ui/Card";
import { getLoadedFonts } from "expo-font";

const StartGameScreen = ({ onConfirmNumber, changeScreen }) => {
  const [enteredNumber, setEnteredNumber] = useState("");
  const numberInputHandler = (enteredValue) => setEnteredNumber(enteredValue);
  const resetInputHandler = () => setEnteredNumber("");
  const confirmInputHandler = () => {
    const chosenNumber = Number(enteredNumber);
    if (isNaN(chosenNumber) || enteredNumber < 1 || enteredNumber > 99) {
      Alert.alert(
        "Invalid Number!",
        "Input must be a number between 1 and 99.",
        [{ text: "Okay", style: "cancel", onPress: resetInputHandler }]
      );
      return;
    }
    onConfirmNumber(chosenNumber);
    changeScreen("game");
  };
  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card>
        <Text style={styles.instructionTxt}>Enter a Number</Text>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          value={enteredNumber}
          onChangeText={numberInputHandler}
        />
        <View style={styles.btnGroupContainer}>
          <View style={styles.btnContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.btnContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginHorizontal: 24,
  },
  instructionTxt: {
    fontFamily: "OpenSansRegular",
    color: Colors.accent500,
    fontSize: 24,
    textAlign: "center",
  },
  numberInput: {
    width: 60,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    alignSelf: "center",
  },
  btnGroupContainer: {
    flexDirection: "row",
  },
  btnContainer: {
    flex: 1,
  },
});
