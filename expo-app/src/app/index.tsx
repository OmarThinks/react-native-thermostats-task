import IncrementButton from "@/components/IncrementButton";
import { useState } from "react";
import { Text, View, Switch } from "react-native";

export default function Index() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

      <View className=" self-center items-center flex-row gap-3 flex-wrap">
        <IncrementButton text="<<<" onPress={() => {}} />
        <IncrementButton text="<<" onPress={() => {}} />
        <IncrementButton text="<" onPress={() => {}} />
        <IncrementButton text=">" onPress={() => {}} />
        <IncrementButton text=">>" onPress={() => {}} />
        <IncrementButton text=">>>" onPress={() => {}} />
      </View>
    </View>
  );
}
