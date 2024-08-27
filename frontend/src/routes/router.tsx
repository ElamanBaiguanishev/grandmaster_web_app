import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/home/HomePage";
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
            }
        ]
    },
    {
        path: 'miniapp',
        element: <MiniApp />
    }
])