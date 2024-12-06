import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { useState, useEffect } from "react";
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
  runOnJS,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  FlingGestureHandler,
  Directions,
} from "react-native-gesture-handler";
import { supabase } from "backend/supabaseClient";
import Icon from "react-native-vector-icons/FontAwesome5";

// Dynamic dimensions so it fits on any screen size
const SCREEN_HEIGHT = Dimensions.get("window").height;
const FOLDER_HEIGHT = SCREEN_HEIGHT * 0.08; // Height of the full folder
// const FOLDER_HEIGHT = 200;
const TAB_HEIGHT = SCREEN_HEIGHT * 0.029; // Height of just the tab
const INITIAL_MARGIN = FOLDER_HEIGHT - TAB_HEIGHT + 5; // Shows only the tab initially
const ANIMATION_DURATION = 700;

const BOTTOM_MARGIN = -800;
const TOP_MARGIN = 1000;

export default function HomeScreen() {
  // const [mine, setMine] = useState(null);
  const router = useRouter();
  const topFolderMargin = useSharedValue(INITIAL_MARGIN);
  const bottomCardMargin = useSharedValue(0);
  const [lineVisible, setLineVisible] = useState(false);

  // const fetchMine = async () => {
  //   try {
  //     const response = await supabase
  //       .from("Recipes")
  //       .select()
  //       .eq("Name", "Banana Nut Bread");
  //     //setMine();
  //     console.log(response.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchMine();
  // }, []);

  const onFlingDown = () => {
    topFolderMargin.value = withTiming(
      0,
      {
        duration: ANIMATION_DURATION,
      },
      () => {
        runOnJS(setLineVisible)(true);
        bottomCardMargin.value = withTiming(
          BOTTOM_MARGIN,
          {
            duration: 500,
          },
          () => {
            runOnJS(setLineVisible)(false);
            topFolderMargin.value = withDelay(
              ANIMATION_DURATION,
              withTiming(INITIAL_MARGIN, {
                duration: ANIMATION_DURATION,
              })
            );
          }
        );
      }
    );
  };

  const onFlingUp = () => {
    bottomCardMargin.value = withTiming(TOP_MARGIN, {
      duration: ANIMATION_DURATION / 3,
    });
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.mainContainer}>
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
            },
          ]}
        />
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
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
        {/* <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(tabs)/home/recipe_details1",
              params: {
                recipe_title: mine.Name,
                the_image: mine.image_url,
                servings: mine.servings,
                time: mine.TotalTime,
                difficulty: mine.difficulty,
                chef_name: mine.AuthorName,
              },
            })
          }
        > */}

        <Animated.View
          style={[styles.cardStack, { bottom: bottomCardMargin, zIndex: 2 }]}
        >
          <View style={styles.stackLayer3} />
          <View style={styles.stackLayer2} />
          <View style={styles.stackLayer1} />
          {/* <View style={styles.stackLayer1} /> */}
          <FlingGestureHandler
            direction={Directions.DOWN}
            onActivated={onFlingDown}
          >
            <FlingGestureHandler
              direction={Directions.UP}
              onActivated={onFlingUp}
            >
              <View style={styles.imageContainer}>
                <Image
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
                    </View>
                    <Text style={styles.recipeTitle}>Zuppa Di Fagioli</Text>
                  </View>
                  {/* <Text style={styles.recipeTitle}>Zuppa Di Fagioli</Text> */}
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
            </FlingGestureHandler>
          </FlingGestureHandler>
        </Animated.View>
        {/* </TouchableOpacity> */}
        <TouchableOpacity style={styles.redoButton}>
          <Icon name="redo" size={20} color="#B5300B" />
        </TouchableOpacity>

        <View style={styles.footer}>
          <Animated.View
            style={[styles.folderContainer, { top: topFolderMargin }]}
          >
            {/* <Image
              source={require("assets/swiping_images/saved_recipes_front.png")}
              style={[styles.savedRecipes, { bottom: -20, zIndex: 3 }]}
            /> */}
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
    // borderRadius: 8,
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
    position: "absolute",
  },
  savedRecipes: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    marginBottom: -SCREEN_HEIGHT * 0.01,
    position: "absolute",
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
    left: 4,
    right: 4,
    height: 500,
    backgroundColor: "#8B0000",
    // bottom: 10,
  },
  imageContainer: {
    position: "relative",
    borderWidth: 5,
    borderColor: "#A52A2A",
    overflow: "hidden",
    backgroundColor: "white",
  },
  redoButton: {
    width: 20,
    height: 20,
    alignItems: "center",
    marginLeft: 15,
    // position: "absolute",
    transform: [{ scaleX: -1 }],
  },
  redoIcon: {
    position: "absolute",
    resizeMode: "contain",
  },
  folderContainer: {
    // position: "absolute",
    width: "100%",
    height: FOLDER_HEIGHT,
    // bottom: 0,
  },
});
