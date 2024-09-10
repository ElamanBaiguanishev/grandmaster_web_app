import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/home/HomePage";
import PriceList from "../pages/price-list/PriceList";
import StudyModeList from "../pages/study-mode/StudyModeList";
import CourseList from "../pages/course/CourseList";
import SemesterList from "../pages/semester/SemesterList";
// import Choise from "../pages/miniapp/Choise";
import GroupWithSemesterTabs from "../pages/group/GroupWithSemesterTabs";
import SemesterTabs from "../pages/lesson/SemesterTabs";
import MiniApp from "../pages/miniapp/legacy/MiniApp";
import MiniAppLayout from "../pages/miniapp/MiniAppLayout";
import MiniAppChoise from "../pages/miniapp/MiniAppChoise";
import MiniApp404 from "../pages/miniapp/MiniApp404";
import MiniAppTable from "../pages/miniapp/MiniAppTable";
import MiniAppFio from "../pages/miniapp/MiniAppFio";
import MiniAppQR from "../pages/miniapp/MiniAppQR";
import MiniAppAtachFile from "../pages/miniapp/MiniAppAtachFile";

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
                path: 'price-list',
                element: <PriceList />
            },
            {
                path: 'study-mode',
                element: <StudyModeList />
            },
            {
                path: 'courses',
                element: <CourseList />
            },
            {
                path: 'semesters',
                element: <SemesterList />
            },
            {
                path: 'groups',
                element: <GroupWithSemesterTabs />
            },
            {
                path: 'lessons',
                element: <SemesterTabs />
            }
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
                path: ':group_id/:choise',
                element: <MiniAppTable />,
            },
            {
                path: "fio",
                element: <MiniAppFio />
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
    },
    {
        path: 'order',
        element: <MiniApp />
    }
])