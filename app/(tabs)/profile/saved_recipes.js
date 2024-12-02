import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import RecipeBox from "components/recipeBox";
import { supabase } from "backend/supabaseClient";
import { useRouter } from "expo-router";

import { Link } from "expo-router";

export default function Page() {
  const [saved, setSaved] = useState(null);
  const router = useRouter();
  const fetchSaved = async () => {
    try {
      const user_response = await supabase
        .from("Recipes")
        .select("*")
        .eq("is_saved", true);
      setSaved(user_response.data);
      //console.log(mine);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          numColumns={2}
          data={saved}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/profile/recipe_details",
                  params: {
                    title: item.Name,
                    the_image:
                      "assets/recipe_images/recipe_image_" +
                      [item.RecipeId] +
                      ".jpeg",
                  },
                })
              }
            >
              <RecipeBox
                title={item.Name}
                the_image={item.image_url}
                edit={false}
              ></RecipeBox>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#FAF9F6",
  },
});
