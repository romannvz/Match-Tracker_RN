import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMatchesAPI, retryMechanics } from '@/src/shared/api/api';
import { TResponceMatches, TMatch } from '../utils/types';

interface matchesState {
  res: TResponceMatches | null | undefined;
  isOk: boolean;
  matches: TMatch[];
  isLoading: boolean;
  isError: boolean;
  error: string | null | undefined;
  statuses: string[];
}

const initialState: matchesState = {
  res: null,
  isOk: false,
  matches: [],
  isLoading: false,
  isError: false,
  error: null,
  statuses: [],
};

export const getMatches = createAsyncThunk(
  'getMatches',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchMatchesAPI();
    } catch (err) {
      console.log(
        `Error in first fetch '${getMatches.typePrefix}'. Trying again..`,
      );
      const res = await retryMechanics(fetchMatchesAPI, 3, 2); //call fetchMatchesAPI() for 3 times with delayed 10s between calls
      if (typeof res == 'string') return rejectWithValue(res);
      return res;
    }
  },
);

const matchesSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    updateMatches: (state, action) => {
      state.matches = action.payload;
    },
  },
  selectors: {
    responceSelector: (state) => state.res,
    isOkSelector: (state) => state.isOk,
    matchesSelector: (state) => state.matches,
    isLoadingSelector: (state) => state.isLoading,
    isErrorSelector: (state) => state.isError,
    errorSelector: (state) => state.error,
    statusesSelector: (state) => state.statuses,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMatches.pending, (state) => {
        state.isLoading = true;
        state.isOk = false;
        state.error = null;
        state.isError = false;
        console.log('Fetching match`s data...');
      })
      .addCase(getMatches.rejected, (state, action) => {
        state.isLoading = false;
        state.isOk = false;
        state.isError = true;
        if (action.payload)
          if (typeof action.payload === 'string')
            action.error.message = String(action.payload);
        state.error = action.error.message;
        console.log('Error in fetching data!');
      })
      .addCase(getMatches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isOk = true;
        state.res = action.payload;
        state.matches = action.payload.data.matches;
        state.matches.forEach((item) => {
          if (!state.statuses.includes(item.status))
            state.statuses.push(item.status);
        });
        console.log('The data had been successfully got.');
      });
  },
});

export const {
  responceSelector,
  isOkSelector,
  matchesSelector,
  isLoadingSelector,
  isErrorSelector,
  errorSelector,
  statusesSelector,
} = matchesSlice.selectors;

export const { updateMatches } = matchesSlice.actions;

export const reducer = matchesSlice.reducer;
