import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Blog from "../pages/Blog/Blog";
import Sale from "../pages/Sale/Sale";
import ContactUs from "../pages/ContactUs/ContactUs";
import ProductPage from "../pages/ProductPage/ProductPage";

export const routes = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/home",
				element: <Home />
			},
			{
				path: "/shop",
				element: <Shop />
			},
			{
				path: "/blog",
				element: <Blog />
			},
			{
				path: "/sale",
				element: <Sale />
			},
			{
				path: "/contact_us",
				element: <ContactUs />
			},
			{
				path: 'shop/:productId',
				element: <ProductPage />
			}
		]
	},
	{
		path: "*",
		element: <NotFound />
	}
])