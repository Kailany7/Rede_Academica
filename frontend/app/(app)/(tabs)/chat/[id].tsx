import React, { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform
} from "react-native";

import ChatBubble from "../../../../components/ChatBuble";

const initialMessages = [
  {
    id: "1",
    text: "Oi, tudo bem?",
    sender: "other" as "other"
  },
  {
    id: "2",
    text: "Tudo sim e você?",
    sender: "me" as "me"
  }
];

export default function ConversationScreen() {
  const [messages, setMessages] =
    useState(initialMessages);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: input,
        sender: "me" as "me"
      }
    ]);

    setInput("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 20
        }}
        renderItem={({ item }) => (
          <ChatBubble
            message={item.text}
            sender={item.sender}
          />
        )}
      />

      <View style={styles.inputArea}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Digite uma mensagem..."
          placeholderTextColor="#8CA3B8"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          activeOpacity={0.8}
        >
          <Text style={styles.sendText}>
            Enviar
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F7FB",
  },

  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#E2E8F0",
  },

  input: {
    flex: 1,
    backgroundColor: "#F3F7FB",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 10,
    fontSize: 14,
    color: "#1B3A5C",
  },

  sendButton: {
    backgroundColor: "#1B4F8A",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  sendText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});