import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";
import SalesBar from "../components/salesBar";
import Footer from "../components/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-screen">
        <TopBar />
        <div className="flex justify-center">
          <div className="w-[90%]">
            <NavBar
              color="black"
            />
          </div>
        </div>
        <SalesBar />
        <div className="w-full flex justify-center">
          <div className="w-[90%]">
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
