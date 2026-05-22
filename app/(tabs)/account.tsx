import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Colors } from "../../src/constants/Colors";
import { orders } from "../../src/data/mockData";

type Tab = "All" | "Ongoing" | "Completed" | "Cancelled";

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "Delivered"
      ? Colors.green
      : status === "Cancelled"
        ? Colors.red
        : Colors.secondary;
  return (
    <View style={[styles.badge, { backgroundColor: color + "20" }]}>
      <Text style={[styles.badgeText, { color }]}>{status}</Text>
    </View>
  );
}

function OrderHistoryView() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const tabs: Tab[] = ["All", "Ongoing", "Completed", "Cancelled"];

  const filtered = orders.filter((o) => {
    if (activeTab === "All") return true;
    if (activeTab === "Completed") return o.status === "Delivered";
    if (activeTab === "Cancelled") return o.status === "Cancelled";
    return false;
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tabsRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabChip, activeTab === tab && styles.tabChipActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabChipText,
                activeTab === tab && styles.tabChipTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.orderCardTop}>
              <Text style={styles.orderId}>Order #{item.id}</Text>
              <Text style={styles.orderTotal}>Rs. {item.total}</Text>
            </View>
            <Text style={styles.orderDate}>{item.date}</Text>
            <Text style={styles.orderItems}>{item.items.join(", ")}</Text>
            <View style={styles.orderCardBottom}>
              <Text style={styles.orderTotalBottom}>Rs. {item.total}</Text>
              <StatusBadge status={item.status} />
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

export default function AccountScreen() {
  const router = useRouter();
  const [showOrders, setShowOrders] = useState(false);

  const menuItems = [
    { emoji: "📦", label: "My Orders", onPress: () => setShowOrders(true) },
    { emoji: "📍", label: "My Addresses", onPress: () => {} },
    { emoji: "💳", label: "Payment Methods", onPress: () => {} },
    { emoji: "❤️", label: "Favorites", onPress: () => {} },
    { emoji: "🔔", label: "Notifications", onPress: () => {} },
    { emoji: "💬", label: "Help & Support", onPress: () => {} },
    {
      emoji: "🚪",
      label: "Logout",
      onPress: () => router.replace("/"),
      isRed: true,
    },
  ];

  if (showOrders) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setShowOrders(false)}
            style={styles.backBtn}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>My Orders</Text>
          <View style={{ width: 40 }} />
        </View>
        <OrderHistoryView />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        <TouchableOpacity style={styles.settingsBtn}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Ali Hassan</Text>
            <Text style={styles.profilePhone}>+92 300 1234567</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuList}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuRow,
                index < menuItems.length - 1 && styles.menuRowBorder,
              ]}
              onPress={item.onPress}
            >
              <Text style={styles.menuEmoji}>{item.emoji}</Text>
              <Text
                style={[
                  styles.menuLabel,
                  item.isRed && { color: Colors.primary },
                ]}
              >
                {item.label}
              </Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
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
  title: { fontSize: 24, fontWeight: "800", color: Colors.black },
  settingsBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIcon: { fontSize: 20 },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.primary + "20",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarEmoji: { fontSize: 36 },
  profileInfo: {},
  profileName: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.black,
    marginBottom: 2,
  },
  profilePhone: { fontSize: 14, color: Colors.mediumGray },
  menuList: {
    marginHorizontal: 20,
    backgroundColor: Colors.white,
    borderRadius: 14,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    overflow: "hidden",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 14,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  menuEmoji: { fontSize: 22, width: 30, textAlign: "center" },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: "600", color: Colors.black },
  menuArrow: { fontSize: 22, color: Colors.mediumGray },
  // Order history styles
  tabsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
    flexWrap: "wrap",
  },
  tabChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: Colors.gray,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  tabChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabChipText: { fontSize: 13, fontWeight: "600", color: Colors.darkGray },
  tabChipTextActive: { color: Colors.white },
  orderCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  orderCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  orderId: { fontSize: 15, fontWeight: "700", color: Colors.black },
  orderTotal: { fontSize: 15, fontWeight: "700", color: Colors.black },
  orderDate: { fontSize: 12, color: Colors.mediumGray, marginBottom: 6 },
  orderItems: { fontSize: 13, color: Colors.darkGray, marginBottom: 12 },
  orderCardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderTotalBottom: { fontSize: 14, fontWeight: "700", color: Colors.black },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: { fontSize: 12, fontWeight: "700" },
});
