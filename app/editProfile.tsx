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
} from "react-native";
import { Ionicons, FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";

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
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  profileAvatarContainer: {
    position: "relative",
  },
  profileAvatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#00d68f",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  qrBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  profileInfo: {
    marginLeft: 18,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "600",
  },
  profileUsername: {
    fontSize: 15,
    color: "#777",
    marginTop: 3,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  detailItem: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  detailContent: {
    flex: 1,
    paddingLeft: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
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
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 15,
    textAlign: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelButton: {
    fontSize: 16,
    color: "#888",
    padding: 5,
  },
  saveButton: {
    fontSize: 16,
    color: "#00d68f",
    fontWeight: "600",
    padding: 5,
  },
  radioContainer: {
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#00d68f",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#00d68f",
  },
  radioText: {
    fontSize: 16,
  },
  bloodGroupModalContent: {
    maxHeight: "60%",
  },
  bloodGroupScrollView: {
    maxHeight: 300,
  },
});

export default ProfileScreen;
