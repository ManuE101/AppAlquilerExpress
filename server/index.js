import express from "express";
import userRoutes from "./routes/user-routes.js";
import inmuebleRoutes from "./routes/inmueble-routes.js";
import reservaRoutes from "./routes/reservas-routes.js";
import cookieParser from "cookie-parser"
import cors from "cors";

//middle ware, funciones por las que se filtran las peticiones antes de llegar a la peticion real
app.use(express.json()) // middleware express.json, te transforma el body de la req en json
app.use(cookieParser()) // otro middleware que nos permite modificar las cookies
app.use(cors({
  origin: "http://localhost:3000", // o '*', pero es menos seguro
  credentials: true // para que las cookies funcionen si las usás
}));
const PORT = process.env.PORT ?? 8080;

// Middleware para verificar el token en las cookies en cada petición
app.use((req,res,next ) => {
     const token = req.cookies.access_token
     req.session = {user:null} // añado info a la peticion agregandole EL ATRIBUTO NULL SEA LA PETICION QEU SEA

     try {
        const data = jwt.verify(token , "boca") // boca tiene que ser .env
        req.session.user = data
    } catch{}
    

    next() // esto sigue a la siguiente ruta o middleware, es como un "ya termine"
})




app.use("/user", userRoutes);        // Tus endpoints de usuario estarán bajo /user
app.use("/inmueble", inmuebleRoutes); // Tus endpoints de inmueble bajo /inmueble
//app.use("/reserva", reservaRoutes);


app.listen(PORT , () => {
    console.log(`Server started on  ${PORT}`);
})
app.use((req,res) => {
    res.status(404).send('<h1> Boca </h1>')
})

