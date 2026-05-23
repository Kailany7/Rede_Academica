import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

interface ConversationCardProps {
  name: string;
  lastMessage: string;
  time: string;
  onPress: () => void;
}

export default function ConversationCard({
  name,
  lastMessage,
  time,
  onPress
}: ConversationCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {name.charAt(0)}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>
          {name}
        </Text>

        <Text style={styles.message}>
          {lastMessage}
        </Text>
      </View>

      <Text style={styles.time}>
        {time}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 999,
    backgroundColor: "#1B4F8A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 18,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1B3A5C",
    marginBottom: 4,
  },

  message: {
    fontSize: 13,
    color: "#7A93AA",
  },

  time: {
    fontSize: 12,
    color: "#9BB5C8",
  },
});