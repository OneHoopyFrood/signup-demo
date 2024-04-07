import { createRoot } from "react-dom/client"
import App from "./components/App"

// Clear any existing HTML content and replace it with a fresh root element
document.body.innerHTML = '<div id="root"></div>'

// Render the root component into the root element
const root = createRoot(document.getElementById("root") as Element) // Type assertion is safe because we just created the element
root.render(<App />)
