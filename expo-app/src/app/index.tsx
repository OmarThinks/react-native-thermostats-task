import IncrementButton from "@/components/IncrementButton";
import { useColors } from "@/constants/colors";
import { maxTemperature, minTemperature } from "@/constants/tempratures";
import {
  useGetThermostatQuery,
  usePostThermostatMutation,
} from "@/redux/api/thermostatsApi/thermostatsApi";
import {
  useBackendTargetTemperature,
  useCurrentTemperature,
  useIsInternetConnected,
  useTargetTemperature,
  useUpdateBackendTargetTemperature,
  useUpdateCurrentTemperature,
  useUpdateIsInternetConnected,
  useUpdateTargetTemperature,
} from "@/redux/temperaturesSlice/temperaturesSlice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Index() {
  const isInternetConnected = useIsInternetConnected();
  const backendTargetTemperature = useBackendTargetTemperature();
  const currentTemperature = useCurrentTemperature();
  const targetTemperature = useTargetTemperature();

  const [modalMessage, setModalMessage] = useState("");

  const { updateBackendTargetTemperature } =
    useUpdateBackendTargetTemperature();
  const { updateCurrentTemperature } = useUpdateCurrentTemperature();
  const { updateIsInternetConnected } = useUpdateIsInternetConnected();
  const { updateTargetTemperature } = useUpdateTargetTemperature();

  const toggleIsInternetConnected = () =>
    updateIsInternetConnected(!isInternetConnected);

  const setTargetTemperature = (newTemperature: number) => {
    updateTargetTemperature(Number(newTemperature.toFixed(1)));
  };

  const colors = useColors();

  const { data } = useGetThermostatQuery(
    { canFail: true },
    { pollingInterval: 300, skip: !isInternetConnected },
  );

  const [postThermostatMutation, { isLoading }] = usePostThermostatMutation();

  useEffect(() => {
    if (data?.success && typeof data?.backendCurrentTemperature === "number") {
      updateCurrentTemperature(data.backendCurrentTemperature);
      if (typeof data?.backendTargetTemperature == "number") {
        updateBackendTargetTemperature(data.backendTargetTemperature);
      }
    }
  }, [data, updateBackendTargetTemperature, updateCurrentTemperature]);

  return (
    <SafeAreaView
      className="flex-1 self-stretch justify-center"
      style={{ backgroundColor: colors.background }}
    >
      <ScrollView>
        <View
          style={{
            maxWidth: 800,
            alignSelf: "center",
          }}
          className=" gap-5 p-4 pt-10  self-center items-stretch"
        >
          <TouchableOpacity
            className=" flex-row gap-4 items-center p-4 rounded-full self-center"
            style={{
              backgroundColor: isInternetConnected
                ? colors.primary
                : colors.error,
              borderWidth: 2,
              borderColor: colors.border,
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
            <Text style={{ color: colors.primary }}>
              {currentTemperature} °C
            </Text>
          </Text>

          <Text style={{ fontSize: 48, color: colors.text }}>
            <Text>Target Temperature: </Text>
            <Text style={{ color: colors.primary }}>
              {targetTemperature} °C
            </Text>
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
              if (!isInternetConnected) {
                setModalMessage(
                  "No Internet connection. Please try again later!",
                );
                return;
              }

              postThermostatMutation({ targetTemperature })
                .then((result) => {
                  if (result.data?.success) {
                  } else {
                    setModalMessage(
                      "Something went wrong, please try again later! ❌",
                    );
                  }
                })
                .catch(() => {
                  setModalMessage(
                    "Something went wrong, please try again later! ❌",
                  );
                });
            }}
            disabled={isLoading}
          />

          <Button
            title="Extreme"
            onPress={() => {
              if (targetTemperature > 50) {
                setTargetTemperature(0);
              } else {
                setTargetTemperature(100);
              }
            }}
          />
        </View>
      </ScrollView>

      <Modal
        onDismiss={() => {
          setModalMessage("");
        }}
        visible={!!modalMessage}
        transparent
        //backdropColor={"green"}
        onRequestClose={() => {
          setModalMessage("");
        }}
      >
        <View
          className=" justify-center items-center flex-1 self-stretch  "
          //style={{ width: 300, height: 300 }}
          style={{ backgroundColor: "#000000bb" }}
        >
          <TouchableOpacity
            style={{ zIndex: 1 }}
            className=" self-stretch flex-1 absolute w-full h-full"
            onPress={() => {
              setModalMessage("");
            }}
          />
          <TouchableOpacity
            //pointerEvents="none"
            className=" absolute"
            style={{
              zIndex: 3,
              pointerEvents: "none",
              backgroundColor: colors.background,
            }}
            disabled
          >
            <View className=" self-stretch flex-1">
              <Text
                style={{ color: colors.text }}
                className=" text-[48px] p-12"
              >
                {modalMessage}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default Index;
