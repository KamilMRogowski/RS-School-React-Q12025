import { createSlice } from '@reduxjs/toolkit';
import { FormData } from '../../utils/validation';

interface FormDataState {
  data: FormData | null;
  location: string | null;
}

const initialState: FormDataState = {
  data: null,
  location: null,
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.data = action.payload as FormData;
    },
    setLocation: (state, action) => {
      state.location = action.payload as string;
    },
  },
});

export const { setFormData, setLocation } = formDataSlice.actions;
export default formDataSlice.reducer;
