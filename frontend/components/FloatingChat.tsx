import {
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function FloatingChat() {

  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.floatingButton}
      onPress={() => router.push("/chat")}
    >

      <Ionicons
        name="chatbubble-ellipses"
        size={26}
        color="#FFF"
      />

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 20,

    width: 60,
    height: 60,

    borderRadius: 999,

    backgroundColor: "#1B4F8A",

    justifyContent: "center",
    alignItems: "center",

    elevation: 5
  }
});