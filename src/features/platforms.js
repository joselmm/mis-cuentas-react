import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import Client class

import { getPlatforms } from './platformAsync';

export const fetchPlatforms = createAsyncThunk(
  'platforms/fetchPlatforms',
  async () => {
    const platformList = await getPlatforms();
    //console.log('plaforms en reducer fetchPlatforms', platformList);
    return platformList;
  }
);

//initial state

const initialState = {
  value: [],
  loading: true,
  error: null,
};
  
const platformsSlice = createSlice({
  name: 'platforms',
  initialState: initialState,
  reducers: {
    setPlatforms: (state, action) => {
      console.log('payload recibido en setPlatforms: ', action.payload);
      state.value = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlatforms.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
      state.error = null;
    });
    
  },
});

export const { setPlatforms } = platformsSlice.actions;

export default platformsSlice.reducer;
