import { createSlice } from '@reduxjs/toolkit';

// تحميل الحالة الأولية من localStorage إذا وجدت
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('savedEvents');
    if (serializedState === null) return { savedEvents: [] };
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Failed to load saved events from localStorage", e);
    return { savedEvents: [] };
  }
};

const initialState = loadFromLocalStorage();

const savedEventsSlice = createSlice({
  name: 'savedEvents',
  initialState,
  reducers: {
    toggleSaveEvent: (state, action) => {
      const index = state.savedEvents.findIndex(
        (event) => event.id === action.payload.id
      );
      if (index >= 0) {
        state.savedEvents.splice(index, 1);
      } else {
        state.savedEvents.push(action.payload);
      }
      
      // حفظ في localStorage بعد كل تغيير
      try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('savedEvents', serializedState);
      } catch (e) {
        console.warn("Failed to save events to localStorage", e);
      }
    },
  },
});

export const { toggleSaveEvent } = savedEventsSlice.actions;
export default savedEventsSlice.reducer;