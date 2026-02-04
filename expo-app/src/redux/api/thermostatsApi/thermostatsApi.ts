import { AsyncStorageKeysEnum } from "@/constants/AsyncStorageKeysEnum";
import { failureProbability } from "@/constants/failurePercentage";
import { waitingTime } from "@/constants/waitingTime";
import { getCurrentTemperatureAndTargetTemperatureAsync } from "@/utils/termostats";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PostThermostatResponseType } from "./types";

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
          return {
            data: {
              success: false,
            },
          };
        } // Failure

        await AsyncStorage.setItem(
          AsyncStorageKeysEnum.BackendTargetTemperature,
          targetTemperature.toFixed(1),
        );

        return { data: { success: true } };
      },
    }),

    getThermostat: builder.query({
      queryFn: async () => {
        return await getCurrentTemperature();
      },
    }),
  }),
});

const getCurrentTemperature = async () => {
  await sleep(waitingTime * Math.random());

  if (Math.random() < failureProbability) {
    return {
      data: {
        success: false as false,
      },
    } as any;
  } // Failure

  let { backendCurrentTemperature, backendTargetTemperature } =
    await getCurrentTemperatureAndTargetTemperatureAsync();

  return {
    data: {
      success: true as true,
      backendCurrentTemperature,
      backendTargetTemperature,
    },
  }; // Success
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
const { usePostThermostatMutation, useGetThermostatQuery } = thermostatsApi;
export { thermostatsApi, useGetThermostatQuery, usePostThermostatMutation };
