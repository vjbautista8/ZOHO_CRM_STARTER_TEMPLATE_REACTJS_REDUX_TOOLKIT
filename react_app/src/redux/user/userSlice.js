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
      .addCase(getFields.pending, (state, { meta }) => {
        state.LOADING = true;
        console.log(`getFields-pending-meta`, meta);
      })
      .addCase(getFields.fulfilled, (state, { payload, meta }) => {
        toast.success('Successfully getFields.');
        console.log(`getFields-fulfilled-meta`, meta);
        console.log(`getFields-fulfilled-payload`, payload);
        state.LOADING = false;
        state[`getFields_${meta?.arg?.Entity}`] = payload;
        // [`getFields_${meta?.arg?.Entity}`]
      })
      .addCase(getFields.rejected, (state, { payload, meta }) => {
        console.log(`getFields-rejected-payload`, meta);
        state.LOADING = false;
        toast.error(
          'Something went wrong. Please fill-up the required fields.'
        );
      });
  },
});
export const { handleStateChange } = userSlice.actions;
export default userSlice.reducer;
