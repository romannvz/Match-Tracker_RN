import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, TextStyle } from 'react-native';

export const AnimatedScore = ({
  score,
  textStyle,
}: {
  score: number;
  textStyle: TextStyle; // Стиль может быть необязательным
}) => {
  const [animatedValue] = useState(new Animated.Value(0)); // Анимация для перемещения (Y)
  const [opacity, setOpacity] = useState(new Animated.Value(0)); // Анимация для прозрачности
  const [displayedScore, setDisplayedScore] = useState(score);
  const [isFirstRender, setIsFirstRender] = useState(true); // Флаг для первого рендера

  useEffect(() => {
    if (isFirstRender) {
      setDisplayedScore(score);
      opacity.setValue(1); // Устанавливаем сразу непрозрачность на 1 при первом рендере
      setIsFirstRender(false); // После первого рендера убираем флаг
      return;
    } else if (score !== displayedScore) {
      setDisplayedScore(score);

      // Сначала анимация прозрачности
      opacity.setValue(0); // Начинаем с прозрачного
      Animated.timing(opacity, {
        toValue: 1, // До полной непрозрачности
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Анимация перемещения сверху
      animatedValue.setValue(-25); // Новое значение приходит сверху
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [score]);

  return (
    <>
      <Animated.Text
        style={[
          {
            transform: [{ translateY: isFirstRender ? 0 : animatedValue }],
            opacity: opacity, // Применяем анимацию прозрачности
          },
          textStyle, // Теперь этот стиль будет правильно применён после анимации
        ]}
      >
        {displayedScore}
      </Animated.Text>
    </>
  );
};
