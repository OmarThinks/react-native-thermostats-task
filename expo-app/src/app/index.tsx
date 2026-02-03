import IncrementButton from "@/components/IncrementButton";
import { useState } from "react";
import {
  Text,
  View,
  Switch,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";

export default function Index() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [targetTemperature, setTargetTemperature] = useState("30");

  return (
    <View className="flex-1 items-center justify-center bg-white">
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
          }}
        />
        <Text style={{ fontSize: 48 }}>°C</Text>
      </View>

      <View className=" self-center items-center flex-row gap-3 flex-wrap shrink content-center justify-center">
        <IncrementButton text="<<<" onPress={() => {}} />
        <IncrementButton text="<<" onPress={() => {}} />
        <IncrementButton text="<" onPress={() => {}} />

        <IncrementButton text=">" onPress={() => {}} />
        <IncrementButton text=">>" onPress={() => {}} />
        <IncrementButton text=">>>" onPress={() => {}} />
      </View>
      <Button title="Crazy" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Aligns children horizontally
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    width: "90%", // Set a fixed width for the container to see the effect
    alignSelf: "center",
  },
  input: {
    flexShrink: 1, // Allows the TextInput to shrink within its container
    borderWidth: 1,
    borderColor: "blue",
    padding: 5,
    // You might also need flex: 1 for the input to initially expand
    // and then shrink when needed.
  },
});
