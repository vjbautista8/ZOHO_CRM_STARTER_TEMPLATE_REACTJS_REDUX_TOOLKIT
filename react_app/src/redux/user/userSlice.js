import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
const ZOHO = window.ZOHO;
const initialState = {
  SERVICE_ORIGIN: null,
  PAGE: null,
  METADATA: null,
  LOADING: true,
  MODULES: [],
  MODULE_NAME: '',
  MODULE_FIELDS: [],
  MODULE_REPORTS: [],
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

export const getModules = createAsyncThunk(
  'user/getModules',
  async (data, thunkAPI) => {
    try {
      const response = ZOHO.CRM.META.getModules();

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getAllRecords = createAsyncThunk(
  'user/getAllRecords',
  async (data, thunkAPI) => {
    try {
      const response = ZOHO.CRM.API.getAllRecords({
        Entity: data?.Entity,
        sort_order: data?.sort_order,
        per_page: data?.per_page,
        page: data?.page,
      });

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
      //==================getFields
      .addCase(getFields.pending, (state, action) => {
        console.log(`getFields-pending-action`, action);
      })
      .addCase(getFields.fulfilled, (state, action) => {
        toast.success(`Successfully getFields of ${action?.meta?.arg?.Entity}`);
        console.log(`getFields-fulfilled-action`, action);
        state.MODULE_FIELDS = action?.payload?.fields
          ? action?.payload?.fields
          : [];
      })
      .addCase(getFields.rejected, (state, action) => {
        console.log(`getFields-rejected-action`, action);
        state.MODULE_FIELDS = [];
        toast.error(`${action?.error?.message}`);
      })
      //==================getModules
      .addCase(getModules.pending, (state, action) => {
        console.log(`getModules-pending-action`, action);
      })
      .addCase(getModules.fulfilled, (state, action) => {
        toast.success(`Successfully getModules`);
        console.log(`getModules-fulfilled-action`, action);
        state.MODULES = action?.payload?.modules;
      })
      .addCase(getModules.rejected, (state, action) => {
        console.log(`getModules-rejected-action`, action);
        state.MODULES = [];
        toast.error(`${action?.error?.message}`);
      })
      //==================getAllRecords
      .addCase(getAllRecords.pending, (state, action) => {
        console.log(`getAllRecords-pending-action`, action);
      })
      .addCase(getAllRecords.fulfilled, (state, action) => {
        toast.success(`Successfully getAllRecords`);
        console.log(`getAllRecords-fulfilled-action`, action);
        state.MODULE_REPORTS = action?.payload?.data
          ? action?.payload?.data
          : [];
      })
      .addCase(getAllRecords.rejected, (state, action) => {
        console.log(`getAllRecords-rejected-action`, action);
        state.MODULE_REPORTS = [];
        toast.error(`${action?.error?.message}`);
      });
  },
});
export const { handleStateChange } = userSlice.actions;
export default userSlice.reducer;
