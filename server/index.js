const path = require('path');
const express = require("express");
const axios = require('axios');

const PORT = process.env.PORT || 3001;
const BREED_LIMITS = 10;
const CAT_API = "https://api.thecatapi.com/v1";

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api/breeds", async(req, res) => {
  try{
    const breedsEndpoint = `${CAT_API}/breeds`
    const { data } = await axios.get(breedsEndpoint);
    const breedsPayload = data.map((d) => {
      const { id, name } = d;
      return { id, name }
    });

    res.json({ data: breedsPayload });
  } catch(e) {
    res.status(500).json({message: "Internal Server Error"});
  }
});

app.get("/api/breeds/:breedId", async(req, res) => {
  try{
    const { breedId } = req.params
    const breedByIdEndpoint = `${CAT_API}/breeds/${breedId}`;
    const { data } = await axios.get(breedByIdEndpoint);

    res.json({ data });
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