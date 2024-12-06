import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import {
  GestureHandlerRootView,
  FlingGestureHandler,
  Directions,
  FlatList,
} from "react-native-gesture-handler";

import { supabase } from "backend/supabaseClient";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useFilters } from "./FilterContext"; // Import the useFilters hook

// Dynamic dimensions so it fits on any screen size
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const FOLDER_HEIGHT = SCREEN_HEIGHT * 0.08; // Height of the full folder
const TAB_HEIGHT = SCREEN_HEIGHT * 0.029; // Height of just the tab
const INITIAL_MARGIN = FOLDER_HEIGHT - TAB_HEIGHT + 5; // Shows only the tab initially
const BOTTOM_MARGIN = -800;
const TOP_MARGIN = 1000;
const INVISIBLE_HEIGHT = 460;
const LOW_HEIGHT = 480;
const MEDIUM_HEIGHT = 500;
const HIGH_HEIGHT = 520;
const INVISIBLE_WIDTH = 330;
const LOW_WIDTH = 350;
const MEDIUM_WIDTH = 370;
const HIGH_WIDTH = 390;
const INVISIBLE_PLACEMENT = -21;
const LOW_PLACEMENT = -14;
const MEDIUM_PLACEMENT = -7;
const HIGH_PLACEMENT = 0;
const INVISIBLE_OPACITY = 0;
const LOW_OPACITY = 0.4;
const MEDIUM_OPACITY = 0.7;
const FADE_TIMING = 300;

