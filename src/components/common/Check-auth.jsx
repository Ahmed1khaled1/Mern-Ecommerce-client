import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthentecated, user, children }) {
  const location = useLocation();

  const isAuthRoute = location.pathname.startsWith("/auth");
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isShopRoute = location.pathname.startsWith("/shop");
  const isLoginOrRegister =
    location.pathname.includes("login") ||
    location.pathname.includes("register");

  // 1. زيارة الصفحة الرئيسية "/"
  if (location.pathname === "/") {
    if (!isAuthentecated) return <Navigate to="/auth/login" />;
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/shop/home" />
    );
  }

  // 2. زائر غير مسجل دخول وحاول يدخل أي شيء غير login/register
  if (!isAuthentecated && !isLoginOrRegister && !isAuthRoute) {
    return <Navigate to="/auth/login" />;
  }

  // 3. مسجل دخول وحاول يدخل login/register
  if (isAuthentecated && isLoginOrRegister) {
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/shop/home" />
    );
  }

  // 4. مستخدم عادي دخل admin
  if (isAdminRoute && user?.role !== "admin") {
    return <Navigate to="/unauth-page" />;
  }

  // 5. أدمن دخل shop (اختياري)
  if (isShopRoute && user?.role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  }

  // 6. كل الحالات السليمة
  return <>{children}</>;
}

export default CheckAuth;
