import { AsyncStorageKeysEnum } from "@/constants/AsyncStorageKeysEnum";
import { defaultTemperatures, temperatureStep } from "@/constants/tempratures";
import AsyncStorage from "@react-native-async-storage/async-storage";

const updateCurrentTemperature = async () => {
  const [[, _backendCurrentTemperature], [, _backendTargetTemperature]] =
    await AsyncStorage.multiGet([
      AsyncStorageKeysEnum.BackendCurrentTemperature,
      AsyncStorageKeysEnum.BackendTargetTemperature,
    ]);

  let backendCurrentTemperature =
    _backendCurrentTemperature === null
      ? defaultTemperatures.backendCurrentTemperature
      : Number(_backendCurrentTemperature);
  let backendTargetTemperature =
    _backendTargetTemperature === null
      ? defaultTemperatures.backendTargetTemperature
      : Number(_backendTargetTemperature);

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

const getCurrentTemperatureAsync = async () => {
  const _backendCurrentTemperature = await AsyncStorage.getItem(
    AsyncStorageKeysEnum.BackendCurrentTemperature,
  );

  let backendCurrentTemperature =
    _backendCurrentTemperature === null
      ? defaultTemperatures.backendCurrentTemperature
      : Number(_backendCurrentTemperature);

  return Number(backendCurrentTemperature.toFixed(1));
};

export { getCurrentTemperatureAsync, updateCurrentTemperature };
