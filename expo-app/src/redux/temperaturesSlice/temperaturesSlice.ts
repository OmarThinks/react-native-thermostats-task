import { AsyncStorageKeysEnum } from "@/constants/AsyncStorageKeysEnum";
import { defaultTemperatures } from "@/constants/tempratures";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

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
    AsyncStorage.setItem(
      AsyncStorageKeysEnum.FE_isInternetConnected,
      String(isInternetConnected),
    );
  };
  return { updateIsInternetConnected: _updateIsInternetConnected };
};
const useUpdateCurrentTemperature = () => {
  const dispatch = useAppDispatch();
  const _updateCurrentTemperature = (newTemperature: number) => {
    dispatch(updateCurrentTemperature(newTemperature));
    AsyncStorage.setItem(
      AsyncStorageKeysEnum.FE_currentTemperature,
      String(newTemperature),
    );
  };
  return { updateCurrentTemperature: _updateCurrentTemperature };
};
const useUpdateBackendTargetTemperature = () => {
  const dispatch = useAppDispatch();
  const _updateBackendTargetTemperature = (newTemperature: number) => {
    dispatch(updateBackendTargetTemperature(newTemperature));
    AsyncStorage.setItem(
      AsyncStorageKeysEnum.FE_backendTargetTemperature,
      String(newTemperature),
    );
  };
  return { updateBackendTargetTemperature: _updateBackendTargetTemperature };
};
const useUpdateTargetTemperature = () => {
  const dispatch = useAppDispatch();
  const _updateTargetTemperature = (newTemperature: number) => {
    dispatch(updateTargetTemperature(newTemperature));
    AsyncStorage.setItem(
      AsyncStorageKeysEnum.FE_targetTemperature,
      String(newTemperature),
    );
  };
  return { updateTargetTemperature: _updateTargetTemperature };
};

const useIsInternetConnected = () =>
  useAppSelector((store) => store.temperatures.isInternetConnected);
const useTargetTemperature = () =>
  useAppSelector((store) => store.temperatures.targetTemperature);
const useCurrentTemperature = () =>
  useAppSelector((store) => store.temperatures.currentTemperature);
const useBackendTargetTemperature = () =>
  useAppSelector((store) => store.temperatures.backendTargetTemperature);

export {
  temperaturesSlice,
  useBackendTargetTemperature,
  useCurrentTemperature,
  useIsInternetConnected,
  useTargetTemperature,
  useUpdateBackendTargetTemperature,
  useUpdateCurrentTemperature,
  useUpdateIsInternetConnected,
  useUpdateTargetTemperature,
};
export default temperaturesSlice.reducer;
