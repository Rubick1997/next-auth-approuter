import { logout } from "@/actions/authActions";
import "../globals.css";

export const metadata = {
  title: "Next Auth",
  description: "Next.js Authentication",
};

function AuthRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header id="auth-header">
          <p>Welcome back!</p>
          <form action={logout}>
            <button>Logout</button>
          </form>
        </header>
        {children}
      </body>
    </html>
  );
}

export default AuthRootLayout;
