import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  Text,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "./../components/ui/Title";
import Card from "../components/ui/Card";

const StartGameScreen = ({ onConfirmNumber, changeScreen }) => {
  const [enteredNumber, setEnteredNumber] = useState("");
  const { height, width } = useWindowDimensions();
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
  const marginTopValue = height < 400 ? 0 : 48;
  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopValue }]}>
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
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    marginHorizontal: 32,
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
