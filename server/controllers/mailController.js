import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'maildeprueba12121212@gmail.com',        
    pass: 'wsib zpeo fbog sjaa'  
  }
});

export const sendReservaEmail = async (to, reserva) => {
  const mailOptions = {
    from: 'tuemail@gmail.com',
    to,
    subject: 'Confirmación de reserva',
    text: `Hola ${reserva.nombre_usuario}, tu reserva fue confirmada. Reserva ID: ${reserva.id_reserva} Inmueble ID: ${reserva.id_inmueble} Desde: ${reserva.fecha_inicio} Hasta: ${reserva.fecha_fin}`
  };

  return transporter.sendMail(mailOptions);
};

