import { EmailTemplate } from '@/components/auth/email-template';
import React from 'react';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/verify-email?token=${token}`;

  await resend.emails.send({
    from: 'Verify your email! <onboarding@resend.dev>',
    to: 'moo3tazali@gmail.com',
    subject: 'Confirm your email',
    react: React.createElement(EmailTemplate, {
      LinkHref: confirmLink,
      message: 'verify your email',
    }),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/new-password?token=${token}`;

  await resend.emails.send({
    from: 'Reset your password! <onboarding@resend.dev>',
    to: 'moo3tazali@gmail.com',
    subject: 'Reset your password',
    react: React.createElement(EmailTemplate, {
      LinkHref: resetLink,
      message: 'reset your password',
    }),
  });
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: 'OTP <onboarding@resend.dev>',
    to: 'moo3tazali@gmail.com',
    subject: 'Your Login OTP',
    html: `<h1>Your OTP is: ${token}</h1>`,
  });
};
