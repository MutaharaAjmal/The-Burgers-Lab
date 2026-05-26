import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { Colors } from "../../src/constants/Colors";
import { menuItems } from "../../src/data/mockData";
import { useCart } from "../../src/context/CartContext";

const categories = [
  {
    id: "1",
    name: "Burgers",
    icon: "fast-food-outline",
  },
  {
    id: "2",
    name: "Pizza",
    icon: "pizza-outline",
  },
  {
    id: "3",
    name: "Fries",
    icon: "restaurant-outline",
  },
  {
    id: "4",
    name: "Deals",
    icon: "pricetag-outline",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { addItem } = useCart();

  const popularItems = menuItems.filter((i) => i.popular);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hey Abdullah 👋</Text>

            <View style={styles.locationWrapper}>
              <Ionicons name="location" size={15} color={Colors.primary} />

              <Text numberOfLines={1} style={styles.locationText}>
                Deliver to Gulshan Block 15
              </Text>

              <Ionicons
                name="chevron-down"
                size={16}
                color={Colors.mediumGray}
              />
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="search-outline" size={22} color={Colors.black} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color={Colors.black}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* BANNER */}
        {/* BANNER */}
        <View style={styles.bannerContainer}>
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
            }}
            style={styles.banner}
            imageStyle={{ borderRadius: 16 }}
          >
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerTitle}>
                WHAT'S YOUR{"\n"}MOOD TODAY
              </Text>
              <TouchableOpacity style={styles.orderNowBtn}>
                <Text style={styles.orderNowText}>Order Now</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        {/* <LinearGradient
          colors={["#FF7A00", "#FF5500"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.bannerSmall}>WHAT'S YOUR</Text>

            <Text style={styles.bannerBig}>MOOD {"\n"}TODAY</Text>

            <TouchableOpacity style={styles.orderNowBtn}>
              <Text style={styles.orderNowText}>Order Now</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bannerRight}>
            <Text style={styles.bannerEmoji}>🍔</Text>
          </View>
        </LinearGradient> */}

        {/* CATEGORIES */}

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
                  <Ionicons
                    name={cat.icon as any}
                    size={28}
                    color={Colors.primary}
                  />
                </View>

                <Text style={styles.categoryName}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* POPULAR ITEMS */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Items</Text>
          </View>

          <FlatList
            horizontal
            data={popularItems}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.popularList}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.popularCard}
                onPress={() =>
                  router.push({
                    pathname: "/item-detail",
                    params: {
                      id: item.id,
                    },
                  })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.popularImage}
                  resizeMode="cover"
                />

                <View style={styles.popularBody}>
                  <Text numberOfLines={1} style={styles.popularName}>
                    {item.name}
                  </Text>

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
                      <Ionicons name="add" size={20} color={Colors.white} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  contentContainer: {
    paddingBottom: 140,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 18,
  },

  greeting: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.black,

    marginBottom: 6,
  },

  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationText: {
    fontSize: 14,
    color: Colors.mediumGray,

    fontWeight: "500",

    marginLeft: 4,
    marginRight: 2,
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBtn: {
    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: Colors.white,

    justifyContent: "center",
    alignItems: "center",

    marginLeft: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 4,
  },

  /* BANNER */

  // banner: {
  //   marginHorizontal: 20,
  //   marginBottom: 24,

  //   borderRadius: 24,

  //   paddingVertical: 20,
  //   paddingHorizontal: 20,

  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",

  //   overflow: "hidden",
  // },
  bannerContainer: { paddingHorizontal: 20, marginBottom: 20 },
  banner: { height: 160, justifyContent: "center" },
  bannerOverlay: {
    paddingLeft: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    flex: 1,
    borderRadius: 16,
    justifyContent: "center",
  },
  bannerTitle: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 10,
  },
  bannerContent: {
    flex: 1,
  },

  bannerSmall: {
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 6,
  },

  bannerBig: {
    fontSize: 24,
    fontWeight: "900",
    color: Colors.white,
    lineHeight: 28,
    marginBottom: 14,
  },

  orderNowBtn: {
    backgroundColor: Colors.secondary,

    paddingHorizontal: 18,
    paddingVertical: 10,

    borderRadius: 12,

    alignSelf: "flex-start",
  },

  orderNowText: {
    color: Colors.white,

    fontSize: 13,
    fontWeight: "800",
  },

  bannerRight: {
    marginLeft: 10,
  },

  bannerEmoji: {
    fontSize: 70,
  },

  /* SECTION */

  section: {
    marginBottom: 26,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 20,

    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",

    color: Colors.black,
  },

  viewAll: {
    fontSize: 14,
    fontWeight: "700",

    color: Colors.primary,
  },

  /* CATEGORIES */

  categoriesRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: 20,
  },

  categoryCard: {
    alignItems: "center",
    width: "22%",
  },

  categoryCircle: {
    width: 45,
    height: 45,

    borderRadius: 34,

    backgroundColor: "#FFF4EE",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 10,

    shadowColor: "#FF6B00",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 4,
  },

  categoryName: {
    fontSize: 13,
    fontWeight: "700",

    color: Colors.black,

    textAlign: "center",
  },

  /* POPULAR */

  popularList: {
    paddingLeft: 20,
    paddingRight: 6,
    paddingBottom: 10,
  },

  popularCard: {
    width: 180,

    backgroundColor: Colors.white,

    borderRadius: 22,

    marginRight: 16,
    marginBottom: 10,

    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 5,
  },

  popularImage: {
    width: "100%",
    height: 125,

    backgroundColor: Colors.lightGray,
  },

  popularBody: {
    padding: 14,
  },

  popularName: {
    fontSize: 15,
    fontWeight: "700",

    color: Colors.black,

    marginBottom: 14,
  },

  popularFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  popularPrice: {
    fontSize: 15,
    fontWeight: "800",

    color: Colors.black,
  },

  addBtn: {
    width: 36,
    height: 36,

    borderRadius: 18,

    backgroundColor: Colors.primary,

    alignItems: "center",
    justifyContent: "center",

    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,

    elevation: 5,
  },
});
