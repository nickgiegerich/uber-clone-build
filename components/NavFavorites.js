import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { setDestination, setOrigin } from "../slices/navSlice";

// FOR NOW WE ARE HARD CODING FAVORITES
// TODO: get actual current location then map to favorite selected

const CURRENT_LOCATION = {
  coordinates: {
    lat: 42.5558381,
    lng: -114.4700518,
  },
  destination: "Twin Falls, ID, USA",
};

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Boise, ID, USA",
    coordinates: {
      lat: 43.6150186,
      lng: -116.2023137,
    },
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination:
      "Central Washington University, East University Way, Ellensburg, WA, USA",
    coordinates: {
      lat: 47.0073154,
      lng: -120.5362805,
    },
  },
];

const NavFavorites = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
      )}
      renderItem={({ item: { location, destination, icon, coordinates } }) => (
        <TouchableOpacity
          style={tw`flex-row items-center p-5`}
          onPress={() => {
            dispatch(
              setOrigin({
                location: CURRENT_LOCATION.coordinates,
                description: CURRENT_LOCATION.destination,
              })
            );
            dispatch(
              setDestination({
                location: coordinates,
                description: destination,
              })
            );
            navigation.navigate("MapScreen");
          }}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavorites;

const styles = StyleSheet.create({});
