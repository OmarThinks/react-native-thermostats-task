import IncrementButton from "@/components/IncrementButton";
import { useColors } from "@/constants/colors";
import { useState } from "react";
import { Button, Switch, Text, View } from "react-native";

const minTemperature = 0;
const maxTemperature = 100;

function Index() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [targetTemperature, _setTargetTemperature] = useState(30);

  const setTargetTemperature = (newTemperature: number) => {
    _setTargetTemperature(Number(newTemperature.toFixed(1)));
  };

  const colors = useColors();

  const currentTemperature = 20;

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
