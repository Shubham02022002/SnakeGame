import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../styles/colors";

interface HUDProps {
  score: number;
  highScore: number;
  width: number;
}

export default function GameHUD({ score, highScore, width }: HUDProps) {
  const currentLevel = Math.floor(score / 50) + 1;
  const progress = highScore > 0 ? Math.min(score / highScore, 1) : 0;

  return (
    <View style={[styles.hud, { width }]}>
      <View style={styles.metricsRow}>
        <View style={styles.card}>
          <Text style={styles.label}>SCORE</Text>
          <Text style={styles.value}>{score}</Text>
        </View>

        <View style={styles.badgeContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeLabel}>LVL</Text>
            <Text style={styles.badgeNum}>{currentLevel}</Text>
          </View>
        </View>

        <View style={[styles.card, styles.alignEnd]}>
          <Text style={styles.label}>BEST RUN</Text>
          <Text style={[styles.value, { color: Colors.secondary }]}>
            {highScore}
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${progress * 100}%` }]} />
        </View>
        <View style={styles.labels}>
          <Text style={styles.miniText}>0</Text>
          <Text style={styles.miniText}>
            {score >= highScore && highScore > 0
              ? "🔥 RECORD PACE"
              : "RECORD DISTANCE"}
          </Text>
          <Text style={styles.miniText}>{highScore}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hud: {
    height: 140,
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingTop: 10,
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: { flex: 1 },
  alignEnd: { alignItems: "flex-end" },
  label: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  value: {
    color: Colors.textLight,
    fontSize: 36,
    fontWeight: "900",
    fontVariant: ["tabular-nums"],
  },
  badgeContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  badge: {
    backgroundColor: "#1e293b",
    borderWidth: 2,
    borderColor: "#475569",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignItems: "center",
    minWidth: 55,
  },
  badgeLabel: {
    color: "#94a3b8",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  badgeNum: { color: Colors.tertiary, fontSize: 18, fontWeight: "900" },
  progressContainer: { marginTop: 14, width: "100%" },
  track: {
    height: 6,
    backgroundColor: "#1e293b",
    borderRadius: 99,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#334155",
  },
  fill: { height: "100%", backgroundColor: Colors.secondary, borderRadius: 99 },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    paddingHorizontal: 2,
  },
  miniText: {
    color: "#475569",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
