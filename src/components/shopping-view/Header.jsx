import React, { use, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Home, LogOut, Menu, ShoppingCart, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { shoppingViewHeaderMenuItems } from "@/config";
import UserCartWrapper from "./UserCartWrapper";
import { fetchCartItem } from "@/store/shop/Cart-slice";

const MenueItems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams()

  const handleNavigate = (currentItem) => {
    sessionStorage.removeItem("filters");
    const currentFilter =
      currentItem.id !== "home" &&
      currentItem.id !== "products" &&
      currentItem.id !== "search"
        ? {
            category: [currentItem.id],
          }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(new URLSearchParams(`?category=${currentItem.id}`))
      : navigate(currentItem.path);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center">
      {shoppingViewHeaderMenuItems.map((item) => (
        <div
          key={item.id}
          onClick={() => handleNavigate(item)}
          className="font-semibold text-xl hover:bg-accent w-full cursor-pointer px-3 py-2 rounded-lg "
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

const Cart = () => {
  const [openCart, setOpenCart] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);

  useEffect(() => {
    dispatch(fetchCartItem(user?.id));
  }, [dispatch]);

  return (
    <Sheet open={openCart} onOpenChange={() => setOpenCart(false)}>
      <Button
        onClick={() => setOpenCart(true)}
        variant="outline"
        className=" cursor-pointer relative"
      >
        <span className="absolute -top-1 right-1 rounded-full bg-red-500 w-4 h-4 text-xs text-white aspect-square">{cartItems?.items?.length||0}</span>
        <ShoppingCart className="!w-5 !h-5 stroke-3" />
      </Button>
      <SheetContent>
        <SheetHeader className="sr-only">
          <SheetTitle>Shopping Cart </SheetTitle>
          <SheetDescription className="sr-only">
            Here you can view and manage the products in your cart.
          </SheetDescription>
        </SheetHeader>
        <UserCartWrapper
          setOpenCart={setOpenCart}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </SheetContent>
    </Sheet>
  );
};

const HeaderRight = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCartItem(user?.id));
  }, [dispatch]);

  return (
    <div className="flex items-center gap-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="w-8 h-8 hover:outline-6 hover:outline-gray-200/30">
            <AvatarFallback className="bg-[#c2185b] text-white text-2xl cursor-pointer pb-1.5">
              {user.userName[0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="lg:mr-6 mr-20">
          <DropdownMenuItem>
            <span>
              Loged in as <span className="font-bold">{user.userName}</span>
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <User />
            <span>User Account</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

function ShoppingHeader() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="sticky top-0 z-10 flex justify-between items-center px-5 py-3 border-b bg-white">
      <Link to="/shop/home" className="flex items-center gap-2">
        <Home />
        <span className="font-bold text-xl">Ecommerce</span>
      </Link>
      <div className="max-lg:hidden">
        <MenueItems/>
      </div>
      <div className="flex flex-end items-center gap-5 lg:hidden">
        <Cart />
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden cursor-pointer"
            >
              <Menu className="!w-5 !h-6" />
            </Button>
          </SheetTrigger>
          <SheetHeader className="sr-only">
            <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
          <SheetDescription>menu items</SheetDescription>
          </SheetHeader>
          <SheetContent className="p-5 w-60">
            <div className="flex items-center gap-2">
              <HeaderRight />
              <p className="font-semibold text-2xl">{user.userName} </p>
            </div>
            <MenueItems />
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex items-center gap-5 max-lg:hidden">
        <Cart />
        <HeaderRight />
      </div>
    </div>
  );
}

export default ShoppingHeader;
