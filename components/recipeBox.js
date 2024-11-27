import { React, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Link,
} from "react-native";
import { useRouter } from "expo-router";

export default function RecipeBox({ title, the_image }) {
  const [post, setPost] = useState(null);
  const router = useRouter();

  //   const fetchCookBook = async () => {
  //     try {
  //       const user_response = await supabase
  //         .from("recipes")
  //         .select("*")
  //         .eq("is_mine", "true");
  //       setMine(user_response.data);
  //       console.log(mine);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  // const fetchRecreation = async () => {
  //     try {
  //       const user_response = await supabase
  //         .from("recipes")
  //         .select("*")
  //         .eq("is_mine", "true");
  //       setRecreatino(user_response.data);
  //       console.log(recreation);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  return (
    // <TouchableOpacity
    //   onPress={() =>
    //     router.push({
    //       pathname: "/(tabs)/profile/recipe_details",
    //       params: {
    //         title: title,
    //         the_image: the_image,
    //       },
    //     })
    //   }
    // >
    <View style={styles.container}>
      <Image source={the_image} style={styles.image} />
      <View style={styles.footer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>✎</Text>
        </TouchableOpacity>
      </View>
    </View>
    // </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150, // Adjust to match your layout
    aspectRatio: 1,
    maxWidth: 150,
    borderWidth: 2,
    overflow: "hidden",
    borderColor: "#B5300B",
    backgroundColor: "#fff",
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#f8f8f8",
    marginHorizontal: 2,
  },
  title: {
    fontSize: 14,
    //fontWeight: "bold",
    color: "#333",
    fontStyle: "Poppins-Regular",
    overflow: "hidden",
  },
  editButton: {
    padding: 4,
  },
  editText: {
    fontSize: 16,
    color: "black", // Edit button color
  },
});
