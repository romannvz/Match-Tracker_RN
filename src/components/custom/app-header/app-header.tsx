import { FC, useEffect, useState } from 'react';
import {
  getMatches,
  isLoadingSelector,
  isErrorSelector,
  statusesSelector,
} from '@/src/slices/matchesSlice';
import { AppDispatch, useSelector } from '@/src/services/store';
import { useDispatch } from 'react-redux';
import { ThemedView } from '@/src/components/stock/ThemedView';
import { ThemedText } from '@/src/components/stock/ThemedText';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/src/utils/constants/colors';
import { Picker } from '@react-native-picker/picker';

type AppHeaderProps = {
  status: string;
  changeStatus: (newState: string) => void;
};

export const AppHeader: FC<AppHeaderProps> = ({
  status,
  changeStatus,
}: AppHeaderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isError = useSelector(isErrorSelector);
  const isLoading = useSelector(isLoadingSelector);
  const statuses = useSelector(statusesSelector);

  return (
    <>
      <ThemedView style={styles.header}>
        <ThemedView style={styles.logoWithSelect}>
          <Image source={require('@/src/assets/images/match-tracker.svg')} />
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => changeStatus(itemValue)}
            style={styles.picker}
            enabled={statuses.length ? true : false}
          >
            <Picker.Item label="Все статусы" value="all" />
            {statuses.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>
        </ThemedView>
        <ThemedView style={styles.panel}>
          {isError && (
            <ThemedView style={styles.panelError}>
              <Image
                source={require('@/src/assets/images/alert-triangle.svg')}
              />
              <ThemedText style={styles.errorText}>
                Ошибка: не удалось загрузить информацию
              </ThemedText>
            </ThemedView>
          )}
          <TouchableOpacity
            onPress={() => dispatch(getMatches())}
            style={[
              styles.panelButton,
              isLoading && styles.panelButtonDisabled,
            ]}
            disabled={isLoading}
          >
            <ThemedText style={styles.text}>Обновить</ThemedText>
            <Image source={require('@/src/assets/images/refresh.svg')} />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoWithSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  picker: {
    minHeight: 54,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'inherit',
    color: '#B4B5B6',
    fontWeight: 600,
    fontSize: 16,
  },
  panel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  panelError: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    minWidth: 478,
    padding: 16,
    backgroundColor: '#0F1318',
    borderRadius: 4,
  },
  panelErrorActive: {
    display: 'flex',
  },
  panelButton: {
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    minWidth: 204,
    padding: 16,
    backgroundColor: Colors.finished,
  },
  panelButtonDisabled: {
    backgroundColor: Colors.buttonDisabled,
    opacity: 0.6,
  },
  panelButtonHover: {
    backgroundColor: Colors.buttonHover,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: 0,
  },
  errorText: {
    fontWeight: '500',
    fontSize: 18,
  },
});
