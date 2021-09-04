<template>
<div class="submit-form">
	<div v-if="!submitted">
	<div class="form-group">
		<label for="isbn">ISBN</label>
		<input
			class="form-control"
			id="isbn"
			required
			v-model="book.isbn"
			name="isbn"
		/>
	</div>

	<div class="form-group">
		<label for="title">书名</label>
		<input
			class="form-control"
			id="title"
			required
			v-model="book.title"
			name="title"
		/>
	</div>

	<div class="form-group">
		<label for="author">作者</label>
		<input
			class="form-control"
			id="author"
			required
			v-model="author"
			name="author"
		/>
	</div>

	<div class="form-group">
		<label for="price">价格</label>
		<input
			class="form-control"
			id="price"
			required
			v-model="book.price"
			name="price"
		/>
	</div>

	<div class="form-group">
		<label for="description">描述</label>
		<input
			class="form-control"
			id="description"
			v-model="book.description"
			name="description"
		/>
	</div>

	<div class="form-group">
		<label for="publisher">出版社</label>
		<input
			class="form-control"
			id="publisher"
			v-model="book.publisher"
			name="publisher"
		/>
	</div>

	<div class="form-group">
		<label for="year">年份</label>
		<input
			class="form-control"
			id="year"
			v-model="book.year"
			name="year"
		/>
	</div>

	<div class="form-group">
		<label for="popularity">推荐度</label>
		<input
			class="form-control"
			id="popularity"
			v-model="book.popularity"
			name="popularity"
		/>
	</div>

	<div class="form-group">
		<label for="location">位置</label>
		<input
			class="form-control"
			id="location"
			required
			v-model="location"
			name="location"
		/>
	</div>

	<button @click="submit" class="btn btn-success">Submit</button>
	</div>

	<div v-else>
		<h4>You submitted successfully!</h4>
	</div>
</div>
</template>

<script>
import BookService from "../services/BookService";
import AuthorService from "../services/AuthorService";
import BookInLibService from "../services/BookInLibService";

export default {
	name: "add-book",
	data() {
		return {
			id: null,
			location: "",
			author: "",
			book: {
				isbn: null,
				price: "",
				title: "",
				description: "",
				publisher: "",
				year: null,	
				aid: -1,
				popularity: 0
			},
			submitted: false,
			book_exist: false
		};
	},
	methods: {
		checkISBN() {
			return true;
		},
		checkAuthor() {
			if (this.book.aid == -1) {
				let data = {
					name: this.author
				};
				AuthorService.create(data)
					.then(res => {
						this.book.aid = res.data.id;
					})
					.catch(e => console.log(e));
			}
		},

		saveBook() {
			BookService.create(this.book)
				.then(res => console.log(res.data))
				.catch(e => console.log(e));
		},

		updateBook() {
			BookService.update(this.book.isbn, this.book)
				.then(res => console.log(res.data))
				.catch(e => console.log(e));
		},

		submit() {
			this.checkAuthor();
			if (this.book_exist) this.updateBook();
			else this.saveBook();
			let data = {
				isbn: this.book.isbn,
				location: this.location,
				state: "inlib"
			};
			BookInLibService.create(data)
				.then(res => {
					console.log(res.data);
					this.id = res.data.id;
				})
				.catch(e => console.log(e));
			this.submitted = true;
		},

		handleISBN(isbn) {
			console.log(isbn);
			BookService.get(isbn)
				.then(res => {
					if (res == null) {
						this.book_exist = false;
						return;
					}
					console.log(res.data);
					this.book_exist = true;
					this.book = res.data;
				})
				.catch(e => console.log(e));
		},

		handleAuthor(name) {
			AuthorService.getByName(name)
				.then(res => {
					if (res != null) {
						//此处返回了一个author列表，需实现一个下拉框选择
						console.log(res.data[0]);
						this.book.aid = res.data[0].id;
					}
				})
		}
	},
	watch: {
		'book.isbn': function(val) {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.handleISBN(val);
			}, 300)
		},
		author: function(val) {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.handleAuthor(val);
			}, 300)
		}
	}
};
</script>

<style>
.submit-form {
	max-width: 300px;
	margin: auto;
}
</style>