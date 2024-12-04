import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { Link } from "expo-router";
import { FlatList } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;

export default function Page() {
  return (
    <View style={styles.container}>
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

      <View>
        {/* Ingredients */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/carrot.png")}
            style={{
              width: windowWidth * 0.085,
              height: windowWidth * 0.085,
            }}
          />
          <Text style={styles.subtitle}>Ingredients</Text>
        </View>
        {/* add a max height to the scrollview styling */}
        <ScrollView>
          <Text> put filter boxes here</Text>
        </ScrollView>

        {/* Cuisine */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/dinner.png")}
            style={{
              width: windowWidth * 0.085,
              height: windowWidth * 0.085,
            }}
          />
          <Text style={styles.subtitle}> Cuisine </Text>
        </View>
        <ScrollView>
          <Text> put filter boxes here</Text>
        </ScrollView>

        {/* Servings */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/fork.png")}
            style={{
              width: windowWidth * 0.085,
              height: windowWidth * 0.085,
            }}
          />
          <Text style={styles.subtitle}> Servings </Text>
        </View>
        <View>
          <Text> render the 5 filters here in a horizontal view </Text>
        </View>

        {/* Time */}
        <View
          style={{
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
          <Text style={styles.subtitle}> Time </Text>
        </View>
        <View>
          <Text> render the 5 filters here in a horizontal view </Text>
        </View>

        {/* Difficulty */}
        <View
          style={{
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
          <Text style={styles.subtitle}> Difficulty </Text>
        </View>
        <Text> render the 5 filters here in a horizontal view </Text>
      </View>
      <View>
        <TouchableOpacity>
          <Text> save and return button here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    margin: 20,
    flexDirection: "column",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
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
  searchIcon: {
    width: 27,
    height: 27,
    marginHorizontal: 3,
  },
  filtersContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  filterIcon: {
    width: 27,
    height: 27,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
});
