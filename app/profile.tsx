import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios"; // Import axios
import color from "@/assets/colors/color";

const ProfileScreen = () => {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded data for testing phase
  const testData = {
    name: "Chaitanya Ambade",
    username: "Chaitanya_090807",
    gender: "Male",
    age: "20",
    bloodGroup: "B+",
    phone: "9028727852",
    address: "Plot no. 430, Kakde vasti, Kondhwa, Pune",
  };

  useEffect(() => {
    // Function to fetch profile data
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        // For production, uncomment this section and modify the URL
        /*
        const response = await axios.get('https://your-api-endpoint.com/profile');
        setProfile(response.data);
        */

        // Using hardcoded data for testing phase
        // Simulating network delay
        setTimeout(() => {
          setProfile(testData);
          setLoading(false);
        }, 0);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to load profile data");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Show loader until profile data is available
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  // Show error message if data fetching failed
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => fetchProfileData()}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.headerTopContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View style={styles.headerContainer}>
        {/* Profile Image with QR Code */}
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {profile?.name?.charAt(0) || "?"}
            </Text>
          </View>
          <TouchableOpacity style={styles.qrCodeIcon}>
            <Ionicons name="qr-code" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Name and Username */}
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>
            {profile?.name || "Loading..."}
          </Text>
          <Text style={styles.username}>{profile?.username || ""}</Text>
        </View>

        {/* Edit Icon */}
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => router.push("editProfile")}
        >
          <Ionicons name="create-outline" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Profile Details in Stacked Layout */}
      <View style={styles.profileDetailsContainer}>
        <View style={styles.profileRow}>
          <View style={styles.profileItem}>
            <Text style={styles.grayText}>Gender</Text>
            <Text style={styles.boldText}>{profile?.gender || "N/A"}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.grayText}>Age</Text>
            <Text style={styles.boldText}>{profile?.age || "N/A"}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.grayText}>Blood Group</Text>
            <Text style={styles.boldText}>{profile?.bloodGroup || "N/A"}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.grayText}>Phone No.</Text>
            <Text style={styles.boldText}>{profile?.phone || "N/A"}</Text>
          </View>
        </View>
        <View style={styles.profileItemFull}>
          <Text style={styles.grayText}>Address</Text>
          <Text style={styles.boldText}>{profile?.address || "N/A"}</Text>
        </View>
      </View>

      {/* Options List */}
      {[
        {
          label: "Emergency Contacts",
          icon: "call",
          screen: "emergencycontacts",
        },
        { label: "Insurance", icon: "shield-checkmark", screen: "insurance" },
        {
          label: "Health Preferences",
          icon: "heart",
          screen: "healthpreferences",
        },
        {
          label: "Data Privacy & Security",
          icon: "lock-closed",
          screen: "dataprivacy",
        },
        {
          label: "Account and Subscription",
          icon: "person-circle",
          screen: "account",
        },
        { label: "Family", icon: "people", screen: "family" },
        { label: "Linked Devices", icon: "link", screen: "linkeddevices" },
        {
          label: "Other Settings & Accessibility",
          icon: "settings",
          screen: "settings",
        },
      ].map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionItem}
          onPress={() => router.push(item.screen)}
        >
          <Ionicons
            name={item.icon}
            size={24}
            color={color.primary}
            style={styles.iconStyle}
          />
          <Text style={styles.optionText}>{item.label}</Text>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color="gray"
            style={styles.rightIcon}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: color.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  headerTopContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
    width: "100%",
  },
  avatarWrapper: {
    position: "relative",
    marginRight: 15,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: color.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
  },
  qrCodeIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 5,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  username: {
    color: "gray",
  },
  editIcon: {
    marginLeft: 10,
  },
  profileDetailsContainer: {
    marginBottom: 10,
  },
  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileItem: {
    alignItems: "center",
    flex: 1,
  },
  profileItemFull: {
    marginTop: 10,
  },
  grayText: {
    color: "gray",
  },
  boldText: {
    fontWeight: "bold",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  iconStyle: {
    marginRight: 10,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  rightIcon: {
    marginLeft: "auto",
  },
});

export default ProfileScreen;
