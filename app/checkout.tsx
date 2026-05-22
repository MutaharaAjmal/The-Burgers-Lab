import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Colors } from "../src/constants/Colors";
import { useCart } from "../src/context/CartContext";

export default function CheckoutScreen() {
  const router = useRouter();
  const { totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<
    "cash" | "jazzcash" | "card"
  >("cash");
  const deliveryFee = 100;

  const handlePlaceOrder = () => {
    clearCart();
    router.replace("/order-tracking");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Delivery Address */}
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <View style={styles.addressCard}>
          <View style={styles.addressInfo}>
            <Text style={styles.addressLabel}>Home</Text>
            <Text style={styles.addressText}>
              Block 15, Gulshan-e-Iqbal, Karachi
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <Text style={styles.sectionTitle}>Payment Method</Text>

        {[
          { id: "cash", label: "Cash on Delivery", emoji: "💵" },
          { id: "jazzcash", label: "JazzCash", emoji: "📱" },
          { id: "card", label: "Credit / Debit Card", emoji: "💳" },
        ].map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentOption,
              paymentMethod === method.id && styles.paymentOptionActive,
            ]}
            onPress={() => setPaymentMethod(method.id as any)}
          >
            <View
              style={[
                styles.radioOuter,
                paymentMethod === method.id && styles.radioOuterActive,
              ]}
            >
              {paymentMethod === method.id && (
                <View style={styles.radioInner} />
              )}
            </View>
            <Text style={styles.paymentEmoji}>{method.emoji}</Text>
            <Text style={styles.paymentLabel}>{method.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Order Summary */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>Rs. {totalPrice}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>Rs. {deliveryFee}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              Rs. {totalPrice + deliveryFee}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Place Order */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.placeOrderBtn}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
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
  content: { padding: 20, paddingBottom: 40 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.black,
    marginBottom: 12,
    marginTop: 8,
  },
  addressCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  addressInfo: { flex: 1 },
  addressLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.black,
    marginBottom: 2,
  },
  addressText: { fontSize: 13, color: Colors.mediumGray },
  changeText: { fontSize: 14, color: Colors.primary, fontWeight: "600" },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  paymentOptionActive: {
    borderColor: Colors.primary,
    backgroundColor: "#FFF5F7",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioOuterActive: { borderColor: Colors.primary },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  paymentEmoji: { fontSize: 20, marginRight: 10 },
  paymentLabel: { fontSize: 14, fontWeight: "600", color: Colors.black },
  summary: {
    marginTop: 16,
    backgroundColor: Colors.gray,
    borderRadius: 14,
    padding: 18,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: { fontSize: 14, color: Colors.mediumGray },
  summaryValue: { fontSize: 14, fontWeight: "600", color: Colors.black },
  divider: { height: 1, backgroundColor: Colors.lightGray, marginVertical: 10 },
  totalLabel: { fontSize: 16, fontWeight: "800", color: Colors.black },
  totalValue: { fontSize: 18, fontWeight: "900", color: Colors.black },
  bottomBar: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    backgroundColor: Colors.white,
    paddingBottom: 28,
  },
  placeOrderBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  placeOrderText: { fontSize: 16, fontWeight: "700", color: Colors.white },
});
