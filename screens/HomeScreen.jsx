import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Input } from "@rneui/themed";

import { getImages } from "../api/pexels";
import ImageList from "../components/ImageList";

export default function HomeScreen({ openSearch }) {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadImages = async (searchTerm) => {
    const res = await getImages(searchTerm);

    setPhotos(res.data.photos);
  };
  useEffect(() => {
    loadImages();
  }, []);

  const handleSearch = async () => {
    await loadImages(searchTerm);
  };

  return (
    <>
      {openSearch && (
        <View style={styles.searchSection}>
          <Input
            leftIcon={{ type: "feather", name: "search", color: "#fff" }}
            placeholder="Search a Term"
            placeholderTextColor={"#f1f1f1"}
            style={styles.input}
            leftIconContainerStyle={styles.icon}
            onChangeText={(value) => setSearchTerm(value)}
            inputContainerStyle={styles.searchInput}
          />

          <Button
            title="Search"
            buttonStyle={styles.button}
            onPress={() => handleSearch()}
          />
        </View>
      )}
      <View style={styles.container}>
        <Text style={styles.totalResults}>
          Total Results:{photos.total_results}
        </Text>
        <ImageList photos={photos} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    alignItems: "center",
    justifyContent: "center",
  },
  totalResults: {
    color: "#D0D0D0",
    textAlign: "right",
    width: "100%",
  },
  searchInput: {
    backgroundColor: "#2c292c",
    borderBottomWidth: 0,
    paddingHorizontal: 4,
    color: "white",
  },
  input: {
    color: "fff",
  },
  searchSection: {
    backgroundColor: "#0D0D0D",
    width: "100%",
    paddingLeft: 10,
    flex: 1 / 5,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 80,
  },
  icon: {
    paddingStart: 10,
    marginRight: 7,
  },
  button: {
    marginBottom: 27,
    backgroundColor: "#229783",
  },
});
