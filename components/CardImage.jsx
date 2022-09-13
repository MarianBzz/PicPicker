import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const CardImage = ({ image }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={style.cardImage}
      onPress={() => navigation.navigate("ImageScreen", { image })}
    >
      <Image
        source={{
          uri: image.src.portrait
            ? image.src.portrait
            : "https://www.ncenet.com/wp-content/uploads/2020/04/no-image-png-2.png",
        }}
        style={{ height: 180, width: "100%" }}
      />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  cardImage: {
    display: "flex",
    width: "49.5%",
    margin: 4,
    justifyContent: "space-between",
    backgroundColor: "#2c292c",
    borderWidth: 0,
    borderRadius: 5,
  },
});

export default CardImage;
