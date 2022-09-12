import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ImageScreen from "./screens/ImageScreen";
import HomeScreen from "./screens/HomeScreen";
import { Text } from "react-native";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          options={{
            headerLeft: () => <Text>Logo</Text>,
            headerRight: () => (
              <Text
                style={{ color: "white", fontSize: 18 }}
                onPress={() => setOpenSearch(!openSearch)}
              >
                {openSearch ? "Close" : "Search"}
              </Text>
            ),
            title: "PicPicker App",
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
            headerStyle: {
              backgroundColor: "#0D0D0D",
            },
          }}
        >
          {(props) => <HomeScreen {...props} openSearch={openSearch} />}
        </Stack.Screen>
        <Stack.Screen
          name="ImageScreen"
          component={ImageScreen}
          options={{
            title: "PicPicker App",
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
            headerStyle: {
              backgroundColor: "#0D0D0D",
            },
          }}
        />
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}
