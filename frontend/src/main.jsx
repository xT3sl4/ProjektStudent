import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductTrackerForm from "./ProductTrackerForm.jsx";

createRoot(document.getElementById('root')).render(
    <div>
        <App />
        <ProductTrackerForm />
    </div>
)