import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../styles/colors";
import { Coordinate } from "../types/types";

interface SnakeProps {
  snake: Coordinate[];
  cellSize: number;
}

export default function Snake({ snake, cellSize }: SnakeProps) {
  return (
    <>
      {snake.map((segment, index) => {
        const isHead = index === 0;

        return (
          <View
            key={`${segment.x}-${segment.y}-${index}`}
            style={[
              styles.block,
              {
                width: cellSize - 1,
                height: cellSize - 1,
                borderRadius: isHead ? 4 : 2,
                backgroundColor: isHead ? Colors.head : Colors.secondary,
                left: segment.x * cellSize,
                top: segment.y * cellSize,
              },
            ]}
          />
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    position: "absolute",
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
});
