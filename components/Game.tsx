import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSnakeEngine } from "../hooks/useSnakeEngine";
import { Colors } from "../styles/colors";
import GameBoard from "./GameBoard";
import GameHUD from "./GameHUD";

const CELL_SIZE = 20;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const BOARD_PADDING = 12;
const HUD_HEIGHT = 140;
const FOOTER_HEIGHT = 70;

const BOARD_WIDTH =
  Math.floor((SCREEN_WIDTH - BOARD_PADDING * 2) / CELL_SIZE) * CELL_SIZE;
const BOARD_HEIGHT =
  Math.floor((SCREEN_HEIGHT - HUD_HEIGHT - FOOTER_HEIGHT - 60) / CELL_SIZE) *
  CELL_SIZE;

const GRID_X = Math.floor(BOARD_WIDTH / CELL_SIZE);
const GRID_Y = Math.floor(BOARD_HEIGHT / CELL_SIZE);

export default function Game() {
  const {
    snake,
    food,
    score,
    highScore,
    status,
    handleSwipe,
    restart,
    togglePause,
  } = useSnakeEngine(GRID_X, GRID_Y);

  const onGestureEvent = (event: any) => {
    const { translationX, translationY } = event.nativeEvent;
    handleSwipe(translationX, translationY);
  };

  return (
    <SafeAreaView style={styles.container}>
      <GameHUD score={score} highScore={highScore} width={BOARD_WIDTH} />

      <GameBoard
        width={BOARD_WIDTH}
        height={BOARD_HEIGHT}
        cellSize={CELL_SIZE}
        snake={snake}
        food={food}
        status={status}
        score={score}
        onGesture={onGestureEvent}
        onRestart={restart}
        onTogglePause={togglePause}
      />

      <View style={styles.controls}>
        {status !== "idle" && (
          <>
            <TouchableOpacity
              onPress={togglePause}
              disabled={status === "gameover"}
              style={[
                styles.bottomButton,
                status === "gameover" && styles.disabledButton,
              ]}
            >
              <Text style={styles.bottomButtonText}>
                {status === "running" ? "PAUSE" : "RESUME"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={restart} style={styles.bottomButton}>
              <Text style={styles.bottomButtonText}>RESET</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  controls: {
    flexDirection: "row",
    gap: 16,
    width: BOARD_WIDTH,
    height: FOOTER_HEIGHT,
    alignItems: "center",
  },
  bottomButton: {
    flex: 1,
    backgroundColor: "#334155",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: { opacity: 0.3 },
  bottomButtonText: {
    color: Colors.textLight,
    fontWeight: "800",
    fontSize: 14,
    letterSpacing: 1,
  },
});
