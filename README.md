# Next Auth V5

This project provides an advanced implementation for Next Auth V5, covering comprehensive features and best practices for integrating authentication in Next.js applications.

## Key Features:

- 🔐 Next-auth v5 (Auth.js)
- 🚀 Next.js 14 with server actions
- 🔑 Credentials Provider
- 🌐 OAuth Provider (Social login with Google & GitHub)
- 🔒 Forgot password functionality
- ✉️ Email verification
- 📱 Two factor verification (2FA)
- 👥 User roles (Admin & User)
- 🔓 Login component (Opens in redirect or modal)
- 📝 Register component
- 🤔 Forgot password component
- ✅ Verification component
- ⚠️ Error component
- 🔘 Login button
- 🚪 Logout button
- 🚧 Role Gate
- 🔍 Exploring next.js middleware
- 📈 Extending & Exploring next-auth session
- 🔄 Exploring next-auth callbacks
- 👤 useCurrentUser hook
- 🛂 useRole hook
- 🧑 currentUser utility
- 👮 currentRole utility
- 🖥️ Example with server component
- 💻 Example with client component
- 👑 Render content for admins using RoleGate component
- 🛡️ Protect API Routes for admins only
- 🔐 Protect Server Actions for admins only
- 📧 Change email with new verification in Settings page
- 🔑 Change password with old password confirmation in Settings page
- 🔔 Enable/disable two-factor auth in Settings page
- 🔄 Change user role in Settings page (for development purposes only)

## Introduction

Next Auth V5 is a powerful authentication library for Next.js applications, enabling secure and seamless user authentication with various providers. This guide provides an advanced overview and practical implementation tips for developers.

## Features

- OAuth Authentication
- Credentials and Email Sign-In
- JWT and Session Management
- Custom Authentication Flows
- Secure API Routes

## Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn
- Next.js

## Installation

Install Next Auth V5 via npm or yarn:

```bash
npm install next-auth
# or
yarn add next-auth
```
