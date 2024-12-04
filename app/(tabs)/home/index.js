import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
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
  Easing,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
  PanGestureHandler,
  FlingGestureHandler,
  Directions,
} from "react-native-gesture-handler";

export default function HomeScreen() {
  const topFolderMargin = useSharedValue(0);

  // const swipeGesture = () => {
  const onFling = (event) => {
    topFolderMargin.value = withTiming(
      -51,
      {
        duration: 1000,
      },
      () => {
        topFolderMargin.value = withDelay(
          1000,
          withTiming(0, {
            duration: 1000,
          })
        );
      }
    );
  };
  // };

  // const composedGesture = Gesture.Exclusive(swipeGesture);

  const handleSwipe = () => {
    // console.log(height.value);
    // return {
    // topFolderMargin.value = withTiming(
    //   -51,
    //   {
    //     duration: 1000,
    //   },
    //   () => {
    //     topFolderMargin.value = withDelay(
    //       1000,
    //       withTiming(0, {
    //         duration: 1000,
    //       })
    //     );
    //   }
    // );
    // backgroundColor: color.value,
    // opacity: toggled.value ? withTiming(0.2) : withTiming(1),
    // transform: [{ translateY: translateY.value }],
    // };
  };
  // const handleSwipe = () => {
  //   topFolderMargin.value = withTiming(0, {
  //     duration: 1000,
  //   });
  //   topFolderMargin.value = withDelay(
  //     1000,
  //     withTiming(51, {
  //       duration: 1000,
  //     })
  //   );
  // };

  return (
    <GestureHandlerRootView>
      <View style={styles.mainContainer}>
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
                source={require("assets/filter.png")}
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
          <View style={styles.cardStack}>
            <View style={styles.stackLayer3} />
            <View style={styles.stackLayer2} />

            {/* <GestureDetector gesture={composedGesture}> */}

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
                    <Image
                      source={require("assets/forkkk.png")}
                      style={styles.icon}
                    />
                    <Text style={styles.detailText}>4 people</Text>
                    <Image
                      source={require("assets/whiteclock.png")}
                      style={styles.icon}
                    />
                    <Text style={styles.detailText}>1 hr</Text>
                    <Image
                      source={require("assets/whitefire.png")}
                      style={styles.icon}
                    />
                    <Text style={styles.detailText}>easy</Text>
                    <Image
                      source={require("assets/whitebookmark.png")}
                      style={styles.icon}
                    />
                    <Text style={styles.detailText}>147</Text>
                  </View>
                </View>
              </View>
            </FlingGestureHandler>
            {/* </GestureDetector> */}
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.redoButton}>
          <Image source={require("assets/redo.png")} style={styles.redoIcon} />
        </TouchableOpacity>

        <View style={styles.footer}>
          {/* Redo button */}

          {/* Saved Recipes Button */}
          <Animated.View style={{ top: topFolderMargin }}>
            <TouchableOpacity
              onPress={handleSwipe}
              style={styles.buttonContainer}
            >
              <Image
                source={require("assets/swiping_images/saved_recipes_folder_cropped.png")}
                style={styles.savedRecipes}
              />
              {/* <Text style={styles.savedText}>Saved Recipes</Text> */}
              {/* <Image
          source={require("assets/saved_bookmark.png")}
          style={styles.savedRecipesButton}
        /> */}
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
    paddingTop: 45,
    marginBottom: 20,
  },
  footer: {
    width: "100%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "blue",
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
    width: 15,
    height: 15,
    marginRight: 5,
  },
  detailText: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "white",
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
    width: 27,
    height: 27,
  },

  buttonContainer: {
    // padding: 10,
    // width: 142,
    // height: 24,
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    width: 405,
    height: 70,
    top: 51,
    overflow: "hidden",
  },
  savedRecipes: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    marginTop: 0,
  },
  savedRecipesButton: {
    width: 200,
    height: 45,
    resizeMode: "contain",
  },
  savedRecipesButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  cardStack: {
    position: "relative",
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
  redoButtonContainer: {
    position: "relative",
    paddingHorizontal: 20,
    marginTop: -50,
  },
  redoButton: {
    width: 70,
    height: 70,
    // backgroundColor: "transparent",
    // justifyContent: "center",
    // alignItems: "center",
    alignSelf: "flex-start",
  },
  redoIcon: {
    color: "#A52A2A",
    fontSize: 24,
  },
  savedText: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "white",
  },
});
