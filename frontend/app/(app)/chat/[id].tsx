import React, { useState, useEffect } from "react";

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

import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import ChatBubble from "../../../components/ChatBubble";

import { useAuth } from "../../../contexts/AuthContext";

import {
  buscarMensagens,
  enviarMensagem
} from "../../../services/chatService";


export default function ConversationScreen() {

  const router = useRouter();

  const { id } = useLocalSearchParams();

  const { usuario } = useAuth();


  const [messages, setMessages] = useState<any[]>([]);

  const [input, setInput] = useState("");



  useEffect(() => {


    async function carregar() {

      if (!id) return;


      const dados = await buscarMensagens(
        id as string
      );


      setMessages(
        dados.map((msg) => ({
          id: msg._id,
          text: msg.conteudo,
          sender:
            msg.remetente === usuario?.id
              ? "me"
              : "other"
        }))
      );

    }


    carregar();


  }, [id]);





  const sendMessage = async () => {

    if (!input.trim() || !id) return;


    await enviarMensagem(
      id as string,
      input
    );


    setMessages((prev)=>[
      ...prev,
      {
        id: Date.now().toString(),
        text: input,
        sender:"me"
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

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >

          <Ionicons
            name="arrow-back"
            size={24}
            color="#1B3A5C"
          />

        </TouchableOpacity>


        <Text style={styles.headerTitle}>
          Conversa
        </Text>

      </View>



      <FlatList
        data={messages}
        keyExtractor={(item)=>item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding:16,
          paddingBottom:20
        }}

        renderItem={({item})=>(
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
  header: {

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 16,

    paddingVertical: 14,

    backgroundColor: "#FFFFFF",

    borderBottomWidth: 1,

    borderBottomColor: "#E2E8F0",
  },

  backButton: {
    marginRight: 12,
  },

  headerTitle: {

    fontSize: 18,

    fontWeight: "700",

    color: "#1B3A5C",
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