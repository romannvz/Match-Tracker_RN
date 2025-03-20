import { ThemedView } from '@/src/components/stock/ThemedView';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

export const Preloader = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ThemedView style={styles.preloader}>
      <Animated.View
        style={[styles.preloaderCircle, { transform: [{ rotate: spin }] }]}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  preloader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'transparent',
    transform: [{ translateX: -37 }, { translateY: -37 }],
  },
  preloaderCircle: {
    position: 'relative',
    width: 74,
    height: 74,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#d1d2d6',
    borderTopColor: '#9fa0a5',
    borderRightColor: '#626368',
    borderBottomColor: '#1a1b22',
  },
});
