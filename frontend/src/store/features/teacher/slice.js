import { createSlice } from '@reduxjs/toolkit';
import { defaultInfo } from '../../../models/info';
import {
  createStorage,  
  readStorage,
  removeStorage,
  storageExists
} from '../../../utils/storage';

const teacherKey = "school@domain"

const initialState = {
  info: storageExists(teacherKey) ? readStorage(teacherKey) : defaultInfo
};

const teacherSlice = createSlice({
  name: 'teacherData',
  initialState,
  reducers: {
    save: (state, action) => {
      const info = {...action.payload}
      const result = { ...state, info}
      createStorage(teacherKey, action.payload)
      return result
    },
    remove: (state, action) => {
      const info = defaultInfo
      const result = { ...state, info}
      removeStorage(teacherKey)
      return result
    }
  },
});

const { save, remove } = teacherSlice.actions;
export {save, remove,  teacherSlice }
