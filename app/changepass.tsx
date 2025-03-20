import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PasswordChangeScreen() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const checkPasswordStrength = (password) => {
    let strength = "Weak";
    if (
      password.length >= 8 &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password)
    ) {
      strength = "Strong";
    } else if (password.length >= 6) {
      strength = "Medium";
    }
    setPasswordStrength(strength);
  };

  const handleNewPasswordChange = (password) => {
    setNewPassword(password);
    setIsTyping(password.length > 0);
    checkPasswordStrength(password);
  };

  const handleRetypePasswordChange = (password) => {
    setRetypePassword(password);
    setPasswordMatchError(password !== newPassword);
  };

  const handleSaveChanges = () => {
    if (passwordMatchError || newPassword === "" || retypePassword === "") {
      console.log("Passwords do not match or are empty");
      return;
    }
    console.log("Password change requested");
    // router.push("editProfile"); // Uncomment to navigate after successful change
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("accountnsub")}
        >
        <Ionicons name="arrow-back" size={24} color="#000" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Change password</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Current password"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="New password"
          secureTextEntry
          value={newPassword}
          onChangeText={handleNewPasswordChange}
        />
        {isTyping && (
          <Text
            style={[
              styles.passwordStrength,
              passwordStrength === "Strong"
                ? styles.strong
                : passwordStrength === "Medium"
                ? styles.medium
                : styles.weak,
            ]}
          >
            Strength: {passwordStrength}
          </Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Retype new password"
          secureTextEntry
          value={retypePassword}
          onChangeText={handleRetypePasswordChange}
        />
        {passwordMatchError && (
          <Text style={styles.errorText}>Passwords do not match</Text>
        )}

        {/* Password requirements */}
        <View style={styles.requirementsList}>
          <Text style={styles.requirementText}>
            • Password must be at least 8 characters long.
          </Text>
          <Text style={styles.requirementText}>
            • Include at least one number & symbol.
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save changes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.push("accountnsub")}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 8,
  },
  form: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
  },
  passwordStrength: {
    fontSize: 14,
    marginBottom: 16,
  },
  strong: {
    color: "green",
  },
  medium: {
    color: "orange",
  },
  weak: {
    color: "red",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
  },
  requirementsList: {
    marginTop: 4,
    marginBottom: 24,
  },
  requirementText: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },
  buttonsContainer: {
    padding: 16,
    marginTop: "auto",
  },
  saveButton: {
    backgroundColor: "#00d68f",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#000",
    fontSize: 16,
  },
});
