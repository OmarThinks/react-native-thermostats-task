import IncrementButton from "@/components/IncrementButton";
import { useColors } from "@/constants/colors";
import { useState } from "react";
import { Button, Switch, Text, TextInput, View } from "react-native";

const minTemperature = 0;
const maxTemperature = 100;

function Index() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [targetTemperature, setTargetTemperature] = useState("30");

  const updateTargetTemperature = (newTemperature: string) => {
    if (newTemperature === "") {
      return setTargetTemperature("0");
    }

    if (+newTemperature) {
      setTargetTemperature(newTemperature);
    }
  };

  const colors = useColors();

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

      <View className=" flex-row items-center gap-1 shrink">
        <TextInput
          value={targetTemperature}
          style={{
            fontSize: 48,
            flexShrink: 1,
            width: 150,
            textAlign: "center",
            borderColor: colors.border,
            color: colors.text,
            borderWidth: 1,
            borderRadius: 16,
          }}
          onChangeText={updateTargetTemperature}
        />
        <Text style={{ fontSize: 48, color: colors.text }}>°C</Text>
      </View>

      <View className=" self-center items-center flex-row gap-3 flex-wrap shrink content-center justify-center">
        <IncrementButton
          text="<<<"
          targetTemperature={+targetTemperature}
          setTargetTemperature={setTargetTemperature}
          increment={-10}
          minTemperature={minTemperature}
          maxTemperature={maxTemperature}
        />
        <IncrementButton
          text="<<"
          targetTemperature={+targetTemperature}
          setTargetTemperature={setTargetTemperature}
          increment={-1}
          minTemperature={minTemperature}
          maxTemperature={maxTemperature}
        />
        <IncrementButton
          text="<"
          targetTemperature={+targetTemperature}
          setTargetTemperature={setTargetTemperature}
          increment={-0.1}
          minTemperature={minTemperature}
          maxTemperature={maxTemperature}
        />

        <IncrementButton
          text=">"
          targetTemperature={+targetTemperature}
          setTargetTemperature={setTargetTemperature}
          increment={0.1}
          minTemperature={minTemperature}
          maxTemperature={maxTemperature}
        />
        <IncrementButton
          text=">>"
          targetTemperature={+targetTemperature}
          setTargetTemperature={setTargetTemperature}
          increment={1}
          minTemperature={minTemperature}
          maxTemperature={maxTemperature}
        />
        <IncrementButton
          text=">>>"
          targetTemperature={+targetTemperature}
          setTargetTemperature={setTargetTemperature}
          increment={10}
          minTemperature={minTemperature}
          maxTemperature={maxTemperature}
        />
      </View>
      <Button title="Crazy" />
    </View>
  );
}

export default Index;
