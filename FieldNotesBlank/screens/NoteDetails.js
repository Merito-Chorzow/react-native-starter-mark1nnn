import React, { useContext } from 'react';
import { View, Text, Image, Button, Alert } from 'react-native';
import { NotesContext } from '../context/NotesContext';

export default function NoteDetails({ route, navigation }) {
  const { id } = route.params;
  const { notes } = useContext(NotesContext);
  const note = notes.find(n => n.id === id);
  if (!note) return <View><Text>Notatka nie znaleziona</Text></View>;

  const onShare = () => {
    Alert.alert('Akcja', 'Tu można zaimplementować udostępnianie');
  };

  return (
    <View style={{ padding: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>{note.title}</Text>
      <Text style={{ color: '#666', marginBottom: 8 }}>{new Date(note.date).toLocaleString()}</Text>
      {note.photo ? <Image source={{ uri: note.photo }} style={{ width: '100%', height: 240, borderRadius: 8 }} /> : <Text style={{ marginVertical: 12 }}>Brak zdjęcia</Text>}
      {note.location ? <Text style={{ marginTop: 8 }}>Lokalizacja: {note.location.coords.latitude.toFixed(5)}, {note.location.coords.longitude.toFixed(5)}</Text> : null}
      <Text style={{ marginTop: 12 }}>{note.description}</Text>
      <View style={{ marginTop: 16 }}>
        <Button title="Edytuj" onPress={() => navigation.navigate('NoteForm', { note })} />
        <View style={{ height: 8 }} />
        <Button title="Udostępnij" onPress={onShare} />
      </View>
    </View>
  );
}
