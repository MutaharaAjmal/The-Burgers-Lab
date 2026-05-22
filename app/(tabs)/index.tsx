import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../../src/constants/Colors";
import { menuItems } from "../../src/data/mockData";
import { useCart } from "../../src/context/CartContext";

const categories = [
  { id: "1", name: "Burgers", emoji: "🍔" },
  { id: "2", name: "Pizza", emoji: "🍕" },
  { id: "3", name: "Fries", emoji: "🍟" },
  { id: "4", name: "Deals", emoji: "🏷️" },
];

export default function HomeScreen() {
  const router = useRouter();
  const { addItem } = useCart();
  const popularItems = menuItems.filter((i) => i.popular);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.deliverTo}>DELIVER TO</Text>
          <View style={styles.locationRow}>
            <Text style={styles.locationPin}>📍</Text>
            <Text style={styles.locationText}>Home - Block 15, Gulshan</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.bellBtn}>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerSmall}>WHAT'S YOUR</Text>
          <Text style={styles.bannerBig}>MOOD TODAY</Text>
          <TouchableOpacity style={styles.orderNowBtn}>
            <Text style={styles.orderNowText}>Order Now</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bannerEmoji}>🍔</Text>
      </View>

      {/* Popular Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Categories</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/menu")}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoriesRow}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryCard}
              onPress={() => router.push("/(tabs)/menu")}
            >
              <View style={styles.categoryCircle}>
                <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
              </View>
              <Text style={styles.categoryName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Popular Items */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Items</Text>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={popularItems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 8 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.popularCard}
              onPress={() =>
                router.push({
                  pathname: "/item-detail",
                  params: { id: item.id },
                })
              }
            >
              <Image source={{ uri: item.image }} style={styles.popularImage} />
              <Text style={styles.popularName}>{item.name}</Text>
              <View style={styles.popularFooter}>
                <Text style={styles.popularPrice}>Rs. {item.price}</Text>
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() =>
                    addItem({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                    })
                  }
                >
                  <Text style={styles.addBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: Colors.white,
  },
  headerLeft: {},
  deliverTo: {
    fontSize: 10,
    color: Colors.mediumGray,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 4,
  },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  locationPin: { fontSize: 14 },
  locationText: { fontSize: 14, fontWeight: "700", color: Colors.black },
  bellBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  bellIcon: { fontSize: 20 },
  banner: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    minHeight: 140,
  },
  bannerContent: { flex: 1 },
  bannerSmall: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "600",
    letterSpacing: 1,
  },
  bannerBig: {
    fontSize: 24,
    fontWeight: "900",
    color: Colors.white,
    lineHeight: 30,
    marginBottom: 16,
  },
  orderNowBtn: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  orderNowText: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.white,
  },
  bannerEmoji: {
    fontSize: 80,
    marginLeft: 8,
  },
  section: { marginBottom: 8 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.black,
  },
  viewAll: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: "600",
  },
  categoriesRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    alignItems: "center",
  },
  categoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  categoryEmoji: { fontSize: 28 },
  categoryName: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.black,
  },
  popularCard: {
    width: 160,
    backgroundColor: Colors.white,
    borderRadius: 14,
    marginRight: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  popularImage: {
    width: "100%",
    height: 110,
    backgroundColor: Colors.lightGray,
  },
  popularName: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.black,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 4,
  },
  popularFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  popularPrice: {
    fontSize: 14,
    fontWeight: "800",
    color: Colors.black,
  },
  addBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  addBtnText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "300",
    lineHeight: 26,
  },
});
