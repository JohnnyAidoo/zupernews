import React from "react";
import FontAwesome from "@expo/vector-icons/AntDesign";
import { Link, Tabs, useRouter } from "expo-router";
import { Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Tab One",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="gossip"
        options={{
          headerShown: false,
          title: "Gossip",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="aliwangwang-o1" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
