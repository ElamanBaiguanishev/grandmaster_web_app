import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Topbar from "../common/Topbar";
import SideBarFC from "../sidebar/SideBar";
import { FC } from "react";
import { useAuth } from "../../hooks/useAuth";

const MainLayout: FC = () => {
  const isAuth = useAuth();

  return (
    <Box
      sx={{ display: "flex" }}
    >
      {isAuth && ( // Проверяем, авторизован ли пользователь
        <Box
          component="nav"
          sx={{ flexShrink: 0 }}
        >
          <SideBarFC />
        </Box>
      )}
      <Box
        component="main"
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Topbar />
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
