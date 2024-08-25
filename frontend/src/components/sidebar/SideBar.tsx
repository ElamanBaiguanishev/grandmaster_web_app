import { Box, Typography, useTheme } from '@mui/material';
import { Menu, MenuItem, SubMenu, Sidebar } from "react-pro-sidebar";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

import { FC } from 'react';
import { tokens } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setIsBroken, setIsCollapsed, toggleSidebar } from "../../store/sidebar/sidebarSlice";

const SideBarFC: FC = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const isToggled = useAppSelector((state) => state.sidebar.isToggled);
    const isCollapsed = useAppSelector((state) => state.sidebar.isCollapsed);

    const colors = tokens(theme.palette.mode);

    return (
        <Box sx={{
            position: "sticky",
            display: "flex",
            height: "100vh",
            top: 0,
            bottom: 0,
            zIndex: 10000,
            "& .sidebar": {
                border: "none",
            },
            "& .menu-icon": {
                backgroundColor: "transparent !important",
            },
            "& .menu-item": {
                backgroundColor: "transparent !important",
            },
            "& .menu-anchor": {
                color: "inherit !important",
                backgroundColor: "transparent !important",
            },
            "& .menu-item:hover": {
                color: `${colors.blueAccent[500]} !important`,
                backgroundColor: "transparent !important",
            },
            "& .menu-item.active": {
                color: `${colors.greenAccent[500]} !important`,
                backgroundColor: "transparent !important",
            },
        }}>
            <Sidebar
                collapsed={isCollapsed}
                toggled={isToggled}
                backgroundColor={colors.primary[400]}
                onBreakPoint={(broken) => dispatch(setIsBroken(broken))}
                breakPoint="md"
                onBackdropClick={() => dispatch(toggleSidebar())}
            >
                <Menu>
                    <MenuItem
                        icon={
                            isCollapsed ? (
                                <MenuOutlinedIcon onClick={() => dispatch(setIsCollapsed(false))} />
                            ) : (
                                <CloseOutlinedIcon onClick={() => dispatch(setIsCollapsed(true))} />
                            )
                        }
                    >
                        {!isCollapsed && (
                            <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                <Typography variant="h3" color={colors.grey[100]}>
                                    ADMINIS
                                </Typography>
                            </Box>
                        )}
                    </MenuItem>
                    <SubMenu label="Charts" icon={<TimelineOutlinedIcon />}>
                        <MenuItem icon={<PieChartOutlineOutlinedIcon />}> Pie charts </MenuItem>
                        <MenuItem icon={<ShowChartOutlinedIcon />}> Line charts </MenuItem>
                    </SubMenu>
                    <MenuItem icon={<DescriptionOutlinedIcon />}> Documentation </MenuItem>
                    <MenuItem icon={<CalendarTodayOutlinedIcon />}> Calendar </MenuItem>
                </Menu>
            </Sidebar>
        </Box>
    );
}

export default SideBarFC;
