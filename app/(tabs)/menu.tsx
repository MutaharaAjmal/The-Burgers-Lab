import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

import { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../src/constants/Colors";
import { menuItems, categories } from "../../src/data/mockData";

import { useCart } from "../../src/context/CartContext";

export default function MenuScreen() {
  const router = useRouter();

  const { addItem } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("Burgers");

  const [search, setSearch] = useState("");

  const filtered = menuItems.filter(
    (item) =>
      item.category === selectedCategory &&
      item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Our Menu 🍔</Text>

            <Text style={styles.subtitle}>Find your favorite meal</Text>
          </View>

          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="options-outline" size={22} color={Colors.black} />
          </TouchableOpacity>
        </View>

        {/* SEARCH */}

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.mediumGray} />

          <TextInput
            style={styles.searchInput}
            placeholder="Search burgers, pizza..."
            placeholderTextColor={Colors.mediumGray}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* CATEGORIES */}

        <View style={styles.categoriesContainer}>
          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryChip,
                  selectedCategory === item && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === item && styles.categoryChipTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* MENU ITEMS */}

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.menuList}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.menuItem}
              onPress={() =>
                router.push({
                  pathname: "/item-detail",
                  params: {
                    id: item.id,
                  },
                })
              }
            >
              <Image source={{ uri: item.image }} style={styles.itemImage} />

              <View style={styles.itemInfo}>
                <Text numberOfLines={1} style={styles.itemName}>
                  {item.name}
                </Text>

                <Text numberOfLines={2} style={styles.itemDesc}>
                  {item.description}
                </Text>

                <Text style={styles.itemPrice}>Rs. {item.price}</Text>
              </View>

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
            </TouchableOpacity>
          )}
        />
      </View>
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

  /* HEADER */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.black,
  },

  subtitle: {
    marginTop: 4,

    fontSize: 14,
    color: Colors.mediumGray,
  },

  iconBtn: {
    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: Colors.white,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 4,
  },

  /* SEARCH */

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginHorizontal: 20,
    marginBottom: 20,

    backgroundColor: Colors.white,

    borderRadius: 18,

    paddingHorizontal: 16,

    height: 56,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,

    elevation: 3,
  },

  searchInput: {
    flex: 1,

    marginLeft: 10,

    fontSize: 15,
    color: Colors.black,
  },

  /* CATEGORIES */

  categoriesContainer: {
    marginBottom: 18,
  },

  categoriesList: {
    paddingHorizontal: 20,
  },

  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,

    borderRadius: 22,

    backgroundColor: Colors.white,

    marginRight: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,

    elevation: 2,
  },

  categoryChipActive: {
    backgroundColor: Colors.primary,
  },

  categoryChipText: {
    fontSize: 14,
    fontWeight: "700",

    color: Colors.black,
  },

  categoryChipTextActive: {
    color: Colors.white,
  },

  /* MENU LIST */

  menuList: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: Colors.white,

    borderRadius: 22,

    padding: 12,

    marginBottom: 14,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 4,
  },

  itemImage: {
    width: 86,
    height: 86,

    borderRadius: 18,

    backgroundColor: Colors.lightGray,
  },

  itemInfo: {
    flex: 1,

    paddingHorizontal: 14,
  },

  itemName: {
    fontSize: 16,
    fontWeight: "700",

    color: Colors.black,

    marginBottom: 5,
  },

  itemDesc: {
    fontSize: 13,
    color: Colors.mediumGray,

    lineHeight: 18,

    marginBottom: 10,
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: "800",

    color: Colors.black,
  },

  addBtn: {
    width: 38,
    height: 38,

    borderRadius: 19,

    backgroundColor: Colors.primary,

    alignItems: "center",
    justifyContent: "center",
  },

  separator: {
    height: 2,
    backgroundColor: "transparent",
  },
});
