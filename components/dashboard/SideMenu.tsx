import { adminSidebarMenu } from "@/constants";
import { getSession } from "@/lib/session";
import { AdminSidebarMenuItem } from "@/types";
import CustomLink from "../common/CustomLink";
import { Card } from "../ui/card";

export default async function SideMenuAbout() {
  const session = await getSession();

  const filteredSidebarMenu = adminSidebarMenu.filter(
    (menuItem) =>
      session?.user?.role === "moderator" ||
      session?.user?.role === "admin" ||
      !menuItem.isAdminMenu
  );

  return (
    <Card className="md:p-8 p-6 bg-white shadow-2xl rounded-lg ">
      <div className="flex flex-col gap-3">
        {filteredSidebarMenu.map(
          ({ id, title, href, icon }: AdminSidebarMenuItem) => (
            <div key={id} className="group">
              <CustomLink path={href}>
                <div className="flex gap-3 items-center p-3 transition-shadow shadow-sm rounded-md">
                  <p>{icon}</p>
                  <p className="text-[15px] font-medium">{title}</p>
                </div>
              </CustomLink>
            </div>
          )
        )}
      </div>
    </Card>
  );
}
