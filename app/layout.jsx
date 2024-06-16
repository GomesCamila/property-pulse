import "@/assets/styles/globals.css";

export const metadata = {
  title: "PropertyPulse | Finf the Perfect Rental",
  drescription: "Find your dream rental property",
  keywords: "rentals, find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
