import App from '@/src/components/custom/app/App';
import { StyleSheet, Text, View } from 'react-native';
import { ThemedView } from '@/src/components/stock/ThemedView';

export default function Index() {
  return (
    <View style={styles.appContainer}>
      <App />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: 18,
    padding: 42,
    backgroundColor: '#06080C',
  },
});
