import { useRouter } from "expo-router";
import { Dimensions } from "react-native";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import color from "@/assets/colors/color";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

type UserTypeOption = {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap; // Ensures icon names are valid
};

const UserTypeScreen = () => {
  const userTypeOptions: UserTypeOption[] = [
    {
      label: "Doctor",
      icon: "local-hospital" as keyof typeof MaterialIcons.glyphMap,
    },
    { label: "Patient", icon: "person" as keyof typeof MaterialIcons.glyphMap },
    {
      label: "Radiology",
      icon: "photo-camera" as keyof typeof MaterialIcons.glyphMap,
    },
    {
      label: "Pharmacy",
      icon: "local-pharmacy" as keyof typeof MaterialIcons.glyphMap,
    },
    {
      label: "Pathology",
      icon: "biotech" as keyof typeof MaterialIcons.glyphMap,
    },
  ];

  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Image
          source={require("@/assets/images/back.png")}
          style={styles.logoImage}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>User Type</Text>
          <Text style={styles.subtitle}>Select your user type</Text>
        </View>
      </View>

      {/* User Type Options */}
      <View style={styles.optionsContainer}>
        {userTypeOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => router.push("/login")}
          >
            <View style={styles.optionContent}>
              <MaterialIcons
                name={option.icon}
                size={width * 0.075}
                color={color.primary}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>{option.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  headerSection: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: width * 1,
    marginTop: 0,
    padding: 0,
  },
  logoImage: {
    width: width * 1,
    height: height * 0.38,
    resizeMode: "cover",
    margin: 0,
    padding: 0,
  },
  titleContainer: {
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 44,
    fontWeight: "500",
    color: color.primary,
  },
  subtitle: {
    color: color.placeholder,
    fontSize: width * 0.05,
    fontWeight: "400",
    textAlign: "center",
  },
  optionsContainer: {
    alignItems: "center",
    padding: height * 0.025,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width * 0.83,
    padding: height * 0.013,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: color.primary,
    marginTop: height * 0.02,
    backgroundColor: "#fff",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    width: width * 0.075,
    height: undefined,
    aspectRatio: 0.88,
    marginRight: height * 0.025,
  },
  optionText: {
    fontSize: width * 0.05,
    fontWeight: "500",
    color: color.placeholder,
  },
  arrowIcon: {
    width: 13,
    height: undefined,
    aspectRatio: 0.57,
  },
});

export default UserTypeScreen;
