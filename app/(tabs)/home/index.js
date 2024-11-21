import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { supabase } from "../../../backend/supabaseClient";

export default function Page() {
  useEffect(() => {
    // Function to fetch all rows from the Test table
    const fetchData = async () => {
      try {
        // Fetch all rows from the Test table
        let { data: Test, error } = await supabase.from("Test").select("*");

        if (error) {
          console.error("Error fetching data:", error);
        } else {
          console.log("Data fetched from Supabase:", Test);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello Chef</Text>
        <Text style={styles.subtitle}>This is the first page of Plated.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
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
