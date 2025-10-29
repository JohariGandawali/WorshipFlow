// App.js
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import LyricsScreen from "./screens/LyricsScreen";
import VoiceScreen from "./screens/VoiceScreen";
import WidgetScreen from "./screens/WidgetScreen";

export default function App() {
  const [screen, setScreen] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🎶 Mag Himug App</Text>

      <View style={styles.topNav}>
        <TouchableOpacity
          onPress={() => setScreen(1)}
          style={[styles.navBtn, screen === 1 && styles.activeTab]}
        >
          <Text style={styles.navText}>Lyrics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setScreen(2)}
          style={[styles.navBtn, screen === 2 && styles.activeTab]}
        >
          <Text style={styles.navText}>Voice</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setScreen(3)}
          style={[styles.navBtn, screen === 3 && styles.activeTab]}
        >
          <Text style={styles.navText}>Widget</Text>
        </TouchableOpacity>
      </View>

      <ScrollView  style={styles.screenArea} contentContainerStyle={{ paddingBottom: 40 }}>
        {screen === 1 && <LyricsScreen />}
         {screen === 2 && <VoiceScreen />}
        {screen === 3 && <WidgetScreen />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f9fc" },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#eee",
    paddingVertical: 8,
  },
  navBtn: { padding: 6, borderRadius: 8 },
  activeTab: { backgroundColor: "#007bff" },
  navText: { color: "#000", fontWeight: "bold" },
  screenArea: { flex: 1, padding: 10 },
});
