import Vue from "vue";
import Router from "vue-router";

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
            path: "/borrow",
            name: "Borrow",
            component: () => import("./components/Borrow")
        },
        {
            path: "/borrow/addborrow",
            name: "AddBook",
            component: () => import("./components/AddBorrow")
        }
	]
  });