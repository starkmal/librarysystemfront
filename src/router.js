import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
	mode: "history",
	routes: [
	{
		path: "/",
		alias: "/books",
		name: "books",
		component: () => import("./components/BookList")
		},
	{
		path: "/book/add",
		name: "book-add",
		component: () => import("./components/AddBook")
	}
	]
  });