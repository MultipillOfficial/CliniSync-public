import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons, FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const ProfileScreen = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "Chaitanya Ambade",
    username: "Chaitanya_090807",
    gender: "Male",
    age: "20",
    bloodGroup: "B+",
    phoneNo: "9028727852",
    address: "Plot no. 430, Kakde vasti, Kondhwa, Pune 440026",
  });

  const [editingValue, setEditingValue] = useState("");

  // Get the first initial of the name
  const getInitial = (name) => {
    return name && name.length > 0 ? name.charAt(0).toUpperCase() : "";
  };

  const handleOpenModal = (field) => {
    setEditingValue(profileData[field]);
    setActiveModal(field);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleSave = () => {
    if (activeModal) {
      if (activeModal === "age") {
        const ageNumber = parseInt(editingValue, 10);
        if (isNaN(ageNumber) || ageNumber < 0 || ageNumber > 122) {
          alert("Please enter a valid age between 1 and 122.");
          return;
        }
      }

      if (activeModal === "phoneNo") {
        const phoneRegex = /^(?:\+91)?[6-9]\d{9}$/;
        if (!phoneRegex.test(editingValue)) {
          alert("Please enter a valid Indian phone number.");
          return;
        }
      }

      setProfileData({
        ...profileData,
        [activeModal]: editingValue,
      });

      setActiveModal(null);
    }
  };

  const renderTextInputModal = (
    field,
    placeholder,
    keyboardType = "default"
  ) => (
    <Modal
      visible={activeModal === field}
      animationType="slide"
      transparent={true}
      onRequestClose={handleCloseModal}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Enter your{" "}
            {field === "username"
              ? "ID"
              : field.replace(/([A-Z])/g, " $1").toLowerCase()}
          </Text>
          <TextInput
            style={styles.modalInput}
            value={editingValue}
            onChangeText={setEditingValue}
            placeholder={placeholder}
            keyboardType={keyboardType}
            autoFocus
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={handleCloseModal}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );

  const renderGenderModal = () => (
    <Modal
      visible={activeModal === "gender"}
      animationType="slide"
      transparent={true}
      onRequestClose={handleCloseModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select gender</Text>
          <View style={styles.radioContainer}>
            {["Male", "Female", "Rather not say"].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.radioOption}
                onPress={() => setEditingValue(option)}
              >
                <View style={styles.radioButton}>
                  {editingValue === option && (
                    <View style={styles.radioButtonSelected} />
                  )}
                </View>
                <Text style={styles.radioText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={handleCloseModal}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderBloodGroupModal = () => (
    <Modal
      visible={activeModal === "bloodGroup"}
      animationType="slide"
      transparent={true}
      onRequestClose={handleCloseModal}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, styles.bloodGroupModalContent]}>
          <Text style={styles.modalTitle}>Select blood group</Text>
          <ScrollView style={styles.bloodGroupScrollView}>
            <View style={styles.radioContainer}>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                (option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.radioOption}
                    onPress={() => setEditingValue(option)}
                  >
                    <View style={styles.radioButton}>
                      {editingValue === option && (
                        <View style={styles.radioButtonSelected} />
                      )}
                    </View>
                    <Text style={styles.radioText}>{option}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </ScrollView>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={handleCloseModal}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/profile")}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      {/* Profile section */}
      <View style={styles.profileSection}>
        <View style={styles.profileAvatarContainer}>
          <View style={styles.profileAvatar}>
            <Text style={styles.avatarText}>
              {getInitial(profileData.name)}
            </Text>
          </View>
          <View style={styles.qrBadge}>
            <AntDesign name="qrcode" size={12} color="white" />
          </View>
        </View>

        <View style={styles.profileInfo}>
          <TouchableOpacity onPress={() => handleOpenModal("name")}>
            <Text style={styles.profileName}>{profileData.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOpenModal("username")}>
            <Text style={styles.profileUsername}>{profileData.username}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile details */}
      <View style={styles.detailsContainer}>
        {/* Gender */}
        <TouchableOpacity
          style={styles.detailItem}
          onPress={() => handleOpenModal("gender")}
        >
          <View style={styles.iconContainer}>
            <FontAwesome name="transgender" size={18} color="#888" />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Gender</Text>
            <Text style={styles.detailValue}>{profileData.gender}</Text>
          </View>
        </TouchableOpacity>

        {/* Age */}
        <TouchableOpacity
          style={styles.detailItem}
          onPress={() => handleOpenModal("age")}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="calendar-outline" size={18} color="#888" />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Age</Text>
            <Text style={styles.detailValue}>{profileData.age}</Text>
          </View>
        </TouchableOpacity>

        {/* Blood group */}
        <TouchableOpacity
          style={styles.detailItem}
          onPress={() => handleOpenModal("bloodGroup")}
        >
          <View style={styles.iconContainer}>
            <Entypo name="drop" size={18} color="#888" />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Blood group</Text>
            <Text style={styles.detailValue}>{profileData.bloodGroup}</Text>
          </View>
        </TouchableOpacity>

        {/* Phone no */}
        <TouchableOpacity
          style={styles.detailItem}
          onPress={() => handleOpenModal("phoneNo")}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="call-outline" size={18} color="#888" />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Phone no</Text>
            <Text style={styles.detailValue}>{profileData.phoneNo}</Text>
          </View>
        </TouchableOpacity>

        {/* Address */}
        <TouchableOpacity
          style={styles.detailItem}
          onPress={() => handleOpenModal("address")}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="location-outline" size={18} color="#888" />
          </View>
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Address</Text>
            <Text style={styles.detailValue}>{profileData.address}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      {renderTextInputModal("name", "Enter your name")}
      {renderTextInputModal("username", "Enter your ID")}
      {renderGenderModal()}
      {renderTextInputModal("age", "Enter your age", "numeric")}
      {renderBloodGroupModal()}
      {renderTextInputModal("phoneNo", "Enter your phone number", "phone-pad")}
      {renderTextInputModal("address", "Enter your address")}
    </SafeAreaView>
  );
};
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  backButton: {
    padding: width * 0.02,
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: "500",
    marginLeft: width * 0.05,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.025,
  },
  profileAvatarContainer: {
    position: "relative",
  },
  profileAvatar: {
    width: width * 0.17,
    height: width * 0.17,
    borderRadius: width * 0.085,
    backgroundColor: "#00d68f",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontSize: width * 0.07,
    fontWeight: "bold",
  },
  qrBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: width * 0.055,
    height: width * 0.055,
    borderRadius: width * 0.0275,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  profileInfo: {
    marginLeft: width * 0.045,
  },
  profileName: {
    fontSize: width * 0.055,
    fontWeight: "600",
  },
  profileUsername: {
    fontSize: width * 0.04,
    color: "#777",
    marginTop: height * 0.005,
  },
  detailsContainer: {
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02,
  },
  detailItem: {
    flexDirection: "row",
    paddingVertical: height * 0.015,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  iconContainer: {
    width: width * 0.08,
    alignItems: "center",
    justifyContent: "center",
  },
  detailContent: {
    flex: 1,
    paddingLeft: width * 0.04,
  },
  detailLabel: {
    fontSize: width * 0.035,
    color: "#888",
    marginBottom: height * 0.003,
  },
  detailValue: {
    fontSize: width * 0.04,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: width * 0.05,
    paddingBottom: Platform.OS === "ios" ? height * 0.05 : height * 0.025,
  },
  modalTitle: {
    fontSize: width * 0.045,
    fontWeight: "500",
    marginBottom: height * 0.02,
    textAlign: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    padding: height * 0.015,
    fontSize: width * 0.04,
    marginBottom: height * 0.03,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.015,
  },
  cancelButton: {
    fontSize: width * 0.04,
    color: "teal",
    padding: width * 0.02,
  },
  saveButton: {
    fontSize: width * 0.04,
    color: "#00d68f",
    fontWeight: "600",
    padding: width * 0.02,
  },
  radioContainer: {
    marginBottom: height * 0.012,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.015,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  radioButton: {
    width: width * 0.05,
    height: width * 0.05,
    borderRadius: width * 0.025,
    borderWidth: 2,
    borderColor: "#00d68f",
    justifyContent: "center",
    alignItems: "center",
    marginRight: width * 0.03,
  },
  radioButtonSelected: {
    width: width * 0.025,
    height: width * 0.025,
    borderRadius: width * 0.0125,
    backgroundColor: "#00d68f",
  },
  radioText: {
    fontSize: width * 0.04,
  },
  bloodGroupModalContent: {
    maxHeight: "60%",
  },
  bloodGroupScrollView: {
    maxHeight: height * 0.4,
  },
});

export default ProfileScreen;
