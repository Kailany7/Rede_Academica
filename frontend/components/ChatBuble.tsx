import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";

interface ChatBubbleProps {
  message: string;
  sender: "me" | "other";
}

export default function ChatBubble({
  message,
  sender
}: ChatBubbleProps) {
  return (
    <View
      style={[
        styles.bubble,
        sender === "me"
          ? styles.myBubble
          : styles.otherBubble
      ]}
    >
      <Text
        style={[
          styles.text,
          sender === "me" && {
            color: "#FFF"
          }
        ]}
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: "78%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },

  myBubble: {
    backgroundColor: "#1B4F8A",
    alignSelf: "flex-end",
  },

  otherBubble: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
  },

  text: {
    fontSize: 14,
    color: "#1B3A5C",
  },
});