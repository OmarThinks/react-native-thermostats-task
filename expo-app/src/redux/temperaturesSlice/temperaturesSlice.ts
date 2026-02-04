import { defaultTemperatures } from "@/constants/tempratures";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useAppDispatch } from "../store";

interface TemperaturesState {
  isInternetConnected: boolean;
  targetTemperature: number;
  currentTemperature: number;
  backendTargetTemperature: number;
}

const initialState: TemperaturesState = {
  isInternetConnected: true,
  targetTemperature: 0,
  currentTemperature: defaultTemperatures.backendCurrentTemperature,
  backendTargetTemperature: defaultTemperatures.backendTargetTemperature,
};

const temperaturesSlice = createSlice({
  name: "temperatures",
  initialState,
  reducers: {
    updateIsInternetConnected: (state, action: PayloadAction<boolean>) => {
      state.isInternetConnected = action.payload;
    },
    updateTargetTemperature: (state, action: PayloadAction<number>) => {
      state.targetTemperature = action.payload;
    },
    updateCurrentTemperature: (state, action: PayloadAction<number>) => {
      state.currentTemperature = action.payload;
    },
    updateBackendTargetTemperature: (state, action: PayloadAction<number>) => {
      state.backendTargetTemperature = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
const {
  updateBackendTargetTemperature,
  updateCurrentTemperature,
  updateIsInternetConnected,
  updateTargetTemperature,
} = temperaturesSlice.actions;

const useUpdateIsInternetConnected = () => {
  const dispatch = useAppDispatch();
  const _updateIsInternetConnected = (isInternetConnected: boolean) => {
    dispatch(updateIsInternetConnected(isInternetConnected));
  };
  return { updateIsInternetConnected: _updateIsInternetConnected };
};
const useUpdateCurrentTemperature = () => {
  const dispatch = useAppDispatch();
  const _updateCurrentTemperature = (newTemperature: number) => {
    dispatch(updateCurrentTemperature(newTemperature));
  };
  return { updateCurrentTemperature: _updateCurrentTemperature };
};
const useUpdateBackendTargetTemperature = () => {
  const dispatch = useAppDispatch();
  const _updateBackendTargetTemperature = (newTemperature: number) => {
    dispatch(updateBackendTargetTemperature(newTemperature));
  };
  return { updateBackendTargetTemperature: _updateBackendTargetTemperature };
};
const useUpdateTargetTemperature = () => {
  const dispatch = useAppDispatch();
  const _updateTargetTemperature = (newTemperature: number) => {
    dispatch(updateTargetTemperature(newTemperature));
  };
  return { updateTargetTemperature: _updateTargetTemperature };
};

export {
  temperaturesSlice,
  useUpdateBackendTargetTemperature,
  useUpdateCurrentTemperature,
  useUpdateIsInternetConnected,
  useUpdateTargetTemperature,
};
export default temperaturesSlice.reducer;
