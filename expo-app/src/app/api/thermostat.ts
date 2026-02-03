import { waitingTime } from "@/constants/waitingTime";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeysEnum } from "@/constants/AsyncStorageKeysEnum";
import { failurePercentage } from "@/constants/failurePercentage";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function GET(): Promise<Response> {
  const backendLastUpdate = Number(
    (await AsyncStorage.getItem(AsyncStorageKeysEnum.BackendLastUpdate)) ??
      Date.now() - 1000,
  );

  const backendTargetTemperature =
    Number(
      await AsyncStorage.getItem(AsyncStorageKeysEnum.BackendTargetTemperature),
    ) ?? 10;

  let backendCurrentTemperature =
    Number(
      await AsyncStorage.getItem(
        AsyncStorageKeysEnum.BackendCurrentTemperature,
      ),
    ) ?? 45;

  if (Math.abs(Date.now() - backendLastUpdate) > 100) {
    if (Math.abs(backendCurrentTemperature - backendTargetTemperature) <= 0.1) {
      backendCurrentTemperature = backendTargetTemperature;
    } else if (backendTargetTemperature > backendCurrentTemperature) {
      backendCurrentTemperature += 0.1;
    } else {
      backendCurrentTemperature -= 0.1;
    }
    backendCurrentTemperature = Number(backendCurrentTemperature.toFixed(1));

    await AsyncStorage.setItem(
      AsyncStorageKeysEnum.BackendCurrentTemperature,
      backendCurrentTemperature.toFixed(1),
    );
    await AsyncStorage.setItem(
      AsyncStorageKeysEnum.BackendLastUpdate,
      Date.now().toString(),
    );
  }

  await sleep(waitingTime * Math.random());

  if (Math.random() * 2 * failurePercentage > failurePercentage) {
    return Response.json({
      success: false,
    });
  } // Failure

  return Response.json({
    success: true,
    currentTemperature: Number(backendCurrentTemperature.toFixed(1)),
  }); // Success
}

function POST(request: Request) {
  return Response.json({ success: true });
}

export { GET, POST };
