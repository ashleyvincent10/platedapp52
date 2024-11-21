import { Image, StyleSheet, View, Text, Dimensions } from "react-native";
import { Redirect, Tabs } from "expo-router";
import { useFonts } from "expo-font";
import { TouchableOpacity } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarPosition: "bottom",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
        },
      }}
    >
      <Tabs.Screen
        name="chefSu"
        options={{
          title: "Chef Su",
          headerTitle: "Chef Su",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FAF9F6",
          },
          headerTitleStyle: {
            fontFamily: "Prata-Regular",
            fontSize: 38,
          },
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require("../../assets/chef-hat copy 1.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
          headerRight: () => (
            <Image
              source={require("../../assets/info.png")}
              style={{
                width: windowWidth * 0.07,
                height: windowWidth * 0.07,
                margin: 10,
              }}
            />
            //giving me a render error about the native gesture handler root view
            // <TouchableOpacity
            //   onPress={() => alert("More information about this screen!")}
            // >
            //   <Text>info</Text>
            // </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="post/index"
        options={{
          title: "Post",
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require("../../assets/book_icon.png")}
              style={{
                width: size,
                height: size,
                resizeMode: "contain",
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require("../../assets/home_icon.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pantry/index"
        options={{
          title: "Pantry",
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require("../../assets/pantry_icon.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require("../../assets/people.png")}
              style={{
                width: size * 1.4,
                height: size * 1.4,
                marginBottom: 1.75,
                tintColor: color,
                //marginTop: 20,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF9F6",
    height: "100%",
    width: windowWidth,
  },
  infoButton: {
    height: "10%",
    aspectRatio: 1,
  },
  prata: {
    fontFamily: "Prata-Regular",
    fontSize: "12",
  },
});
