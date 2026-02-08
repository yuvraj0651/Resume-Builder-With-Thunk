import './App.css'
import Footer from './components/Layout/Footer/Footer'
import Header from './components/Layout/Header/Header'
import AuthPage from './components/Pages/AuthPage/AuthPage'
import { Route, Routes } from "react-router-dom";
import ResumeBuilder from './components/Pages/Resume Builder/ResumeBuilder';
import Admin from "./components/Pages/Admin/Admin";
import ProtectedRoutes from './components/Routes/ProtectedRoutes';

function App() {

  return (
    <>
      {/* Header Component */}
      <Header />
      <main className="main-section">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/resume" element={
            <ProtectedRoutes>
              <ResumeBuilder />
            </ProtectedRoutes>
          } />
          <Route path="/admin" element={
            <ProtectedRoutes>
              <Admin />
            </ProtectedRoutes>
          } />
        </Routes>
      </main>
      {/* Footer Component */}
      <Footer />
    </>
  )
}

export default App
