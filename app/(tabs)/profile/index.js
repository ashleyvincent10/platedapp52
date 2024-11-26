import { StyleSheet, Text, View, Dimensions } from "react-native";

import { Link } from "expo-router";

const windowWidth = Dimensions.get("window").width;

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 24,
    backgroundColor: "#FAF9F6",
  },
  stats: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  number: {
    fontSize: 32,
    fontFamily: "Poppins",
    color: "black",
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
