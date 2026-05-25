import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Colors } from "../src/constants/Colors";
import { menuItems } from "../src/data/mockData";
import { useCart } from "../src/context/CartContext";

export default function ItemDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addItem } = useCart();

  const item = menuItems.find((i) => i.id === id) || menuItems[0];
  const [spice, setSpice] = useState<"Mild" | "Medium" | "Spicy">("Medium");
  const [extraCheese, setExtraCheese] = useState(false);
  const [extraPatty, setExtraPatty] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const extras = (extraCheese ? 100 : 0) + (extraPatty ? 200 : 0);
  const total = (item.price + extras) * quantity;

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price + extras,
      image: item.image,
    });
    router.push("/cart");
  };

  return (
    <View style={styles.container}>
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.heartBtn}>
          <Text style={styles.heartIcon}>🤍</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.details} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Rs. {item.price}</Text>
        <Text style={styles.itemDesc}>{item.description}</Text>

        <View style={styles.divider} />

        {/* Customizations */}
        <Text style={styles.sectionTitle}>Customizations</Text>

        {/* Spice Level */}
        <Text style={styles.subLabel}>Spice Level</Text>
        <View style={styles.spiceRow}>
          {(["Mild", "Medium", "Spicy"] as const).map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.spiceChip,
                spice === level && styles.spiceChipActive,
              ]}
              onPress={() => setSpice(level)}
            >
              <Text
                style={[
                  styles.spiceText,
                  spice === level && styles.spiceTextActive,
                ]}
              >
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add Extras */}
        <Text style={styles.subLabel}>Add Extras</Text>
        <TouchableOpacity
          style={styles.extraRow}
          onPress={() => setExtraCheese(!extraCheese)}
        >
          <View style={[styles.checkbox, extraCheese && styles.checkboxActive]}>
            {extraCheese && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.extraName}>Extra Cheese</Text>
          <Text style={styles.extraPrice}>Rs. 100</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.extraRow}
          onPress={() => setExtraPatty(!extraPatty)}
        >
          <View style={[styles.checkbox, extraPatty && styles.checkboxActive]}>
            {extraPatty && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.extraName}>Extra Patty</Text>
          <Text style={styles.extraPrice}>Rs. 200</Text>
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => quantity > 1 && setQuantity(quantity - 1)}
          >
            <Text style={styles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyNum}>{quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addCartBtn} onPress={handleAddToCart}>
          <Text style={styles.addCartText}>Add to Cart — Rs. {total}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  imageContainer: { position: "relative", height: 280 },
  image: { width: "100%", height: 280, backgroundColor: Colors.lightGray },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  backIcon: { fontSize: 20, fontWeight: "700", color: Colors.black },
  heartBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  heartIcon: { fontSize: 20 },
  details: { flex: 1, padding: 20 },
  itemName: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.black,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 22,
    fontWeight: "900",
    color: Colors.primary,
    marginBottom: 8,
  },
  itemDesc: { fontSize: 14, color: Colors.mediumGray, lineHeight: 22 },
  divider: { height: 1, backgroundColor: Colors.lightGray, marginVertical: 20 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: Colors.black,
    marginBottom: 16,
  },
  subLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.darkGray,
    marginBottom: 10,
  },
  spiceRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  spiceChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.lightGray,
  },
  spiceChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  spiceText: { fontSize: 13, fontWeight: "600", color: Colors.darkGray },
  spiceTextActive: { color: Colors.white },
  extraRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: { fontSize: 13, color: Colors.white, fontWeight: "700" },
  extraName: { flex: 1, fontSize: 14, color: Colors.black, fontWeight: "500" },
  extraPrice: { fontSize: 14, fontWeight: "700", color: Colors.black },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    backgroundColor: Colors.white,
    gap: 16,
    paddingBottom: 48,
  },
  quantityRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: Colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: {
    fontSize: 22,
    color: Colors.black,
    fontWeight: "300",
    lineHeight: 30,
  },
  qtyNum: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.black,
    minWidth: 20,
    textAlign: "center",
  },
  addCartBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addCartText: { fontSize: 15, fontWeight: "700", color: Colors.white },
});
