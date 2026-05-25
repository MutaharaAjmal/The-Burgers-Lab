import { Tabs } from "expo-router";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../src/constants/Colors";
import { useCart } from "../../src/context/CartContext";

function TabIcon({
  icon,
  label,
  focused,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  focused: boolean;
}) {
  return (
    <View style={styles.tabIcon}>
      <Ionicons
        name={(focused ? icon : `${icon}-outline`) as any}
        size={24}
        color={focused ? Colors.primary : Colors.mediumGray}
      />

      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
        {label}
      </Text>
    </View>
  );
}

function CartTabIcon({ focused }: { focused: boolean }) {
  const { totalItems } = useCart();

  return (
    <View style={styles.tabIcon}>
      <View>
        <Ionicons
          name={focused ? "cart" : "cart-outline"}
          size={24}
          color={focused ? Colors.primary : Colors.mediumGray}
        />

        {totalItems > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalItems}</Text>
          </View>
        )}
      </View>

      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
        Cart
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: styles.tabBar,

        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="home" label="Home" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="restaurant" label="Menu" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="deals"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="pricetags" label="Deals" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => <CartTabIcon focused={focused} />,
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="person" label="Account" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",

    left: 16,
    right: 16,
    bottom: 40, // 👈 isy change kia

    height: Platform.OS === "ios" ? 78 : 68,

    borderRadius: 22,

    backgroundColor: Colors.white,

    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 20 : 10,

    borderTopWidth: 0,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 10,
  },

  tabIcon: {
    alignItems: "center",
    justifyContent: "center",
    top: 4,
  },

  tabLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: Colors.mediumGray,
    marginTop: 4,
  },

  tabLabelActive: {
    color: Colors.primary,
    fontWeight: "700",
  },

  badge: {
    position: "absolute",
    top: -5,
    right: -10,

    backgroundColor: Colors.primary,

    minWidth: 18,
    height: 18,
    borderRadius: 9,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 4,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.white,
  },
});
