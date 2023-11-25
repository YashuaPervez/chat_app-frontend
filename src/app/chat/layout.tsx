// Components
import Navbar from "./Navbar";
import Paper from "../components/Paper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-4xl">
      <Paper>
        <Navbar />
        <div className="mb-12"></div>
        {children}
      </Paper>
    </div>
  );
}
