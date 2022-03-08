import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react"
import Menu from "./routes/Menu"
import Login from "./routes/Login"
import PrivateRoute from "./components/PrivateRoute"
import SingUp from "./routes/SingUp"
import NavBar from "./components/NavBar"
import NotFoundPage from "./routes/NotFoundPage"
import Footer from "./components/Footer"
import { AuthProvider } from "./contexts/AuthContext"
import About from "./routes/About"
// eslint-disable-next-line no-unused-vars
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import ResetPassword from "./routes/ResetPassword"
import { StoreProvider, createStore } from "easy-peasy"
import model from "./models/model"
import Order from "./routes/Order"
import { deepOrange, green, lime } from "@mui/material/colors"

const store = createStore(model)

const queryClient = new QueryClient()

export default function App() {
  const [darkMode, setDarkMode] = React.useState(false)

  function toggleTheme() {
    setDarkMode(prevDarkMode => !prevDarkMode)
  }

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: green,
    },
  })

  const navBartTheme = createTheme({
    palette: {
      primary: lime,
      secondary: deepOrange,
    },
  })

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <StoreProvider store={store}>
            <ThemeProvider theme={navBartTheme}>
              <NavBar toggleTheme={toggleTheme} isDarkMode={darkMode} />
            </ThemeProvider>
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Menu />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/reactFoodMenu"
                  element={
                    <PrivateRoute>
                      <Menu />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/order"
                  element={
                    <PrivateRoute>
                      <Order />
                    </PrivateRoute>
                  }
                />
                <Route path="/signUp" element={<SingUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <Footer />
            </ThemeProvider>
          </StoreProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
