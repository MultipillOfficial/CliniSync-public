import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="privacypolicy" />
      <Stack.Screen name="termsandcondition" />
      <Stack.Screen name="register" />
      <Stack.Screen name="mainscreen" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="emergencycontacts" />
      <Stack.Screen name="editProfile" />
      <Stack.Screen name="insurance" />
    </Stack>
  );
};

export default RootLayout;
