import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "backend/supabaseClient";

const windowWidth = Dimensions.get("window").width;

export default function Page() {
  const router = useRouter();
  const [selectedFilters, setSelectedFilters] = useState({
    ingredients: [],
    cuisine: "",
    servings: "",
    time: "",
    difficulty: "",
  });

  const handleFilterPress = (category, item) => {
    setSelectedFilters((prev) => {
      if (category === "ingredients") {
        const newIngredients = prev.ingredients.includes(item)
          ? prev.ingredients.filter((i) => i !== item)
          : [...prev.ingredients, item];
        return { ...prev, ingredients: newIngredients };
      }
      return { ...prev, [category]: prev[category] === item ? "" : item };
    });
  };

  // Update the onPress handler of the Save Button
  const handleSavePress = async () => {
    const recipes = await fetchRecipes();
    //console.log(recipes); // Print the array of recipes
    //router.back();
  };

  const fetchRecipes = async () => {
    try {
      let query = supabase.from("Recipes").select("*"); // Select all fields

      // Apply difficulty filter if it's not empty
      if (selectedFilters.difficulty) {
        query = query.eq("difficulty_1", selectedFilters.difficulty);
      }

      // Apply cuisine filter if it's not empty
      if (selectedFilters.cuisine) {
        query = query.eq("cuisine", selectedFilters.cuisine);
      }

      // Apply ingredients filter if there are selected ingredients
      if (selectedFilters.ingredients.length > 0) {
        // Loop through each selected ingredient and apply the filter
        selectedFilters.ingredients.forEach((ingredient) => {
          query = query.filter(
            "RecipeIngredientParts",
            "ilike",
            `%${ingredient}%`
          ); // Check if ingredient_search contains the ingredient
        });
      }

      const { data, error } = await query; // Execute the query

      if (error) {
        console.error("Error fetching recipes:", error.message); // Log the error message
        return [];
      }

      console.log("Fetched Recipes:", data); // Log the fetched data
      return data;
    } catch (err) {
      console.error("Error in fetchRecipes:", err); // Log any unexpected errors
    }
  };

  const FilterChip = ({ text, category, locked = false }) => {
    const isSelected =
      category === "ingredients"
        ? selectedFilters.ingredients.includes(text)
        : selectedFilters[category] === text;

    return (
      <TouchableOpacity
        style={[styles.filterChip, isSelected && styles.selectedChip]}
        onPress={() => handleFilterPress(category, text)}
      >
        <Text
          style={[styles.filterChipText, isSelected && styles.selectedChipText]}
        >
          {text} {locked ? "🔒" : ""}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.content} marginTop={30}>
        {/* Active Filters */}
        <View style={styles.filtersSection}>
          <TouchableOpacity>
            <Image
              source={require("assets/fullfilter.png")}
              style={styles.filterIcon}
            />
          </TouchableOpacity>
          <View style={[styles.filterChip, styles.selectedChip]}>
            <Text style={styles.filterChipText}>Nut Allergy 🔒</Text>
          </View>
          <View style={[styles.filterChip, styles.selectedChip]}>
            <Text style={styles.filterChipText}>Gluten Free 🔒</Text>
          </View>
        </View>

        {/* Ingredients Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Image
              source={require("../../../assets/carrot.png")}
              style={styles.sectionIcon}
            />
            <Text style={styles.sectionTitle}>Ingredients</Text>
          </View>
          <View style={styles.chipContainer}>
            {[
              "My Veggies",
              "My Grains",
              "This week",
              "lemon",
              "kale",
              "chicken",
              "basil",
              "beef",
              "sriracha",
              "rice",
              "celery",
              "onion",
              "potato",
              "eggs",
              "lettuce",
            ].map((item) => (
              <FilterChip key={item} text={item} category="ingredients" />
            ))}
          </View>
        </View>

        {/* Cuisine Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Image
              source={require("../../../assets/dinner.png")}
              style={styles.sectionIcon}
            />
            <Text style={styles.sectionTitle}>Cuisine</Text>
          </View>
          <View style={styles.chipContainer}>
            {[
              "American",
              "Thai",
              "Mexican",
              "Portuguese",
              "French",
              "Russian",
              "Italian",
            ].map((item) => (
              <FilterChip key={item} text={item} category="cuisine" />
            ))}
          </View>
        </View>

        {/* Servings Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Image
              source={require("../../../assets/fork.png")}
              style={styles.sectionIcon}
            />
            <Text style={styles.sectionTitle}>Servings</Text>
          </View>
          <View style={styles.chipContainer}>
            {["for 1", "for 2-3", "for 4-5", "for 6-7", "for 8+"].map(
              (item) => (
                <FilterChip key={item} text={item} category="servings" />
              )
            )}
          </View>
        </View>

        {/* Time Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Image
              source={require("../../../assets/clock.png")}
              style={styles.sectionIcon}
            />
            <Text style={styles.sectionTitle}>Time</Text>
          </View>
          <View style={styles.chipContainer}>
            {["<30 min", "30-60 min", "60-90 min", "90-120 min", ">60 min"].map(
              (item) => (
                <FilterChip key={item} text={item} category="time" />
              )
            )}
          </View>
        </View>

        {/* Difficulty Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Image
              source={require("../../../assets/fire.png")}
              style={styles.sectionIcon}
            />
            <Text style={styles.sectionTitle}>Difficulty</Text>
          </View>
          <View style={styles.chipContainer}>
            {["Novice", "Easy", "Moderate", "Hard", "Expert"].map((item) => (
              <FilterChip key={item} text={item} category="difficulty" />
            ))}
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSavePress} // Updated to use the new handler
          >
            <Text style={styles.saveButtonText}>Save & Return to swiping</Text>
          </TouchableOpacity>
          <Text style={styles.noteText}>
            To edit permanent filters{"\n"}
            go to preferences in your profile
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FAF9F6",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 2,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "Prata",
  },
  searchIcon: {
    width: 22,
    height: 22,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  filtersSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  sectionIcon: {
    width: windowWidth * 0.04,
    height: windowWidth * 0.04,
    marginRight: 5,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#38434D",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  filterIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  filterChip: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#A52A2A",
    borderRadius: 16,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 4,
    marginBottom: 3,
  },
  selectedChip: {
    backgroundColor: "#FFEDE1",
  },
  filterChipText: {
    color: "#A52A2A",
    fontSize: 12,
    fontFamily: "Poppins",
  },
  bottomContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 25,
    width: "80%",
    paddingVertical: 8,
    alignItems: "center",
    marginBottom: 4,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  noteText: {
    textAlign: "center",
    color: "#666",
    fontSize: 10,
  },
});

//export { fetchRecipes }; // Export the fetchRecipes function
