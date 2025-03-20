import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios"; // Import axios

export default function SubscriptionScreen() {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated test data for testing phase
    setTimeout(() => {
      setSubscription({
        planName: "Basic plan",
        price: 499,
        features: [
          "Secure Data Sharing",
          "Emergency Access",
          "Health Record Storage",
          "Standard Support",
          "Single-Device Access",
        ],
        renewalDate: "12 Jan 2026",
        daysLeft: 256,
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#06D6A0" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#777" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Current plan</Text>

        <View style={styles.planCard}>
          <View>
            <View style={styles.planBadge}>
              <Text style={styles.planName}>{subscription.planName}</Text>
            </View>

            <Text style={styles.planPrice}>₹{subscription.price}/month</Text>

            <View style={styles.featuresList}>
              {subscription.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={styles.featureText}>• {feature}</Text>
                </View>
              ))}
            </View>

            <View style={styles.renewalInfo}>
              <Text style={styles.renewalText}>
                Renewal date: {subscription.renewalDate}
              </Text>
              <Text style={styles.daysLeft}>
                {subscription.daysLeft} days left
              </Text>
            </View>

            <TouchableOpacity style={styles.renewButton}>
              <Text style={styles.renewButtonText}>Renew plan</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.manageButton}>
              <Text style={styles.manageButtonText}>Manage plan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    width: "100%",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    color: "#000",
  },
  planCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  planBadge: {
    backgroundColor: "#e6f9f7",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 10,
  },
  planName: {
    fontSize: 16,
    color: "#06D6A0",
    fontWeight: "500",
  },
  planPrice: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 15,
    color: "#000",
  },
  featuresList: {
    marginBottom: 15,
  },
  featureItem: {
    marginBottom: 5,
  },
  featureText: {
    color: "#666",
    fontSize: 14,
  },
  renewalInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingTop: 5,
  },
  renewalText: {
    color: "#666",
    fontSize: 14,
  },
  daysLeft: {
    color: "#06D6A0",
    fontWeight: "500",
  },
  renewButton: {
    backgroundColor: "#06D6A0",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  renewButtonText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  manageButton: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  manageButtonText: {
    color: "#03A89E",
  },
});
