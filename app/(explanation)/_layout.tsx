import { Stack } from 'expo-router';

export default function ExplanationLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: '#fff' }
    }}>
      <Stack.Screen name="explanation" />
    </Stack>
  );
}