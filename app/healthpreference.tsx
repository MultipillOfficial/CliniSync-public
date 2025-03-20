import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const HealthPreferencesScreen = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={width * 0.06} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health Preferences</Text>
      </View>

      <TouchableOpacity
        style={styles.listItem}
        onPress={() => navigation.navigate("parentdoctor")}
      >
        <Text style={styles.listText}>Parent doctor details</Text>
        <Ionicons name="chevron-forward" size={width * 0.05} color="gray" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.listItem}
        onPress={() => navigation.navigate("preferredpharmacy")}
      >
        <Text style={styles.listText}>Preferred pharmacy</Text>
        <Ionicons name="chevron-forward" size={width * 0.05} color="gray" />
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
    padding: width * 0.04,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginLeft: width * 0.02,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height * 0.018,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  listText: {
    fontSize: width * 0.045,
  },
});

export default HealthPreferencesScreen;
