import "@/assets/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { GlobalProvider } from "@/context/GlobalContext";
import "photoswipe/dist/photoswipe.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
    title: "PropertyPulse | Finf the Perfect Rental",
    drescription: "Find your dream rental property",
    keywords: "rentals, find rentals, find properties",
};

const MainLayout = ({ children }) => {
    return (
        <GlobalProvider>
            <AuthProvider>
                <html lang="en">
                    <body>
                        <Navbar />
                        <main>{children}</main>
                        <Footer />
                        <ToastContainer />
                    </body>
                </html>
            </AuthProvider>
        </GlobalProvider>
    );
};

export default MainLayout;
