import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function DataPrivacySecurityScreen({ navigation }) {
  const [toggles, setToggles] = useState({
    doctorAccess: false,
    hospitalAccess: false,
    pharmacyAccess: false,
    radiologyAccess: false,
    instantEmergencyAccess: false,
    criticalEmergencyAccess: false,
  });

  const toggleSwitch = (key) => {
    setToggles((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("profile")}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Data Privacy & Security</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Data Sharing Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Sharing</Text>
          {renderToggleOption(
            "Enable Doctor Access",
            "Allow doctors to view your records.",
            "doctorAccess"
          )}
          {renderToggleOption(
            "Enable Hospital Access",
            "Grant hospitals access to your records.",
            "hospitalAccess"
          )}
          {renderToggleOption(
            "Enable Pharmacy Access",
            "Share prescriptions with pharmacies.",
            "pharmacyAccess"
          )}
          {renderToggleOption(
            "Enable Radiology Access",
            "Share scans with radiologists.",
            "radiologyAccess"
          )}
        </View>

        {/* Emergency Access Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Access</Text>
          {renderToggleOption(
            "Instant Emergency Access",
            "Quickly share data in emergencies.",
            "instantEmergencyAccess"
          )}
          {renderToggleOption(
            "Critical Emergency Access",
            "Allow urgent medical data access.",
            "criticalEmergencyAccess"
          )}
        </View>

        {/* Activity Log */}
        <TouchableOpacity
          style={styles.activityLogButton}
          onPress={() => router.push("activitylog")}
        >
          <Text style={styles.activityLogText}>Activity Log</Text>
          <Ionicons name="chevron-forward" size={20} color="#8e8e93" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );

  function renderToggleOption(title, description, key) {
    return (
      <View style={styles.option}>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionTitle}>{title}</Text>
          <Text style={styles.optionDescription}>{description}</Text>
        </View>
        <Switch
          trackColor={{ false: "#ddd", true: "#007AFF" }}
          thumbColor="#fff"
          ios_backgroundColor="#ddd"
          onValueChange={() => toggleSwitch(key)}
          value={toggles[key]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  section: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#6e6e6e",
    fontWeight: "600",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    textTransform: "uppercase",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  optionDescription: {
    fontSize: 14,
    color: "#6e6e6e",
    marginTop: 4,
  },
  activityLogButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  activityLogText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
