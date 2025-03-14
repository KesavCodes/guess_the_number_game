import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

const GuessLogItem = ({ roundNumbers, guess }) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemTxt}>#{roundNumbers}</Text>
      <Text style={styles.itemTxt}>Opponent's Guess: {guess}</Text>
    </View>
  );
};

export default GuessLogItem;

const styles = StyleSheet.create({
  listItem: {
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    elevation: 4,
  },
  itemTxt: {
    fontFamily: "OpenSansRegular"
  }
});
