import { BrowserRouter } from "react-router-dom";
import Pages from "./pages";
import { AppProvider } from "./providers";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Pages />
        <ToastContainer />
      </AppProvider>
    </BrowserRouter>
  );
} 

export default App;
