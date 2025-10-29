// // screens/WidgetScreen.js
// import React, { useEffect, useState } from "react";
// import {
//   ScrollView,
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { Audio } from "expo-av";
// import db from "../database";

// export default function WidgetScreen() {
//   const [lyrics, setLyrics] = useState([]);
//   const [voices, setVoices] = useState([]);
//   const [sound, setSound] = useState(null);

//   useEffect(() => {
//     setLyrics(db.getAllSync("SELECT * FROM lyrics;"));
//     setVoices(db.getAllSync("SELECT * FROM voices;"));
//   }, []);

//   const playRecording = async (uri) => {
//     if (sound) {
//       await sound.stopAsync();
//       await sound.unloadAsync();
//     }
//     const { sound: newSound } = await Audio.Sound.createAsync({ uri });
//     setSound(newSound);
//     await newSound.playAsync();
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.widgetContainer}>
//       {lyrics.map((l) => (
//         <View key={l.id} style={styles.widget}>
//           <Text style={styles.widgetTitle}>{l.title}</Text>
//           <Text numberOfLines={2}>{l.content}</Text>
//         </View>
//       ))}
//       {voices.map((r) => (
//         <View
//           key={r.id}
//           style={[styles.widget, { backgroundColor: "#e6f7ff" }]}
//         >
//           <Text style={styles.widgetTitle}>{r.title}</Text>
//           <TouchableOpacity
//             style={styles.playBtn}
//             onPress={() => playRecording(r.uri)}
//           >
//             <Text style={styles.btnText}>▶ Play</Text>
//           </TouchableOpacity>
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   widgetContainer: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
//   widget: {
//     backgroundColor: "#fff",
//     width: "47%",
//     padding: 10,
//     borderRadius: 10,
//     elevation: 2,
//   },
//   widgetTitle: { fontWeight: "bold" },
//   playBtn: {
//     backgroundColor: "#007bff",
//     padding: 6,
//     borderRadius: 6,
//     marginTop: 5,
//     alignItems: "center",
//   },
//   btnText: { color: "#fff" },
// });
