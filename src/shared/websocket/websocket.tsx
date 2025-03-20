import React, { useEffect, useState } from 'react';
import { updateMatches } from '@/src/slices/matchesSlice';
import { AppDispatch } from '@/src/services/store';

interface WebSocketComponentProps {
  dispatch: AppDispatch;
}

const WebSocketComponent: React.FC<WebSocketComponentProps> = ({
  dispatch,
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [retryTimer, setRetryTimer] = useState<NodeJS.Timeout | null>(null);

  const initializeWebSocket = () => {
    const matchSocket = new WebSocket(
      'wss://app.ftoyd.com/fronttemp-service/ws',
    );

    matchSocket.onopen = () => console.log('WebSocket enabled');

    matchSocket.onmessage = (event) => {
      try {
        console.log('WebSocket gets new data');
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === 'update_matches') {
          dispatch(updateMatches(parsedData.data));
        }
      } catch (error) {
        console.error(
          'Error in parsing JSON:',
          error,
          'Returns data:',
          event.data,
        );
      }
    };

    matchSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      retryConnection();
    };

    matchSocket.onclose = () => {
      console.log('WebSocket disabled');
      retryConnection();
    };

    return matchSocket;
  };

  const retryConnection = () => {
    const timer = setTimeout(() => {
      console.log('Trying to restart WebSocket...');
      setSocket(initializeWebSocket());
    }, 5000);

    setRetryTimer(timer);
  };

  useEffect(() => {
    const matchSocket = initializeWebSocket();
    setSocket(matchSocket);

    return () => {
      if (socket) socket.close();
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [dispatch]);

  return null;
};

export default WebSocketComponent;
