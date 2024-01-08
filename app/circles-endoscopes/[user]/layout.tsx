// import { Navbar } from "@/components/navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center ">{children}</div>
  );
}

export default Layout;
