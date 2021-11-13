const express = require("express")
const axios = require("axios")
const app = express()
const port = 1998

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))  
app.use('/js', express.static(__dirname + 'public/js'))

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.get('/api/:version', function(req, res) {
  res.send(req.params.version);
});

app.get("/geocoding", async function(req, res) {
  try {
    const API_ACC_KEY = "1ea2a2d4a6a80f98b92ea1129ad3a0b2";

    const position = await axios.get(
      `http://api.positionstack.com/v1/forward?access_key=${API_ACC_KEY}&query=1600%20Pennsylvania%20Ave%20NW,%20Washington%20DC`
    );

    res.render("positionstack", { info: position.data.data[0] });
      
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
});

app.get('/', (req, res) => res.send('Index Page'))

app.listen(port, () => console.log(`Running on ${port} port`))
