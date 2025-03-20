import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function PasswordChangeScreen() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [formError, setFormError] = useState("");

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
    setFormError(""); // Reset error when typing
  };

  const handleRetypePasswordChange = (password) => {
    setRetypePassword(password);
    setPasswordMatchError(password !== newPassword);
  };

  const handleSaveChanges = () => {
    if (!currentPassword || !newPassword || !retypePassword) {
      setFormError("All fields are required.");
      return;
    }

    if (passwordMatchError) {
      setFormError("Passwords do not match.");
      return;
    }

    if (passwordStrength === "Weak") {
      setFormError("Password is too weak. Please strengthen it.");
      return;
    }

    console.log("Password change requested");
    // API call can be made here
    // router.push("editProfile"); // Uncomment for navigation
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
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
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

        {formError ? <Text style={styles.errorText}>{formError}</Text> : null}
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.saveButton,
            (passwordMatchError || passwordStrength === "Weak") &&
              styles.disabledButton,
          ]}
          onPress={handleSaveChanges}
          disabled={passwordMatchError || passwordStrength === "Weak"}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
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
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.03,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: width * 0.05,
    fontWeight: "500",
    marginLeft: width * 0.03,
  },
  form: {
    paddingHorizontal: width * 0.04,
    paddingTop: width * 0.05,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: width * 0.04,
    marginBottom: 8,
    fontSize: width * 0.04,
  },
  passwordStrength: {
    fontSize: width * 0.035,
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
    fontSize: width * 0.035,
    marginBottom: 8,
  },
  requirementsList: {
    marginTop: 4,
    marginBottom: 24,
  },
  requirementText: {
    fontSize: width * 0.035,
    color: "#777",
    marginBottom: 4,
  },
  buttonsContainer: {
    padding: width * 0.04,
    marginTop: "auto",
  },
  saveButton: {
    backgroundColor: "#00d68f",
    borderRadius: 8,
    padding: width * 0.045,
    alignItems: "center",
    marginBottom: 12,
  },
  disabledButton: {
    backgroundColor: "#b0e3d2",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "500",
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: width * 0.045,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#000",
    fontSize: width * 0.045,
  },
});
