import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { FilterProvider } from "./FilterContext";

export default function StackLayout() {
  const router = useRouter();
  return (
    <FilterProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            headerTitle: " ",
            headerStyle: {
              backgroundColor: "#FAF9F6",
            },
            headerTitleStyle: {
              fontFamily: "Prata-Regular",
              fontSize: 34,
              color: "black",
            },
          }}
        />

        <Stack.Screen
          name="filters"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#FAF9F6",
            },
            headerTitle: "Set Filters",
            headerTitleStyle: {
              fontFamily: "Prata-Regular",
              fontSize: 34,
              color: "black",
            },
            headerTintColor: "black",
          }}
        />
      </Stack>
    </FilterProvider>
  );
}
