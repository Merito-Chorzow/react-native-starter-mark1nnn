import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotesList from './screens/NotesList';
import NoteDetails from './screens/NoteDetails';
import NoteForm from './screens/NoteForm';
import Settings from './screens/Settings';
import { NotesProvider } from './context/NotesContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NotesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="NotesList">
          <Stack.Screen name="NotesList" component={NotesList} options={{ title: 'Notatki' }} />
          <Stack.Screen name="NoteDetails" component={NoteDetails} options={{ title: 'Szczegóły' }} />
          <Stack.Screen name="NoteForm" component={NoteForm} options={{ title: 'Dodaj / Edytuj' }} />
          <Stack.Screen name="Settings" component={Settings} options={{ title: 'Ustawienia' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NotesProvider>
  );
}
