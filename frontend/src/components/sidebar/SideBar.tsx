import { Box, Typography, useTheme } from '@mui/material';
import { Menu, MenuItem, SubMenu, Sidebar } from "react-pro-sidebar";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { NavLink } from "react-router-dom";

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
        <Box
            sx={{
                position: "sticky",
                display: "flex",
                height: "100vh",
                top: 0,
                bottom: 0,
                zIndex: 10000,

                "a": {
                    color: "white",
                    textDecoration: "None"
                },
                "& .ps-menu-button:hover": {
                    color: `${colors.blueAccent[500]} !important`,
                    backgroundColor: "transparent !important",
                },
                "& .ps-menu-button.active": {
                    color: `${colors.greenAccent[500]} !important`,
                    backgroundColor: "transparent !important",
                },
                "& .ps-submenu-content": {
                    backgroundColor: `${colors.primary[400]} !important`
                }
            }}
        >
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
                        color={colors.grey[100]}
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
                                <Typography variant="h3"
                                    color={colors.grey[100]}
                                >Админ панель
                                </Typography>
                            </Box>
                        )}
                    </MenuItem>
                    <SubMenu label="Редактор" icon={<TimelineOutlinedIcon />}>
                        <NavLink style={({ isActive }) => {
                            return {
                                color: isActive ? colors.blueAccent[500] : ""
                            };
                        }} to="/study-mode">
                            <MenuItem icon={<PieChartOutlineOutlinedIcon />}>
                                Форма обучения
                            </MenuItem>
                        </NavLink>
                        <NavLink style={({ isActive }) => {
                            return {
                                color: isActive ? colors.blueAccent[500] : ""
                            };
                        }} to="/courses">
                            <MenuItem icon={<ShowChartOutlinedIcon />}>
                                Курс обучения
                            </MenuItem>
                        </NavLink>
                        <NavLink style={({ isActive }) => {
                            return {
                                color: isActive ? colors.blueAccent[500] : ""
                            };
                        }} to="/semesters">
                            <MenuItem icon={<ShowChartOutlinedIcon />}>
                                Семестр
                            </MenuItem>
                        </NavLink>
                    </SubMenu>
                    <NavLink style={({ isActive }) => {
                        return {
                            color: isActive ? colors.blueAccent[500] : ""
                        };
                    }} to="/price-list">
                        <MenuItem icon={<DescriptionOutlinedIcon />}>
                            Прайс лист
                        </MenuItem>
                    </NavLink>
                    <NavLink style={({ isActive }) => {
                        return {
                            color: isActive ? colors.blueAccent[500] : ""
                        };
                    }} to="/calendar">
                        <MenuItem icon={<CalendarTodayOutlinedIcon />}>
                            Calendar
                        </MenuItem>
                    </NavLink>
                </Menu>
            </Sidebar>
        </Box>
    );
}

export default SideBarFC;
