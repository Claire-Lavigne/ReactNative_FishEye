import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import PhotographScreen from "./src/screens/PhotographScreen";

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Nos photographes" component={HomeScreen} />
      <Stack.Screen name="Photograph" component={PhotographScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
