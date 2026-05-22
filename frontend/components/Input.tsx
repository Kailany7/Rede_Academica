import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TextInputProps,
} from 'react-native';

import Colors, { Typography } from '../constants/Colors';

interface InputProps extends TextInputProps {
  label?: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        placeholderTextColor={Colors.mutedForeground}
        style={styles.input}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },

  label: {
    marginBottom: 6,
    color: Colors.foreground,
    fontSize: Typography.size.medium,
    fontWeight: Typography.weight.medium as '500',
  },

  input: {
    width: '100%',
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: Colors.foreground,
    fontSize: Typography.size.medium,
  },
});