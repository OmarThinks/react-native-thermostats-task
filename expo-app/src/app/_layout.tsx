import { AsyncStorageKeysEnum } from "@/constants/AsyncStorageKeysEnum";
import "@/global.css";
import { store } from "@/redux/store";
import { updateCurrentTemperatureCronJob } from "@/utils/thermostats";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import {
  useUpdateBackendTargetTemperature,
  useUpdateCurrentTemperature,
  useUpdateIsInternetConnected,
  useUpdateTargetTemperature,
} from "@/redux/temperaturesSlice/temperaturesSlice";
import { defaultTemperatures } from "@/constants/tempratures";
import { ActivityIndicator, View } from "react-native";
import { useColors } from "@/constants/colors";

const AppInsideRedux = () => {
  // This works as a cronjob
  useEffect(() => {
    setInterval(() => {
      updateCurrentTemperatureCronJob();
    }, 200);
  }, []);

  const { updateBackendTargetTemperature } =
    useUpdateBackendTargetTemperature();
  const { updateCurrentTemperature } = useUpdateCurrentTemperature();
  const { updateIsInternetConnected } = useUpdateIsInternetConnected();
  const { updateTargetTemperature } = useUpdateTargetTemperature();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      const [
        [, backendTargetTemperature],
        [, currentTemperature],
        [, isInternetConnected],
        [, targetTemperature],
      ] = await AsyncStorage.multiGet([
        AsyncStorageKeysEnum.FE_backendTargetTemperature,
        AsyncStorageKeysEnum.FE_currentTemperature,
        AsyncStorageKeysEnum.FE_isInternetConnected,
        AsyncStorageKeysEnum.FE_targetTemperature,
      ]);

      updateBackendTargetTemperature(
        backendTargetTemperature
          ? Number(backendTargetTemperature)
          : defaultTemperatures.backendTargetTemperature,
      );
      updateCurrentTemperature(
        currentTemperature
          ? Number(currentTemperature)
          : defaultTemperatures.backendCurrentTemperature,
      );
      updateIsInternetConnected(isInternetConnected === "false" ? false : true);
      updateTargetTemperature(
        targetTemperature
          ? Number(targetTemperature)
          : defaultTemperatures.backendTargetTemperature,
      );

      setIsInitialized(true);
    };

    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colors = useColors();

  if (!isInitialized) {
    return (
      <View
        className=" self-stretch flex-1 justify-center items-center"
        style={{ backgroundColor: colors.background }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return <Stack screenOptions={{ header: HeaderComponent }} />;
};

function RootLayout() {
  return (
    <Provider store={store}>
      <AppInsideRedux />
    </Provider>
  );
}

const HeaderComponent = () => null;

export default RootLayout;
