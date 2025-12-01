import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import userTourReducer from './features/user/userTourSlice';
import cartReducer from './features/cart/cartSlice';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 使用 localStorage，或者使用 sessionStorage

// 配置持久化的设置
const persistConfig = {
  key: 'root', // 存储的 key，可以随意命名
  storage, // 使用 localStorage
  // whitelist: ['user'], // 可选：只持久化部分 reducer
  // blacklist: ['someTemporaryData'], // 可选：不持久化某些 reducer
};

// 使用 combineReducers 合并多个 reducers
const rootReducer = combineReducers({
  // user: userReducer,
  // cart: cartReducer,
  userTour: userTourReducer,
});

// 创建持久化的 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 创建 store
const store = configureStore({
  reducer: persistedReducer, // 使用持久化的 reducer
});

// 创建 persistor 对象，用于持久化同步
const persistor = persistStore(store);

export { store, persistor };
