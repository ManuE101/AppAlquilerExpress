const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const sequelize = require('./db/db');
const Inmueble = require('./db/models/inmueble');
const Usuario = require('./db/models/usuario');
const inmuebleRoutes = require('./routes/userRoutes.js');

app.use(cors());

//nose si esto va a quedar asi mientras se agreguen mas cosas pero por ahora va :(
app.use('/api/all', inmuebleRoutes);

sequelize.sync({ force: true }) 
  .then(() => {
    console.log("Supongo que cargo.");
});

// servidor puerto
app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en: http://localhost:${PORT}`);
});


