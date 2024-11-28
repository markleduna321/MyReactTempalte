import { configureStore } from '@reduxjs/toolkit';
import usersSlice from '../pages/admin/user_management/_redux/user-management-slice';

const store = configureStore({
    reducer: {
        users: usersSlice,
    },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;
