import React from "react";
import { Text, TouchableOpacity } from "react-native";

const IncrementButton = ({
  text,
  onPress,
}: {
  text: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      className="justify-center items-center self-stretch rounded-[16px] p-4"
      onPress={onPress}
      style={{ backgroundColor: "green" }}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default IncrementButton;
