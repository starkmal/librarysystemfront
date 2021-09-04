import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
	mode: "history",
	routes: [
	{
		path: "/book/add",
		name: "book-add",
		component: () => import("./components/AddBook")
	}
	]
  });