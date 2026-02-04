import { AsyncStorageKeysEnum } from "@/constants/AsyncStorageKeysEnum";
import { defaultTemperatures, temperatureStep } from "@/constants/tempratures";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getCurrentTemperatureAndTargetTemperatureAsync = async () => {
  const [[, _backendCurrentTemperature], [, _backendTargetTemperature]] =
    await AsyncStorage.multiGet([
      AsyncStorageKeysEnum.BackendCurrentTemperature,
      AsyncStorageKeysEnum.BackendTargetTemperature,
    ]);

  let backendCurrentTemperature =
    _backendCurrentTemperature === null
      ? defaultTemperatures.backendCurrentTemperature
      : Number(Number(_backendCurrentTemperature).toFixed(1));
  let backendTargetTemperature =
    _backendTargetTemperature === null
      ? defaultTemperatures.backendTargetTemperature
      : Number(Number(_backendTargetTemperature).toFixed(1));

  return { backendTargetTemperature, backendCurrentTemperature };
};

const updateCurrentTemperature = async () => {
  let { backendCurrentTemperature, backendTargetTemperature } =
    await getCurrentTemperatureAndTargetTemperatureAsync();

  if (
    Math.abs(backendCurrentTemperature - backendTargetTemperature) <=
    temperatureStep
  ) {
    backendCurrentTemperature = backendTargetTemperature;
  } else if (backendTargetTemperature > backendCurrentTemperature) {
    backendCurrentTemperature += temperatureStep;
  } else {
    backendCurrentTemperature -= temperatureStep;
  }
  backendCurrentTemperature = Number(backendCurrentTemperature.toFixed(1));

  await AsyncStorage.setItem(
    AsyncStorageKeysEnum.BackendCurrentTemperature,
    backendCurrentTemperature.toFixed(1),
  );
};

export {
  getCurrentTemperatureAndTargetTemperatureAsync,
  updateCurrentTemperature,
};
