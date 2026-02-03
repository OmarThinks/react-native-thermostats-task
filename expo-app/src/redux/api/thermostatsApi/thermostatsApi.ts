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
    getThermostat: builder.query<GetThermostatResponseType, void>({
      query: () => `thermostat/`,
    }),
    getThermostat1: builder.query<GetThermostatResponseType, void>({
      query: () => `thermostat/`,
    }),
    postThermostat: builder.mutation<
      PostThermostatResponseType,
      { targetTemperature: number }
    >({
      query: (targetTemperature) => ({
        url: `thermostat/`,
        body: { targetTemperature },
        method: "POST",
      }),
    }),

    getThermostat2: builder.query({
      async queryFn() {
        const backendLastUpdate = Number(
          (await AsyncStorage.getItem(
            AsyncStorageKeysEnum.BackendLastUpdate,
          )) ?? Date.now() - 1000,
        );

        const backendTargetTemperature =
          Number(
            await AsyncStorage.getItem(
              AsyncStorageKeysEnum.BackendTargetTemperature,
            ),
          ) ?? defaults.backendTargetTemperature;

        let backendCurrentTemperature =
          Number(
            await AsyncStorage.getItem(
              AsyncStorageKeysEnum.BackendCurrentTemperature,
            ),
          ) ?? defaults.backendCurrentTemperature;

        if (Math.abs(Date.now() - backendLastUpdate) > 100) {
          if (
            Math.abs(backendCurrentTemperature - backendTargetTemperature) <=
            0.1
          ) {
            backendCurrentTemperature = backendTargetTemperature;
          } else if (backendTargetTemperature > backendCurrentTemperature) {
            backendCurrentTemperature += 0.1;
          } else {
            backendCurrentTemperature -= 0.1;
          }
          backendCurrentTemperature = Number(
            backendCurrentTemperature.toFixed(1),
          );

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
      },
    }),
  }),
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const defaults = {
  backendTargetTemperature: 10,
  backendCurrentTemperature: 45,
};

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
const {
  useGetThermostat1Query,
  useGetThermostatQuery,
  usePostThermostatMutation,
  useGetThermostat2Query,
} = thermostatsApi;
export {
  thermostatsApi,
  useGetThermostat1Query,
  useGetThermostatQuery,
  usePostThermostatMutation,
  useGetThermostat2Query,
};
