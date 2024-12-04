import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Touchable,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "backend/supabaseClient";
const windowWidth = Dimensions.get("window").width;

export default function RecipeDetails() {
  const [ingredients, setIngredients] = useState([""]);
  const { recipe_title, the_image, servings, time, difficulty, chef_name } =
    useLocalSearchParams();

  const navigation = useNavigation();
  navigation.setOptions({
    headerTitle: recipe_title,
    headerBackTitle: "Back",
    headerShown: true,
    headerTitleStyle: {
      fontFamily: "Prata-Regular",
      fontSize: 24,
      color: "black",
    },
    headerStyle: {
      backgroundColor: "#FAF9F6",
      // backgroundColor: "black",
      justifyContent: "flex-end",
    },
    headerTintColor: "black",
    headerBackButtonDisplayMode: "minimal",
  });

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const { response, error } = await supabase
          .from("Recipes") // Replace 'Recipes' with your actual table name
          .select("FormattedIngredients")
          .eq("Name", recipe_title);
        setIngredients(response.values);
        //console.log(response.values);
      } catch (err) {
        console.error(err);
      }
    };

    fetchIngredients();
    //console.log(ingredients);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.rowContainter}>
        {/* image and recipe info */}
        <View style={styles.vertCenterContainer}>
          <Image source={{ uri: the_image }} style={styles.recipeImage} />
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                marginHorizontal: 2,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../assets/fork.png")}
                style={{
                  width: windowWidth * 0.08,
                  height: windowWidth * 0.08,
                }}
              />
              <Text style={styles.body}>{servings}</Text>
            </View>
            <View
              style={{
                marginHorizontal: 3,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../assets/clock.png")}
                style={{
                  width: windowWidth * 0.085,
                  height: windowWidth * 0.085,
                }}
              />
              <Text style={styles.body}>{time}</Text>
            </View>
            <View
              style={{
                marginHorizontal: 3,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../assets/fire.png")}
                style={{
                  width: windowWidth * 0.085,
                  height: windowWidth * 0.085,
                }}
              />
              <Text style={styles.body}>{difficulty}</Text>
            </View>
          </View>
        </View>
        {/* chef su and save recipe */}
        <View style={styles.vertCenterContainer}>
          <TouchableOpacity>
            <Image
              source={require("../../../assets/chefHat.png")}
              style={{
                width: windowWidth * 0.33,
                height: windowWidth * 0.33,
                marginBottom: "15%",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("../../../assets/save_tab_2.png")} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Poppins",
                color: "white",
                position: "absolute",
                left: "13%",
                bottom: "20%",
              }}
            >
              Save Recipe +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* change the data structure to be a list of tuples */}
      {/* INGREDIENTS  */}
      <View marginBottom={10}>
        <Text style={styles.title}> Ingredients </Text>
        <View style={styles.ingredientContainer}>
          {ingredients.map((str) => (
            <View style={styles.ingredient}>
              <Text style={styles.ingredientText}>{str}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* STEPS */}
      <View marginBottom={10}>
        <Text style={styles.title}> Steps </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}> Recreations </Text>
        <TouchableOpacity>
          <Image
            source={require("../../../assets/arrow.png")}
            style={{
              width: windowWidth * 0.08,
              height: windowWidth * 0.08,
              marginBottom: "15%",
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView marginBottom={10}>
        <TouchableOpacity>
          <View style={styles.recreationContainer}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../../../assets/chef_prof.png")}
                  style={styles.profPic}
                ></Image>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <Text style={styles.title}>The Chef</Text>
      <TouchableOpacity marginBottom={10}>
        <View style={styles.chefContainer}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../../assets/chef_prof.png")}
              style={styles.profPic}
            ></Image>
            <Text
              style={{
                fontSize: 25,
                color: "#B5300B",
                fontFamily: "Poppins",
                marginHorizontal: 10,
              }}
            >
              Chef {chef_name}
              {"\n"}@{chef_name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#FAF9F6",
  },
  title: {
    fontSize: 30,
    fontFamily: "Prata-Regular",
  },
  body: {
    fontSize: 14,
    color: "#38434D",
    fontFamily: "Poppins",
  },
  recipeImage: {
    height: 190,
    aspectRatio: 1,
    borderColor: "#B5300B",
    borderWidth: 3,
  },
  vertCenterContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rowContainter: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  recreationContainer: {
    backgroundColor: "white",
    width: "100%",
    height: 150,
    borderColor: "#B5300B",
    borderWidth: 3,
  },
  profPic: {
    height: windowWidth * 0.15,
    width: windowWidth * 0.15,
    margin: 5,
  },
  chefContainer: {
    backgroundColor: "white",
    width: "100%",
    height: windowWidth * 0.2,
    borderColor: "#B5300B",
    borderWidth: 3,
  },
  ingredientContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  ingredient: {
    width: "50%",
  },
});
