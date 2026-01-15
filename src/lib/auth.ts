import { betterAuth } from "better-auth";
import { phoneNumber } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import nodemailer from "nodemailer";
import { sendWhatsAppMessage } from "./whatsapp";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignInAfterSignUp: false,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    // sendVerificationEmail: async ({ user, url }) => {
    //   console.log(
    //     "\n==============================",
    //     "\n📧 Email Verifikasi Terkirim",
    //     "\n------------------------------",
    //     `👤 User: ${user.name ?? user.email}`,
    //     `✉️  Email: ${user.email}`,
    //     `🔗 Link Verifikasi:\n${url}`,
    //     "==============================\n"
    //   );
    // },
    sendVerificationEmail: async ({ user, url }) => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      try {
        await transporter.sendMail({
          from: '"Nama Toko Anda" <no-reply@sembakobayi.com>',
          to: user.email,
          subject: "Verifikasi Akun Anda",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2>Selamat Datang, ${user.name}!</h2>
              <p>Terima kasih telah mendaftar. Silakan klik tombol di bawah ini untuk memverifikasi email Anda:</p>
              <a href="${url}" style="background-color: #3F3142; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Verifikasi Email
              </a>
              <p>Atau copy link ini: <br/> ${url}</p>
            </div>
          `,
        });
        console.log("Email verifikasi terkirim ke:", user.email);
      } catch (error) {
        console.error("Gagal mengirim email:", error);
      }
    },
  },
  plugins: [
    phoneNumber({
      otpLength: 6,
      sendOTP: async ({ phoneNumber, code }) => {
        const message = `*${code}* adalah kode verifikasi Anda.\n\nDemi keamanan, jangan berikan kode ini kepada siapapun.`;
        const result = await sendWhatsAppMessage(phoneNumber, message);

        if (!result.success) {
          throw new Error("Gagal mengirim kode OTP via WhatsApp.");
        }
      },
    }),
  ],
  user: {
    additionalFields: {
      phoneNumber: {
        type: "string",
        required: false,
      },
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
