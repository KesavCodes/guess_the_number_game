import { useState, useEffect } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import Colors from "./constants/colors";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    OpenSansRegular: require("./assets/fonts/OpenSans-Regular.ttf"),
    OpenSansBold: require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || error) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  const [userNumber, setUserNumber] = useState(null);
  const [noOfGuesses, setNoOfGuesses] = useState(0);
  const [currentScreen, setCurrentScreen] = useState("home");

  const increaseNoOfGuess = () =>
    setNoOfGuesses((prevGuesses) => prevGuesses + 1);

  const pickedNumberHandler = (pickedNumber) => setUserNumber(pickedNumber);

  const changeScreenHandler = (newScreen) => setCurrentScreen(newScreen);

  const restartGameHandler = () => {
    setUserNumber(null);
    setNoOfGuesses(0);
    setCurrentScreen("home");
  };

  if (!fontsLoaded && !error) return null;

  let screen = (
    <StartGameScreen
      onConfirmNumber={pickedNumberHandler}
      changeScreen={changeScreenHandler}
    />
  );

  if (currentScreen === "game")
    screen = (
      <GameScreen
        userNumber={userNumber}
        changeScreen={changeScreenHandler}
        increaseGuessCount={increaseNoOfGuess}
      />
    );
  else if (currentScreen === "over")
    screen = (
      <GameOverScreen
        roundsNumber={noOfGuesses}
        userNumber={userNumber}
        onStarNewGame={restartGameHandler}
      />
    );

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootContainer}
    >
      <ImageBackground
        style={styles.rootContainer}
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        imageStyle={styles.imgBackground}
      >
        {/* SafeAreView only works on ios */}
        {/* Adding styles for android devices */}
        <SafeAreaView style={styles.rootContainer}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  imgBackground: {
    opacity: 0.2,
  },
});
