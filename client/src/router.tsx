import {createBrowserRouter} from "react-router-dom";
import App from "@/components/App/App";
import {Suspense} from "react";
import {LazyAbout} from "@/pages/about/About.lazy";
import {LazyShop} from "@/pages/shop/Shop.lazy";
import {LazyLogin} from "@/pages/login/LoginPageLazy";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path:"/about",
                element:<Suspense fallback={<h1>loading...</h1>}><LazyAbout/></Suspense>
            },
            {
                path:"/shop",
                element:<Suspense fallback={<h1>loading...</h1>}><LazyShop/></Suspense>
            },
            {
                path:"/login",
                element:<Suspense fallback={<h1>loading...</h1>}><LazyLogin/></Suspense>
            }
        ]
    },
]);