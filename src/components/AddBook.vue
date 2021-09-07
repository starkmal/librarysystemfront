<template>
<div class="submit-form">
	<div v-if="!submitted">
	<div class="form-group">
		<label for="isbn">ISBN</label>
		<input
			class="form-control"
			id="isbn"
			required
			v-model="data.book.isbn"
			name="isbn"
		/>
	</div>

	<div class="form-group">
		<label for="title">书名</label>
		<input
			class="form-control"
			id="title"
			required
			v-model="data.book.title"
			name="title"
		/>
	</div>

	<div class="form-group">
		<label for="author">作者</label>
		<input
			class="form-control"
			id="author"
			required
			v-model="data.book.author.name"
			name="author"
		/>
	</div>

	<div class="form-group">
		<label for="price">价格</label>
		<input
			class="form-control"
			id="price"
			required
			v-model="data.book.price"
			name="price"
		/>
	</div>

	<div class="form-group">
		<label for="description">描述</label>
		<input
			class="form-control"
			id="description"
			v-model="data.book.description"
			name="description"
		/>
	</div>

	<div class="form-group">
		<label for="publisher">出版社</label>
		<input
			class="form-control"
			id="publisher"
			v-model="data.book.publisher"
			name="publisher"
		/>
	</div>

	<div class="form-group">
		<label for="year">年份</label>
		<input
			class="form-control"
			id="year"
			v-model="data.book.year"
			name="year"
		/>
	</div>

	<div class="form-group">
		<label for="popularity">推荐度</label>
		<input
			class="form-control"
			id="popularity"
			v-model="data.book.popularity"
			name="popularity"
		/>
	</div>

	<div class="form-group">
		<label for="location">位置</label>
		<input
			class="form-control"
			id="location"
			required
			v-model="data.location"
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
			data: {
				location: null,
				book: {
					title: null,
					popularity: null,
					year: null,
					publisher: null,
					isbn: null,
					description: null,
					price: null,
					author: {
						name: null
					}
				}
			},
			submitted: false
		};
	},
	methods: {

		submit() {
			AuthorService.getByName(this.data.book.author.name)
			.then(() => this.step2()) //作者已在库中
			.catch(()=>{
				let data = {
					name: this.data.book.author.name,
					desc: "还没有描述"
				};
				AuthorService.create(data)
				.then(res=>{
					console.log(res.data);
					this.data.book.author = res.data;
					this.step2();
				})
				.catch(e => console.log(e));
			}); //作者未在库中
		},

		step2() {
			BookService.get(this.data.book.isbn)
			.then(()=>{
				BookService.update(this.data.book.isbn, this.data.book)
				.then(() => this.step3())
				.catch(e=>console.log(e))
			}) //书已在库中，更新
			.catch(()=>{
				let param = {
					isbn: this.data.book.isbn,
					description: this.data.book.description,
					popularity: this.data.book.popularity,
					price: this.data.book.price,
					publisher: this.data.book.publisher,
					title: this.data.book.title,
					year: this.data.book.year,
					author_id: this.data.book.author.id,
				};
				BookService.create(param)
				.then(res => {
					console.log(res.data);
					this.data.book = res.data;
					this.step3();
				})
				.catch(e=>console.log(e));
			}); //书未在库中，提交
		},

		step3() {
			let data = {
				book_isbn: this.data.book.isbn,
				location: this.data.location,
				state: "在库"
			};
			console.log(data);

			BookInLibService.create(data)
			.then()
			.catch(e=>console.log(e));

			this.submitted = true;
		},

		async handleISBN(isbn) {
			await BookService.get(isbn)
				.then(res => {
					console.log(res.data);
					this.data.book = res.data;
				})
				.catch(e => console.log(e));
		}
	},
	/*
	添加watch事件
	作用是监视isbn,author输入框的变动，以进行自动填充/建议
	使用timer在用户输入停止300ms后再发送请求
	*/
	watch: {
		'data.book.isbn': function(val) {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.handleISBN(val);
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