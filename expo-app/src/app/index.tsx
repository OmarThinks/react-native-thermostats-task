import IncrementButton from "@/components/IncrementButton";
import { useColors } from "@/constants/colors";
import { maxTemperature, minTemperature } from "@/constants/tempratures";
import {
  useGetThermostatQuery,
  usePostThermostatMutation,
} from "@/redux/api/thermostatsApi/thermostatsApi";
import { useEffect, useState } from "react";
import { Alert, Button, Switch, Text, View } from "react-native";

function Index() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [targetTemperature, _setTargetTemperature] = useState(30);

  const setTargetTemperature = (newTemperature: number) => {
    _setTargetTemperature(Number(newTemperature.toFixed(1)));
  };

  const colors = useColors();

  const [currentTemperature, setCurrentTemperature] = useState<null | number>(
    null,
  );
  const [backendTargetTemperature, setBackendTargetTemperature] = useState<
    null | number
  >(null);

  const { data } = useGetThermostatQuery(
    { canFail: true },
    { pollingInterval: 300 },
  );

  const [postThermostatMutation, { isLoading }] = usePostThermostatMutation();

  useEffect(() => {
    if (data?.success && typeof data?.currentTemperature === "number") {
      setCurrentTemperature(data.currentTemperature);
      if (typeof data?.backendTargetTemperature == "number") {
        setBackendTargetTemperature(data.backendTargetTemperature);
      }
    }
  }, [data]);

  return (
    <View
      className="flex-1 items-center justify-center gap-5"
      style={{ backgroundColor: colors.background }}
    >
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

      <Text style={{ fontSize: 48, color: colors.text }}>
        <Text>Current Temperature: </Text>
        <Text style={{ color: colors.primary }}>{currentTemperature} °C</Text>
      </Text>

      <Text style={{ fontSize: 48, color: colors.text }}>
        <Text>Target Temperature: </Text>
        <Text style={{ color: colors.primary }}>{targetTemperature} °C</Text>
      </Text>

      <Text style={{ fontSize: 48, color: colors.text }}>
        <Text>Backend Temperature: </Text>
        <Text style={{ color: colors.primary }}>
          {backendTargetTemperature} °C
        </Text>
      </Text>

      <View className=" self-center items-center flex-row gap-3 flex-wrap shrink content-center justify-center">
        <IncrementButton
          text="<<<"
          targetTemperature={targetTemperature}
          setTargetTemperature={setTargetTemperature}
          increment={-10}
          minTemperature={minTemperature}
          maxTemperature={maxTemperature}
        />
        <IncrementButton
          text="<<"
          targetTemperature={targetTemperature}
          setTargetTemperature={setTargetTemperature}
          increment={-1}
          minTemperature={minTemperature}
          maxTemperature={maxTemperature}
        />
        <IncrementButton
          text="<"
          targetTemperature={targetTemperature}
          setTargetTemperature={setTargetTemperature}
          increment={-0.1}
          minTemperature={minTemperature}
          maxTemperature={maxTemperature}
        />
        <IncrementButton
          text=">"
          targetTemperature={targetTemperature}
          setTargetTemperature={setTargetTemperature}
          increment={0.1}
          minTemperature={minTemperature}
          maxTemperature={maxTemperature}
        />
        <IncrementButton
          text=">>"
          targetTemperature={targetTemperature}
          setTargetTemperature={setTargetTemperature}
          increment={1}
          minTemperature={minTemperature}
          maxTemperature={maxTemperature}
        />
        <IncrementButton
          text=">>>"
          targetTemperature={targetTemperature}
          setTargetTemperature={setTargetTemperature}
          increment={10}
          minTemperature={minTemperature}
          maxTemperature={maxTemperature}
        />
      </View>

      <Button
        title={isLoading ? "Updating....." : "Update Target Temperature"}
        onPress={() => {
          postThermostatMutation({ targetTemperature })
            .then((result) => {
              if (result.data?.success) {
                Alert.alert("Data Updated Successfully! ✅🎉");
              } else {
                Alert.alert("Something went wrong, please try again later! ❌");
              }
            })
            .catch(() => {
              Alert.alert(
                "Something went wrong, please try again later! ❌❌❌",
              );
            });
        }}
        disabled={isLoading}
      />

      <Button
        title="Test"
        onPress={() => {
          if (targetTemperature > 50) {
            setTargetTemperature(0);
          } else {
            setTargetTemperature(100);
          }
        }}
      />
    </View>
  );
}

export default Index;
