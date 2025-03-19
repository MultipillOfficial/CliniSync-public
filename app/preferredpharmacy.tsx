import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const API_URL = "https://api.example.com/pharmacy";

const ICONS = {
  pharmacyName: { name: "medkit-outline", color: "#4CAF50", bg: "#e6f9f7" },
  pharmacyId: { name: "pricetag-outline", color: "#2196F3", bg: "#e6f0ff" },
  phoneNumber: { name: "call-outline", color: "#E91E63", bg: "#ffebee" },
  pharmacyAddress: {
    name: "location-outline",
    color: "#4CAF50",
    bg: "#e8f5e9",
  },
};

const formatLabel = (key) => {
  // Convert camelCase to Title Case with spaces
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const rs = (size) => {
  const baseWidth = 375; // Base width for design
  return (SCREEN_WIDTH / baseWidth) * size;
};

const PreferredPharmacyScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pharmacyData, setPharmacyData] = useState({
    pharmacyName: "",
    pharmacyId: "",
    phoneNumber: "",
    pharmacyAddress: "",
  });

  useEffect(() => {
    fetchPharmacyData();
  }, []);

  const fetchPharmacyData = async () => {
    try {
      const response = await axios.get(API_URL);
      setPharmacyData(response.data);
    } catch (error) {
      console.error("Error fetching pharmacy data:", error);
      // Using test data in case of an error
      setPharmacyData({
        pharmacyName: "Wellness Forever",
        pharmacyId: "0000000000000",
        phoneNumber: "9028727852",
        pharmacyAddress: "Plot no. 510, Moshi, Pune 440045",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.post(API_URL, pharmacyData);
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving pharmacy data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (key, value) => {
    setPharmacyData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preferred Pharmacy</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        {Object.entries(pharmacyData).map(([key, value]) => (
          <View style={styles.infoItem} key={key}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: ICONS[key]?.bg },
              ]}
            >
              <Ionicons
                name={ICONS[key]?.name}
                size={20}
                color={ICONS[key]?.color}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>{formatLabel(key)}</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          </View>
        ))}
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Edit Pharmacy Details</Text>
              <TouchableOpacity onPress={toggleModal}>
                <Ionicons name="close" size={rs(24)} color="#9e9e9e" />
              </TouchableOpacity>
            </View>
            {Object.keys(pharmacyData).map((key) => (
              <View key={key} style={styles.inputContainer}>
                <Text style={styles.modalLabel}>{formatLabel(key)}</Text>
                <TextInput
                  style={styles.input}
                  value={pharmacyData[key]}
                  onChangeText={(text) => handleInputChange(key, text)}
                  keyboardType={
                    key === "phoneNumber" || key === "pharmacyId"
                      ? "numeric"
                      : "default"
                  }
                />
              </View>
            ))}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.buttonCancel}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={styles.buttonSave}>
                <Text style={[styles.buttonText, styles.buttonTextSave]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    padding: 5,
  },
  infoContainer: {
    marginTop: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 0,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: "#9e9e9e",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#212121",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    maxHeight: SCREEN_HEIGHT * 0.8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212121",
  },
  modalScrollView: {
    maxHeight: SCREEN_HEIGHT * 0.6,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  modalLabel: {
    fontSize: 14,
    color: "#9e9e9e",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e0e0e0",
    paddingTop: 15,
  },
  buttonCancel: {
    padding: 10,
  },
  buttonSave: {
    padding: 10,
  },
  buttonText: {
    color: "#4CAF50",
    fontSize: 16,
  },
  buttonTextSave: {
    fontWeight: "bold",
  },
});

export default PreferredPharmacyScreen;
