import React, { useEffect, useState } from "react";
import { fetchRecipes } from "./filters";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue, // https://docs.swmansion.com/react-native-reanimated/docs/core/useSharedValue
  useAnimatedStyle, // https://docs.swmansion.com/react-native-reanimated/docs/core/useAnimatedStyle
  // Animation functions
  withTiming, // https://docs.swmansion.com/react-native-reanimated/docs/animations/withTiming/
  withSpring, // https://docs.swmansion.com/react-native-reanimated/docs/animations/withSpring/
  // Animation modifiers
  withDecay, // https://docs.swmansion.com/react-native-reanimated/docs/animations/withDecay/
  withSequence, // https://docs.swmansion.com/react-native-reanimated/docs/animations/withSequence/
  withRepeat, // https://docs.swmansion.com/react-native-reanimated/docs/animations/withRepeat/
  withDelay, // https://docs.swmansion.com/react-native-reanimated/docs/animations/withDelay/
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  FlingGestureHandler,
  Directions,
} from "react-native-gesture-handler";

import { supabase } from "backend/supabaseClient";
import { useFilters } from "./FilterContext"; // Import the useFilters hook

// Dynamic dimensions so it fits on any screen size
const SCREEN_HEIGHT = Dimensions.get("window").height;
const FOLDER_HEIGHT = SCREEN_HEIGHT * 0.08; // Height of the full folder
const TAB_HEIGHT = SCREEN_HEIGHT * 0.029; // Height of just the tab
const INITIAL_MARGIN = FOLDER_HEIGHT - TAB_HEIGHT; // Shows only the tab initially
const ANIMATION_DURATION = 1000;

export default function HomeScreen() {
  const router = useRouter();
  const topFolderMargin = useSharedValue(INITIAL_MARGIN);
  const { selectedFilters } = useFilters(); // Access the selected filters

  const [recipes, setRecipes] = useState([]); // State to hold recipes

  // Fetch recipes based on selected filters
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

      //console.log("Fetched Recipes:", data); // Log the fetched data
      return data;
    } catch (err) {
      console.error("Error in fetchRecipes:", err); // Log any unexpected errors
    }
  };

  // Add useEffect to fetch recipes when selected filters update
  useEffect(() => {
    const getRecipes = async () => {
      const fetchedRecipes = await fetchRecipes(); // Fetch recipes based on filters
      setRecipes(fetchedRecipes); // Update state with fetched recipes
    };

    getRecipes(); // Call the function to fetch recipes
  }, [selectedFilters]); // Dependency array to trigger on updates

  // Add useEffect to log selected filters when they update
  useEffect(() => {
    //console.log("Selected Filters:", selectedFilters);
  }, [selectedFilters]); // Dependency array to trigger on updates

  const onFling = () => {
    topFolderMargin.value = withTiming(
      0,
      {
        duration: ANIMATION_DURATION,
      },
      () => {
        topFolderMargin.value = withDelay(
          ANIMATION_DURATION,
          withTiming(INITIAL_MARGIN, {
            duration: ANIMATION_DURATION,
          })
        );
      }
    );
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.mainContainer}>
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => router.push("/(tabs)/home/filters")}>
            <Image
              source={require("assets/filter.png")}
              style={styles.filterIcon}
            />
          </TouchableOpacity>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersContainer}
          >
            <View style={styles.filter}>
              <Text style={styles.filterText}>Nut Allergy 🔒</Text>
            </View>
            <View style={styles.filter}>
              <Text style={styles.filterText}>{"Gluten Free 🔒"}</Text>
            </View>
            <View style={styles.filter}>
              <Text style={styles.filterText}>{"<30 min ✓"}</Text>
            </View>
            <View style={styles.filter}>
              <Text style={styles.filterText}> Novice ✓</Text>
            </View>
          </ScrollView>
        </View>

        {/* Recipe Card */}
        <TouchableOpacity>
          <View style={styles.cardStack}>
            <View style={styles.stackLayer3} />
            <View style={styles.stackLayer2} />
            <View style={styles.stackLayer1} />
            <FlingGestureHandler
              direction={Directions.DOWN}
              onActivated={onFling}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={require("assets/recipe_images/recipe_image_7.jpeg")}
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
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={require("assets/forkkk.png")}
                        style={styles.icon}
                      />
                      <Text style={styles.detailText}>4 people</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={require("assets/whiteclock.png")}
                        style={styles.icon}
                      />
                      <Text style={styles.detailText}>1 hr</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={require("assets/whitefire.png")}
                        style={styles.icon}
                      />
                      <Text style={styles.detailText}>easy</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={require("assets/whitebookmark.png")}
                        style={styles.icon}
                      />
                      <Text style={styles.detailText}>147</Text>
                    </View>
                  </View>
                </View>
              </View>
            </FlingGestureHandler>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.redoButton}>
          <Image source={require("assets/redo.png")} style={styles.redoIcon} />
        </TouchableOpacity>

        <View style={styles.footer}>
          <Animated.View
            style={[styles.folderContainer, { top: topFolderMargin }]}
          >
            <TouchableOpacity onPress={onFling} style={styles.buttonContainer}>
              <Image
                source={require("assets/swiping_images/saved_recipes_folder_cropped.png")}
                style={styles.savedRecipes}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 45,
  },
  footer: {
    width: "100%",
    height: FOLDER_HEIGHT,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    overflow: "hidden",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    fontFamily: "Prata",
    marginHorizontal: 10,
  },
  searchIcon: {
    width: 27,
    height: 27,
    marginHorizontal: 20,
  },
  filtersContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  filter: {
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
  recipeImage: {
    width: "100%",
    height: 500,
    borderRadius: 8,
  },
  blurOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: "#A52A2A",
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
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  detailText: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "white",
    marginLeft: 4,
  },
  overlayContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  filterIcon: {
    width: 35,
    height: 35,
    margin: 5,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: FOLDER_HEIGHT,
    overflow: "hidden",
  },
  savedRecipes: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    marginBottom: -SCREEN_HEIGHT * 0.01,
  },
  cardStack: {
    marginBottom: 20,
    marginHorizontal: 5,
  },
  stackLayer3: {
    position: "absolute",
    bottom: -10,
    left: 15,
    right: 15,
    height: 500,
    backgroundColor: "#8B0000",
    opacity: 0.3,
  },
  stackLayer2: {
    position: "absolute",
    bottom: -5,
    left: 8,
    right: 8,
    height: 500,
    backgroundColor: "#8B0000",
    opacity: 0.5,
  },
  stackLayer1: {
    position: "absolute",
    bottom: 0,
    left: 4,
    right: 4,
    height: 500,
    backgroundColor: "#8B0000",
  },
  imageContainer: {
    position: "relative",
    borderWidth: 5,
    borderColor: "#A52A2A",
    overflow: "hidden",
    backgroundColor: "white",
  },
  redoButton: {
    width: 70,
    height: 70,
    alignSelf: "flex-start",
  },
  redoIcon: {
    color: "#A52A2A",
    fontSize: 24,
  },
  folderContainer: {
    position: "absolute",
    width: "100%",
    height: FOLDER_HEIGHT,
    bottom: 0,
  },
});
