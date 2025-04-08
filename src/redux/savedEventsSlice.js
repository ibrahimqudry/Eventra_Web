import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedEvents: [],
};

const savedEventsSlice = createSlice({
  name: 'savedEvents',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      const eventExists = state.savedEvents.some(
        (event) => event.id === action.payload.id
      );
      if (!eventExists) {
        state.savedEvents.push(action.payload);
      }
    },
    removeEvent: (state, action) => {
      state.savedEvents = state.savedEvents.filter(
        (event) => event.id !== action.payload.id
      );
    },
  
    toggleSaveEvent: (state, action) => {
      const index = state.savedEvents.findIndex(
        (event) => event.id === action.payload.id
      );
      if (index >= 0) {
        state.savedEvents.splice(index, 1);
      } else {
        state.savedEvents.push(action.payload);
      }
    },
  },
});

export const { addEvent, removeEvent, toggleSaveEvent } = savedEventsSlice.actions;
export default savedEventsSlice.reducer;