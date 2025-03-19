import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

const EmergencyContacts = () => {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [expandedContactId, setExpandedContactId] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  // Fetch contacts from API (demo simulation)
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      // Simulate API call with timeout
      setTimeout(() => {
        setContacts([
          {
            id: 1,
            name: "Priyanshu Chaudhary",
            phone: "9595959595",
            relation: "Father",
          },
          {
            id: 2,
            name: "Ananya Sharma",
            phone: "8585858585",
            relation: "Mother",
          },
          {
            id: 3,
            name: "Vikram Singh",
            phone: "7575757575",
            relation: "Brother",
          },
        ]);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      Alert.alert("Error", "Failed to load contacts");
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedContactId((prevId) => (prevId === id ? null : id));
  };

  const openEditModal = (contact) => {
    setSelectedContact(contact);
    setEditModalVisible(true);
  };

  const openAddModal = () => {
    setAddModalVisible(true);
  };

  const handleSaveEdit = async (updatedContact) => {
    if (
      !updatedContact.name ||
      !updatedContact.phone ||
      !updatedContact.relation
    ) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    try {
      // In a real app, update the contact on the server
      setContacts((prevContacts) =>
        prevContacts.map((c) =>
          c.id === updatedContact.id ? updatedContact : c
        )
      );
      setEditModalVisible(false);
    } catch (error) {
      console.error("Error updating contact:", error);
      Alert.alert("Error", "Failed to update contact");
    }
  };

  const handleAddContact = async (contactData) => {
    if (!contactData.name || !contactData.phone || !contactData.relation) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    try {
      // In a real app, create the contact on the server
      const addedContact = {
        ...contactData,
        id:
          contacts.length > 0 ? Math.max(...contacts.map((c) => c.id)) + 1 : 1,
      };
      setContacts((prev) => [...prev, addedContact]);
      setAddModalVisible(false);
    } catch (error) {
      console.error("Error adding contact:", error);
      Alert.alert("Error", "Failed to add contact");
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this contact?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteContact(id),
        },
      ]
    );
  };

  const deleteContact = async (id) => {
    try {
      // In a real app, delete the contact on the server
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
      Alert.alert("Error", "Failed to delete contact");
    }
  };

  const makeCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  // Combined Modal Component for both Add & Edit
  const ContactFormModal = ({ visible, onClose, initialData, onSave }) => {
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
      setFormData(initialData);
    }, [initialData]);

    const handleChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalOverlay}
        >
          <View style={styles.newModalContent}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Name</Text>
              <TextInput
                style={styles.formInput}
                value={formData.name}
                onChangeText={(text) => handleChange("name", text)}
                placeholder="Enter name"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Phone no.</Text>
              <TextInput
                style={styles.formInput}
                value={formData.phone}
                onChangeText={(text) => handleChange("phone", text)}
                placeholder="Enter phone"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Relation</Text>
              <TextInput
                style={[styles.formInput, styles.formInputAccent]}
                value={formData.relation}
                onChangeText={(text) => handleChange("relation", text)}
                placeholder="Enter relation"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onSave(formData)}>
                <Text style={styles.saveButton}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Contacts</Text>
        <TouchableOpacity onPress={openAddModal}>
          <Ionicons name="add" size={24} color="green" />
        </TouchableOpacity>
      </View>

      {/* Contact List */}
      <ScrollView>
        {loading ? (
          <Text style={styles.loadingText}>Loading contacts...</Text>
        ) : contacts.length === 0 ? (
          <Text style={styles.emptyText}>No emergency contacts found</Text>
        ) : (
          contacts.map((contact) => (
            <View key={contact.id}>
              <TouchableOpacity
                onPress={() => toggleExpand(contact.id)}
                style={styles.contactItem}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {contact.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactPhone}>{contact.phone}</Text>
                </View>
                <View style={styles.relationTag}>
                  <Text style={styles.relationText}>{contact.relation}</Text>
                </View>
              </TouchableOpacity>

              {expandedContactId === contact.id && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => confirmDelete(contact.id)}
                  >
                    <Ionicons name="trash" size={20} color="red" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => openEditModal(contact)}
                  >
                    <Ionicons name="pencil" size={20} color="gray" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.callButton}
                    onPress={() => makeCall(contact.phone)}
                  >
                    <Ionicons name="call" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>

      {/* Edit Contact Modal */}
      <ContactFormModal
        visible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
        initialData={selectedContact || { name: "", phone: "", relation: "" }}
        onSave={handleSaveEdit}
      />

      {/* Add Contact Modal */}
      <ContactFormModal
        visible={isAddModalVisible}
        onClose={() => setAddModalVisible(false)}
        initialData={{ name: "", phone: "", relation: "" }}
        onSave={handleAddContact}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2CD4D9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  avatarText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 16, fontWeight: "bold" },
  contactPhone: { color: "gray" },
  relationTag: {
    backgroundColor: "#E0F8EC",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  relationText: { color: "green", fontWeight: "bold" },

  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: "3%",
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "red",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  editButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  callButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#00D49F",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  newModalContent: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formGroup: {
    marginBottom: 15,
  },
  formLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  formInputAccent: {
    borderColor: "#2CD4D9",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    color: "#2CD4D9",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default EmergencyContacts;
