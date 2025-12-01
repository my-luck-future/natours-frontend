import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  email: '',
  photo: '',
  role: '',
};

const userTourSlice = createSlice({
  name: 'userTour',
  initialState,
  reducers: {
    updateUser(state, action) {
      state.id = action.payload?._id || action.payload?.id;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.role = action.payload?.role;
      state.photo = action.payload?.photo;
      // console.info(state.name, state.email);
    },
    resetUser() {
      return initialState;
    },
  },
});

export const { updateUser, resetUser } = userTourSlice.actions;

export default userTourSlice.reducer;
