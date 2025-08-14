import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="jogo" options={{ headerShown: false }} />
      <Stack.Screen name="regras" options={{ headerShown: false }} />
      <Stack.Screen name="vitoria" options={{ headerShown: false }} />
    </Stack>
  );
}
