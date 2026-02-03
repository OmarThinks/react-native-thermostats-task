import { useColors } from "@/constants/colors";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const IncrementButton = ({
  text,
  targetTemperature,
  setTargetTemperature,
  increment,
  minTemperature,
  maxTemperature,
}: {
  text: string;
  targetTemperature: number;
  setTargetTemperature: (newTemperature: string) => void;
  increment: number;
  minTemperature: number;
  maxTemperature: number;
}) => {
  const colors = useColors();

  const newTemperature = targetTemperature + increment;

  const active =
    !(newTemperature > maxTemperature) && !(newTemperature < minTemperature);

  const onPress = () => {
    if (active) {
      setTargetTemperature(`${newTemperature}`);
    }
  };

  return (
    <TouchableOpacity
      className="justify-center items-center self-stretch rounded-[16px] p-4"
      onPress={onPress}
      style={{ backgroundColor: colors.primary }}
      disabled={!active}
    >
      <Text style={{ color: colors.text, fontSize: 24 }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default IncrementButton;
