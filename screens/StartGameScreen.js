import { TextInput, View, StyleSheet, Settings, Alert } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";

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
    <View style={styles.inputContainer}>
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
    </View>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 8, // To apply box shadow in Android
    shadowColor: "black", // To apply box shadow in IOS
    shadowOffset: { width: 0, height: 2 }, // To apply box shadow in IOS
    shadowRadius: 6, // To apply box shadow in IOS
    shadowOpacity: 0.25, // To apply box shadow in IOS
  },
  numberInput: {
    height: 60,
    width: 60,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
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
