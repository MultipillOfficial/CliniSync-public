import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const OtherSettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [pillReminderEnabled, setPillReminderEnabled] = useState(false);
  const [appointmentReminderEnabled, setAppointmentReminderEnabled] =
    useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <AntDesign name="arrowleft" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Other Settings & Accessibility</Text>
      </View>

      {/* Notification Settings */}
      <View style={styles.section}>
        <View style={styles.settingRow}>
          <View>
            <Text style={styles.settingTitle}>Notification settings</Text>
            <Text style={styles.settingDescription}>
              Personalized Meal Alerts
            </Text>
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
            <Text style={styles.settingDescription}>
              Your daily medication schedule
            </Text>
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
            <Text style={styles.settingDescription}>
              Details for your upcoming visit
            </Text>
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
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#888",
    marginTop: 20,
    marginBottom: 10,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  settingDescription: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
});

export default OtherSettingsScreen;
