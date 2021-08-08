import { StatusBar } from "expo-status-bar";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import { store } from "./store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "./screens/MapScreen";

// 1) set up redux - DONE
// redux is data store that wraps the entire application so that
// we can share data between all components thru out the application

export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
            <Stack.Navigator>
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>

          {/* <HomeScreen /> */}
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}