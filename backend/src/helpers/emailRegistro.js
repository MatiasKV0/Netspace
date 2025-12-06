import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { name, email, token } = datos;

    const info = await transport.sendMail({
        from: '"Netspace" <' + process.env.EMAIL_USER + '>',
        to: email,
        subject: 'Verificación de cuenta - Netspace',
        text: 'Comprueba tu cuenta',
        html: `
        <div style="background-color: #f3f4f6; padding: 20px;">
            <table width="100%" style="max-width: 600px; margin: auto; background: white; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
                <tr>
                    <td style="padding: 20px; text-align: center;">
                        <h2 style="color: #1f2937; font-size: 24px; font-weight: bold;">Bienvenido a <span style="color: #fb2c36;">Netspace</span></h2>
                        <p style="color: #4b5563; font-size: 16px; margin-bottom: 20px;">Hola <strong>${name}</strong>, confirma tu cuenta haciendo clic en el botón de abajo:</p>
                        <a href="${process.env.FRONTEND_URL}/confirm/${token}" 
                           style="display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
                           Verificar Cuenta
                        </a>
                        <p style="color: #9ca3af; font-size: 14px; margin-top: 20px;">Si no solicitaste esta cuenta, ignora este mensaje.</p>
                        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;">
                        <p style="color: #9ca3af; font-size: 12px;">&copy; 2025 Netspace. Todos los derechos reservados.</p>
                    </td>
                </tr>
            </table>
        </div>`
    });

    console.log("Correo enviado: %s", info.messageId);
};

export default emailRegistro;
