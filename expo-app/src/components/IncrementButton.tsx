import { useColors } from "@/constants/colors";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const IncrementButton = ({
  text,
  onPress,
}: {
  text: string;
  onPress: () => void;
}) => {
  const colors = useColors();

  return (
    <TouchableOpacity
      className="justify-center items-center self-stretch rounded-[16px] p-4"
      onPress={onPress}
      style={{ backgroundColor: colors.primary }}
    >
      <Text style={{ color: colors.text, fontSize: 24 }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default IncrementButton;
