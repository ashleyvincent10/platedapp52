import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Plated</Text>
        <TouchableOpacity>
          <Image
            source={require("assets/magnifier.png")}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        {/* Filter Icon */}
        <TouchableOpacity style={styles.filterIconWrapper}>
          <Image
            source={require("assets/filter.png")} // Adjust the path to your filter icon
            style={styles.filterIcon}
          />
        </TouchableOpacity>
        <View style={styles.filter}>
          <Text style={styles.filterText}>Nut Allergy</Text>
        </View>
        <View style={styles.filter}>
          <Text style={styles.filterText}>Gluten Free</Text>
        </View>
        <View style={styles.filter}>
          <Text style={styles.filterText}>{"<30 min ✓"}</Text>
        </View>
        <View style={styles.filter}>
          <Text style={styles.filterText}>Novice</Text>
        </View>
      </ScrollView>

      {/* Recipe Card */}
      <View style={styles.imageContainer}>
        <Image
          source={require("assets/dinhome.png")}
          style={styles.recipeImage}
        />
        <View style={styles.blurOverlay}>
          <View style={styles.overlayContent}>
            <View style={styles.profileContainer}>
              <Image
                source={require("assets/personprofile.png")}
                style={styles.profileImage}
              />
            </View>
            <Text style={styles.recipeTitle}>Zuppa Di Fagioli</Text>
          </View>
          <View style={styles.recipeDetailsOverlay}>
            <Text style={styles.recipeDetailOverlay}>🍴 4 people</Text>
            <Text style={styles.recipeDetailOverlay}>⏱ 1 hr</Text>
            <Text style={styles.recipeDetailOverlay}>🔥 easy</Text>
            <Text style={styles.recipeDetailOverlay}>❤️ 147</Text>
          </View>
        </View>
      </View>

      {/* Saved Recipes Button */}
      <TouchableOpacity style={styles.savedRecipesButton}>
        <Text style={styles.savedRecipesButtonText}>Saved Recipes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 45,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "Prata",
  },
  searchIcon: {
    width: 27,
    height: 27,
    marginHorizontal: 3,
  },
  filtersContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  filter: {
    backgroundColor: "#FFEDE1",
    borderWidth: 1,
    borderColor: "#A52A2A",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  filterText: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "#A52A2A",
  },
  recipeCard: {
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
  },
  recipeImage: {
    width: "100%",
    height: 500,
  },
  blurOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: "rgba(220, 220, 220, 0.7)",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  recipeTitle: {
    fontSize: 35,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Prata",
    marginBottom: 10,
  },
  recipeDetailsOverlay: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recipeDetailOverlay: {
    fontSize: 18,
    fontFamily: "Poppins",
    color: "white",
  },
  savedRecipesButton: {
    backgroundColor: "#A52A2A",
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
    height: 50, // Adjust button height
  },
  savedRecipesButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  overlayContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileContainer: {
    width: 50, // Adjust size as needed
    height: 50,
    borderRadius: 50, // Make it circular
    overflow: "hidden",
    marginRight: 10, // Spacing between profile and title
    borderWidth: 1,
    borderColor: "#FFF", // Optional: Add border for contrast
  },
  filterIcon: {
    width: 30,
    height: 30,
  },
});
