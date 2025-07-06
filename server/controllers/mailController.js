import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',       // aca va el mail y contraseña tuyo
    pass: ''  
  }
});

export const sendReservaEmail = async (mail, reserva) => {
  const mailOptions = {
    from: 'tuemail@gmail.com',
    to: mail,
    subject: 'Confirmación de reserva',
    text: `Hola ${reserva.nombre_usuario}, tu reserva fue confirmada. Reserva ID: ${reserva.id_reserva} Inmueble ID: ${reserva.id_inmueble} Desde: ${reserva.fecha_inicio} Hasta: ${reserva.fecha_fin}`
  };

  return transporter.sendMail(mailOptions);
};

export const send2FaEmail = async (mail, code) => {
  const mailOptions = {
    from: '',
    to: mail,
    subject: 'Codigo de verificacion',
    text: `Tu codigo de verificacion es: ${code}`
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("📨 Mail 2FA enviado:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Error al enviar mail 2FA:", err);
    return false;
  }
}