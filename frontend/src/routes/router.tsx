import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/home/HomePage";
import MiniApp from "../pages/miniapp/MiniApp";
import PriceList from "../pages/price-list/PriceList";
import StudyModeList from "../pages/study-mode/StudyModeList";
import CourseList from "../pages/course/CourseList";
import SemesterList from "../pages/semester/SemesterList";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        // errorElement: <ErrorPage />,
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
        ]
    },
    {
        path: 'miniapp/:group_id',  // Добавляем параметр group_id
        element: <MiniApp />
    }
])