import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Avatar } from './Avatar';
import Colors, { Typography } from '../constants/Colors';

interface NotificationProps {
  initials: string;
  message: string;
  time: string;
  isNew?: boolean;
}

export function NotificationItem({
  initials,
  message,
  time,
  isNew,
}: NotificationProps) {
  return (
    <View
      style={[
        styles.container,
        isNew && styles.unread,
      ]}
    >
      <Avatar initials={initials} size={44} />

      <View style={styles.textContainer}>
        <Text style={styles.message}>
          {message}
        </Text>

        <Text style={styles.time}>
          {time}
        </Text>
      </View>

      {isNew && <View style={styles.badge} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',

    backgroundColor: Colors.card,

    borderBottomWidth: 1,
    borderBottomColor: Colors.muted,
  },

  unread: {
    backgroundColor: Colors.muted,
  },

  textContainer: {
    flex: 1,
    marginLeft: 12,
  },

  message: {
    fontSize: Typography.size.medium,
    color: Colors.foreground,
    lineHeight: 18,
  },

  time: {
    fontSize: Typography.size.small,
    color: Colors.mutedForeground,
    marginTop: 4,
  },

  badge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
    marginLeft: 8,
  },
});