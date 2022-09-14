import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ImageScreen from "./screens/ImageScreen";
import HomeScreen from "./screens/HomeScreen";
import { Text, Image, StyleSheet } from "react-native";
import { useState } from "react";
import Logo from "./assets/pickPickerApp.png";

const Stack = createNativeStackNavigator();

export default function App() {
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          options={{
            headerLeft: () => <Image source={Logo} style={styles.logo} />,
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
              backgroundColor: "#1c4b56",
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
              backgroundColor: "#1c4b56",
            },
          }}
        />
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 35,
    width: 35,
    borderRadius: 5,
    marginRight: 4,
  },
});
