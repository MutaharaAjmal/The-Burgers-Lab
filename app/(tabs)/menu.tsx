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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Menu</Text>
        <TouchableOpacity style={styles.searchBtn}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchEmoji}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search menu..."
          placeholderTextColor={Colors.mediumGray}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
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

      {/* Menu Items */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              router.push({ pathname: "/item-detail", params: { id: item.id } })
            }
          >
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDesc} numberOfLines={2}>
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
              <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
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
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.black,
  },
  searchBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  searchIcon: { fontSize: 18 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: Colors.gray,
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  searchEmoji: { fontSize: 16, marginRight: 8 },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.black,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.gray,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.darkGray,
  },
  categoryChipTextActive: {
    color: Colors.white,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: Colors.lightGray,
  },
  itemInfo: {
    flex: 1,
    paddingHorizontal: 14,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.black,
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 12,
    color: Colors.mediumGray,
    lineHeight: 18,
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.black,
  },
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  addBtnText: {
    fontSize: 22,
    color: Colors.white,
    fontWeight: "300",
    lineHeight: 28,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.lightGray,
  },
});
