import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../constants/Colors';

interface AvatarProps {
  initials: string; 
  size?: number;
}

export function Avatar({ initials, size = 50 }: AvatarProps) {
  const charCodeSum = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
  const backgroundColor = Colors.avatarPalette[charCodeSum % Colors.avatarPalette.length];

  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor }]}>
      <Text style={[styles.text, { fontSize: size * 0.36 }]}>
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1,
  },
  text: {
    color: Colors.surface,
    fontWeight: Typography.weight.bold,
  },
});