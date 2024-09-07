import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/home/HomePage";
import PriceList from "../pages/price-list/PriceList";
import StudyModeList from "../pages/study-mode/StudyModeList";
import CourseList from "../pages/course/CourseList";
import SemesterList from "../pages/semester/SemesterList";
import Choise from "../pages/miniapp/Choise";
import GroupForm from "../pages/group/GroupForm";
import SemesterTabs from "../pages/lesson/SemesterTabs";
import MiniApp from "../pages/miniapp/MiniApp";

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
            {
                path: 'groups',
                element: <GroupForm />
            },
            {
                path: 'lessons',
                element: <SemesterTabs />
            }
        ]
    },
    {
        path: 'miniapp/:group_id',
        element: <Choise />
    },
    {
        path: 'order',
        element: <MiniApp />
    }
])