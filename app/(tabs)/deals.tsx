import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Colors } from "../../src/constants/Colors";
import { deals } from "../../src/data/mockData";

export default function DealsScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Deals & Offers</Text>
      </View>

      <FlatList
        data={deals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.dealCard, { backgroundColor: item.bgColor }]}>
            {/* Left Content */}
            <View style={styles.dealContent}>
              <View style={styles.dealBadge}>
                <Text style={styles.dealBadgeText}>🔥 HOT DEAL</Text>
              </View>
              <Text style={styles.dealTitle}>{item.title}</Text>
              <Text style={styles.dealSubtitle}>{item.subtitle}</Text>
              {item.dealPrice && (
                <View style={styles.priceRow}>
                  {item.originalPrice && (
                    <Text style={styles.originalPrice}>
                      Rs. {item.originalPrice}
                    </Text>
                  )}
                  <Text style={styles.dealPrice}>Rs. {item.dealPrice}</Text>
                </View>
              )}
              <TouchableOpacity style={styles.orderBtn}>
                <Text style={styles.orderBtnText}>Order Now</Text>
              </TouchableOpacity>
            </View>

            {/* Right Image */}
            <Image source={{ uri: item.image }} style={styles.dealImage} />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 20,
  },
  title: { fontSize: 24, fontWeight: "800", color: Colors.black },
  dealCard: {
    borderRadius: 18,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    minHeight: 160,
  },
  dealContent: { flex: 1 },
  dealBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  dealBadgeText: { fontSize: 11, color: Colors.white, fontWeight: "700" },
  dealTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: Colors.white,
    lineHeight: 26,
    marginBottom: 4,
  },
  dealSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  originalPrice: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    textDecorationLine: "line-through",
  },
  dealPrice: {
    fontSize: 22,
    fontWeight: "900",
    color: Colors.secondary,
  },
  orderBtn: {
    backgroundColor: Colors.secondary,
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 8,
  },
  orderBtnText: { fontSize: 13, fontWeight: "700", color: Colors.white },
  dealImage: {
    width: 110,
    height: 110,
    borderRadius: 12,
    marginLeft: 12,
  },
});
