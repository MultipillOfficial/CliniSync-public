import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const HealthPreferencesScreen = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health Preferences</Text>
      </View>

      <TouchableOpacity
        style={styles.listItem}
        onPress={() => navigation.navigate("parentdoctor")}
      >
        <Text style={styles.listText}>Parent doctor details</Text>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.listItem}
        onPress={() => navigation.navigate("preferredpharmacy")}
      >
        <Text style={styles.listText}>Preferred pharmacy</Text>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>

      <View style={styles.listItem}>
        <Text style={styles.listText}>Chronic Disease Management</Text>
        <Switch value={isEnabled} onValueChange={setIsEnabled} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  listText: {
    fontSize: 16,
  },
});

export default HealthPreferencesScreen;
