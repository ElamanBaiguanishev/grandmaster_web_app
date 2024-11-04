import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

interface CustomScrollableTabsProps {
    items: { id: number, name: string }[];
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const CustomScrollableTabs: React.FC<CustomScrollableTabsProps> = ({ items, value, onChange }) => {
    return (
        <Box sx={{ overflowX: 'auto', width: '100%' }}>
            <Tabs
                value={value}
                onChange={onChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    '& .MuiTabs-scroller': {
                        overflowX: 'auto', // Горизонтальная прокрутка для скроллера
                    },
                    '& .MuiTab-root': {
                        textTransform: 'none', // Отключаем капс в названиях вкладок
                        minWidth: 'auto',      // Убираем минимальную ширину вкладок
                        flexShrink: 0,        // Предотвращаем уменьшение вкладок
                        padding: '0 12px',    // Добавляем немного внутреннего отступа
                    },
                    '@media (max-width: 1024px)': {
                        '& .MuiTab-root': {
                            fontSize: '0.875rem', // Уменьшаем размер шрифта на средних экранах
                            padding: '0 8px',     // Уменьшаем внутренние отступы
                        },
                    },
                    '@media (max-width: 768px)': {
                        '& .MuiTab-root': {
                            fontSize: '0.75rem',  // Уменьшаем размер шрифта на маленьких экранах
                            padding: '0 6px',     // Уменьшаем внутренние отступы
                        },
                    },
                    '@media (max-width: 480px)': {
                        '& .MuiTab-root': {
                            fontSize: '0.625rem', // Еще меньше размер шрифта на очень маленьких экранах
                            padding: '0 4px',     // Еще меньше внутренние отступы
                        },
                    },
                }}
            >
                {items.map((item) => (
                    <Tab key={item.id} label={item.name} />
                ))}
            </Tabs>
        </Box>
    );
};

export default CustomScrollableTabs;
