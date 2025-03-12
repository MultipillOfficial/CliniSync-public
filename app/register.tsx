import React, { useState } from "react";
import { Dimensions, Alert, Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Checkbox from "expo-checkbox";
import color from "@/assets/colors/color";

const { width, height } = Dimensions.get("window");

const RegisterScreen = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [potp, setPotp] = useState("");
  const [eotp, setEotp] = useState("");
  const [isTermsChecked, setTermsChecked] = useState(false);
  const [isPrivacyChecked, setPrivacyChecked] = useState(false);

  const [errors, setErrors] = useState({
    name: false,
    dob: false,
    phone: false,
    email: false,
    terms: false,
    privacy: false,
  });

  // Modal visibility states
  const [isPhoneModalVisible, setPhoneModalVisible] = useState(false);
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);

  // Verification status for phone and email
  const [isPhoneVerified, setPhoneVerified] = useState(false);
  const [isEmailVerified, setEmailVerified] = useState(false);

  const handleSubmit = () => {
    const newErrors = {
      name: !name,
      dob: !dob,
      phone: !phone,
      email: !email,
      terms: !isTermsChecked, // Validate Terms checkbox
      privacy: !isPrivacyChecked, // Validate Privacy checkbox
    };

    setErrors(newErrors);

    // Ensure no errors exist
    if (!isTermsChecked || !isPrivacyChecked) {
      Alert.alert(
        "Validation Error",
        "You must agree to the Terms and Conditions and Privacy Policy."
      );
      return;
    }

    // Ensure phone and email are verified before submitting
    if (!isPhoneVerified || !isEmailVerified) {
      Alert.alert(
        "Verification Error",
        "You must verify both phone and email before setting up the account."
      );
      return;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.mainTitle}>Register</Text>
          <Text style={styles.subtitle}>Create your new account</Text>
        </View>
      </View>

      {/* Form */}
      <View style={styles.formWrapper}>
        <TextInput
          style={[styles.formInput, errors.name && styles.inputError]} // Add error style
          placeholder="Enter Full name"
          placeholderTextColor={color.placeholder}
          value={name}
          onChangeText={(text) => {
            setName(text);
            setErrors({ ...errors, name: false });
          }}
        />
        <TextInput
          style={[styles.formInput, errors.dob && styles.inputError]} // Add error style
          placeholder="Enter Date of birth"
          keyboardType= "decimal-pad"
          placeholderTextColor={color.placeholder}
          value={dob}

          onChangeText={(text) => {
            setDob(text);
            setErrors({ ...errors, dob: false });
          }}
        />

        {/* Phone Number */}
        <View
          style={[styles.inputGroup, errors.phone && styles.inputError]} // Add error style
        >
          <TextInput
            style={styles.inputField}
            placeholder="Enter Phone number"
            placeholderTextColor={color.placeholder}
            value={phone}
            keyboardType= "number-pad"
            onChangeText={(text) => {
              setPhone(text);
              setErrors({ ...errors, phone: false });
            }}
          />
          <TouchableOpacity
            onPress={() => phone && !isPhoneVerified && setPhoneModalVisible(true)}
            disabled={!phone || isPhoneVerified} // Disable button if no phone or already verified
          >
            <Text style={[styles.verifyText, isPhoneVerified && styles.disabledText]}>
              {isPhoneVerified ? "✅ Verified" : "Verify*"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Email */}
        <View
          style={[styles.inputGroup, errors.email && styles.inputError]} // Add error style
        >
          <TextInput
            style={styles.inputField}
            placeholder="Enter Email"
            placeholderTextColor={color.placeholder}
            keyboardType= "email-address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors({ ...errors, email: false });
            }}
          />
          <TouchableOpacity
            onPress={() => email && !isEmailVerified && setEmailModalVisible(true)}
            disabled={!email || isEmailVerified} // Disable button if no email or already verified
          >
            <Text style={[styles.verifyText, isEmailVerified && styles.disabledText]}>
              {isEmailVerified ? "✅ Verified" : "Verify*"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Terms and Conditions Checkbox */}
        <TouchableOpacity
          style={styles.checkboxWrapper}
          onPress={() => setTermsChecked((prev) => !prev)}
          activeOpacity={0.5} 
        >
          <Checkbox
            value={isTermsChecked}
            onValueChange={setTermsChecked}
            style={{ borderRadius: 50 }}
            color={isTermsChecked ? color.primary : undefined}
          />
          <Text
            style={[
              styles.agreementText,
              errors.terms && styles.checkboxError, // Highlight in red if unchecked
            ]}
          >
            I agree to the{" "}
          <TouchableOpacity
            onPress={() => router.push("/termsandcondition")}
          >
          <Text style={styles.agreementLink}>Terms and Conditions</Text>
          </TouchableOpacity>
          .
          </Text>
        </TouchableOpacity>


        {/* Privacy Policy Checkbox */}
        <TouchableOpacity
          style={styles.checkboxWrapper}
          onPress={() => setPrivacyChecked((prev) => !prev)} // Toggle the checkbox on press
          activeOpacity={0.5}
        >
          <Checkbox
            value={isPrivacyChecked}
            onValueChange={setPrivacyChecked}
            style={{ borderRadius: 50 }}
            color={isPrivacyChecked ? color.primary : undefined}
          />
          <Text
            style={[
              styles.agreementText,
              errors.privacy && styles.checkboxError, // Highlight in red if unchecked
            ]}
          >
            I agree to the{" "}
            <TouchableOpacity
              onPress={() => router.push("/privacypolicy")}
            >
              <Text style={styles.agreementLink}>Privacy Policy</Text>
            </TouchableOpacity>
            . 
          </Text>
        </TouchableOpacity>


        {/* Submit Button (Only enabled after verification) */}
        <TouchableOpacity
          style={[styles.submitButton, !(isPhoneVerified && isEmailVerified) && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!(isPhoneVerified && isEmailVerified)} // Disable button if phone/email not verified
        >
          <Text style={styles.submitButtonText}>Setup - account</Text>
        </TouchableOpacity>
      </View>

      {/* Phone OTP Modal */}
      <Modal
        transparent={true}
        visible={isPhoneModalVisible}
        animationType="slide"
        onRequestClose={() => setPhoneModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter OTP for Phone</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter OTP"
              keyboardType="numeric"
              value={potp}
              onChangeText={setPotp}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                // Handle OTP verification logic
                setPhoneVerified(true); // Mark as verified
                setPhoneModalVisible(false);
                Alert.alert("OTP Verified", "Phone number verified successfully");
              }}
            >
              <Text style={styles.modalButtonText}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setPhoneModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Email OTP Modal */}
      <Modal
        transparent={true}
        visible={isEmailModalVisible}
        animationType="slide"
        onRequestClose={() => setEmailModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter OTP for Email</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter OTP"
              keyboardType="numeric"
              value={eotp}
              onChangeText={setEotp}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                // Handle OTP verification logic
                setEmailVerified(true); // Mark as verified
                setEmailModalVisible(false);
                Alert.alert("OTP Verified", "Email verified successfully");
              }}
            >
              <Text style={styles.modalButtonText}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setEmailModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexGrow: 1,
    alignItems: "center",
    padding: height * 0.02,
  },
  headerWrapper: {
    height: height * 0.1,
    justifyContent: "center",
    alignItems: "center",
    width: width * 1,
    marginTop: height * 0.07,
    marginBottom: height * 0.06,
  },
  titleWrapper: {
    alignItems: "center",
    textAlign: "center",
  },
  mainTitle: {
    color: color.primary,
    fontSize: width * 0.14,
    fontWeight: "500",
    textAlign: "center",
  },
  subtitle: {
    color: color.placeholder,
    fontSize: width * 0.05,
    fontWeight: "400",
    textAlign: "center",
  },
  formWrapper: {
    width: width * 1,
    alignItems: "center",
  },
  formInput: {
    width: width * 1,
    maxWidth: width * 0.83,
    fontSize: width * 0.05,
    fontWeight: "500",
    padding: height * 0.016,
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 15,
    marginBottom: height * 0.025,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 15,
    maxWidth: width * 0.83,
    marginBottom: height * 0.025,
    padding: height * 0.001,
  },
  inputField: {
    flex: 1,
    fontSize: width * 0.05,
    padding: height * 0.016,
    fontWeight: "500",
  },
  verifyText: {
    fontSize: width * 0.04,
    padding: height * 0.016,
    color: color.primary,
  },
  disabledText: {
    color: "#d3d3d3", // Make text appear disabled (gray)
  },
  required: {
    color: "#f11515",
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.007,
    width: width * 1,
    maxWidth: width * 0.82,
  },
  agreementText: {
    fontSize: 15,
    color: color.placeholder,
    marginLeft: width * 0.02,
  },
  agreementLink: {
    textDecorationLine: "underline",
    color: "#5148e6",
  },
  submitButton: {
    backgroundColor: color.primary,
    borderRadius: 60,
    paddingVertical: height * 0.018,
    paddingHorizontal: height * 0.1,
    marginTop: height * 0.15,
  },
  disabledButton: {
    backgroundColor: "#d3d3d3", 
  },
  submitButtonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "500",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: height * 0.03,
    borderRadius: 10,
    width: width * 0.8,
  },
  modalTitle: {
    fontSize: width * 0.06,
    fontWeight: "600",
    color: color.primary,
    marginBottom: height * 0.02,
    textAlign: "center",
  },
  modalInput: {
    fontSize: width * 0.05,
    padding: height * 0.016,
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 15,
    marginBottom: height * 0.02,
  },
  modalButton: {
    backgroundColor: color.primary,
    borderRadius: 10,
    padding: height * 0.015,
    width: width * 0.6,
    marginBottom: height * 0.02,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  inputError: {
    borderColor: "#f11515",
  },
  checkboxError: {
    color: "#f11515", 
  }
});

export default RegisterScreen;
 