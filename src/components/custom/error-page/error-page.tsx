import { useSelector } from '@/src/services/store';
import { FC } from 'react';
import { errorSelector } from '@/src/slices/matchesSlice';
import { Text, View, StyleSheet } from 'react-native';
import { ThemedView } from '@/src/components/stock/ThemedView';
import { ThemedText } from '@/src/components/stock/ThemedText';

export const ErrorPage: FC = () => {
  const errorText = useSelector(errorSelector);

  return (
    <>
      <ThemedView style={styles.errorPage}>
        <ThemedText>
          При загрузке данных сервер вернул ошибку:
          <ThemedText style={styles.errorText}>{errorText}.</ThemedText>
        </ThemedText>
        <ThemedText>
          Рекомендуем повторить попытку позднее. Приносим извинения за
          неудобства.
        </ThemedText>
      </ThemedView>
    </>
  );
};

const styles = StyleSheet.create({
  errorPage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'normal',
    fontSize: 21,
  },
  errorText: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
