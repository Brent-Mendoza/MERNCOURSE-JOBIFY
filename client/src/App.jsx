import { createBrowserRouter, RouterProvider } from "react-router-dom"
import {
  HomeLayout,
  Register,
  Landing,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
} from "./pages"
import { action as registerAction } from "./pages/Register"
import { action as loginAction } from "./pages/Login"
import { action as profileAction } from "./pages/Profile"
import { action as addJob } from "./pages/AddJob"
import { action as editJob } from "./pages/EditJob"
import { action as deleteJob } from "./pages/DeleteJob"
import { loader as DashboardLoader } from "./pages/DashboardLayout"
import { loader as AllJobsLoader } from "./pages/AllJobs"
import { loader as EditJobLoader } from "./pages/EditJob"
import { loader as AdminLoader } from "./pages/Admin"
import { loader as StatsLoader } from "./pages/Stats"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import ErrorElement from "./components/ErrorElement"

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true"
  document.body.classList.toggle("dark-theme", isDarkTheme)
  return isDarkTheme
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: "register",
          element: <Register />,
          action: registerAction,
        },
        {
          path: "login",
          element: <Login />,
          action: loginAction(queryClient),
        },
        {
          path: "dashboard",
          element: <DashboardLayout queryClient={queryClient} />,
          loader: DashboardLoader(queryClient),
          children: [
            {
              index: true,
              element: <AddJob />,
              action: addJob(queryClient),
            },
            {
              path: "stats",
              element: <Stats />,
              loader: StatsLoader(queryClient),
              errorElement: <ErrorElement />,
            },
            {
              path: "all-jobs",
              element: <AllJobs />,
              loader: AllJobsLoader(queryClient),
              errorElement: <ErrorElement />,
            },
            {
              path: "profile",
              element: <Profile />,
              action: profileAction(queryClient),
            },
            {
              path: "admin",
              element: <Admin />,
              loader: AdminLoader,
            },
            {
              path: "edit-job/:id",
              element: <EditJob />,
              loader: EditJobLoader(queryClient),
              action: editJob(queryClient),
            },
            {
              path: "delete-job/:id",
              action: deleteJob(queryClient),
            },
          ],
        },
      ],
    },
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialisOpen={false} />{" "}
    </QueryClientProvider>
  )
}

export default App
