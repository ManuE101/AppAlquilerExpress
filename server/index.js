// import express from "express";
// import userRoutes from "./routes/user-routes.js";
// import inmuebleRoutes from "./routes/inmueble-routes.js";
// import reservasRoutes from "./routes/reservas_routes.js";
// import cookieParser from "cookie-parser"
// import cors from "cors";
// import comentarioRoutes from "./routes/comentarios-route.js";

// const app = express();

// //middle ware, funciones por las que se filtran las peticiones antes de llegar a la peticion real
// app.use(cors({
//   origin: "http://localhost:3000", // o '*', pero es menos seguro
//   credentials: true // para que las cookies funcionen si las usás
// }));
// app.use(express.json()) // middleware express.json, te transforma el body de la req en json
// app.use(cookieParser()) // otro middleware que nos permite modificar las cookies
// const PORT = process.env.PORT ?? 8080;

// // Middleware para verificar el token en las cookies en cada petición
// app.use((req,res,next ) => {
//      const token = req.cookies.access_token
//      console.log(token)
//      req.session = {user:null} // añado info a la peticion agregandole EL ATRIBUTO NULL SEA LA PETICION QEU SEA
//      try {
//         const data = jwt.verify(token , "boca") // boca tiene que ser .env
//         req.session.user = data
//     } catch{}
    

//     next() // esto sigue a la siguiente ruta o middleware, es como un "ya termine"
// })




// app.use("/user", userRoutes);        // Tus endpoints de usuario estarán bajo /user
// app.use("/inmueble", inmuebleRoutes); // Tus endpoints de inmueble bajo /inmueble
// app.use("/reserva", reservasRoutes);


// app.listen(PORT , () => {
//     console.log(`Server started on  ${PORT}`);
// })
// app.use((req,res) => {
//     res.status(404).send('<h1> Boca </h1>')
// })

// app.use("/comentario", comentarioRoutes);

import express from "express";
import userRoutes from "./routes/user-routes.js";
import inmuebleRoutes from "./routes/inmueble-routes.js";
import reservasRoutes from "./routes/reservas_routes.js";
import comentarioRoutes from "./routes/comentarios-route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const PORT = process.env.PORT ?? 8080;

// Middleware CORS y parsers
app.use(cors({
  origin: "http://localhost:3000", // frontend
  credentials: true
}));
app.use(express.json());           // Body en JSON
app.use(cookieParser());           // Cookies

// Middleware de autenticación JWT
app.use((req, res, next) => {
  const token = req.cookies.access_token;
  req.session = { user: null };

  try {
    const data = jwt.verify(token, "boca"); // TODO: usar process.env.JWT_SECRET
    req.session.user = data;
  } catch (err) {
    // Token inválido o no presente
  }
  next();
});

// Registro de rutas
app.use("/user", userRoutes);           // Rutas de usuario
app.use("/inmueble", inmuebleRoutes);   // Rutas de inmuebles
app.use("/reserva", reservasRoutes);    // Rutas de reservas
app.use("/comentario", comentarioRoutes); // Rutas de comentarios

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


// Middleware 404 (debe ir al final)
app.use((req, res) => {
  res.status(404).send('<h1> Boca </h1>');
});
