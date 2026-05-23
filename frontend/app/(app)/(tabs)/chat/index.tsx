import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { useRouter } from "expo-router";

const conversations = [
  {
    id: "1",
    name: "Maria",
    lastMessage: "Oi, tudo bem?"
  },
  {
    id: "2",
    name: "João",
    lastMessage: "Vamos estudar?"
  }
];

export default function ChatScreen() {

  const router = useRouter();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Mensagens
      </Text>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push(`/chat/${item.id}`)
            }
          >

            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.name[0]}
              </Text>
            </View>

            <View>
              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.message}>
                {item.lastMessage}
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

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1B3A5C",
    marginBottom: 20
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