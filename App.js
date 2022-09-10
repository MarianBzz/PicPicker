import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ImageScreen from "./screens/ImageScreen";
import HomeScreen from "./screens/HomeScreen";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerLeft: () => <Text>Logo</Text>,
            headerRight: () => (
              <Text
                style={{ color: "white", fontSize: 18 }}
                onPress={() => console.log("ola k ase")}
              >
                Search
              </Text>
            ),
            title: "PicPicker App",
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
            headerStyle: {
              backgroundColor: "#0D0D0D",
            },
          }}
        />
        <Stack.Screen name="ImageScreen" component={ImageScreen} />
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}
