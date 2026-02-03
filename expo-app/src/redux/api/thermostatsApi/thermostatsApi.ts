import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  GetThermostatResponseType,
  PostThermostatResponseType,
} from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeysEnum } from "@/constants/AsyncStorageKeysEnum";
import { failureProbability } from "@/constants/failurePercentage";
import { waitingTime } from "@/constants/waitingTime";

const thermostatsApi = createApi({
  reducerPath: "thermostatsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    postThermostat: builder.mutation<
      PostThermostatResponseType,
      { targetTemperature: number }
    >({
      queryFn: async ({ targetTemperature }: { targetTemperature: number }) => {
        if (Math.random() < failureProbability) {
          return Response.json({
            data: {
              success: false,
            },
          });
        } // Failure

        await AsyncStorage.setItem(
          AsyncStorageKeysEnum.BackendTargetTemperature,
          targetTemperature.toFixed(1),
        );

        return { data: { success: true } };
      },
    }),

    getThermostat: builder.query({
      queryFn: async ({ canFail }: { canFail: boolean }) => {
        return await getCurrentTemperature({ canFail });
      },
    }),
  }),
});

const getCurrentTemperature = async ({ canFail }: { canFail: boolean }) => {
  const backendLastUpdate = Number(
    (await AsyncStorage.getItem(AsyncStorageKeysEnum.BackendLastUpdate)) ??
      Date.now() - 1000,
  );

  const backendTargetTemperature = Number(
    (await AsyncStorage.getItem(
      AsyncStorageKeysEnum.BackendTargetTemperature,
    )) ?? defaults.backendTargetTemperature,
  );

  let backendCurrentTemperature = Number(
    (await AsyncStorage.getItem(
      AsyncStorageKeysEnum.BackendCurrentTemperature,
    )) ?? defaults.backendCurrentTemperature,
  );

  console.log(
    backendLastUpdate,
    backendCurrentTemperature,
    backendTargetTemperature,
  );

  if (Math.abs(Date.now() - backendLastUpdate) > 100) {
    console.log("should update");
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

  if (canFail) {
    await sleep(waitingTime * Math.random());

    if (Math.random() < failureProbability) {
      return {
        data: {
          success: false as false,
        },
      };
    } // Failure
  }

  return {
    data: {
      success: true as true,
      currentTemperature: Number(backendCurrentTemperature.toFixed(1)),
      backendTargetTemperature,
    },
  }; // Success
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const defaults = {
  backendTargetTemperature: 10,
  backendCurrentTemperature: 45,
};

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
const { usePostThermostatMutation, useGetThermostatQuery } = thermostatsApi;
export { thermostatsApi, usePostThermostatMutation, useGetThermostatQuery };
