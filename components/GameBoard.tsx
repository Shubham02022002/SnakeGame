import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Colors } from "../styles/colors";
import { Coordinate, GameState } from "../types/types";
import Snake from "./Snake";

interface BoardProps {
  width: number;
  height: number;
  cellSize: number;
  snake: Coordinate[];
  food: Coordinate;
  status: GameState;
  score: number;
  onGesture: (event: any) => void;
  onRestart: () => void;
  onTogglePause: () => void;
}

export default function GameBoard({
  width,
  height,
  cellSize,
  snake,
  food,
  status,
  score,
  onGesture,
  onRestart,
  onTogglePause,
}: BoardProps) {
  return (
    <View style={[styles.board, { width, height }]}>
      <PanGestureHandler onGestureEvent={onGesture}>
        <View style={StyleSheet.absoluteFill}>
          <Snake snake={snake} cellSize={cellSize} />
          <View
            style={[
              styles.food,
              {
                width: cellSize - 2,
                height: cellSize - 2,
                left: food.x * cellSize + 1,
                top: food.y * cellSize + 1,
              },
            ]}
          />
        </View>
      </PanGestureHandler>

      {status === "idle" && (
        <View style={styles.overlay}>
          <Text style={styles.overlayTitle}>SNAKE RETRO</Text>
          <Text style={styles.overlaySub}>
            Swipe anywhere inside the arena to turn
          </Text>
          <TouchableOpacity
            onPress={onRestart}
            style={styles.actionButton}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>START GAME</Text>
          </TouchableOpacity>
        </View>
      )}

      {status === "paused" && (
        <View style={styles.overlay}>
          <Text style={styles.overlayTitle}>PAUSED</Text>
          <TouchableOpacity
            onPress={onTogglePause}
            style={styles.actionButton}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>RESUME</Text>
          </TouchableOpacity>
        </View>
      )}

      {status === "gameover" && (
        <View style={styles.overlay}>
          <Text style={[styles.overlayTitle, { color: Colors.tertiary }]}>
            GAME OVER
          </Text>
          <Text style={styles.finalScore}>Final Score: {score}</Text>
          <TouchableOpacity
            onPress={onRestart}
            style={styles.actionButton}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>TRY AGAIN</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    backgroundColor: Colors.board,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#334155",
    position: "relative",
    elevation: 10,
  },
  food: {
    position: "absolute",
    backgroundColor: Colors.tertiary,
    borderRadius: 99,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.95)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    zIndex: 100,
  },
  overlayTitle: {
    fontSize: 38,
    fontWeight: "900",
    color: Colors.textLight,
    letterSpacing: 2,
    marginBottom: 8,
    textAlign: "center",
  },
  overlaySub: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 28,
    textAlign: "center",
  },
  finalScore: { fontSize: 18, color: Colors.textLight, marginBottom: 24 },
  actionButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 12,
  },
  actionButtonText: {
    color: Colors.background,
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 1,
  },
});
