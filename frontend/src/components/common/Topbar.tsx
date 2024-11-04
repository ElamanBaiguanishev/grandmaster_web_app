import { AppBar, Toolbar, Typography, IconButton, Button, Select, MenuItem } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from 'react-redux';
import { toggleSidebar } from "../../store/sidebar/sidebarSlice";
import { useAppSelector } from "../../store/hooks";
import { FC, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { removeTokenFromLocalStorage } from "../../helpers/localstorage.helper";
import { logout } from "../../store/user/userSlice";
import { setYearToLocalStorage, getYearFromLocalStorage } from "../../helpers/localstorage.helper";
import { YearService } from "../../api/year.service";

const Topbar: FC = () => {
  const dispatch = useDispatch();
  const { isBroken } = useAppSelector((state) => state.sidebar);
  const isAuth = useAuth();
  const navigate = useNavigate();
  const userName = useAppSelector((state) => state.user.user!);

  const [year, setYear] = useState<string>('2024'); // по умолчанию 2024
  const [years, setYears] = useState<string[]>([]); // добавляем состояние для списка годов

  useEffect(() => {
    const storedYear = getYearFromLocalStorage();
    if (storedYear) {
      setYear(storedYear);
    } else {
      setYearToLocalStorage('2024');
    }

    // Получаем список годов с сервера
    const fetchYears = async () => {
      try {
        const data = await YearService.getYears();
        setYears(data.map(yearObj => yearObj.name)); // предполагаем, что объект года имеет поле `year`
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    };

    fetchYears();
  }, []);

  const handleYearChange = (event: any) => {
    const selectedYear = event.target.value;
    setYear(selectedYear);
    setYearToLocalStorage(selectedYear);
  };

  const logoutHandler = () => {
    dispatch(logout());
    removeTokenFromLocalStorage('token');
    navigate('/auth');
  };

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

        {/* Выбор года */}
        <Select
          value={year}
          onChange={handleYearChange}
          sx={{ marginLeft: 'auto', marginRight: 2, color: 'inherit' }} // добавляем стили для выравнивания
        >
          {years.map((yearOption) => (
            <MenuItem key={yearOption} value={yearOption}>
              {yearOption}
            </MenuItem>
          ))}
        </Select>

        {isAuth ? (
          <div className="header-links" style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton>
                <SettingsIcon />
              </IconButton>
            </Link>
            <Link to={`/profile/${userName.id}`} className="header-username" style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton>
                <AccountCircleIcon />
                <Typography sx={{ ml: 1 }}>{userName.username}</Typography>
              </IconButton>
            </Link>
            <Button onClick={logoutHandler} startIcon={<ExitToAppIcon />} color="inherit">
              Выход
            </Button>
          </div>
        ) : (
          <Link to="/auth" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button startIcon={<ExitToAppIcon />} color="inherit">
              Войти
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
