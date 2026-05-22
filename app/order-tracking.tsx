import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../src/constants/Colors";

const steps = [
  { id: 1, label: "Order Placed", time: "4:30 PM", done: true },
  { id: 2, label: "Confirmed", time: "4:32 PM", done: true },
  { id: 3, label: "Preparing", time: "4:40 PM", done: false },
  { id: 4, label: "Out for Delivery", time: "4:55 PM", done: false },
  { id: 5, label: "Delivered", time: "—", done: false },
];

export default function OrderTrackingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)")}
          style={styles.backBtn}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Track Your Order</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Order ID */}
        <View style={styles.orderCard}>
          <Text style={styles.orderId}>Order #TBL12345</Text>
          <Text style={styles.orderDate}>
            Placed on May 22, 2024 at 4:30 PM
          </Text>
        </View>

        {/* Timeline */}
        <View style={styles.timeline}>
          {steps.map((step, index) => (
            <View key={step.id} style={styles.stepContainer}>
              <View style={styles.stepLeft}>
                <View
                  style={[
                    styles.stepCircle,
                    step.done && styles.stepCircleDone,
                  ]}
                >
                  {step.done ? (
                    <Text style={styles.stepCheck}>✓</Text>
                  ) : (
                    <View style={styles.stepDot} />
                  )}
                </View>
                {index < steps.length - 1 && (
                  <View
                    style={[styles.stepLine, step.done && styles.stepLineDone]}
                  />
                )}
              </View>
              <View style={styles.stepContent}>
                <Text
                  style={[styles.stepLabel, step.done && styles.stepLabelDone]}
                >
                  {step.label}
                </Text>
                <Text style={styles.stepTime}>{step.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Help */}
        <TouchableOpacity style={styles.helpCard}>
          <Text style={styles.helpEmoji}>💬</Text>
          <View>
            <Text style={styles.helpTitle}>Need help?</Text>
            <Text style={styles.helpSubtitle}>Contact our support</Text>
          </View>
          <Text style={styles.helpArrow}>›</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: { fontSize: 20, fontWeight: "700", color: Colors.black },
  title: { fontSize: 20, fontWeight: "800", color: Colors.black },
  content: { padding: 20 },
  orderCard: {
    backgroundColor: Colors.gray,
    borderRadius: 14,
    padding: 18,
    marginBottom: 28,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.black,
    marginBottom: 4,
  },
  orderDate: { fontSize: 13, color: Colors.mediumGray },
  timeline: { marginBottom: 28 },
  stepContainer: { flexDirection: "row", marginBottom: 0 },
  stepLeft: { alignItems: "center", marginRight: 16 },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  stepCircleDone: {
    backgroundColor: Colors.green,
    borderColor: Colors.green,
  },
  stepCheck: { fontSize: 16, color: Colors.white, fontWeight: "700" },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.lightGray,
  },
  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.lightGray,
    minHeight: 48,
    marginTop: 4,
  },
  stepLineDone: { backgroundColor: Colors.green },
  stepContent: { flex: 1, paddingBottom: 32, paddingTop: 6 },
  stepLabel: { fontSize: 15, fontWeight: "600", color: Colors.mediumGray },
  stepLabelDone: { color: Colors.black, fontWeight: "700" },
  stepTime: { fontSize: 13, color: Colors.mediumGray, marginTop: 2 },
  helpCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray,
    borderRadius: 14,
    padding: 18,
    gap: 14,
  },
  helpEmoji: { fontSize: 28 },
  helpTitle: { fontSize: 15, fontWeight: "700", color: Colors.black },
  helpSubtitle: { fontSize: 13, color: Colors.mediumGray },
  helpArrow: { marginLeft: "auto", fontSize: 24, color: Colors.mediumGray },
});
