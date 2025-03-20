import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import axios from "axios";

const testData = [
  {
    id: "1",
    name: "Sandeep Pawar",
    date: "27 February",
    amount: 400,
    color: "#00C853",
  },
  {
    id: "2",
    name: "Sandeep Pawar",
    date: "27 February",
    amount: 400,
    color: "#D50000",
  },
  {
    id: "3",
    name: "Sandeep Pawar",
    date: "27 February",
    amount: 400,
    color: "#7E57C2",
  },
  {
    id: "4",
    name: "Sandeep Pawar",
    date: "27 February",
    amount: 400,
    color: "#FF6D00",
  },
  {
    id: "5",
    name: "Sandeep Pawar",
    date: "27 February",
    amount: 400,
    color: "#7E57C2",
  },
  {
    id: "6",
    name: "Sandeep Pawar",
    date: "27 February",
    amount: 400,
    color: "#039BE5",
  },
  {
    id: "7",
    name: "Sandeep Pawar",
    date: "27 February",
    amount: 400,
    color: "#FFD600",
  },
];

const BillingHistoryScreen = () => {
  const [billingData, setBillingData] = useState(testData);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://api.example.com/billing-history") // Replace with actual API endpoint
      .then((response) => setBillingData(response.data))
      .catch((error) =>
        console.error("Error fetching billing history:", error)
      );
  }, []);

  const filteredData = billingData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={[styles.avatar, { backgroundColor: item.color }]}>
        <Text style={styles.avatarText}>{item.name[0].toUpperCase()}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.amount}>₹ {item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Billing history</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff", flex: 1 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  searchBar: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  detailsContainer: { flex: 1, marginLeft: 12 },
  name: { fontSize: 16, fontWeight: "bold" },
  date: { fontSize: 12, color: "gray" },
  amount: { fontSize: 16, fontWeight: "bold" },
});

export default BillingHistoryScreen;
