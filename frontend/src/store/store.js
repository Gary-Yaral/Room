import { configureStore } from '@reduxjs/toolkit';
import { teacherSlice } from './features/teacher/slice';

const store = configureStore({
  reducer: {
    logged: teacherSlice.reducer,
  },
});

export { store };
