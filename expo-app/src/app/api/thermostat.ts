import { waitingTime } from "@/constants/waitingTime";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeysEnum } from "@/constants/AsyncStorageKeysEnum";
import { failureProbability } from "@/constants/failurePercentage";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const defaults = {
  backendTargetTemperature: 10,
  backendCurrentTemperature: 45,
};

async function GET(): Promise<Response> {
  const backendLastUpdate = Number(
    (await AsyncStorage.getItem(AsyncStorageKeysEnum.BackendLastUpdate)) ??
      Date.now() - 1000,
  );

  const backendTargetTemperature =
    Number(
      await AsyncStorage.getItem(AsyncStorageKeysEnum.BackendTargetTemperature),
    ) ?? defaults.backendTargetTemperature;

  let backendCurrentTemperature =
    Number(
      await AsyncStorage.getItem(
        AsyncStorageKeysEnum.BackendCurrentTemperature,
      ),
    ) ?? defaults.backendCurrentTemperature;

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

  if (Math.random() * 2 * failureProbability > failureProbability) {
    return Response.json({
      success: false,
    });
  } // Failure

  return Response.json({
    success: true,
    currentTemperature: Number(backendCurrentTemperature.toFixed(1)),
  }); // Success
}

async function POST(request: Request) {
  if (Math.random() * 2 * failureProbability > failureProbability) {
    return Response.json({
      success: false,
    });
  } // Failure

  const { targetTemperature }: { targetTemperature: number } =
    await request.json();

  if (typeof targetTemperature !== "number") {
    return Response.json({ success: false });
  }

  await AsyncStorage.setItem(
    AsyncStorageKeysEnum.BackendTargetTemperature,
    targetTemperature.toFixed(1),
  );

  return Response.json({ success: true });
}

export { GET, POST };
