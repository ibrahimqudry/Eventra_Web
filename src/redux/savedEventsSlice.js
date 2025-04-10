import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('savedEvents');
    return serializedState ? JSON.parse(serializedState) : { savedEvents: [] };
  } catch (e) {
    console.warn("Failed to load saved events from localStorage:", e);
    return { savedEvents: [] };
  }
};

// Save state to localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('savedEvents', serializedState);
  } catch (e) {
    console.warn("Failed to save events to localStorage:", e);
  }
};

const initialState = loadFromLocalStorage();

const savedEventsSlice = createSlice({
  name: "savedEvents",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      if (!state.savedEvents.some(event => event.id === action.payload.id)) {
        state.savedEvents.push(action.payload);
        saveToLocalStorage(state);
      }
    },
    removeEvent: (state, action) => {
      state.savedEvents = state.savedEvents.filter(
        event => event.id !== action.payload.id
      );
      saveToLocalStorage(state);
    },
    toggleSaveEvent: (state, action) => {
      const index = state.savedEvents.findIndex(
        event => event.id === action.payload.id
      );
      if (index === -1) {
        state.savedEvents.push(action.payload);
      } else {
        state.savedEvents.splice(index, 1);
      }
      saveToLocalStorage(state);
    },
  },
});

export const { addEvent, removeEvent, toggleSaveEvent } = savedEventsSlice.actions;
export default savedEventsSlice.reducer;