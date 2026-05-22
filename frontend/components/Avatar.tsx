import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors, { Typography } from '../constants/Colors';

interface AvatarProps {
  initials: string;
  size?: number;
}

const avatarPalette = [
  '#0A4174',
  '#4E8EA2',
  '#7BBDE8',
  '#49769F',
  '#5A8BB0',
];

export function Avatar({ initials, size = 50 }: AvatarProps) {
  const charCodeSum =
    initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);

  const backgroundColor =
    avatarPalette[charCodeSum % avatarPalette.length];

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: size * 0.36,
          },
        ]}
      >
        {initials.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',

    elevation: 1,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1,
  },

  text: {
    color: Colors.card,
    fontWeight: Typography.weight.bold as '700',
  },
});