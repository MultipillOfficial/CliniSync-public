import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import color from "@/assets/colors/color";

const TermsAndCondition = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Term and Conditions</Text>
        <Text style={styles.termsTitle}>Welcome to MultiPill</Text>
        <Text style={styles.termsText}>
          <Text style={styles.sectionTitle}>1. The Disclaimer Disclaimer:</Text>
          {"\n"}We hereby disclaim any and all disclaimers.
          {"\n\n"}
          <Text style={styles.sectionTitle}>2. User Agreement:</Text>
          {"\n"}By using Medi-Magic, you agree to have read this entire
          agreement, even though you probably haven't. You also agree to hold
          harmless Medi-Magic for any and all consequences, including but not
          limited to: spontaneous combustion, the development of an inexplicable
          fear of pigeons, and the sudden onset of an uncontrollable urge to
          tap-dance.
          {"\n\n"}
          <Text style={styles.sectionTitle}>3. Medical Advice:</Text>
          {"\n"}Medi-Magic provides access to a vast library of information,
          including but not limited to: ancient folk remedies, conspiracy
          theories about Big Pharma, and the ramblings of a disgruntled former
          medical student. This information is for entertainment purposes only
          and should not be considered actual medical advice.
          {"\n\n"}
          <Text style={styles.sectionTitle}>4. Side Effects:</Text>
          {"\n"}Possible side effects of using Medi-Magic may include:
          dizziness, nausea, hallucinations, a sudden desire to knit, and an
          overwhelming urge to argue with inanimate objects. If you experience
          any of these side effects, please consult a licensed medical
          professional... or just ignore them and hope for the best.
          {"\n\n"}
          <Text style={styles.sectionTitle}>4. Side Effects:</Text>
          {"\n"}Possible side effects of using Medi-Magic may include:
          dizziness, nausea, hallucinations, a sudden desire to knit, and an
          overwhelming urge to argue with inanimate objects. If you experience
          any of these side effects, please consult a licensed medical
          professional... or just ignore them and hope for the best.
          {"\n\n"}
          <Text style={styles.sectionTitle}>4. Side Effects:</Text>
          {"\n"}Possible side effects of using Medi-Magic may include:
          dizziness, nausea, hallucinations, a sudden desire to knit, and an
          overwhelming urge to argue with inanimate objects. If you experience
          any of these side effects, please consult a licensed medical
          professional... or just ignore them and hope for the best.
          {"\n\n"}
          <Text style={styles.sectionTitle}>4. Side Effects:</Text>
          {"\n"}Possible side effects of using Medi-Magic may include:
          dizziness, nausea, hallucinations, a sudden desire to knit, and an
          overwhelming urge to argue with inanimate objects. If you experience
          any of these side effects, please consult a licensed medical
          professional... or just ignore them and hope for the best.
          {"\n\n"}
          <Text style={styles.sectionTitle}>4. Side Effects:</Text>
          {"\n"}Possible side effects of using Medi-Magic may include:
          dizziness, nausea, hallucinations, a sudden desire to knit, and an
          overwhelming urge to argue with inanimate objects. If you experience
          any of these side effects, please consult a licensed medical
          professional... or just ignore them and hope for the best.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingTop: 85,
    paddingHorizontal: "5%",
  },
  welcomeText: {
    fontSize: 36,
    color: color.primary,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  termsTitle: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      color: color.placeholder,
    },
  termsText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    textAlign: "left",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});

export default TermsAndCondition;