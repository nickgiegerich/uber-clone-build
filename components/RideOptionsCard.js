import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-X-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-X-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

// If surge price
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View style={tw`flex-shrink`}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("NavigateCard")}
            style={[tw`absolute top-3 left-5 p-3 rounded-full z-10`]}
          >
            <Icon name="chevron-left" type="fontawesome" />
          </TouchableOpacity>
          <Text style={tw`text-center py-3 text-xl`}>
            Select a Ride - {travelTimeInformation?.distance?.text}
          </Text>
        </View>
        <FlatList
          style={tw`my-3`}
          data={data}
          key={(item) => item.id}
          renderItem={({ item: { id, title, multiplier, image }, item }) => (
            <TouchableOpacity
              onPress={() => setSelected(item)}
              style={tw`flex-row justify-between items-center px-10 ${
                id === selected?.id && "bg-gray-200"
              }`}
            >
              <Image
                style={{ width: 100, height: 100, resizeMode: "contain" }}
                source={{ uri: image }}
              />
              <View style={tw`-ml-6`}>
                <Text style={tw`text-xl font-semibold`}>{title}</Text>
                <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
              </View>
              <Text>
                {new Intl.NumberFormat("en-usd", {
                  style: "currency",
                  currency: "USD",
                }).format(
                  (travelTimeInformation?.duration.value *
                    SURGE_CHARGE_RATE *
                    multiplier) /
                    100
                )}
              </Text>
            </TouchableOpacity>
          )}
        />

        <View>
          <TouchableOpacity style={tw`bg-black py-3 mx-3 mb-20`}>
            <Text style={tw`text-center text-white text-xl`}>
              Choose {selected?.title}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
