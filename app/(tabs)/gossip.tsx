import ListTemp from "@/components/ListTemp";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Appbar, FAB, TextInput, Title } from "react-native-paper";

export default function Gossip() {
  const WIDTH = Dimensions.get("window").width;
  const array = [1, 21, 33, 42, 5, 65, , 7, 8, 3, 2, 4, 15];
  const tabs = ["All", "Public", "Sports", "Entertainment", "International"];
  return (
    <>
      <Appbar.Header style={{ backgroundColor: Colors.light.background }}>
        <Appbar.Content title="Gossip" />
      </Appbar.Header>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          backgroundColor: Colors.light.background,
        }}
      >
        <TextInput
          mode="outlined"
          label="search"
          textColor="black"
          placeholder="Type something"
          outlineStyle={{ borderColor: Colors.light.tint }}
          outlineColor={Colors.light.tint}
          right={<TextInput.Icon icon="magnify" />}
        />
      </View>

      <ScrollView style={{ backgroundColor: Colors.light.background }}>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Title style={{ fontWeight: "bold", marginBottom: 10 }}>
            Latest Gossip Stories
          </Title>
          {array.map((i) => {
            return (
              <ListTemp
                key={i}
                imageUrl={""}
                title={""}
                date={""}
                source={""}
                url={""}
              />
            );
          })}
        </View>
      </ScrollView>
      <FAB
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          borderColor: Colors.light.tint,
          borderWidth: 2,
          backgroundColor: Colors.light.background,
        }}
        color={Colors.light.text}
        rippleColor={Colors.light.tint}
        icon="plus"
        onPress={() => router.push("/create-gossip")}
      />
    </>
  );
}
