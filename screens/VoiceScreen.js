// screens/VoiceScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { Audio } from "expo-av";
import db from "../database";

export default function VoiceScreen() {
  const [recording, setRecording] = useState(null);
  const [voiceTitle, setVoiceTitle] = useState("");
  const [recordings, setRecordings] = useState([]);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    loadVoices();
  }, []);

  const loadVoices = () => {
    const result = db.getAllSync("SELECT * FROM voices ORDER BY id DESC;");
    setRecordings(result);
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert("Mic permission required");
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (e) {
      console.log("Error:", e);
    }
  };

  const stopRecording = async () => {
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecording(null);
    if (!voiceTitle.trim()) {
      Alert.alert("Error", "Please enter title before saving.");
      return;
    }
    db.runSync("INSERT INTO voices (title, uri) VALUES (?, ?);", [
      voiceTitle,
      uri,
    ]);
    setVoiceTitle("");
    loadVoices();
  };

  const playRecording = async (uri) => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync({ uri });
    setSound(newSound);
    await newSound.playAsync();
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Recording title..."
        value={voiceTitle}
        onChangeText={setVoiceTitle}
      />
      <TouchableOpacity
        style={styles.recordBtn}
        onPress={recording ? stopRecording : startRecording}
      >
        <Text style={styles.recordTxt}>
          {recording ? "⏹ Stop Recording" : "🎤 Start Recording"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={recordings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <TouchableOpacity
              style={styles.playBtn}
              onPress={() => playRecording(item.uri)}
            >
              <Text style={styles.btnText}>▶ Play</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  recordBtn: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  recordTxt: { color: "#fff", fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: { fontWeight: "bold", fontSize: 16 },
  playBtn: {
    backgroundColor: "#007bff",
    padding: 6,
    borderRadius: 6,
    marginTop: 5,
    alignItems: "center",
  },
  btnText: { color: "#fff" },
});
