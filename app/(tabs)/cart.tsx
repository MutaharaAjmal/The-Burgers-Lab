import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../../src/constants/Colors";
import { useCart } from "../../src/context/CartContext";

export default function CartScreen() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const deliveryFee = 100;

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🛒</Text>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>
          Add items from the menu to get started
        </Text>
        <TouchableOpacity
          style={styles.browseBtn}
          onPress={() => router.push("/(tabs)/menu")}
        >
          <Text style={styles.browseBtnText}>Browse Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Cart</Text>
        <TouchableOpacity>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>Rs. {item.price}</Text>
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Text style={styles.qtyBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyNum}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.itemTotal}>
                Rs. {item.price * item.quantity}
              </Text>
              <TouchableOpacity
                onPress={() => removeItem(item.id)}
                style={styles.deleteBtn}
              >
                <Text style={styles.deleteIcon}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => (
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
        )}
      />

      {/* Checkout Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => router.push("/checkout")}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    padding: 32,
  },
  emptyEmoji: { fontSize: 64, marginBottom: 16 },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.black,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.mediumGray,
    textAlign: "center",
    marginBottom: 28,
  },
  browseBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
  },
  browseBtnText: { fontSize: 15, fontWeight: "700", color: Colors.white },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
  },
  title: { fontSize: 24, fontWeight: "800", color: Colors.black },
  editText: { fontSize: 15, color: Colors.primary, fontWeight: "600" },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  itemImage: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
  },
  itemInfo: { flex: 1, paddingHorizontal: 12 },
  itemName: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.black,
    marginBottom: 4,
  },
  itemPrice: { fontSize: 13, color: Colors.mediumGray, marginBottom: 8 },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: { fontSize: 18, color: Colors.black, lineHeight: 24 },
  qtyNum: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.black,
    minWidth: 16,
    textAlign: "center",
  },
  itemRight: { alignItems: "flex-end", gap: 8 },
  itemTotal: { fontSize: 15, fontWeight: "800", color: Colors.black },
  deleteBtn: { padding: 4 },
  deleteIcon: { fontSize: 18 },
  separator: { height: 1, backgroundColor: Colors.lightGray },
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
  checkoutBtn: {
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
  checkoutText: { fontSize: 16, fontWeight: "700", color: Colors.white },
});
