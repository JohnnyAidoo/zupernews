import Colors from "@/constants/Colors";
import React from "react";
import { Dimensions, View } from "react-native";
import { Card, Paragraph, Text, Title } from "react-native-paper";

function CardTemplate(props: {
  title: string;
  imageUrl: string;
  description: string;
}) {
  const WIDTH = Dimensions.get("window").width;
  return (
    <>
      <Card style={{ marginVertical: 8, width: WIDTH - 90, marginRight: 20 }}>
        <Card.Cover
          source={{
            uri: props.imageUrl,
          }}
        />
        <Card.Content
          style={{
            backgroundColor: "black",
            opacity: 0.7,
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: 10,
            borderRadius: 10,
            paddingTop: 15,
          }}
        >
          <Title style={{ color: "white", width: "100%" }} numberOfLines={1}>
            {props.title}
          </Title>
          <Paragraph
            style={{ color: "white", width: "100%" }}
            numberOfLines={1}
          >
            {props.description}
          </Paragraph>
        </Card.Content>
      </Card>
    </>
  );
}

export default CardTemplate;
