import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: '',
  genreId: '',
  order: 'NUM_VOTE',
  type: '',
  year: '',
  page: 1,
};

export const currentQuerySlice = createSlice({
  name: 'currentQuery',
  initialState,
  reducers: {},
});

export default currentQuerySlice.reducer;

// export const { setCurrentQuery } = currentQuerySlice.actions;
