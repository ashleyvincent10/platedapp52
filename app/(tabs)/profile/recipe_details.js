import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "expo-router";
import { Link } from "expo-router";
const windowWidth = Dimensions.get("window").width;

export default function RecipeDetails({ recipe_title, the_image }) {
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.rowContainter}>
        <View style={styles.vertCenterContainer}>
          <Image source={the_image} style={styles.recipeImage} />
          <View></View>
        </View>
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
            <Image
              source={require("../../../assets/save_tab_2.png")}
              // style={{
              //   width: windowWidth * 0.3,
              //   height: windowWidth * 0.33,
              // }}
            />
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
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  recipeImage: {
    height: 190,
    aspectRatio: 1,
    borderColor: "#B5300B",
    borderWidth: 3,
    backgroundColor: "blue",
  },
  vertCenterContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  rowContainter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
