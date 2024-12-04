import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Link,
} from "react-native";

import { useNavigation } from "expo-router";

const windowWidth = Dimensions.get("window").width;

export default function StackLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerTitle: " ",
          headerStyle: {
            backgroundColor: "#FAF9F6",
          },
          headerTitleStyle: {
            fontFamily: "Prata-Regular",
            fontSize: 34,
            color: "black",
          },
        }}
      />

      <Stack.Screen
        name="filters"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FAF9F6",
          },
          headerTitle: "Set Filters",
          headerTitleStyle: {
            fontFamily: "Prata-Regular",
            fontSize: 34,
            color: "black",
          },
          headerTintColor: "black",
        }}
      />
    </Stack>
  );
}
