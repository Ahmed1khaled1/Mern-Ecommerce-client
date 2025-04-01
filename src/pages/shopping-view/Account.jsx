import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import account from "../../assets/account.jpg";
import ShoppingOrders from "@/components/shopping-view/Orders";
import Adresses from "@/components/shopping-view/Adresses";

function Account() {
  return (
    <div>
      <div className="w-full aspect-[1600/700] md:aspect-[1600/300]">
        <img
          src={account}
          alt="account"
          className="w-full h-full object-center object-cover aspect-[1600/300]"
        />
      </div>
      <div className="container mx-auto my-8 bg-background shadow-sm rounded-lg border p-5 ">
        <Tabs defaultValue="orders" className="">
          <TabsList>
            <TabsTrigger value="orders" className="cursor-pointer">
              Orders
            </TabsTrigger>
            <TabsTrigger value="adresses" className="cursor-pointer">
              Adresses
            </TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <ShoppingOrders />
          </TabsContent>
          <TabsContent value="adresses">
            <Adresses />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Account;
