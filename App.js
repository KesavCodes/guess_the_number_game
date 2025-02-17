import { useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("home");

  const pickedNumberHandler = (pickedNumber) => setUserNumber(pickedNumber);

  const changeScreenHandler = (newScreen) => setCurrentScreen(newScreen);

  let screen = (
    <StartGameScreen
      onConfirmNumber={pickedNumberHandler}
      changeScreen={changeScreenHandler}
    />
  );
  
  if (currentScreen === "game")
    screen = (
      <GameScreen userNumber={userNumber} changeScreen={changeScreenHandler} />
    );
  else if (currentScreen === "over") screen = <GameOverScreen />;

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
