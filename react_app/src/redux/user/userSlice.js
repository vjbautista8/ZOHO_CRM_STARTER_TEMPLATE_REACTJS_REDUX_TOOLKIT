import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  SERVICE_ORIGIN: null,
  PAGE: null,
  METADATA: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleStateChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
  },
  extraReducers: (builder) => {},
});
export const { handleStateChange } = userSlice.actions;
export default userSlice.reducer;
