import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";

import { Link } from "expo-router";
import { useNavigation } from "expo-router";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";

import PANTRY_DATA from "data/pantry_log.json";

const width = Dimensions.get("window").width;

export default function Details(index) {
  const [newMessage, setNewMessage] = useState("");
  // const { name, contents, isStatic } = route.params;
  const currIndex = index;
  console.log(currIndex);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: PANTRY_DATA[0].name,
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

  const handleSend = () => {
    // Validation to ensure all fields are filled
    if (newMessage != "") {
      alert("This feature is under construction!");
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <FlatList
          data={PANTRY_DATA[0].contents}
          keyExtractor={(item, index) => `${item}-${index}`}
          scrollEnabled={true}
          renderItem={({ item }) => (
            <Text style={styles.itemLabel}>{item}</Text>
          )}
        />
        <KeyboardAvoidingView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add items here..."
              value={newMessage}
              onChangeText={setNewMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Icon name="arrow-up-sharp" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
  itemLabel: {
    color: "black",
    fontFamily: "Prata-Regular",
    fontSize: 20,
    fontWeight: 400,
    margin: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: width - 44,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: "#FAF9F6",
    width: "100%",
  },
  sendButton: {
    backgroundColor: "#B5300B",
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
  },
});
