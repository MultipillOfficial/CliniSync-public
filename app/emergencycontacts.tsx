import React, { useState } from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const EmergencyContacts = () => {
  const router = useRouter();
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Priyanshu Chaudhary",
      phone: "9595959595",
      relation: "Father",
    },
    {
      id: 2,
      name: "Priyanshu Chaudhary",
      phone: "9595959595",
      relation: "Father",
    },
    {
      id: 3,
      name: "Priyanshu Chaudhary",
      phone: "9595959595",
      relation: "Father",
    },
  ]);

  const [expandedContactId, setExpandedContactId] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const toggleExpand = (id) => {
    setExpandedContactId((prevId) => (prevId === id ? null : id));
  };

  const openEditModal = (contact) => {
    setSelectedContact(contact);
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    setContacts((prevContacts) =>
      prevContacts.map((c) =>
        c.id === selectedContact.id ? selectedContact : c
      )
    );
    setEditModalVisible(false);
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
          onPress: () => setContacts((prev) => prev.filter((c) => c.id !== id)),
        },
      ]
    );
  };

  const makeCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Contacts</Text>
        <TouchableOpacity>
          <Ionicons name="add" size={24} color="green" />
        </TouchableOpacity>
      </View>

      {/* Contact List */}
      <ScrollView>
        {contacts.map((contact) => (
          <View key={contact.id}>
            {/* Contact Item */}
            <TouchableOpacity
              onPress={() => toggleExpand(contact.id)}
              style={styles.contactItem}
            >
              {/* Profile Circle */}
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{contact.name.charAt(0)}</Text>
              </View>

              {/* Contact Details */}
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
              </View>

              {/* Relation Tag */}
              <View style={styles.relationTag}>
                <Text style={styles.relationText}>{contact.relation}</Text>
              </View>
            </TouchableOpacity>

            {/* Show Action Buttons if Contact is Expanded */}
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
        ))}
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={isEditModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Contact</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={selectedContact?.name}
              onChangeText={(text) =>
                setSelectedContact({ ...selectedContact, name: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={selectedContact?.phone}
              keyboardType="phone-pad"
              onChangeText={(text) =>
                setSelectedContact({ ...selectedContact, phone: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Relation"
              value={selectedContact?.relation}
              onChangeText={(text) =>
                setSelectedContact({ ...selectedContact, relation: text })
              }
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalSave}
                onPress={handleSaveEdit}
              >
                <Text style={styles.modalSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    justifyContent: "space-around",
    padding: 10,
  },
  deleteButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
  },
  editButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
  callButton: { padding: 10, backgroundColor: "#2CD4D9", borderRadius: 10 },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 5,
    marginBottom: 15,
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  modalCancel: { padding: 10 },
  modalCancelText: { color: "red" },
  modalSave: { padding: 10, backgroundColor: "green", borderRadius: 5 },
  modalSaveText: { color: "white", fontWeight: "bold" },
});

export default EmergencyContacts;
