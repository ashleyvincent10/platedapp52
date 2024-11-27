import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import CollapsibleView from "components/collapsibleView";
import RecipeBox from "components/recipeBox";
import { supabase } from "backend/supabaseClient";

import { Link } from "expo-router";

const windowWidth = Dimensions.get("window").width;

export default function Page() {
  const [mine, setMine] = useState(null);
  const router = useRouter();

  const fetchMine = async () => {
    try {
      const user_response = await supabase
        .from("Recipes")
        .select("*")
        .eq("is_mine", true);
      setMine(user_response.data);
      //console.log(mine);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMine();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.fullHeader}>
        <View style={styles.topHeader}>
          <View style={styles.topHeaderElem}>
            <Image
              source={require("../../../assets/chef_prof.png")}
              style={styles.profPic}
            ></Image>
            <Text style={styles.title}>Chef You</Text>
          </View>
          <View style={styles.topHeaderElem} marginTop={10}>
            <Text style={styles.number}>#</Text>
            <Text style={styles.subtitle}>Recipes</Text>
          </View>
          <View style={styles.topHeaderElem} marginTop={10}>
            <Text style={styles.number}>#</Text>
            <Text style={styles.subtitle}>Followers</Text>
          </View>
          <View style={styles.topHeaderElem} marginTop={10}>
            <Text style={styles.number}>#</Text>
            <Text style={styles.subtitle}>Following</Text>
          </View>
        </View>
        <Text style={styles.subtitle} marginTop={10}>
          Status: Line Cook
        </Text>
        <Text style={styles.subtitle}>
          Hi this is my profile and I'm writing the bio that would go here!
        </Text>
      </View>
      {/* ScrollViews here and then */}
      <ScrollView marginTop="5%" flex={1}>
        <Text style={styles.title} marginTop={10}>
          Cookbooks
        </Text>
        <View backgroundColor="gray">
          <RecipeBox
            title="Healthy recipes"
            image={"assets/recipe_images/recipe_image_1.jpeg"}
          ></RecipeBox>
        </View>

        <Text style={styles.title} marginTop={10}>
          Your Recipes
        </Text>
        <View backgroundColor="gray">
          <FlatList
            horizontal={true}
            data={mine}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/profile/recipe_details",
                    params: {
                      title: item.Name,
                    },
                  })
                }
              >
                <RecipeBox
                  title={item.Name}
                  image={
                    "assets/recipe_images/recipe_image_" +
                    [item.RecipeId] +
                    ".jpeg"
                  }
                ></RecipeBox>
              </TouchableOpacity>
            )}
          />
        </View>

        <Text style={styles.title} marginTop={10}>
          Recreations
        </Text>
        <View backgroundColor="gray">
          <RecipeBox
            title="Healthy recipes"
            image={"assets/recipe_images/recipe_image_1.jpeg"}
          ></RecipeBox>
        </View>
        {/* <Text style={styles.title}> All Recipes</Text>
        <FlatList horizontal="true"></FlatList> */}
      </ScrollView>
    </View>
  );
}

{
  /* <CollapsibleView title="Cookbooks">
          <Text>This is the content of the expandable view</Text>
        </CollapsibleView>
        <CollapsibleView title="All Recipes">
          <Text>This is the content of the expandable view</Text>
        </CollapsibleView>
        <CollapsibleView title="Recreations">
          <Text>This is the content of the expandable view</Text>
        </CollapsibleView> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 24,
    backgroundColor: "#FAF9F6",
  },
  stats: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  fullHeader: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  number: {
    fontSize: 32,
    fontFamily: "Poppins",
    color: "black",
  },
  profPic: {
    height: windowWidth * 0.2,
    width: windowWidth * 0.2,
    marginBottom: 10,
  },
  topHeaderElem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  title: {
    fontSize: 26,
    color: "black",
    fontFamily: "Prata-Regular",
  },
  subtitle: {
    fontSize: 15,
    color: "black",
    fontFamily: "Poppins",
  },
});
