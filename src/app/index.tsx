import { useState, useRef } from "react";
import { View, FlatList, SectionList, Text } from "react-native";
import { Link } from "expo-router";

import { CategoryButton } from "@/components/category-button";
import { Header } from "@/components/header";
import { Product } from "@/components/product";

import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products";
import { useCartStore } from "@/stores/cart-store";

export default function Index() {
  const cartStore = useCartStore()
  const [category, setCategory] = useState(CATEGORIES[0]);

  const sectionListRef = useRef<SectionList<ProductProps>>(null);

  const cartQuantityItems = cartStore.products.reduce((total, product) => total + product.quantity, 0)

  function handleSelectCategory(selectedCategory: string) {
    setCategory(selectedCategory);

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory
    );

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
  }

  return (
    <View className="pt-8 flex-1">
      <Header title={"Faça o seu pedido"} cartQuantityItems={cartQuantityItems} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            isSelected={category === item}
            onPress={() => handleSelectCategory(item)}
            title={item}
          />
        )}
        className="max-h-10 mt-5"
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

    </View>
  );
}