export default function HomeScreen() {
  const router = useRouter();
  const { selectedFilters } = useFilters(); // Access the selected filters
  const [filtersToggle, setFiltersToggle] = useState(false);

  // Replace useSharedValue with Animated.Value
  const topFolderMargin = useRef(new Animated.Value(INITIAL_MARGIN)).current;
  const bottomCardMargin = useRef(new Animated.Value(0)).current;
  const invisibleCardOpacity = useRef(
    new Animated.Value(INVISIBLE_OPACITY)
  ).current;
  const lowCardOpacity = useRef(new Animated.Value(LOW_OPACITY)).current;
  const mediumCardOpacity = useRef(new Animated.Value(MEDIUM_OPACITY)).current;
  const invisibleCardHeight = useRef(
    new Animated.Value(INVISIBLE_HEIGHT)
  ).current;
  const lowCardHeight = useRef(new Animated.Value(LOW_HEIGHT)).current;
  const mediumCardHeight = useRef(new Animated.Value(MEDIUM_HEIGHT)).current;
  const invisibleCardWidth = useRef(
    new Animated.Value(INVISIBLE_WIDTH)
  ).current;
  const lowCardWidth = useRef(new Animated.Value(LOW_WIDTH)).current;
  const mediumCardWidth = useRef(new Animated.Value(MEDIUM_WIDTH)).current;
  const invisibleCardPlacement = useRef(
    new Animated.Value(INVISIBLE_PLACEMENT)
  ).current;
  const lowCardPlacement = useRef(new Animated.Value(LOW_PLACEMENT)).current;
  const mediumCardPlacement = useRef(
    new Animated.Value(MEDIUM_PLACEMENT)
  ).current;

  const [lineVisible, setLineVisible] = useState(false);
  const [recipes, setRecipes] = useState([{ Name: "test" }]); // State to hold recipes
  const [index, setIndex] = useState(0);

  // Fetch recipes based on selected filters
  const fetchRecipesData = async () => {
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
          );
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
      const fetchedRecipes = await fetchRecipesData(); // Fetch recipes based on filters
      setRecipes(fetchedRecipes); // Update state with fetched recipes
      console.log(recipes);
    };
    getRecipes(); // Call the function to fetch recipes
  }, [selectedFilters]);

  // Add useEffect to log selected filters when they update
  useEffect(() => {
    //console.log("Selected Filters:", selectedFilters);
    setFiltersToggle((current) => (current === false ? true : false));
  }, [selectedFilters]); // Dependency array to trigger on updates

  // Extract only the values from the object
  const values = Object.values(selectedFilters);

  // If some values are arrays (like "ingredients"), flatten them to render them as strings
  const flattenedValues = values.flatMap((value) =>
    Array.isArray(value) ? value : [value]
  );

  const onFlingDown = () => {
    // Animate topFolderMargin to 0
    Animated.timing(topFolderMargin, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setLineVisible(true);

      // Animate bottomCardMargin
      Animated.timing(bottomCardMargin, {
        toValue: BOTTOM_MARGIN,
        duration: 400,
        useNativeDriver: false,
      }).start(() => {
        setLineVisible(false);
        setIndex((prevIndex) => prevIndex + 1);
        // Delay and then return topFolderMargin back
        Animated.sequence([
          // After topFolderMargin returns, animate the card properties
          Animated.parallel([
            Animated.timing(topFolderMargin, {
              toValue: INITIAL_MARGIN,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(invisibleCardHeight, {
              toValue: LOW_HEIGHT,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(invisibleCardWidth, {
              toValue: LOW_WIDTH,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(invisibleCardPlacement, {
              toValue: LOW_PLACEMENT,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(lowCardHeight, {
              toValue: MEDIUM_HEIGHT,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(lowCardWidth, {
              toValue: MEDIUM_WIDTH,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(lowCardPlacement, {
              toValue: MEDIUM_PLACEMENT,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(mediumCardHeight, {
              toValue: HIGH_HEIGHT,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(mediumCardWidth, {
              toValue: HIGH_WIDTH,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(mediumCardPlacement, {
              toValue: HIGH_PLACEMENT,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(invisibleCardOpacity, {
              toValue: LOW_OPACITY,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(lowCardOpacity, {
              toValue: MEDIUM_OPACITY,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(mediumCardOpacity, {
              toValue: 1,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
          ]),
        ]).start(() => {
          // Once the entire sequence finishes, start another parallel animation
          Animated.parallel([
            Animated.timing(bottomCardMargin, {
              toValue: 0,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(invisibleCardHeight, {
              toValue: INVISIBLE_HEIGHT,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(invisibleCardWidth, {
              toValue: INVISIBLE_WIDTH,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(invisibleCardPlacement, {
              toValue: INVISIBLE_PLACEMENT,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(lowCardHeight, {
              toValue: LOW_HEIGHT,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(lowCardWidth, {
              toValue: LOW_WIDTH,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(lowCardPlacement, {
              toValue: LOW_PLACEMENT,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(mediumCardHeight, {
              toValue: MEDIUM_HEIGHT,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(mediumCardWidth, {
              toValue: MEDIUM_WIDTH,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(mediumCardPlacement, {
              toValue: MEDIUM_PLACEMENT,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(invisibleCardOpacity, {
              toValue: INVISIBLE_OPACITY,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(lowCardOpacity, {
              toValue: LOW_OPACITY,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(mediumCardOpacity, {
              toValue: MEDIUM_OPACITY,
              duration: 0,
              useNativeDriver: false,
            }),
          ]).start();
        });
      });
    });
  };

  const onFlingUp = () => {
    // Run the first animation
    Animated.timing(bottomCardMargin, {
      toValue: TOP_MARGIN,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      // Once the first animation finishes, update state
      setIndex((prevIndex) => prevIndex + 1);

      // Now run the parallel animations
      Animated.parallel([
        Animated.timing(invisibleCardHeight, {
          toValue: LOW_HEIGHT,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(invisibleCardWidth, {
          toValue: LOW_WIDTH,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(invisibleCardPlacement, {
          toValue: LOW_PLACEMENT,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(lowCardHeight, {
          toValue: MEDIUM_HEIGHT,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(lowCardWidth, {
          toValue: MEDIUM_WIDTH,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(lowCardPlacement, {
          toValue: MEDIUM_PLACEMENT,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(mediumCardHeight, {
          toValue: HIGH_HEIGHT,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(mediumCardWidth, {
          toValue: HIGH_WIDTH,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(mediumCardPlacement, {
          toValue: HIGH_PLACEMENT,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(invisibleCardOpacity, {
          toValue: LOW_OPACITY,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(lowCardOpacity, {
          toValue: MEDIUM_OPACITY,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(mediumCardOpacity, {
          toValue: 1,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
      ]).start(() => {
        // Once the parallel animations finish, run the next reset parallel
        Animated.parallel([
          Animated.timing(bottomCardMargin, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(invisibleCardHeight, {
            toValue: INVISIBLE_HEIGHT,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(invisibleCardWidth, {
            toValue: INVISIBLE_WIDTH,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(invisibleCardPlacement, {
            toValue: INVISIBLE_PLACEMENT,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(lowCardHeight, {
            toValue: LOW_HEIGHT,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(lowCardWidth, {
            toValue: LOW_WIDTH,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(lowCardPlacement, {
            toValue: LOW_PLACEMENT,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(mediumCardHeight, {
            toValue: MEDIUM_HEIGHT,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(mediumCardWidth, {
            toValue: MEDIUM_WIDTH,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(mediumCardPlacement, {
            toValue: MEDIUM_PLACEMENT,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(invisibleCardOpacity, {
            toValue: INVISIBLE_OPACITY,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(lowCardOpacity, {
            toValue: LOW_OPACITY,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(mediumCardOpacity, {
            toValue: MEDIUM_OPACITY,
            duration: 0,
            useNativeDriver: false,
          }),
        ]).start();
      });
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        {/* Header */}
        <View style={[styles.header, { zIndex: 2, backgroundColor: "red" }]}>
          <Text style={styles.title}>Plated</Text>

          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "🚧whoops this feature is under construction!🚧 Please go back and find your recipe manually."
              )
            }
          >
            <Image
              source={require("assets/magnifier.png")}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            zIndex: 1,
            backgroundColor: "orange",
            paddingLeft: 5,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => router.push("/(tabs)/home/filters")}>
            <Image
              source={require("assets/filter.png")}
              style={styles.filterIcon}
            />
          </TouchableOpacity>
          <View style={styles.filter}>
            <Text style={styles.filterText}>Nut Allergy 🔒</Text>
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.filtersContainer}
            data={flattenedValues}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.filter}>
                <Text style={styles.filterText}>
                  {item}
                  {"✓"}
                </Text>
              </View>
            )}
          />
        </View>

        {/* Recipe Cards */}
        <View
          style={[styles.cardStack, { zIndex: 4, backgroundColor: "yellow" }]}
        >
          {/* Since these are static layers, just leave them as Views or Animated.View with no dynamic props */}
          <Animated.View
            style={[
              styles.stackLayer,
              {
                height: invisibleCardHeight,
                width: invisibleCardWidth,
                bottom: invisibleCardPlacement,
                opacity: invisibleCardOpacity, // apply opacity from Animated.Value directly
              },
            ]}
          />
          <Animated.View
            style={[
              styles.stackLayer,
              {
                height: lowCardHeight,
                width: lowCardWidth,
                bottom: lowCardPlacement,
                opacity: lowCardOpacity,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.stackLayer,
              {
                height: mediumCardHeight,
                width: mediumCardWidth,
                bottom: mediumCardPlacement,
                opacity: mediumCardOpacity,
              },
            ]}
          />

          <FlingGestureHandler
            direction={Directions.DOWN}
            onActivated={onFlingDown}
          >
            <FlingGestureHandler
              direction={Directions.UP}
              onActivated={onFlingUp}
            >
              <Animated.View
                style={[
                  styles.stackLayer,
                  { bottom: bottomCardMargin, zIndex: 2 },
                ]}
              >
                <View style={styles.cardInternal}>
                  {/* <Image
                    source={require("assets/recipe_images/recipe_image_1.jpeg")}
                    style={styles.recipeImage}
                  />
                  <View style={styles.blurOverlay}>
                    <View style={styles.overlayContent}>
                      <View style={styles.profileContainer}>
                        <Image
                          source={require("assets/personprofile.png")}
                          style={styles.profileImage}
                        />
                      </View> */}
                  <Text style={styles.recipeTitle}>{recipes[3].Name}</Text>
                  {/* </View>
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
                    </View> */}
                  {/* </View> */}
                </View>
              </Animated.View>
            </FlingGestureHandler>
          </FlingGestureHandler>
        </View>

        {/* Redo button */}
        <TouchableOpacity style={[styles.redoButton, { zIndex: 6 }]}>
          <Icon name="redo" size={20} color="#B5300B" />
        </TouchableOpacity>

        {/* Footer */}
        <View style={[styles.footer, { zIndex: 3, backgroundColor: "green" }]}>
          <Animated.View
            style={[styles.folderContainer, { top: topFolderMargin }]}
          >
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/profile/saved_recipes")}
              style={[styles.buttonContainer, { zIndex: 1 }]}
            >
              <Image
                source={require("assets/swiping_images/saved_recipes_folder_cropped.png")}
                style={styles.savedRecipes}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Animation Line */}
        <View
          style={[
            {
              position: "absolute",
              height: 20,
              marginLeft: 15,
              marginRight: 15,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              width: 400,
              bottom: 0,
              zIndex: 5,
              backgroundColor: lineVisible ? "#444" : "transparent",
              backgroundColor: "blue",
            },
          ]}
        />
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
    justifyContent: "space-between",
    alignItems: "center",
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
    bottom: 0,
    overflow: "hidden",
  },
  cardStack: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - FOLDER_HEIGHT - 300,
  },
  stackLayer: {
    height: 520,
    width: 390,
    backgroundColor: "#B5300B",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  cardInternal: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderWidth: 5,
    borderColor: "#B5300B",
    overflow: "hidden",
    backgroundColor: "#B5300B",
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
  },
  filter: {
    borderWidth: 1,
    borderColor: "#A52A2A",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  filterText: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "#A52A2A",
  },
  filterIcon: {
    width: 30,
    height: 30,
    margin: 5,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: FOLDER_HEIGHT,
    overflow: "hidden",
    position: "absolute",
  },
  savedRecipes: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    marginBottom: -SCREEN_HEIGHT * 0.01,
    position: "absolute",
  },
  redoButton: {
    width: 20,
    height: 20,
    alignItems: "center",
    marginLeft: 15,
    transform: [{ scaleX: -1 }],
  },
  folderContainer: {
    width: "100%",
    height: FOLDER_HEIGHT,
  },
});
