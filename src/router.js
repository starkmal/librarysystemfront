import Vue from "vue";
import Router from "vue-router";
//import login from '@/components/login';

Vue.use(Router);

export default new Router({
	mode: "history",
	routes: [
		{
            path: "/",
            alias: "/home",
            name: "Home",
            component: () => import("./components/Home")
        },
        {
            path: "/reader",
            name: "Reader",
            component: () => import("./components/Reader")
        },
        {
            path: "/book",
            name: "Book",
            meta: {show: true},
            component: () => import("./components/Book"),
        },
        {
            path: "/book/addbook",
            name: "AddBook",
            component: () => import("./components/AddBook")
        },
        {
            path: "/reader/addreader",
            name: "AddReader",
            component: () => import("./components/AddReader")
        },
		{
			path: "/book/:id",
			name: "Book-Detail",
			component: () => import("./components/BookDetail")
		},
        {
            path: "/reader/:id",
            name: "Reader-Detail",
            component: () => import("./components/ReaderDetail")
        },
        {
            path: "/login",
            name: "Login",
            meta: {show: true},
            component: () => import("./components/Login"),
		},
        {
            path: "/borrow",
            name: "Borrow",
            component: () => import("./components/Borrow")
        },
        {
            path: "/borrow/addborrow",
            name: "AddBorrow",
            component: () => import("./components/AddBorrow")
        },
        {
            path:"/people",
            name:"people",
            component: () => import("./components/People")
        },
        {
            path:"/people/pwchange",
            name:"changepassword",
            component: () => import("./components/findP")
        }
	]
  });