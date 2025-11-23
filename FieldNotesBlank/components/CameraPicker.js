import React, { useState, useEffect } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CameraPicker({ onPick }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (hasCameraPermission === false) return Alert.alert('Brak uprawnień do kamery');
    try {
      const result = await ImagePicker.launchCameraAsync({ quality: 0.6, base64: false });
      if (!result.cancelled) onPick(result.uri);
    } catch (e) {
      Alert.alert('Błąd aparatu', e.message);
    }
  };

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return Alert.alert('Brak uprawnień do galerii');
    try {
      const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.6 });
      if (!result.cancelled) onPick(result.uri);
    } catch (e) {
      Alert.alert('Błąd galerii', e.message);
    }
  };

  return (
    <View style={{ marginVertical: 8 }}>
      <Button title="Zrób zdjęcie" onPress={takePhoto} />
      <View style={{ height: 8 }} />
      <Button title="Wybierz z galerii" onPress={pickFromGallery} />
    </View>
  );
}
