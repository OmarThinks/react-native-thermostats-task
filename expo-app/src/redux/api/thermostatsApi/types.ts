type GetThermostatResponseType =
  | { success: true; currentTemperature: number }
  | { success: false };

type PostThermostatResponseType = {
  success: boolean;
};

export type { GetThermostatResponseType, PostThermostatResponseType };
