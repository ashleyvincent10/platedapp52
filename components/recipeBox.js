import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const recipeBox = ({ title, images, onEdit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageGrid}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
          <Text style={styles.editText}>✎</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150, // Adjust to match your layout
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: 100, // Adjust to fit the images
  },
  image: {
    width: "50%",
    height: "50%",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  editButton: {
    padding: 4,
  },
  editText: {
    fontSize: 16,
    color: "#FF5722", // Edit button color
  },
});

export default recipeBox;
