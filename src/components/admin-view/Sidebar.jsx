import { adminSidebarItems } from "@/config";
import { ChartColumn } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader } from "../ui/sheet";

function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader>
              <div
                onClick={() => navigate("/admin/dashboard")}
                className="flex gap-1 cursor-pointer items-center mt-10"
              >
                <ChartColumn />
                <span className="text-xl font-extrabold">Admin Panel</span>
              </div>
            </SheetHeader>
            <div className="flex flex-col cursor-pointer ">
              {adminSidebarItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    setOpen(setOpen);
                  }}
                  className="flex gap-1 font-medium hover:bg-muted text-muted-foreground hover:text-foreground px-5 py-2 rounded-md"
                >
                  {item.icon} <span>{item.label} </span>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className="sticky top-0 left-0 px-5 py-3 w-64 border-r hidden lg:flex flex-col">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex gap-1 cursor-pointer items-center my-5"
        >
          <ChartColumn />
          <span className="text-xl font-extrabold">Admin Panel</span>
        </div>
        <div className="flex flex-col cursor-pointer ">
          {adminSidebarItems.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex gap-1 font-medium hover:bg-muted text-muted-foreground hover:text-foreground px-5 py-2 rounded-md"
            >
              {item.icon} <span>{item.label} </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
