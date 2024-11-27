import TopBar from "../components/Layout/TopBar";
import NavBar from "../components/Layout/NavBar";
import SalesBar from "../components/Layout/salesBar";
import Footer from "../components/Layout/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
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
    </section>
  );
}
