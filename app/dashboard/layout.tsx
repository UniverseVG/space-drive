import { SideNav } from "@/components/shared/SideNav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto pt-12 mt-[60px] flex min-h-screen px-4 md:px-4 lg:px-8">
      <div className="hidden lg:flex">
        <SideNav />
      </div>

      <div className="w-full">{children}</div>
    </main>
  );
}
