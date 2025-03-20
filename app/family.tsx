import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import axios from "axios";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const FamilySettingsScreen = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  useEffect(() => {
    // Mock API call for testing phase
    const fetchFamilyMembers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        const mockData = response.data.slice(0, 5).map((user) => ({
          id: user.id,
          name: user.name,
        }));
        setFamilyMembers(mockData);
      } catch (error) {
        console.error("Error fetching family members:", error);
      }
    };

    fetchFamilyMembers();
  }, []);

  const removeMember = () => {
    if (memberToDelete) {
      setFamilyMembers(
        familyMembers.filter((member) => member.id !== memberToDelete)
      );
      setDeleteConfirmVisible(false);
      setMemberToDelete(null);
    }
  };

  const addMember = () => {
    if (newMemberName.trim()) {
      setFamilyMembers([
        ...familyMembers,
        { id: Date.now(), name: newMemberName },
      ]);
      setNewMemberName("");
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.push("profile")}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Family Settings</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Feather name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Family Members List */}
      <FlatList
        data={familyMembers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.memberItem}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>
            <Text style={styles.name}>{item.name}</Text>
            <TouchableOpacity
              onPress={() => {
                setDeleteConfirmVisible(true);
                setMemberToDelete(item.id);
              }}
            >
              <AntDesign name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Add Member Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Name</Text>
            <TextInput
              style={styles.fullWidthInput}
              placeholder="Enter name"
              value={newMemberName}
              onChangeText={setNewMemberName}
              placeholderTextColor="#888"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addMember}>
                <Text style={styles.saveButton}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={deleteConfirmVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Do you really want to delete?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setDeleteConfirmVisible(false)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={removeMember}>
                <Text style={styles.saveButton}>Confirm</Text>
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
    padding: 16,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#21D0A2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#888",
    marginBottom: 10,
  },
  fullWidthInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#21D0A2",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#000",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    color: "#FF3B30",
    fontSize: 16,
  },
  saveButton: {
    color: "#21D0A2",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FamilySettingsScreen;
