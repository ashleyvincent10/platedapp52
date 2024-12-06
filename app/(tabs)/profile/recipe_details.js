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
import RecreationBox from "components/recreationBox";
const windowWidth = Dimensions.get("window").width;

export default function RecipeDetails() {
  const [ingredients, setIngredients] = useState([]);
  const [steps, SetSteps] = useState([]);

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

  //recipe ingredients
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        //console.log(recipe_title);
        const { data, error } = await supabase
          .from("Recipes")
          .select("FormattedIngredients")
          .eq("Name", recipe_title);
        //process the data
        let unprocData = data[0].FormattedIngredients;
        let procData = unprocData.slice(2, -2);
        const splitArray = procData.split('", "');

        setIngredients(splitArray);
        //console.log(data[0].FormattedIngredients);
      } catch (err) {
        console.error(err);
      }
    };

    fetchIngredients();
    //console.log(ingredients);
  }, []);

  //recipe instructions
  useEffect(() => {
    const fetchSteps = async () => {
      try {
        //console.log(recipe_title);
        const { data, error } = await supabase
          .from("Recipes")
          .select("RecipeInstructions")
          .eq("Name", recipe_title);
        //process the data
        let unprocData = data[0].RecipeInstructions;
        //console.log(unprocData);
        let procData = unprocData.slice(5, -4);
        const splitArray = procData.split('\\", \\"');
        //console.log(splitArray);
        SetSteps(splitArray);
        //console.log(data[0].FormattedIngredients);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSteps();
    //console.log(ingredients);
  }, []);

  const format_time = time.slice(2);

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
              <Text style={styles.body}>{format_time}</Text>
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
        </View>
      </View>

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
        <Text style={styles.title} marginBottom={10}>
          {" "}
          Steps{" "}
        </Text>
        {steps.map((str, index) => (
          <Text style={styles.ingredientText} marginBottom={10}>
            {index}) {str}
          </Text>
        ))}
      </View>

      {/* RECREATIONS & CHEF NAME */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}> Recreations </Text>
        <TouchableOpacity
          onPress={() =>
            alert(
              "🚧whoops this page is under construction!🚧, please return back"
            )
          }
        >
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
      <RecreationBox />

      <Text style={styles.title}>The Chef</Text>
      <TouchableOpacity
        marginBottom={10}
        onPress={() =>
          alert("🚧whoops this is under construction!🚧, please return back")
        }
      >
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
    borderRadius: 100,
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
    marginBottom: 5,
    justifyContent: "center",
  },
  ingredientText: {
    fontSize: 14,
    color: "#38434D",
    fontFamily: "Poppins",
  },
});
