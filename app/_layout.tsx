import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native';
import store from '../src/services/store';
import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Provider store={store}>
      <ThemeProvider value={DarkTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        ></Stack>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06080C',
  },
});
