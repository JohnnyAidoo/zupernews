import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";
import { Dimensions, ImageBackground, View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";

function SignInPage() {
  const HEIGHT = Dimensions.get("window").height;
  const WIDTH = Dimensions.get("window").width;
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {/* Sign-up form */}
      <ImageBackground
        source={require("../assets/images/splash-bg.png")}
        style={{
          width: WIDTH,
          height: HEIGHT,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            width: WIDTH,
            height: HEIGHT,
            backgroundColor: "#E9F1F7",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View style={{ width: "100%", height: "auto", gap: 10 }}>
            <Text
              variant="displayLarge"
              style={{
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 30,
              }}
            >
              <Text style={{ fontWeight: "bold", color: Colors.light.tint }}>
                Zuper
              </Text>
              News
            </Text>
            <TextInput
              label="Username or Email"
              mode="outlined"
              outlineColor="transparent"
            />
            <TextInput
              label="password"
              mode="outlined"
              outlineColor="transparent"
            />
            <Button
              mode="contained"
              style={{ backgroundColor: Colors.light.tint, borderRadius: 10 }}
            >
              Sign In
            </Button>
            <Button
              mode="text"
              textColor={Colors.light.text}
              style={{ paddingTop: 20 }}
            >
              Forgot Password ?
            </Button>
          </View>
          {/*  */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "100%",
              marginVertical: 20,
            }}
          >
            <Divider
              bold
              style={{ backgroundColor: Colors.light.text, width: WIDTH / 3 }}
            />
            <Text>Or</Text>
            <Divider
              bold
              style={{ backgroundColor: Colors.light.text, width: WIDTH / 3 }}
            />
          </View>
          <Ionicons name="logo-google" size={25} />

          <Button
            onPress={() => {
              router.navigate("/sign-up");
            }}
            mode="text"
            textColor={Colors.light.tint}
            style={{
              position: "absolute",
              borderRadius: 10,
              bottom: 30,
              width: WIDTH - 60,
              alignSelf: "center",
            }}
          >
            Create An Account
          </Button>
        </View>
      </ImageBackground>
    </>
  );
}

export default SignInPage;
