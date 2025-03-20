import React, { useState } from "react";
import { 
  View, 
  Text, 
  Switch, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions 
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const OtherSettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [pillReminderEnabled, setPillReminderEnabled] = useState(false);
  const [appointmentReminderEnabled, setAppointmentReminderEnabled] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <AntDesign name="arrowleft" size={width * 0.05} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Other Settings & Accessibility</Text>
      </View>

      {/* Notification Settings */}
      <View style={styles.section}>
        <View style={styles.settingRow}>
          <View>
            <Text style={styles.settingTitle}>Notification settings</Text>
            <Text style={styles.settingDescription}>Personalized Meal Alerts</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: "#ccc", true: "#21D0A2" }}
            thumbColor={notificationsEnabled ? "#fff" : "#f4f3f4"}
          />
        </View>
      </View>

      {/* Reminder Preferences */}
      <Text style={styles.sectionTitle}>Reminder preferences</Text>

      {/* Pill Reminder */}
      <View style={styles.section}>
        <View style={styles.settingRow}>
          <View>
            <Text style={styles.settingTitle}>Pill Reminder</Text>
            <Text style={styles.settingDescription}>Your daily medication schedule</Text>
          </View>
          <Switch
            value={pillReminderEnabled}
            onValueChange={setPillReminderEnabled}
            trackColor={{ false: "#ccc", true: "#21D0A2" }}
            thumbColor={pillReminderEnabled ? "#fff" : "#f4f3f4"}
          />
        </View>
      </View>

      {/* Appointment Reminder */}
      <View style={styles.section}>
        <View style={styles.settingRow}>
          <View>
            <Text style={styles.settingTitle}>Appointment Reminder</Text>
            <Text style={styles.settingDescription}>Details for your upcoming visit</Text>
          </View>
          <Switch
            value={appointmentReminderEnabled}
            onValueChange={setAppointmentReminderEnabled}
            trackColor={{ false: "#ccc", true: "#21D0A2" }}
            thumbColor={appointmentReminderEnabled ? "#fff" : "#f4f3f4"}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: width * 0.04,
    paddingTop: height * 0.02,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    marginLeft: width * 0.03,
    color: "#000",
  },
  sectionTitle: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    color: "#888",
    marginTop: height * 0.03,
    marginBottom: height * 0.015,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: width * 0.03,
    padding: width * 0.04,
    marginBottom: height * 0.015,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingTitle: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "#000",
  },
  settingDescription: {
    fontSize: width * 0.04,
    color: "#888",
    marginTop: height * 0.005,
  },
});

export default OtherSettingsScreen;
