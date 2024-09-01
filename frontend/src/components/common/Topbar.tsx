import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useDispatch } from 'react-redux';
import { toggleSidebar } from "../../store/sidebar/sidebarSlice";
import { useAppSelector } from "../../store/hooks";
import { FC } from "react";

const Topbar: FC = () => {
  const dispatch = useDispatch();
  const { isBroken } = useAppSelector((state) => state.sidebar);

  return (
    <AppBar position="static" sx={{ zIndex: 1201 }}>
      <Toolbar>
        {isBroken && (
          <IconButton onClick={() => dispatch(toggleSidebar())}>
            <MenuOutlinedIcon />
          </IconButton>
        )}
        <Typography variant="h6">
          Грандмастер
        </Typography>
      </Toolbar>
    </AppBar>
  );
};


export default Topbar;
