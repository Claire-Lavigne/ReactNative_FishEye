import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import PhotographScreen from "./src/screens/PhotographScreen";

const Stack = createNativeStackNavigator();

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Nos photographes" component={HomeScreen} />
        <Stack.Screen name="Photograph" component={PhotographScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
