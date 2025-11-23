import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';

export default function NoteCard({ note, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityLabel={`Notatka ${note.title}`}
      style={{ padding: 12, borderBottomWidth: 1, borderColor: '#eee', flexDirection: 'row', alignItems: 'center' }}
    >
      <View style={{ width: 64, height: 64, borderRadius: 8, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        {note.photo ? <Image source={{ uri: note.photo }} style={{ width: '100%', height: '100%' }} /> : <Text>📷</Text>}
      </View>
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text numberOfLines={1} style={{ fontWeight: '600' }}>{note.title}</Text>
        <Text numberOfLines={1} style={{ color: '#666', marginTop: 4 }}>{new Date(note.date).toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
}
