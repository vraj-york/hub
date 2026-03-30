import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: true,
  themeMode: 'light',
  isCloseCorporationModalOpen: false,
  isSuspendCorporationModalOpen: false,
  isDeleteCompanyModalOpen: false,
  isEditCompanyModalOpen: false,
  activeSidebarItem: 'dashboard',
  isMobileSidebarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
    },
    openCloseCorporationModal: (state) => {
      state.isCloseCorporationModalOpen = true;
    },
    closeCloseCorporationModal: (state) => {
      state.isCloseCorporationModalOpen = false;
    },
    openSuspendCorporationModal: (state) => {
      state.isSuspendCorporationModalOpen = true;
    },
    closeSuspendCorporationModal: (state) => {
      state.isSuspendCorporationModalOpen = false;
    },
    openDeleteCompanyModal: (state) => {
      state.isDeleteCompanyModalOpen = true;
    },
    closeDeleteCompanyModal: (state) => {
      state.isDeleteCompanyModalOpen = false;
    },
    openEditCompanyModal: (state) => {
      state.isEditCompanyModalOpen = true;
    },
    closeEditCompanyModal: (state) => {
      state.isEditCompanyModalOpen = false;
    },
    setActiveSidebarItem: (state, action) => {
      state.activeSidebarItem = action.payload;
    },
    openMobileSidebar: (state) => {
      state.isMobileSidebarOpen = true;
    },
    closeMobileSidebar: (state) => {
      state.isMobileSidebarOpen = false;
    },
  },
});

export const {
  toggleSidebar,
  setThemeMode,
  openCloseCorporationModal,
  closeCloseCorporationModal,
  openSuspendCorporationModal,
  closeSuspendCorporationModal,
  openDeleteCompanyModal,
  closeDeleteCompanyModal,
  openEditCompanyModal,
  closeEditCompanyModal,
  setActiveSidebarItem,
  openMobileSidebar,
  closeMobileSidebar,
} = uiSlice.actions;

export const selectIsSidebarOpen = (state) => state.ui.isSidebarOpen;
export const selectThemeMode = (state) => state.ui.themeMode;
export const selectIsCloseCorporationModalOpen = (state) => state.ui.isCloseCorporationModalOpen;
export const selectIsSuspendCorporationModalOpen = (state) => state.ui.isSuspendCorporationModalOpen;
export const selectIsDeleteCompanyModalOpen = (state) => state.ui.isDeleteCompanyModalOpen;
export const selectIsEditCompanyModalOpen = (state) => state.ui.isEditCompanyModalOpen;
export const selectActiveSidebarItem = (state) => state.ui.activeSidebarItem;
export const selectIsMobileSidebarOpen = (state) => state.ui.isMobileSidebarOpen;

export default uiSlice.reducer;
