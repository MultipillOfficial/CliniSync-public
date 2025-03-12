import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
  Vibration,
} from "react-native";
import BottomButton from "@/components/BottomButton";
import { Link, useRouter } from "expo-router";
import { MaterialIcons, Ionicons } from "@expo/vector-icons"; // Icons
import Checkbox from "expo-checkbox"; // Checkbox
import { useState, useEffect } from "react";
import color from "@/assets/colors/color";

const { width, height } = Dimensions.get("window");

export default function App() {
  const router = useRouter();
  const TermsandCondition = () => {
    router.navigate("/profile");
  };

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Added for email field
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Track if any field is empty
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // When keyboard opens, hide the "Don't have an account?"
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // When keyboard closes, show the section again
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // Handle validation
  const validateForm = () => {
    if (!email || !password) {
      setIsFieldEmpty(true);
      Vibration.vibrate(100); // Vibrate for 100ms
    } else {
      setIsFieldEmpty(false);
      TermsandCondition(); // If valid, navigate to terms and conditions
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Image
        source={require("@/assets/images/first.png")}
        style={styles.image}
      />

      <View style={styles.centertext}>
        <Text style={styles.Text}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to your account</Text>

        {/* Phone/Email Input Field */}
        <View
          style={[
            styles.inputContainer,
            isFieldEmpty && !email ? styles.inputError : null, // Apply red border if email is empty
          ]}
        >
          <MaterialIcons
            name="person-outline"
            size={24}
            color={color.primary}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone number / Email"
            placeholderTextColor={color.placeholder}
            keyboardType="default"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password Input Field */}
        <View
          style={[
            styles.inputContainer,
            isFieldEmpty && !password ? styles.inputError : null, // Apply red border if password is empty
          ]}
        >
          <MaterialIcons
            name="lock-outline"
            size={24}
            color={color.primary}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={color.placeholder}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          {/* Render the eye button only if password field is not empty */}
          {password.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={24}
                color={color.primary}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Remember Me Checkbox */}
        <TouchableOpacity
          style={styles.rememberMeContainer}
          onPress={() => setRememberMe((prev) => !prev)} // Toggle checkbox on press
          activeOpacity={0.5}
        >
          <Checkbox
            style={{ borderRadius: 50 }}
            value={rememberMe}
            onValueChange={setRememberMe}
            color={rememberMe ? color.primary : undefined}
          />
          <Text style={styles.rememberMeText}>Remember Me</Text>
        </TouchableOpacity>

        <BottomButton buttonText="Login" onPress={validateForm} />

        {/* No Account Section */}
        {!keyboardVisible && (
          <View style={styles.NoAccount}>
            <Text style={styles.NoAccountText}>
              Don't have an account?{" "}
              <Link style={styles.registerText} href={"/register"}>
                Register
              </Link>
            </Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { position: "relative", flex: 1 },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  Text: {
    color: color.primary,
    fontWeight: "500",
    fontSize: 50,
    fontFamily: "outfit",
  },
  centertext: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  subtitle: {
    color: color.placeholder,
    fontSize: width * 0.05,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: height * 0.06,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 15,
    paddingHorizontal: 20,
    marginBottom: height * 0.025,
    width: width * 1,
    maxWidth: width * 0.83,
    padding: height * 0.016,
  },
  inputError: {
    borderColor: "red", // Red border if field is empty
  },
  icon: {
    marginRight: height * 0.016,
  },
  input: {
    flex: 1,
    fontSize: 20,
    fontWeight: "500",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    width: width * 1,
    maxWidth: width * 0.82,
  },

  rememberMeText: {
    fontSize: 15,
    color: color.placeholder,
    marginLeft: width * 0.02,
  },
  NoAccount: {
    position: "absolute",
    bottom: 45,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  NoAccountText: {
    fontSize: 20,
    color: color.placeholder,
  },
  registerText: {
    textDecorationLine: "underline",
    color: color.primary,
    fontSize: 20,
  },
});
