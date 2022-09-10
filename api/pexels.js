import axios from "axios";

export const getImages = async (searchTerm = "programming") =>
  await axios.get(`https://api.pexels.com/v1/search?query=${searchTerm}`, {
    headers: {
      Authorization: "563492ad6f917000010000017e0a50407fd24e47b2be364ecf5c2ec6",
    },
  });

// 563492ad6f917000010000017e0a50407fd24e47b2be364ecf5c2ec6
