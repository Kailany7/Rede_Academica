import React, { useRef, useState } from 'react';
import { Animated, TouchableOpacity, Text, StyleSheet } from 'react-native';

export function AnimatedLike() {
  const [liked, setLiked] = useState(false);
  const animatedValue = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    setLiked(!liked);
    
    Animated.sequence([
      Animated.spring(animatedValue, {
        toValue: 1.4,
        useNativeDriver: true,
      }),
      Animated.spring(animatedValue, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8} style={styles.button}>
      <Animated.View style={{ transform: [{ scale: animatedValue }] }}>
        <Text style={styles.icon}>{liked ? '❤️' : '💙'}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
  },
  icon: {
    fontSize: 20,
  },
});