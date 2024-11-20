import CardTemplate from "@/components/CardTemplate";
import ListTemp from "@/components/ListTemp";
import Colors from "@/constants/Colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Image, Dimensions, Alert } from "react-native";
import { Appbar, Button, List, Text } from "react-native-paper";
import {
  ClerkProvider,
  ClerkLoaded,
  useClerk,
  useUser,
} from "@clerk/clerk-expo";
import { router, useRouter } from "expo-router";

function HomeScreen() {
  const WIDTH = Dimensions.get("window").width;
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/sign-up");
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return null; // Or a loading indicator
  }

  type newsType = {
    source: {
      id: null;
      name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  };
  const [newsFeed, setNewsFeed] = useState<newsType[]>([]);
  const [newsHeadlineNewsFeed, setHeadLineNewsFeed] = useState<newsType[]>([]);
  const { signOut } = useClerk();

  const fetchBreakingNews = () => {
    axios
      .get(
        "https://newsapi.org/v2/everything?apiKey=23cff2ef21564a7995846868351e424a&q=trending"
      )
      .then((res) => {
        setNewsFeed(res.data.articles);
      });
  };
  const fetchHeadlineNews = () => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=23cff2ef21564a7995846868351e424a"
      )
      .then((res) => {
        setHeadLineNewsFeed(res.data.articles);
      });
  };
  useEffect(() => {
    fetchBreakingNews();
    fetchHeadlineNews();
  }, []);

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            await signOut();
            router.replace("/sign-up");
          },
        },
      ],
      { cancelable: true }
    );
  };
  function formatDate(isoDateString: string): string {
    const date = new Date(isoDateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long", // e.g., 'Monday'
      year: "numeric",
      month: "long", // e.g., 'October'
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  }
  return (
    <>
      <ScrollView
        style={{
          paddingHorizontal: 20,
          backgroundColor: Colors.light.background,
        }}
      >
        <Appbar.Header
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: Colors.light.background,
            marginVertical: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text
              variant="headlineLarge"
              style={{ fontWeight: "bold", color: Colors.light.tint }}
            >
              Zuper
            </Text>
            <Text
              variant="headlineLarge"
              style={{ fontWeight: "bold", color: Colors.light.text }}
            >
              News
            </Text>
          </View>

          <Appbar.Action icon={"power"} onPress={handleSignOut} />
        </Appbar.Header>
        <View
          style={{
            backgroundColor: Colors.light.background,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text variant="headlineMedium" style={{ fontWeight: "bold" }}>
              Headline News
            </Text>
            <Button mode="text" textColor={Colors.light.tint}>
              View All
            </Button>

            {/*  */}
          </View>
          <ScrollView horizontal>
            {newsHeadlineNewsFeed.map((news) => {
              return (
                <CardTemplate
                  key={news.url}
                  title={news.title}
                  description={news.description}
                  imageUrl={news.urlToImage}
                />
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: Colors.light.background,
            marginVertical: 20,
          }}
        >
          <Text variant="headlineMedium" style={{ fontWeight: "bold" }}>
            Breaking News
          </Text>
          <Button mode="text" textColor={Colors.light.tint}>
            View All
          </Button>
        </View>
        {newsFeed.map((news) => {
          return (
            <ListTemp
              key={news.url}
              source={news.author}
              title={news.title}
              date={formatDate(news.publishedAt)}
              imageUrl={news.urlToImage as string}
              url={news.url}
            />
          );
        })}
      </ScrollView>
    </>
  );
}

export default HomeScreen;
