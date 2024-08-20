import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
const ZOHO = window.ZOHO;
const initialState = {
  SERVICE_ORIGIN: null,
  PAGE: null,
  METADATA: null,
  LOADING: false,
};
export const getFields = createAsyncThunk(
  'user/getFields',
  async (data, thunkAPI) => {
    try {
      const response = ZOHO.CRM.META.getFields({ Entity: data?.Entity });

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleStateChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFields.pending, (state, action) => {
        state.LOADING = true;
        console.log(`getFields-pending-action`, action);
      })
      .addCase(getFields.fulfilled, (state, action) => {
        toast.success('Successfully getFields.');
        console.log(`getFields-rejected-action`, action);
        state.LOADING = false;
        state[`getFields_${action?.meta?.arg?.Entity}`] = action?.payload;
        // [`getFields_${meta?.arg?.Entity}`]
      })
      .addCase(getFields.rejected, (state, action) => {
        console.log(`getFields-rejected-action`, action);
        state.LOADING = false;
        toast.error(`${action?.error?.message}`);
      });
  },
});
export const { handleStateChange } = userSlice.actions;
export default userSlice.reducer;
