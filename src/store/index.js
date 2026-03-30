import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import corporationsReducer from './slices/corporationsSlice';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';
import companyCreationReducer from './slices/companyCreationSlice';
import corporationCreationReducer from './slices/corporationCreationSlice';
import companyConfigReducer from './slices/companyConfigSlice';
import companyDirectoryReducer from './slices/companyDirectorySlice';
import dashboardReducer from './slices/dashboardSlice';
import forgotPasswordReducer from './slices/forgotPasswordSlice';
import resetPasswordReducer from './slices/resetPasswordSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['maskedEmailToDisplay', 'emailToVerify', 'rememberMe', 'currentPersonaType', 'activeThemePreference'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    corporations: corporationsReducer,
    ui: uiReducer,
    auth: persistedAuthReducer,
    companyCreation: companyCreationReducer,
    corporationCreation: corporationCreationReducer,
    companyConfig: companyConfigReducer,
    companyDirectory: companyDirectoryReducer,
    dashboard: dashboardReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: { ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'] } }),
});

export const persistor = persistStore(store);
