import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Menu, MenuItem, SubMenu, Sidebar } from "react-pro-sidebar";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

import { FC, useState } from 'react';
import { tokens } from '../../theme';

const SideBarFC: FC = () => {
    const theme = useTheme();
    const [isCollapsed, setIsCollapsed] = useState(true);

    const colors = tokens(theme.palette.mode);

    return (
        <Box>
            <Sidebar collapsed={isCollapsed}>
                <Menu>
                    <MenuItem
                        icon={
                            isCollapsed ? (
                                <MenuOutlinedIcon onClick={() => setIsCollapsed(false)} />
                            ) : (
                                <CloseOutlinedIcon onClick={() => setIsCollapsed(true)} />
                            )
                        }
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]}>
                                    ADMINIS
                                </Typography>
                                <IconButton
                                    onClick={() => setIsCollapsed(true)}
                                >
                                    <CloseOutlinedIcon />
                                </IconButton>
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
