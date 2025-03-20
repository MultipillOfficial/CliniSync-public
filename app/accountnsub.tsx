import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import router from Expo Router

export default function AccountSettingsScreen() {
  const router = useRouter(); // Initialize router

  const menuItems = [
    { title: "Change password", screen: "changepass", icon: "chevron-forward" },
    { title: "Subscription", screen: "subscription", icon: "chevron-forward" },
    {
      title: "Billing history",
      screen: "billinghistory",
      icon: "chevron-forward",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()} // Use router.back() for back navigation
          >
            <Ionicons name="arrow-back" size={24} color="#B9BDC7" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account and Subscription</Text>
        </View>
        <View style={styles.headerDivider} />
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <React.Fragment key={item.title}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push(`/${item.screen}`)} // Use router.push() for navigation
            >
              <Text style={styles.menuItemText}>{item.title}</Text>
              <Ionicons name={item.icon} size={20} color="#B9BDC7" />
            </TouchableOpacity>
            {index < menuItems.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerDivider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    width: "100%",
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  menuContainer: {
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  menuItemText: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
  },
});
