const path = require('path');
const express = require("express");
const axios = require('axios');

const PORT = process.env.PORT || 3001;
const CAT_API = "https://api.thecatapi.com/v1";
const IMAGES = "images";
const SEARCH = "search";
const BREEDS = "breeds";

const app = express();
const getImages = (limit = 10, breedIds) => {
  const imagesUrl = `${CAT_API}/${IMAGES}/${SEARCH}`;
  return axios.get(imagesUrl, { params: { breedIds, limit } });
}

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api/breeds", async(req,res) => {
  try{
    const breedsEndpoint = `${CAT_API}/${BREEDS}`
    const [searchImagesResponse, breedsDataResponse] = await Promise.all([
      getImages(),
      axios.get(breedsEndpoint)
    ]);

    const { data: breedImagesData } = searchImagesResponse;
    const { data: breedData } = breedsDataResponse;
    const payload = {}
    payload.breeds = breedData.map((d) => {
      const { id, name } = d;
      return { id, label: name }
    });
    payload.images = breedImagesData
    res.json({ data: payload });
  } catch(e) {
    res.status(500).json({message: "Internal Server Error"});
  }
});

app.get("/api/breeds/:breedId", async(req, res) => {
  try{
    const { breedId } = req.params;
    const breedByIdEndpoint = `${CAT_API}/breeds/${breedId}`;
    const limit = 6;
    const [breedImageResponse, breedDataResponse] = await Promise.all([
      getImages(limit, breedId),
      axios.get(breedByIdEndpoint)
    ]);

    const { data: breedData } = breedDataResponse;
    const { data: breedImagesData } = breedImageResponse;

    breedData.images = breedImagesData;
    res.json({ data: breedData });
  } catch(e) {
    res.status(500).json({message: "Internal Server Error"});
  }
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});