import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";
import { Pressable } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export const GoogleSignInButton = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    console.log("pressed");

    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: "exp://localhost:19000/--/sign-in",
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <Pressable onPress={onPress}>
      <Ionicons name="logo-google" size={25} />
    </Pressable>
  );
};
