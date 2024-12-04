import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

import { Link } from "expo-router";
import { useNavigation } from "expo-router";

import Icon from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";

export default function Groceries() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Grocery Cart",
      headerLeft: () => (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back-sharp" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Groceries</Text>
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
  iconButton: {
    height: 24,
    width: 24,
  },
});
