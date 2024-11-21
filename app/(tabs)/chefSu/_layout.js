import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { useNavigation } from "expo-router";

export default function StackLayout() {
  const navigation = useNavigation();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#232323" },
        headerTitleStyle: { color: "white" },
        headerTintColor: "white",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          //   headerRight: () => <TouchableOpacity> </TouchableOpacity>,
        }}
      />
      <Stack.Screen
        name="info"
        options={{
          headerTitle: "Chef Su Info Page",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
