import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getWeather = createAsyncThunk("weatherAPI", async () => {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather?lat=30.033333&lon=31.233334&appid=e2431e4e49dd645e81a45429a5f82fab"
  );
  return {
    main: Math.round(response.data.main.temp - 272.15),
    min: Math.round(response.data.main.temp_min - 272.15),
    max: Math.round(response.data.main.temp_max - 272.15),
    desc: response.data.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
  };
});

export const weatherSlice = createSlice({
  name: "getWeatherAPI",
  initialState: {
    loading: false,
    weather: {},
  },

  extraReducers(builder) {
    builder
      .addCase(getWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weather = action.payload;
      })
      .addCase(getWeather.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default weatherSlice.reducer;
