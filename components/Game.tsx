import { Colors } from "@/styles/colors";
import React, { JSX, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Snake from "./Snake";
import { Coordinate, Direction } from "./types";

const SNAKE_INITIAL_POS = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POS = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 63 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENTER = 10;

const Game = (): JSX.Element => {
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POS);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  // Define the pan gesture
  const panGesture = Gesture.Pan().onUpdate((event) => {
    translateX.value = event.translationX;
    translateY.value = event.translationY;
    // console.log(translateX.value, translateY.value)
    if (Math.abs(translateX.value) > Math.abs(translateY.value)) {
      setDirection(translateX.value > 0 ? Direction.Right : Direction.Left);
    } else {
      setDirection(translateY.value > 0 ? Direction.Up : Direction.Down);
    }
  });

  return (
    <GestureDetector gesture={panGesture}>
      <SafeAreaView style={styles.container}>
        <View>
          <Snake snake={snake} />
        </View>
      </SafeAreaView>
    </GestureDetector>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
