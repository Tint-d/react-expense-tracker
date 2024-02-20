import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Fallback from "../utils/Fallback";
import { paths } from "./paths";
import Layout from "../utils/Layout";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Expense = lazy(() => import("../pages/Expense"));
const Income = lazy(() => import("../pages/Income"));
const Report = lazy(() => import("../pages/Report"));

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: paths.dashboard,
      element: (
        <Suspense fallback={<Fallback />}>
          <Layout>
            <Dashboard />
          </Layout>
        </Suspense>
      ),
    },
    {
      path: paths.expense,
      element: (
        <Suspense fallback={<Fallback />}>
          <Layout>
            <Expense />
          </Layout>
        </Suspense>
      ),
    },
    {
      path: paths.income,
      element: (
        <Suspense fallback={<Fallback />}>
          <Layout>
            <Income />
          </Layout>
        </Suspense>
      ),
    },
    {
      path: paths.report,
      element: (
        <Suspense fallback={<Fallback />}>
          <Layout>
            <Report />
          </Layout>
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
