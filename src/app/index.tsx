import { CategoryButton } from "@/components/category-button";
import { Header } from "@/components/header";
import { View, FlatList } from "react-native";
import { CATEGORIES } from "@/utils/data/products";
import { useState } from "react";

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0]);

  function handleSelectCategory(selectedCategory: string) {
    setCategory(selectedCategory);
  }

  return (
    <View className="pt-8 flex-1">
      <Header title={"Faça o seu pedido"} cartQuantityItems={1} />

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
    </View>
  );
}
