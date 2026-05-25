import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { Colors } from "../../src/constants/Colors";
import { deals } from "../../src/data/mockData";

export default function DealsScreen() {
  const router = useRouter();

  const handleOrder = (item: any) => {
    router.push({
      pathname: "/item-detail",
      params: { id: item.id },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Deals & Offers 🔥</Text>
        </View>

        {/* LIST */}
        <FlatList
          data={deals}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => (
            <View style={[styles.dealCard, { backgroundColor: item.bgColor }]}>
              {/* LEFT */}
              <View style={styles.dealContent}>
                <View style={styles.dealBadge}>
                  <Text style={styles.dealBadgeText}>🔥 HOT DEAL</Text>
                </View>

                <Text style={styles.dealTitle}>{item.title}</Text>

                <Text style={styles.dealSubtitle}>{item.subtitle}</Text>

                <View style={styles.priceRow}>
                  {item.originalPrice && (
                    <Text style={styles.originalPrice}>
                      Rs. {item.originalPrice}
                    </Text>
                  )}

                  <Text style={styles.dealPrice}>Rs. {item.dealPrice}</Text>
                </View>

                {/* BUTTON FIXED */}
                <TouchableOpacity
                  style={styles.orderBtn}
                  activeOpacity={0.8}
                  onPress={() => handleOrder(item)}
                >
                  <Text style={styles.orderBtnText}>Order Now</Text>
                </TouchableOpacity>
              </View>

              {/* RIGHT IMAGE */}
              <Image source={{ uri: item.image }} style={styles.dealImage} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "900",
    color: Colors.black,
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  dealCard: {
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",

    padding: 18,
    minHeight: 160,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  dealContent: {
    flex: 1,
  },

  dealBadge: {
    backgroundColor: "rgba(255,255,255,0.25)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },

  dealBadgeText: {
    fontSize: 11,
    color: Colors.white,
    fontWeight: "700",
  },

  dealTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: Colors.white,
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
    gap: 10,
    marginBottom: 12,
  },

  originalPrice: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    textDecorationLine: "line-through",
  },

  dealPrice: {
    fontSize: 20,
    fontWeight: "900",
    color: Colors.secondary,
  },

  orderBtn: {
    backgroundColor: Colors.white,
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },

  orderBtnText: {
    fontSize: 13,
    fontWeight: "800",
    color: Colors.primary,
  },

  dealImage: {
    width: 110,
    height: 110,
    borderRadius: 14,
    marginLeft: 12,
  },
});
