import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/home/HomePage";
import StudyModeTable from "../pages/study-mode/StudyModeTable";
import CourseTable from "../pages/course/CourseTable";
import SemesterTable from "../pages/semester/SemesterTable";
import GroupWithSemesterTabs from "../pages/group/GroupWithSemesterTabs";
import SemesterTabs from "../pages/price-list/SemesterTabs";
import MiniAppLayout from "../pages/miniapp/MiniAppLayout";
import MiniAppChoise from "../pages/miniapp/MiniAppChoise";
import MiniApp404 from "../pages/miniapp/MiniApp404";
import MiniAppTable from "../pages/miniapp/MiniAppTable";
import MiniAppFio from "../pages/miniapp/MiniAppFio";
import MiniAppQR from "../pages/miniapp/MiniAppQR";
import MiniAppAtachFile from "../pages/miniapp/MiniAppAtachFile";
import MiniAppChoiseTask from "../pages/miniapp/MiniAppChoiseTask";
import OrderPage from "../pages/order/OrderPage";
import LessonSemesterTabs from "../pages/lesson/LessonSemesterTabs";
import MiniAppPayment from "../pages/miniapp/MiniAppPayment";
import MiniAppDolyame from "../pages/miniapp/MiniAppDolyame";
import OrderTable from "../pages/order/OrderTable";
import ClientTable from "../pages/clients/ClientTable";
import Auth from "../pages/auth/Auth";
import { ProtectedRoute } from "../components/common/ProtectedRoute";
import RegistrationPage from "../pages/user/RegistrationForm";
import CreateClient from "../pages/clients/CreateClient";
import ReportPage from "../pages/report/ReportPage";
import ReportsPage from "../pages/report/ReportsPage";
import CreateRole from "../pages/role/CreateRole";
import Profile from "../pages/user/Profile";
import UserTable from "../pages/user/UserTable";
import RoleTable from "../pages/role/RoleTable";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        // errorElement: <MiniApp404 />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'auth',
                element: <Auth />
            },
            {
                path: 'reports',  // Добавляем маршрут для отчетов
                element: <ProtectedRoute><ReportsPage /></ProtectedRoute>
            },
            {
                path: 'reports/report1',  // Добавляем маршрут для отчетов
                // element: <ProtectedRoute><ReportsPage /></ProtectedRoute>
            },
            {
                path: 'reports/report2',  // Добавляем маршрут для отчетов
                element: <ProtectedRoute><ReportPage /></ProtectedRoute>
            },
            {
                path: 'price-list',
                element: <ProtectedRoute><SemesterTabs /></ProtectedRoute>
            },
            {
                path: 'study-mode',
                element: <ProtectedRoute><StudyModeTable /></ProtectedRoute>
            },
            {
                path: 'courses',
                element: <ProtectedRoute><CourseTable /></ProtectedRoute>
            },
            {
                path: 'semesters',
                element: <ProtectedRoute><SemesterTable /></ProtectedRoute>,
            },
            {
                path: 'groups',
                element: <ProtectedRoute><GroupWithSemesterTabs /></ProtectedRoute>
            },
            {
                path: 'lessons',
                element: <ProtectedRoute><LessonSemesterTabs /></ProtectedRoute>
            },
            {
                path: 'orders',
                element: <ProtectedRoute><OrderTable /></ProtectedRoute>
            },
            {
                path: 'orders/:order_id',
                element: <ProtectedRoute><OrderPage /></ProtectedRoute>
            },
            {
                path: 'ka-table',
                // element: <ProtectedRoute><RegistrationPage /></ProtectedRoute>
            },
            {
                path: 'clients',
                element: <ProtectedRoute><ClientTable /></ProtectedRoute>
            },
            {
                path: 'create-client',
                element: <ProtectedRoute><CreateClient /></ProtectedRoute>
            },
            {
                path: 'create-user',
                element: <ProtectedRoute><RegistrationPage /></ProtectedRoute>
            },
            {
                path: 'roles',
                element: <ProtectedRoute><RoleTable /></ProtectedRoute>
            },
            {
                path: 'create-role',
                element: <ProtectedRoute><CreateRole /></ProtectedRoute>
            },
            {
                path: 'users',
                element: <ProtectedRoute><UserTable /></ProtectedRoute>
            },
            {
                path: 'profile/:profile_id',
                element: <ProtectedRoute><Profile /></ProtectedRoute>
            },
        ]
    },
    {
        path: '/miniapp',
        element: <MiniAppLayout />,
        errorElement: <MiniApp404 />,
        children: [
            {
                path: ':group_id',
                element: <MiniAppChoise />,
            },
            {
                path: ':group_id/choisetask',
                element: <MiniAppChoiseTask />,
            },
            {
                path: ':group_id/:choise',
                element: <MiniAppTable />,
            },
            {
                path: "fio",
                element: <MiniAppFio />
            },
            {
                path: "payment",
                element: <MiniAppPayment />
            },
            {
                path: "dolyame",
                element: <MiniAppDolyame />
            },
            {
                path: 'qr',
                element: <MiniAppQR />
            },
            {
                path: 'final',
                element: <MiniAppAtachFile />
            }
        ]
    }
])