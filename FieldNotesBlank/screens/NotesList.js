import React, { useContext } from 'react';
import { View, FlatList, ActivityIndicator, Button } from 'react-native';
import { NotesContext } from '../context/NotesContext';
import NoteCard from '../components/NoteCard';

export default function NotesList({ navigation }) {
  const { notes, loading, fetchNotes } = useContext(NotesContext);

  return (
    <View style={{ flex: 1 }}>
      {loading ? <ActivityIndicator style={{ marginTop: 20 }} /> : (
        <FlatList
          data={notes}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <NoteCard note={item} onPress={() => navigation.navigate('NoteDetails', { id: item.id })} />
          )}
        />
      )}
      <View style={{ padding: 12 }}>
        <Button title="Dodaj notatkę" onPress={() => navigation.navigate('NoteForm')} />
        <View style={{ height: 8 }} />
        <Button title="Ustawienia" onPress={() => navigation.navigate('Settings')} />
        <View style={{ height: 8 }} />
        <Button title="Odśwież (API)" onPress={fetchNotes} />
      </View>
    </View>
  );
}
