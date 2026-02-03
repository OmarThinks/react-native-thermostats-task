import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  GetThermostatResponseType,
  PostThermostatResponseType,
} from "./types";

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
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
const {
  useGetThermostat1Query,
  useGetThermostatQuery,
  usePostThermostatMutation,
} = thermostatsApi;
export {
  thermostatsApi,
  useGetThermostat1Query,
  useGetThermostatQuery,
  usePostThermostatMutation,
};
