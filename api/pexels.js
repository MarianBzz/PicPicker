import axios from "axios";

export const getImages = async (searchTerm = "computer") => {
  return await axios.get(
    `https://api.pexels.com/v1/search?query=${searchTerm}`,
    {
      headers: {
        Authorization:
          "563492ad6f917000010000017e0a50407fd24e47b2be364ecf5c2ec6",
      },
    }
  );
};
// export const getImages = async (searchTerm = "programming") => {
//   let fotos = [];
//   for (let i = 0; i < 4; i++) {
//     const resp = await axios.get(
//       `https://api.pexels.com/v1/search?page=${i}&query=${searchTerm}`,
//       {
//         headers: {
//           Authorization:
//             "563492ad6f917000010000017e0a50407fd24e47b2be364ecf5c2ec6",
//         },
//       }
//     );
//     fotos = [...fotos, resp];
//   }
//   return fotos;
// };

// 563492ad6f917000010000017e0a50407fd24e47b2be364ecf5c2ec6
