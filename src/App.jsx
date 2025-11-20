import { MovieProvider } from "./context/MovieContext";
import Main from "./components/Main";

export default function App() {
  return (
    <MovieProvider>
      <Main />
    </MovieProvider>
  );
}