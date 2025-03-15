import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

const EditProfile = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    username: "",
    gender: "",
    age: "",
    bloodGroup: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  // ✅ Fetch user profile from API using Axios
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("https://your-api-url.com/profile/1"); // Change the URL
        setUser({
          name: response.data.name,
          username: response.data.username,
          gender: response.data.gender,
          age: response.data.age.toString(),
          bloodGroup: response.data.bloodGroup,
          phone: response.data.phone,
          address: response.data.address,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Handle Input Change
  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  // ✅ Handle Save Profile using Axios
  const handleSave = async () => {
    if (!user.name || !user.phone) {
      Alert.alert("Error", "Name and Phone are required!");
      return;
    }

    try {
      await axios.put("https://your-api-url.com/profile/1", user, {
        headers: { "Content-Type": "application/json" },
      });

      Alert.alert("Success", "Profile updated successfully!");
      router.push("/profile"); // ✅ Redirect to Profile Page
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile.");
    }
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
      <View style={styles.headerTopContainer}>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={user.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={user.username}
        onChangeText={(text) => handleChange("username", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={user.gender}
        onChangeText={(text) => handleChange("gender", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={user.age}
        onChangeText={(text) => handleChange("age", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Blood Group"
        value={user.bloodGroup}
        onChangeText={(text) => handleChange("bloodGroup", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={user.phone}
        onChangeText={(text) => handleChange("phone", text)}
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Address"
        multiline
        value={user.address}
        onChangeText={(text) => handleChange("address", text)}
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  headerTopContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#00C896",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
