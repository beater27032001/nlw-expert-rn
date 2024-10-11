import { useLocalSearchParams, useNavigation } from "expo-router";
import { Image, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useCartStore } from "@/stores/cart-store";

import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";

import { Button } from "@/components/button";
import { LinkButton } from "@/components/link-button";

export default function Poduct() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const cartStore = useCartStore();

  const product = PRODUCTS.filter((item) => item.id === id)[0];

  function handleAddToCart() {
    cartStore.add(product);
    navigation.goBack()
  }

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-white">Produto não encontrado</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Image
        source={product.cover}
        className="w-full h-52"
        resizeMode="cover"
      />

      <View className="p-5 mt-8 flex-1">
        <Text className="text-lime-400 text-2xl font-heading">
          {formatCurrency(product.price)}
        </Text>

        <Text className="text-slate-400 font-body text-base leading-6 mb-6">
          {product.description}
        </Text>

        {product.ingredients.map((ingredient) => (
          <Text className="text-slate-400 font-body leading-6" key={ingredient}>
            {"\u2022"} {ingredient}
          </Text>
        ))}
      </View>

      <View className="p-5 pb-8 gap-5">
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather name="plus-circle" size={20} />
          </Button.Icon>
          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>

        <LinkButton href={"/"} title="Voltar ao cardápio" />
      </View>
    </View>
  );
}
