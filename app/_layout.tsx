import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CartProvider } from "../src/context/CartContext";
// import { CartProvider } from "../src/context/cartcontext";

export default function RootLayout() {
  return (
    <CartProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="item-detail" />
        <Stack.Screen name="checkout" />
        <Stack.Screen name="order-tracking" />
      </Stack>
    </CartProvider>
  );
}
