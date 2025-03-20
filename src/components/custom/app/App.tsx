import { useEffect, useRef, useState } from 'react';
import {
  getMatches,
  isErrorSelector,
  isLoadingSelector,
  matchesSelector,
} from '@/src/slices/matchesSlice';
import { AppDispatch } from '@/src/services/store';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorPage } from '../error-page';
import { Preloader } from '../preloader';
import { AppHeader } from '../app-header';
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from '@/src/components/stock/ThemedView';
import { MatchesList } from '../matches-list';
import WebSocketComponent from '@/src/shared/websocket/websocket';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoad = useSelector(isLoadingSelector);
  const isError = useSelector(isErrorSelector);
  const matches = useSelector(matchesSelector);
  const [filteredMatches, setFilteredMatches] = useState(matches);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [wsEnabled, setWsEnabled] = useState(false);
  const ref = useRef(false);

  const changeStatus = (status: string) => {
    setSelectedStatus(status);
    if (status != 'all')
      setFilteredMatches(
        matches.filter(
          (item) => item.status.toLowerCase() == status.toLowerCase(),
        ),
      );
    else setFilteredMatches(matches);
  };

  useEffect(() => {
    if (matches.length) {
      if (selectedStatus !== 'all') {
        setFilteredMatches(
          matches.filter(
            (item) =>
              item.status.toLowerCase() === selectedStatus.toLowerCase(),
          ),
        );
      } else {
        setFilteredMatches(matches);
      }
    }
  }, [matches, selectedStatus]);

  useEffect(() => {
    if (!ref.current) {
      dispatch(getMatches())
        .unwrap()
        .then(() => {
          console.log(
            'getMatches() return valid values, enabling WebSocket...',
          );
          setWsEnabled(true);
        })
        .catch(() => {
          console.error(
            'error in fetch getMatches(), WebSocket will not be enable',
          );
          setWsEnabled(false);
        });
    }
    ref.current = true;
  }, [dispatch]);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <AppHeader status={selectedStatus} changeStatus={changeStatus} />
      {isLoad ? (
        <ThemedView style={styles.main}>
          <Preloader />
        </ThemedView>
      ) : isError ? (
        <ThemedView style={styles.main}>
          <ErrorPage />
        </ThemedView>
      ) : (
        <ThemedView style={styles.main}>
          <MatchesList matches={filteredMatches} />
        </ThemedView>
      )}
      {wsEnabled && <WebSocketComponent dispatch={dispatch} />}
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexGrow: 1,
    gap: 18,
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});
