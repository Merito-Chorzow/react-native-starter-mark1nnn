# FieldNotes — React Native (Expo) — Demo

## Cel
Aplikacja demonstracyjna: lista notatek z możliwością dodawania zdjęć lub pobrania lokalizacji oraz prostą synchronizacją metadanych z mock API.

## Co zaimplementowano (podsumowanie)
- Widoki:
  - Lista notatek (`NotesList`) — tytuł, data, miniaturka (jeśli dostępna).
  - Szczegóły notatki (`NoteDetails`) — opis, zdjęcie, pozycja, akcje (Edytuj/Udostępnij).
  - Dodaj / Edytuj (`NoteForm`) — formularz: tytuł, opis, dodaj zdjęcie (aparat/galeria) lub pobierz lokalizację.
  - Ustawienia (`Settings`) — krótkie info o wersji i dostępności.
- Natywne funkcje:
  - **Aparat / galeria** — `expo-image-picker` (zwraca `result.assets[0].uri`).
  - **Lokalizacja GPS** — `expo-location`.
- API:
  - Pobieranie przykładowych notatek (GET): `https://jsonplaceholder.typicode.com/posts?_limit=10`
  - Symulowany zapis notatki (POST): `https://jsonplaceholder.typicode.com/posts`
- Stan: prosty Context API (`NotesContext`) trzyma listę notatek w pamięci (bez trwałego storage).
- UI: czytelne przyciski, etykiety; cele dotyku w przybliżeniu 44–48 px.

## Wymagane zależności (zainstaluj w katalogu projektu)
Uruchom w terminalu (w katalogu projektu):

```bash
# core / expo
npx expo install expo
# nawigacja
npx expo install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-navigation/native-stack
# natywne funkcje
npx expo install expo-image-picker
npx expo install expo-location
