import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: true,
    modalOpen: false,
    modalContent: null,
    toast: null,
    loading: false
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openModal: (state, action) => {
      state.modalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.modalContent = null;
    },
    showToast: (state, action) => {
      state.toast = action.payload;
    },
    clearToast: (state) => {
      state.toast = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { 
  toggleSidebar, 
  openModal, 
  closeModal, 
  showToast, 
  clearToast, 
  setLoading 
} = uiSlice.actions;

export default uiSlice.reducer;
