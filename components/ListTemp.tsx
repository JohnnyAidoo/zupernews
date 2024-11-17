import { Link } from "expo-router";
import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";

function ListTemp(props: {
  imageUrl: string;
  title: string;
  date: string;
  source: string;
  url: string;
}) {
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

  const openBrowser = async (url: string) => {
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch (error) {
      console.error("Error opening browser:", error);
    }
  };
  return (
    <>
      <TouchableOpacity onPress={() => openBrowser(props.url)}>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <Image
            source={{
              uri: props.imageUrl,
            }}
            width={100}
            height={100}
            style={{ borderRadius: 10 }}
          />
          <View style={{ marginHorizontal: 10 }}>
            <Text
              style={{
                fontWeight: "regular",
                fontSize: 14,
                opacity: 0.5,
                width: 250,
              }}
            >
              {props.source}
            </Text>
            <Text
              id="tilte"
              variant="titleLarge"
              style={{ fontWeight: "semibold", fontSize: 16, width: 250 }}
              numberOfLines={2}
            >
              {props.title}
            </Text>
            <Text
              variant="titleLarge"
              style={{ fontWeight: "semibold", fontSize: 14, opacity: 0.5 }}
            >
              {formatDate(props.date)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}

export default ListTemp;
