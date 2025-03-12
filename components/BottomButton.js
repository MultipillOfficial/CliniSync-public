import React, { useState, useEffect } from "react";
import color from "@/assets/colors/color";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
  View,
  Platform,
} from "react-native";

const BottomButton = ({ buttonText, onPress }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (isKeyboardVisible) return null; // Hide button when keyboard is open

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 80, 
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: color.primary,

    borderRadius: 60,
    alignItems: "center",
    width: "80%",
    height: 60, 
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center", 
  },
});

export default BottomButton;
