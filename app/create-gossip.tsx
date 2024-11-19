import Colors from "@/constants/Colors";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Alert } from "react-native";
import { Appbar, Button, TextInput, Title } from "react-native-paper";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { FIREBASE_DB } from "../components/firbase";
import { useUser } from "@clerk/clerk-expo";

interface GossipType {
  title: string;
  description: string;
  clerkUserId: string;
  createdAt: Timestamp;
}

function CreateGossip() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useUser();

  const handlePublish = async () => {
    if (!user) {
      Alert.alert("Error", "Please log in to publish");
      return;
    }

    if (!title.trim() || !description.trim()) {
      Alert.alert("Error", "Title and description are required");
      return;
    }

    try {
      const gossipDoc: GossipType = {
        title,
        description,
        clerkUserId: user.id,
        createdAt: Timestamp.now(),
      };

      const docRef = await addDoc(
        collection(FIREBASE_DB, "gossips"),
        gossipDoc
      );

      Alert.alert("Success", "Gossip published successfully");
      router.back();
    } catch (error) {
      console.error("Error publishing gossip:", error);
      Alert.alert("Error", "Failed to publish gossip");
    }
  };

  return (
    <View style={{ backgroundColor: Colors.light.background }}>
      <Appbar.Header style={{ backgroundColor: Colors.light.background }}>
        <Appbar.Action icon="arrow-left" onPress={() => router.back()} />
        <Appbar.Content title="" />
        <Button
          mode="contained"
          buttonColor={Colors.light.tint}
          onPress={handlePublish}
        >
          Publish
        </Button>
      </Appbar.Header>
      <View>
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
            value={title}
            onChangeText={setTitle}
          />
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
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>
    </View>
  );
}

export default CreateGossip;
