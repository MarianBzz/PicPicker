import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Avatar, Button } from "@rneui/base";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import ImageList from "../components/ImageList";
import { getImages } from "../api/pexels";

export default function ImageScreen({ route }) {
  const [images, setImages] = useState([]);
  const { image } = route.params;

  let url = image.url;
  let keywords = url.split("/");
  let similar = keywords[4].split("-");

  const handlePress = async () => {
    await WebBrowser.openBrowserAsync(image.photographer_url);
  };

  const loadImages = async (data) => {
    const res = await getImages(data);
    setImages(res.data.photos);
  };

  useEffect(() => {
    loadImages(similar[0], similar[1], similar[2], similar[3]);
  }, []);

  const downloadFile = async () => {
    let fileUri = FileSystem.documentDirectory + image.id + ".jpeg";
    try {
      const { uri } = await FileSystem.downloadAsync(
        image.src.original,
        fileUri
      );
      saveFile(uri);
    } catch (error) {
      console.log(error);
    }
  };

  const saveFile = async (fileUri) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
    }
  };

  const handleDownload = () => {
    downloadFile();
  };

  return (
    <View style={styles.headerPhotographer}>
      <Image source={{ uri: image.src.large2x, height: 350 }} />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingVertical: 18,
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            title={image.photographer
              .split(" ")
              .map((string) => string[0])
              .join("")
              .toUpperCase()}
            containerStyle={{ backgroundColor: "#4e737c" }}
            rounded
          />
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.textPhotographer}>{image.photographer}</Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Download"
          buttonStyle={{ backgroundColor: "#229783" }}
          onPress={() => handleDownload()}
        />
      </View>
      <View>
        <ImageList photos={images} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerPhotographer: {
    backgroundColor: "#e5ebec",
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  textPhotographer: {
    color: "#1c4b56",
    fontWeight: "bold",
    marginStart: 5,
    fontSize: 18,
  },
});
