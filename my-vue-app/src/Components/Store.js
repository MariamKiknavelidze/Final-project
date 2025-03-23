import { configureStore } from "@reduxjs/toolkit";
const weatherSlice = {
  name: "weather",
  initialState: {
    temperature: null,
  },
  reducers: {
    setWeather: (state, action) => {
      state.temperature = action.payload;
    },
  },
};

const store = configureStore({
  reducer: {
    weather: weatherSlice.reducer,
  },
});

export const { setWeather } = weatherSlice.actions;
export default store;
