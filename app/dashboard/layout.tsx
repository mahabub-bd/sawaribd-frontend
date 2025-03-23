import Navbar from "@/components/common/header/Navbar";
import SideMenu from "@/components/dashboard/SideMenu";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-5 md:py-10">
          <div className="lg:col-span-9 2xl:col-span-9 order-1 lg:order-2">
            {children}
          </div>
          <div className="lg:col-span-3 2xl:col-span-3 order-2 lg:order-1 mb-6 lg:mb-0">
            <SideMenu />
          </div>
        </div>
      </div>
    </section>
  );
}
