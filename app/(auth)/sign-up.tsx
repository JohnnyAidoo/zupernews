import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { Dimensions, ImageBackground, View, Alert } from "react-native";
import { Button, Divider, Surface, Text, TextInput } from "react-native-paper";

function SignUpPage() {
  const HEIGHT = Dimensions.get("window").height;
  const WIDTH = Dimensions.get("window").width;
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      {
        Alert.alert("Error", err.errors[0].message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err.errors[0], null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {/* Sign-up form */}
      <ImageBackground
        source={require("../../assets/images/splash-bg.png")}
        style={{
          width: WIDTH,
          height: HEIGHT,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "auto",
            gap: 10,
            padding: 20,
            borderRadius: 10,
          }}
        >
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
          <Text variant="labelLarge">Create New Account</Text>

          <TextInput
            label="Email"
            mode="outlined"
            outlineColor="transparent"
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(email) => setEmailAddress(email)}
          />
          <TextInput
            label="password"
            mode="outlined"
            outlineColor="transparent"
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <Button
            mode="contained"
            onPress={onSignUpPress}
            style={{ backgroundColor: Colors.light.tint, borderRadius: 10 }}
          >
            Sign In
          </Button>
          {/* <Button
            mode="text"
            textColor={Colors.light.text}
            style={{ paddingTop: 20 }}
          >
            Forgot Password ?
          </Button> */}
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
            router.navigate("/sign-in");
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
          Already have An Account ?
        </Button>
      </ImageBackground>

      {pendingVerification && (
        <>
          <Surface
            style={{
              position: "absolute",
              width: WIDTH,
              height: HEIGHT,

              backgroundColor: "rgba(0, 0, 0, 0.5)",
              justifyContent: "center",
              paddingHorizontal: 20,
            }}
          >
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
            <Button
              mode="contained"
              onPress={onPressVerify}
              style={{ backgroundColor: Colors.light.tint, borderRadius: 10 }}
            >
              Verify Email
            </Button>
          </Surface>
        </>
      )}
    </>
  );
}

export default SignUpPage;
