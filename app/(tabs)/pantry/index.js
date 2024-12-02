import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";

import { supabase } from "backend/supabaseClient";

// const windowWidth = Dimensions.get("window").width;

export default function Page() {
  const [items, setItems] = useState(null);
  const router = useRouter();

  const fetchItems = async () => {
    try {
      const user_response = await supabase.from("Pantry").select("*");
      setItems(user_response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  console.log(items);

  const renderHeader = () => (
    <View style={styles.cartContainer}>
      <Text style={styles.itemLabel}>This is the top item!</Text>
    </View>
  );

  return (
    <View style={styles.main}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        scrollEnabled={true}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer}>
            <Text style={styles.itemLabel}>{item.name}</Text>

            {/* <Image source={{ uri: item.imageUrl }} style={styles.albumImage} />
            <View style={styles.songInfo}>
              <Text
                style={styles.songTitle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.songTitle}
              </Text>
              <Text
                style={styles.artist}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.songArtists.map((artist) => artist.name).join(", ")}
              </Text>
            </View>
            <Text style={styles.album} numberOfLines={1} ellipsizeMode="tail">
              {item.albumName}
            </Text>
            <Text style={styles.duration}>
              {millisToMinutesAndSeconds(item.duration)}
            </Text> */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    // padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    width: 166,
    height: 166,
    borderWidth: 2,
    borderColor: "#B5300B",
    marginTop: 20,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    backgroundColor: "#FAF9F6",
  },
  cartContainer: {
    width: 352,
    height: 166,
    borderWidth: 2,
    borderColor: "#B5300B",
    marginTop: 20,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    backgroundColor: "#FAF9F6",
  },
  itemLabel: {
    color: "black",
    fontFamily: "Prata-Regular",
    fontSize: 16,
    fontWeight: 400,
    margin: 4,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
