import { useLocalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";

import { PRODUCTS } from "@/utils/data/products";

export default function Poduct() {
  const { id } = useLocalSearchParams<{id:string}>();
  
  const product = PRODUCTS.filter((product) => product.id === id)[0];

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-white">Produto não encontrado</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Image source={product.cover} className="w-full h-52" resizeMode="cover"/>
    </View>
  );
}
