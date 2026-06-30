import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
//import { listarUsuarios, Usuario } from "../../../services/usuarioService";
import { listarConversas, Conversa } from "../../../services/chatService";


export default function ChatScreen() {

  console.log("ENTROU CHAT")

  const [conversations, setConversations] = useState<Conversa[]>([]);


  useEffect(() => {
    async function carregar() {
      const dados = await listarConversas();
      setConversations(dados);
    }
    carregar();
  }, []);

  const router = useRouter();

  return (

    <View style={styles.container}>

      {/* HEADER */}
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

        <Text style={styles.title}>
          Mensagens
        </Text>

      </View>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.usuarioId}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push(`/chat/${item.usuarioId}`)
            }
          >

            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.nome[0]}
              </Text>
            </View>

            <View>
              <Text style={styles.name}>
                {item.nome}
              </Text>

              <Text style={styles.message}>
                {item.bio}
              </Text>
            </View>

          </TouchableOpacity>

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#EBF3FA",
    padding: 16
  },

  header: {

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 20,
  },

  backButton: {
    marginRight: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1B3A5C",
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 999,
    backgroundColor: "#1B4F8A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },

  avatarText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 18
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B3A5C"
  },

  message: {
    color: "#6B8BA4",
    marginTop: 4
  }
});