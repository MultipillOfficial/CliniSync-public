import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

const InsuranceDetails = () => {
  const router = useRouter();
  const [insuranceList, setInsuranceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // ✅ Fetch insurance data from API
  useEffect(() => {
    const fetchInsuranceDetails = async () => {
      try {
        const response = await fetch("https://your-api-url.com/insurance"); // Replace with your API
        const data = await response.json();
        setInsuranceList(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching insurance:", error);
        setLoading(false);
      }
    };

    fetchInsuranceDetails();
  }, []);

  // ✅ Handle Image Upload
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // ✅ Handle Done Button
  const handleDone = () => {
    if (!selectedImage) {
      Alert.alert("Error", "Please upload an insurance proof");
      return;
    }

    // ✅ Here you can call API to upload the image
    console.log("Uploaded image:", selectedImage);
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00C896" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Insurance Details</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={28} color="#00C896" />
        </TouchableOpacity>
      </View>

      {/* Insurance Cards List */}
      <FlatList
        data={insuranceList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.logo }} style={styles.logo} />
            <View style={styles.cardDetails}>
              <Text style={styles.companyName}>{item.company}</Text>
              <Text style={styles.policyNumber}>{item.policyNumber}</Text>
              <Text style={styles.expiryLabel}>Exp date</Text>
              <Text style={styles.expiryDate}>{item.expiry}</Text>
            </View>
            <TouchableOpacity
              style={styles.viewCardButton}
              onPress={() => Alert.alert("View Card", "Opening insurance card")}
            >
              <Text style={styles.viewCardText}>View card</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* ✅ MODAL POPUP */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Insurance details</Text>

            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Text style={styles.uploadButtonText}>
                {selectedImage ? "Image Selected ✅" : "Upload insurance proof"}
              </Text>
              <Ionicons name="cloud-upload-outline" size={18} color="#00C896" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InsuranceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 15,
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  cardDetails: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  policyNumber: {
    fontSize: 14,
    color: "#7D7D7D",
  },
  expiryLabel: {
    fontSize: 12,
    color: "#7D7D7D",
    marginTop: 5,
  },
  expiryDate: {
    fontSize: 14,
    fontWeight: "bold",
  },
  viewCardButton: {
    backgroundColor: "#E0F7FA",
    padding: 8,
    borderRadius: 8,
  },
  viewCardText: {
    color: "#00C896",
    fontWeight: "bold",
  },
  // ✅ Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  uploadButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: "#7D7D7D",
  },
  doneButton: {
    backgroundColor: "#00C896",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  doneButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
