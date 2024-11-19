import ListTemp from "@/components/ListTemp";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import {
  Appbar,
  FAB,
  TextInput,
  Title,
  ActivityIndicator,
} from "react-native-paper";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { FIREBASE_DB } from "@/components/firbase";

interface Gossip {
  id: string;
  title: string;
  description: string;
  clerkUserId: string;
  createdAt: any;
}

export default function Gossip() {
  const WIDTH = Dimensions.get("window").width;
  const [gossips, setGossips] = useState<Gossip[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchGossips = async () => {
    try {
      const q = query(
        collection(FIREBASE_DB, "gossips"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);

      const fetchedGossips = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Gossip)
      );

      setGossips(fetchedGossips);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching gossips:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGossips();
  }, []);

  const filteredGossips = gossips.filter(
    (gossip) =>
      gossip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gossip.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={{ backgroundColor: Colors.light.background }}>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Title style={{ fontWeight: "bold", marginBottom: 10 }}>
            Latest Gossip Stories
          </Title>
          {loading ? (
            <ActivityIndicator animating={true} color={Colors.light.tint} />
          ) : (
            filteredGossips.map((gossip) => (
              <ListTemp
                key={gossip.id}
                imageUrl={""}
                title={gossip.title}
                date={new Intl.DateTimeFormat("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }).format(gossip.createdAt.toDate())}
                source={"Anonymous"}
                url={""}
              />
            ))
          )}
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
