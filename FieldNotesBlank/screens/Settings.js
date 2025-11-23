import React from 'react';
import { View, Text } from 'react-native';

export default function Settings() {
  return (
    <View style={{ padding: 12 }}>
      <Text style={{ fontWeight: '700', fontSize: 16 }}>O aplikacji</Text>
      <Text style={{ marginTop: 8 }}>FieldNotes — demo React Native (Expo). Wersja: 1.0.0</Text>
      <Text style={{ marginTop: 12 }}>Dostępność: przyciski i etykiety ustawione; cele dotykowe ~44–48px.</Text>
    </View>
  );
}
