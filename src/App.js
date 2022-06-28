import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import IndexRouter from "./routes/IndexRouter";
import ThemeProvider from "./theme/ThemeProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <IndexRouter />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
