import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="shopping"
        options={{
          title: "All Products",
          tabBarIcon: () => <Entypo name="shop" size={25} color="black" />,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="product"
        options={{
          title: "Cart",
          tabBarIcon: () => (
            <FontAwesome5 name="shopping-basket" size={25} color="black" />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
};
