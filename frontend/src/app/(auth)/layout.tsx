import AuthGuard from "@/lib/AuthGuard";
import Footer from "../components/Layout/Footer";
import MobileFooter from "../components/Layout/MobileFooter";
import NavBar from "../components/Layout/NavBar";
import TopBar from "../components/Layout/TopBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthGuard>
      <body className="w-full h-screen">
        <TopBar />
        <div className="flex justify-center">
          <div className="w-[90%]">
            <NavBar
              color="black"
            />
          </div>
        </div>
        {children}
        <Footer />
        <MobileFooter />
      </body>
      </AuthGuard>
    </html>
  );
}
