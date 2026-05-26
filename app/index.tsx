import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../src/constants/Colors";

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Logo Area */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>🍔</Text>
          <Text style={styles.logoTextTop}>THE</Text>
          <Text style={styles.logoTextMain}>BURGERS</Text>
          <Text style={styles.logoTextLab}>LAB</Text>
        </View>
      </View>

      {/* Bottom Content */}
      <View style={styles.bottomContent}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.brandName}>THE BURGERS LUB</Text>
        <Text style={styles.tagline}>Burgers. Pizza. Happiness.</Text>

        <TouchableOpacity
          style={styles.getStartedBtn}
          onPress={() => router.push("/(auth)/login")}
          activeOpacity={0.85}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => router.push("/(auth)/login")}
          activeOpacity={0.85}
        >
          <Text style={styles.loginText}>Login / Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 60,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  logoEmoji: {
    fontSize: 40,
    marginBottom: 4,
  },
  logoTextTop: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.primary,
    letterSpacing: 3,
  },
  logoTextMain: {
    fontSize: 18,
    fontWeight: "900",
    color: Colors.primary,
    letterSpacing: 1,
  },
  logoTextLab: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.secondary,
    letterSpacing: 4,
  },
  bottomContent: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 32,
  },
  welcomeText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 4,
  },
  brandName: {
    fontSize: 26,
    fontWeight: "900",
    color: Colors.secondary,
    letterSpacing: 1,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 40,
  },
  getStartedBtn: {
    backgroundColor: Colors.secondary,
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 14,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.white,
    letterSpacing: 0.5,
  },
  loginBtn: {
    backgroundColor: "transparent",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.white,
  },
  loginText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
  },
});
