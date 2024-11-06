import AuthGuard from "@/lib/AuthGuard";
import Footer from "../components/Footer";
import MobileFooter from "../components/MobileFooter";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";

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
