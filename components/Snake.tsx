import { Colors } from "@/styles/colors";
import React, { JSX } from "react";
import { StyleSheet, View } from "react-native";
import { Coordinate, SnakeProps } from "./types";

const Snake = ({ snake }: SnakeProps): JSX.Element => {
  return (
    <View>
      {snake.map((segment: Coordinate, index: number) => {
        const segmentStyle = {
          left: segment.x * 10,
          top: segment.y * 10,
        };
        return <View key={index} style={[styles.snake, segmentStyle]} />;
      })}
    </View>
  );
};

export default Snake;

const styles = StyleSheet.create({
  snake: {
    width: 15,
    height: 15,
    backgroundColor: Colors.primary,
    position: "absolute",
    borderRadius: 7,
  },
});
