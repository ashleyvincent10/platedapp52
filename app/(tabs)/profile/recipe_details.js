import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "expo-router";
import { Link } from "expo-router";

export default function RecipeDetails({ title }) {
  const navigation = useNavigation();
  navigation.setOptions({
    headerTitle: title,
    headerBackTitle: "Back",
    headerShown: true,
    headerTitleStyle: {
      fontFamily: "Prata-Regular",
      fontSize: 24,
      color: "black",
    },
    headerStyle: {
      backgroundColor: "#FAF9F6",
      // backgroundColor: "black",
      justifyContent: "flex-end",
    },
    headerTintColor: "black",
    headerBackButtonDisplayMode: "minimal",
  });

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Pantry</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
