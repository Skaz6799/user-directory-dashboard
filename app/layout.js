import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css";


export const metadata = {
  title: "User Directory Dashboard",
  description: "A dashboard for managing user information and profiles.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
