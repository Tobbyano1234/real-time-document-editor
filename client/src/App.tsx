import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import { TextEditor } from "./components/TextEditor"
import { LandingPage } from "./components/LandingPage"
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";

function App() {
  // const queryClient = new QueryClient()

  return (
    // <QueryClientProvider client={queryClient}>
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/documents/:id" element={<TextEditor />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
    // </QueryClientProvider>
  )
}

export default App
