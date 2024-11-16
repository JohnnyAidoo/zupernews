import Colors from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Appbar, Button, TextInput, Title } from "react-native-paper";

function CreateGossip() {
  return (
    <View style={{ backgroundColor: Colors.light.background }}>
      <Appbar.Header style={{ backgroundColor: Colors.light.background }}>
        <Appbar.Action icon="arrow-left" onPress={() => router.back()} />
        <Appbar.Content title="" />
        <Button mode="contained" buttonColor={Colors.light.tint}>
          Publish
        </Button>
      </Appbar.Header>
      <View>
        {/* Your gossip creation form goes here */}

        <View
          style={{
            paddingHorizontal: 20,
            marginVertical: 20,
            backgroundColor: Colors.light.background,
          }}
        >
          <Title>Title</Title>
          <TextInput
            mode="outlined"
            textColor="black"
            placeholder="eg: mr kofi is coming home"
            outlineStyle={{ borderColor: Colors.light.background }}
            outlineColor={Colors.light.tint}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            marginVertical: 20,
            backgroundColor: Colors.light.background,
          }}
        >
          <Title>Image</Title>
          {/* Add your image upload component here */}
        </View>
        <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
          <Title>Description</Title>
          <TextInput
            style={{ height: 300 }}
            multiline
            mode="outlined"
            textColor="black"
            placeholder="eg: mr kofi is coming home"
            outlineStyle={{ borderColor: Colors.light.background }}
            outlineColor={Colors.light.tint}
          />
        </View>
      </View>
    </View>
  );
}

export default CreateGossip;
