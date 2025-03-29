import CustomerLoginForm from "./components/customerLoginForm.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from "./pages/dashboard.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={ <CustomerLoginForm /> } />
                <Route path={"dashboard"} element={ <Dashboard /> } />
            </Routes>
        </Router>
    )
}

export default App;