import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors, Typography } from '../constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export function Button({ title, onPress, loading, variant = 'primary' }: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        variant === 'primary' && styles.btnPrimary,
        variant === 'secondary' && styles.btnSecondary,
        variant === 'danger' && styles.btnDanger,
      ]} 
      onPress={onPress} 
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? Colors.primary : Colors.surface} />
      ) : (
        <Text style={[
          styles.text, 
          variant === 'primary' && styles.textPrimary,
          variant === 'secondary' && styles.textSecondary,
          variant === 'danger' && styles.textDanger,
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 8,
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
  },
  btnSecondary: {
    backgroundColor: Colors.subtleBlock,
  },
  btnDanger: {
    backgroundColor: Colors.error,
  },
  text: {
    fontSize: Typography.size.medium,
    fontWeight: Typography.weight.bold,
  },
  textPrimary: {
    color: Colors.surface,
  },
  textSecondary: {
    color: Colors.text,
  },
  textDanger: {
    color: Colors.surface,
  },
});