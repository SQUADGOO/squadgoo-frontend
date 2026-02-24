import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services/userService';

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (params, { rejectWithValue }) => {
    try {
      return await userService.getAllUsers(params);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    selectedUser: null,
    loading: false,
    error: null
  },
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { selectUser, clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
