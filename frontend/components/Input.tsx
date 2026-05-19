import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { Colors, Typography } from '../constants/Colors';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  label?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

export function Input({ placeholder, value, onChangeText, secureTextEntry, label, multiline, numberOfLines }: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, multiline && { height: 100, textAlignVertical: 'top' }]}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
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
    fontSize: Typography.size.small,
    color: Colors.text,
    fontWeight: Typography.weight.bold,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.subtleBlock,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: Typography.size.regular,
    color: Colors.text,
  },
});