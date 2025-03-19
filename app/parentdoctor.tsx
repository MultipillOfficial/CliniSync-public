import React, { useState, useEffect, useCallback, memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Dimensions,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const API_URL = "https://api.example.com/doctor-details";

const ICONS = {
  doctorName: { name: "medical", color: "#4CAF50", bg: "#e6f9f7" },
  doctorId: { name: "medkit-outline", color: "#2196F3", bg: "#e6f0ff" },
  phoneNumber: { name: "call", color: "#E91E63", bg: "#ffebee" },
  hospital: { name: "business", color: "#4CAF50", bg: "#e8f5e9" },
};

const formatLabel = (key) => {
  // Convert camelCase to Title Case with spaces
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

// Get device dimensions and handle orientation changes
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const isSmallDevice = SCREEN_WIDTH < 375;

// Responsive size functions
const rs = (size: number) => {
  const baseWidth = 375; // Base width for design
  return (SCREEN_WIDTH / baseWidth) * size;
};

// Memoized icon component with responsive sizing
const IconWithLabel = memo(({ iconKey, value }) => {
  const icon = ICONS[iconKey];
  return (
    <View style={styles.infoItem}>
      <View style={[styles.iconContainer, { backgroundColor: icon?.bg }]}>
        <Ionicons
          name={icon?.name}
          size={isSmallDevice ? 18 : 20}
          color={icon?.color}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{formatLabel(iconKey)}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
});

const ParentDoctorDetailsScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [doctorDetails, setDoctorDetails] = useState({
    doctorName: "",
    doctorId: "",
    phoneNumber: "",
    hospital: "",
  });

  const updateDetail = (key, value) => {
    setDoctorDetails((prev) => ({ ...prev, [key]: value }));
  };

  const toggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(API_URL, {
          signal: controller.signal,
        });
        if (response?.data) {
          setDoctorDetails(response.data);
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching doctor details:", error);
          // Test data fallback
          setDoctorDetails({
            doctorName: "Dr. John Doe",
            doctorId: "123456789",
            phoneNumber: "9876543210",
            hospital: "City Hospital",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
    return () => controller.abort();
  }, []);

  const handleSave = useCallback(async () => {
    try {
      setLoading(true);
      // This would typically include an API call to save the data
      // await axios.put(API_URL, doctorDetails);
      toggleModal();
    } catch (error) {
      console.error("Error saving doctor details:", error);
    } finally {
      setLoading(false);
    }
  }, [doctorDetails, toggleModal]);

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
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <Ionicons name="arrow-back" size={rs(24)} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Parent Doctor Details</Text>
        <TouchableOpacity
          onPress={toggleModal}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <Ionicons name="pencil" size={rs(24)} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.infoContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {Object.entries(doctorDetails).map(([key, value]) => (
          <IconWithLabel key={key} iconKey={key} value={value} />
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Edit Doctor Details</Text>
                <TouchableOpacity onPress={toggleModal}>
                  <Ionicons name="close" size={rs(24)} color="#9e9e9e" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalScrollView}>
                {Object.keys(doctorDetails).map((key) => (
                  <View key={key} style={styles.inputContainer}>
                    <Text style={styles.modalLabel}>{formatLabel(key)}</Text>
                    <TextInput
                      style={styles.input}
                      value={doctorDetails[key]}
                      onChangeText={(text) => updateDetail(key, text)}
                      keyboardType={
                        key === "phoneNumber" || key === "doctorId"
                          ? "numeric"
                          : "default"
                      }
                      placeholder={`Enter ${formatLabel(key)}`}
                    />
                  </View>
                ))}
              </ScrollView>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={toggleModal}
                  style={styles.buttonCancel}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSave}
                  style={styles.buttonSave}
                >
                  <Text style={[styles.buttonText, styles.buttonTextSave]}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: rs(16),
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
    marginBottom: rs(20),
    paddingVertical: rs(10),
  },
  headerTitle: {
    fontSize: rs(18),
    fontWeight: "600",
  },
  backButton: {
    padding: rs(5),
  },
  infoContainer: {
    flex: 1,
    marginTop: rs(10),
  },
  scrollContent: {
    paddingBottom: rs(20),
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: rs(15),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e0e0e0",
  },
  iconContainer: {
    width: rs(36),
    height: rs(36),
    borderRadius: rs(18),
    justifyContent: "center",
    alignItems: "center",
    marginRight: rs(15),
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: rs(14),
    color: "#9e9e9e",
    marginBottom: rs(4),
  },
  value: {
    fontSize: rs(16),
    fontWeight: "500",
    color: "#212121",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: rs(20),
    borderTopRightRadius: rs(20),
    paddingVertical: rs(20),
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
    paddingHorizontal: rs(20),
    marginBottom: rs(15),
  },
  modalHeaderText: {
    fontSize: rs(18),
    fontWeight: "600",
    color: "#212121",
  },
  modalScrollView: {
    maxHeight: SCREEN_HEIGHT * 0.6,
    paddingHorizontal: rs(20),
  },
  inputContainer: {
    marginBottom: rs(15),
  },
  modalLabel: {
    fontSize: rs(14),
    color: "#9e9e9e",
    marginBottom: rs(8),
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: rs(10),
    padding: rs(12),
    fontSize: rs(16),
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: rs(20),
    paddingHorizontal: rs(20),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e0e0e0",
    paddingTop: rs(15),
  },
  buttonCancel: {
    padding: rs(10),
  },
  buttonSave: {
    padding: rs(10),
  },
  buttonText: {
    color: "#4CAF50",
    fontSize: rs(16),
  },
  buttonTextSave: {
    fontWeight: "bold",
  },
});

export default React.memo(ParentDoctorDetailsScreen);
