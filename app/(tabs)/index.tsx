import CardTemplate from "@/components/CardTemplate";
import ListTemp from "@/components/ListTemp";
import Colors from "@/constants/Colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Image, Dimensions } from "react-native";
import { Appbar, Button, List, Text } from "react-native-paper";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";

function HomeScreen() {
  const WIDTH = Dimensions.get("window").width;

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
              Super
            </Text>
            <Text
              variant="headlineLarge"
              style={{ fontWeight: "bold", color: Colors.light.text }}
            >
              News
            </Text>
          </View>
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
              date={news.publishedAt}
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
