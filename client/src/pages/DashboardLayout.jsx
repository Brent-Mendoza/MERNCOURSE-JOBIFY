import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom"
import Wrapper from "../assets/wrappers/Dashboard"
import { BigSidebar, Loading, Navbar, SmallSidebar } from "../components"
import { createContext, useContext, useEffect, useState } from "react"
import { checkDefaultTheme } from "../App"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"
import { useQuery } from "@tanstack/react-query"

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch.get("/users/current-user")
    return data
  },
}

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery)
  } catch (error) {
    return redirect("/")
  }
}

const DashboardContext = createContext()

const DashboardLayout = ({ queryClient }) => {
  const { user } = useQuery(userQuery).data
  const navigate = useNavigate()
  const navigation = useNavigation()
  const isPageLoading = navigation.state === "loading"
  const [showSidebar, setShowSideBar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme())
  const [isAuthError, setIsAuthError] = useState(false)

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme((prev) => !prev)
    document.body.classList.toggle("dark-theme", newDarkTheme)
    localStorage.setItem("darkTheme", newDarkTheme)
  }
  const toggleSideBar = () => {
    setShowSideBar((prev) => !prev)
  }

  const logoutUser = async () => {
    navigate("/")
    await customFetch.get("/auth/logout")
    queryClient.invalidateQueries()
    toast.success("Logged Out")
  }

  customFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true)
      }
      return Promise.reject(error)
    }
  )

  useEffect(() => {
    if (!isAuthError) return
    logoutUser()
  }, [isAuthError])

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSideBar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => {
  const context = useContext(DashboardContext)
  if (!context) throw new Error("Must be used inside the Dashboard Context")

  return context
}

export default DashboardLayout
