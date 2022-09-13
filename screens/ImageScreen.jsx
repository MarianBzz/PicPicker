import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Avatar, Button } from "@rneui/base";
import React, { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import ImageList from "../components/ImageList";
import { getImages } from "../api/pexels";

export default function ImageScreen({ route }) {
  const [photos, setPhotos] = useState([]);
  const { image } = route.params;

  const handlePress = async () => {
    await WebBrowser.openBrowserAsync(image.photographer_url);
  };

  const loadImages = async () => {
    const res = await getImages();

    setPhotos(res.data.photos);
  };
  useEffect(() => {
    loadImages();
  }, []);

  const downloadFile = async () => {
    try {
      let fileUri = FileSystem.documentDirectory + image.id + ".jpeg";
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
    const { status } = MediaLibrary.requestPermissionsAsync();
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
            containerStyle={{ backgroundColor: "red" }}
            rounded
          />
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.textPhotographer}>{image.photographer}</Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Download"
          buttonStyle={{ backgroundColor: "red" }}
          onPress={() => handleDownload()}
        />
      </View>
      <View>
        <ImageList photos={photos} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerPhotographer: {
    backgroundColor: "#0D0D0D",
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  textPhotographer: {
    color: "#fff",
    fontWeight: "bold",
    marginStart: 5,
    fontSize: 18,
  },
});
