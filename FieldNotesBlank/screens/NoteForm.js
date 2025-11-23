import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Image, Alert, Text } from 'react-native';
import { NotesContext } from '../context/NotesContext';
import CameraPicker from '../components/CameraPicker';
import * as Location from 'expo-location';

export default function NoteForm({ route, navigation }) {
  const editing = route.params && route.params.note;
  const { addNote, updateNote } = useContext(NotesContext);
  const [title, setTitle] = useState(editing ? route.params.note.title : '');
  const [description, setDescription] = useState(editing ? route.params.note.description : '');
  const [photo, setPhoto] = useState(editing ? route.params.note.photo : null);
  const [location, setLocation] = useState(editing ? route.params.note.location : null);

  const pickLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return Alert.alert('Brak uprawnień do lokalizacji');
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    } catch (e) {
      Alert.alert('Błąd lokalizacji', e.message);
    }
  };

  const onSave = async () => {
    if (!title.trim()) return Alert.alert('Tytuł wymagany');
    const note = { title, description, photo, location };
    if (editing) {
      updateNote(route.params.note.id, note);
    } else {
      await addNote(note);
    }
    navigation.goBack();
  };

  return (
    <View style={{ padding: 12 }}>
      <Text style={{ marginBottom: 4 }}>Tytuł</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Tytuł"
        style={{ borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 6, marginBottom: 12 }}
      />
      <Text style={{ marginBottom: 4 }}>Opis</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Opis"
        multiline
        style={{ borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 6, height: 100 }}
      />

      <View style={{ marginTop: 12 }}>
        <CameraPicker onPick={(uri) => setPhoto(uri)} />
        {photo ? <Image source={{ uri: photo }} style={{ width: '100%', height: 200, borderRadius: 8 }} /> : null}
      </View>

      <View style={{ marginTop: 12 }}>
        <Button title="Pobierz lokalizację" onPress={pickLocation} />
        {location ? <Text style={{ marginTop: 8 }}>Lokalizacja pobrana</Text> : null}
      </View>

      <View style={{ marginTop: 16 }}>
        <Button title="Zapisz" onPress={onSave} />
      </View>
    </View>
  );
}
