import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function ImageScreen({ route, photos }) {
  const { image } = route.params;
  return (
    <View>
      <Image source={{ uri: image.src.medium, height: 350 }} />
    </View>
  );
}

const styles = StyleSheet.create({});
