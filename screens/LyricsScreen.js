// screens/LyricsScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import db from "../database";

export default function LyricsScreen() {
  const [lyricsList, setLyricsList] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadLyrics();
  }, []);

  const loadLyrics = () => {
    const result = db.getAllSync("SELECT * FROM lyrics ORDER BY id DESC;");
    setLyricsList(result);
  };

  const addLyrics = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Error", "Please enter title and lyrics.");
      return;
    }
    db.runSync("INSERT INTO lyrics (title, content) VALUES (?, ?);", [
      title,
      content,
    ]);
    setTitle("");
    setContent("");
    loadLyrics();
  };

  return (
    <View>
      {selected ? (
        <ScrollView style={styles.preview}>
          <Text style={styles.previewTitle}>{selected.title}</Text>
          <Text style={styles.previewText}>{selected.content}</Text>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => setSelected(null)}
          >
            <Text>← Back</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Lyrics..."
            multiline
            value={content}
            onChangeText={setContent}
          />
          <TouchableOpacity style={styles.addBtn} onPress={addLyrics}>
            <Text style={styles.addTxt}>Add</Text>
          </TouchableOpacity>

          <FlatList
            data={lyricsList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => setSelected(item)}
              >
                <Text style={styles.cardTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
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
  textarea: { height: 100, textAlignVertical: "top" },
  addBtn: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  addTxt: { color: "#fff", fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: { fontWeight: "bold", fontSize: 16 },
  preview: { backgroundColor: "#fff", padding: 10, borderRadius: 10 },
  previewTitle: { fontSize: 20, fontWeight: "bold" },
  previewText: { fontSize: 16, marginTop: 10 },
  backBtn: {
    marginTop: 20,
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
});
