import { createSlice } from "@reduxjs/toolkit";

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
  name: "savedEvents",
  initialState,
  reducers: {
<<<<<<< HEAD
=======
    addEvent: (state, action) => {
      if (!state.savedEvents.some((event) => event.id === action.payload.id)) {
        state.savedEvents.push(action.payload);
      }
    },
    removeEvent: (state, action) => {
      state.savedEvents = state.savedEvents.filter(
        (event) => event.id !== action.payload.id
      );
    },
>>>>>>> ee12e4e6b754cb4ab1605fcb42481d8a6e5d75c8
    toggleSaveEvent: (state, action) => {
      const index = state.savedEvents.findIndex(
        (event) => event.id === action.payload.id
      );
      if (index === -1) {
        state.savedEvents.push(action.payload);
      } else {
        state.savedEvents.splice(index, 1);
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

<<<<<<< HEAD
export const { toggleSaveEvent } = savedEventsSlice.actions;
export default savedEventsSlice.reducer;
=======
export const { addEvent, removeEvent, toggleSaveEvent } =
  savedEventsSlice.actions;
export default savedEventsSlice.reducer;
>>>>>>> ee12e4e6b754cb4ab1605fcb42481d8a6e5d75c8
