import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Touchable,
} from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.mainContainer}>
      {/* <ScrollView style={styles.container}> */}
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
      {/* Filter Icon */}
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
      </View>
      {/* Recipe Card */}
      <TouchableOpacity>
        <View style={styles.cardStack}>
          <View style={styles.stackLayer3} />
          <View style={styles.stackLayer2} />
          <View style={styles.stackLayer1} />
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
        </View>
      </TouchableOpacity>
      {/* </ScrollView> */}

      <View style={styles.footer}>
        {/* Redo button */}
        <TouchableOpacity style={styles.redoButton}>
          <Image source={require("assets/redo.png")} style={styles.redoIcon} />
        </TouchableOpacity>

        {/* Saved Recipes Button */}

        <TouchableOpacity style={styles.buttonContainer}>
          <Image
            source={require("assets/saved_folder_1.png")}
            style={styles.savedRecipes}
          />
        </TouchableOpacity>
      </View>
    </View>
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
    paddingTop: 45,
    marginBottom: 5,
  },
  footer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "Prata",
  },
  searchIcon: {
    width: 27,
    height: 27,
    marginHorizontal: 20,
  },
  filtersContainer: {
    flexDirection: "row",
    //marginBottom:,
    marginTop: 10,
    backgroundColor: "blue",
  },
  filter: {
    // backgroundColor: "#FFEDE1",
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
    alignItems: "center",
    justifyContent: "flex-end",
    height: 50,
    width: 200,
    overflow: "hidden",
  },
  savedRecipes: {
    width: "100%",
    height: "100%",
    backgroundColor: "blue",
    marginBottom: -8,
    resizeMode: "contain",
  },
  savedRecipesButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  cardStack: {
    //position: "relative",
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
  },
  redoButton: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    // alignSelf: "flex-start",
    position: "absolute",
    left: 7,
    bottom: 0,
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
