import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

const LinkDeviceScreen = () => {
  const [selectedPairedDevice, setSelectedPairedDevice] = useState(null);
  const [selectedAvailableDevice, setSelectedAvailableDevice] = useState(null);

  const pairedDevices = [
    { id: "1", name: "Akshitas Laptop" },
    { id: "2", name: "Akshitas Laptop" },
    { id: "3", name: "Akshitas Laptop" },
    { id: "4", name: "Akshitas Laptop" },
    { id: "5", name: "Akshitas Laptop" },
    { id: "6", name: "Akshitas Laptop" },
  ];

  const availableDevices = [
    { id: "1", name: "Realme 8" },
    { id: "2", name: "Realme 8" },
    { id: "3", name: "Realme 8" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Link Device</Text>
      </View>

      {/* Device Name */}
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceLabel}>Device name</Text>
        <Text style={styles.deviceName}>OPPO A15</Text>
      </View>

      {/* Paired Devices */}
      <Text style={styles.sectionTitle}>Paired Devices</Text>
      <FlatList
        data={pairedDevices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.deviceItem}
            onPress={() => setSelectedPairedDevice(item.name)}
          >
            <Feather name="monitor" size={20} color="#21D0A2" />
            <Text style={styles.deviceText}>{item.name}</Text>
            <AntDesign name="infocirlceo" size={18} color="#888" />
          </TouchableOpacity>
        )}
      />

      {/* Available Devices */}
      <View style={styles.availableDevicesHeader}>
        <Text style={styles.sectionTitle}>Available Devices</Text>
        <Feather name="loader" size={20} color="#21D0A2" />
      </View>
      <FlatList
        data={availableDevices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.deviceItem}
            onPress={() => setSelectedAvailableDevice(item.name)}
          >
            <Feather name="smartphone" size={20} color="#21D0A2" />
            <Text style={styles.deviceText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Unpair Device Modal */}
      <Modal
        transparent={true}
        visible={!!selectedPairedDevice}
        animationType="fade"
        onRequestClose={() => setSelectedPairedDevice(null)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Unpair device</Text>
            <Text style={styles.modalText}>
              Unpair device “{selectedPairedDevice}”?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setSelectedPairedDevice(null)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.unpairButton}
                onPress={() => setSelectedPairedDevice(null)}
              >
                <Text style={styles.unpairText}>Unpair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Link Device Modal */}
      <Modal
        transparent={true}
        visible={!!selectedAvailableDevice}
        animationType="fade"
        onRequestClose={() => setSelectedAvailableDevice(null)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Device linking</Text>
            <Text style={styles.modalText}>
              Link with the device “{selectedAvailableDevice}”?
            </Text>
            <Text style={styles.modalSubText}>
              Your data will be visible on this device.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setSelectedAvailableDevice(null)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => setSelectedAvailableDevice(null)}
              >
                <Text style={styles.linkText}>Link</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#000",
  },
  deviceInfo: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  deviceLabel: {
    fontSize: 14,
    color: "#888",
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#888",
    marginTop: 20,
    marginBottom: 10,
  },
  deviceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  deviceText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: "#000",
  },
  availableDevicesHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  modalSubText: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    marginRight: 10,
  },
  cancelText: {
    fontSize: 16,
    color: "#888",
  },
  linkButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#21D0A2",
    alignItems: "center",
  },
  linkText: {
    fontSize: 16,
    color: "#fff",
  },
  unpairButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#FF5A5F",
    alignItems: "center",
  },
  unpairText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default LinkDeviceScreen;
