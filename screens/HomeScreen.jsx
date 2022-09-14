import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Input } from "@rneui/themed";

import { getImages } from "../api/pexels";
import ImageList from "../components/ImageList";

export default function HomeScreen({ openSearch }) {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState("");

  const loadImages = async (searchTerm) => {
    const res = await getImages(searchTerm);
    // console.log("HOLAAAAAAAA", res[3].data);

    setPhotos(res.data.photos);
    setResults(res.data.total_results);
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
        <Text style={styles.totalResults}>Total Results: {results}</Text>
        <ImageList photos={photos} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5ebec",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 4,
  },
  totalResults: {
    color: "#0D0D0D",
    textAlign: "right",
    width: "100%",
    marginTop: 15,
    marginRight: 10,
  },
  searchInput: {
    backgroundColor: "#67878e",
    borderBottomWidth: 0,
    paddingHorizontal: 4,
    color: "white",
  },
  input: {
    color: "#fff",
  },
  searchSection: {
    backgroundColor: "#b3c3c6",
    width: "100%",
    paddingLeft: 6,
    flex: 1 / 7,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 80,
    paddingTop: 20,
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
