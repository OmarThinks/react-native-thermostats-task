import IncrementButton from "@/components/IncrementButton";
import { useColors } from "@/constants/colors";
import { maxTemperature, minTemperature } from "@/constants/tempratures";
import {
  useGetThermostatQuery,
  usePostThermostatMutation,
} from "@/redux/api/thermostatsApi/thermostatsApi";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";

function Index() {
  const [isInternetConnected, setIsInternetConnected] = useState(true);
  const toggleIsInternetConnected = () =>
    setIsInternetConnected((previousState) => !previousState);
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
    { pollingInterval: 300, skip: !isInternetConnected },
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
    <SafeAreaView
      className="flex-1 self-stretch justify-center"
      style={{ backgroundColor: colors.background }}
    >
      <ScrollView
        style={{
          maxWidth: 800,
          alignSelf: "center",
        }}
        contentContainerClassName=" gap-5 p-4 pt-10  self-center items-stretch"
      >
        <TouchableOpacity
          className=" flex-row gap-4 items-center p-4 rounded-full self-center"
          style={{
            backgroundColor: isInternetConnected
              ? colors.primary
              : colors.error,
          }}
          onPress={toggleIsInternetConnected}
        >
          <MaterialIcons color={colors.text} name={"wifi"} size={32} />
          <Text style={{ color: colors.text, fontSize: 32 }}>
            {isInternetConnected ? "Connected" : "Not Connected"}
          </Text>
        </TouchableOpacity>

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
                  Alert.alert(
                    "Something went wrong, please try again later! ❌",
                  );
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
      </ScrollView>
    </SafeAreaView>
  );
}

export default Index;
