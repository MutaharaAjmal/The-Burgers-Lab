import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Colors } from "../../src/constants/Colors";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🍔</Text>
            <Text style={styles.logoTextTop}>THE</Text>
            <Text style={styles.logoTextMain}>BURGERS</Text>
            <Text style={styles.logoTextLab}>LAB</Text>
          </View>
        </View>

        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email or Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email or phone"
            placeholderTextColor={Colors.mediumGray}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter password"
              placeholderTextColor={Colors.mediumGray}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.eyeIcon}>{showPassword ? "🙈" : "👁️"}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => router.replace("/(tabs)")}
          activeOpacity={0.85}
        >
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or</Text>

        {/* Google Login */}
        <TouchableOpacity style={styles.googleBtn} activeOpacity={0.85}>
          <Text style={styles.googleIcon}>G</Text>
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Sign Up */}
        <View style={styles.signUpRow}>
          <Text style={styles.signUpLabel}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: Colors.lightGray,
  },
  logoEmoji: { fontSize: 28 },
  logoTextTop: {
    fontSize: 8,
    fontWeight: "700",
    color: Colors.primary,
    letterSpacing: 2,
  },
  logoTextMain: { fontSize: 13, fontWeight: "900", color: Colors.primary },
  logoTextLab: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.secondary,
    letterSpacing: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.black,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.mediumGray,
    marginBottom: 32,
  },
  inputGroup: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.darkGray,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.gray,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray,
    borderRadius: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 14,
    color: Colors.black,
  },
  eyeIcon: { fontSize: 18 },
  forgotBtn: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  forgotText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: "600",
  },
  loginBtn: {
    backgroundColor: Colors.primary,
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  loginBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.white,
  },
  orText: {
    fontSize: 14,
    color: Colors.mediumGray,
    marginVertical: 16,
  },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.lightGray,
    justifyContent: "center",
    gap: 10,
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: "900",
    color: "#4285F4",
  },
  googleText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.black,
  },
  signUpRow: {
    flexDirection: "row",
    marginTop: 24,
  },
  signUpLabel: {
    fontSize: 14,
    color: Colors.mediumGray,
  },
  signUpLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "700",
  },
});
