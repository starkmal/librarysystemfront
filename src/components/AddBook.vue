<template>
  <div>
	<div class="layout-breadcrumb">
    <Breadcrumb>
      <Breadcrumb-item to="/">首页</Breadcrumb-item>
      <Breadcrumb-item to="/book">图书管理</Breadcrumb-item>
      <Breadcrumb-item>新建书籍</Breadcrumb-item>
    </Breadcrumb>
  </div>
  <div class="submit-form">
        <h4 style="text-align: center ;margin: 20px">新书入库</h4>
        <Row id="form1" type="flex" gutter="40">
          <i-col style="width: 50%">
            <Form ref="data.book" :model="data.book" :rules="ruleValidate" :label-width="100">
              <Form-item label="ISBN：" prop="isbn">
                <Input v-model="data.book.isbn" size="large" placeholder="请输入ISBN"></Input>
              </Form-item>
              <Form-item label="作品名称：" prop="title">
                <Input v-model="data.book.title" size="large" placeholder="请输入作品名称"></Input>
              </Form-item>
            </Form>
			<Form ref="data.book.author" :model="data.book.author" :rules="ruleValidate.author" :label-width="100">
              <Form-item label="作者：" prop="name">
                <Input v-model="data.book.author.name" size="large" placeholder="请输入作者"></Input>
              </Form-item>
			</Form>
			<Form ref="data" :model="data" :rules="ruleValidate" :label-width="100">
              <Form-item label="馆内位置：" prop="location">
                <Input v-model="data.location" size="large" placeholder="请输入馆内位置"></Input>
              </Form-item>
			</Form>
          </i-col>
          <i-col style="width: 50%">
            <Form ref="data.book" :model="data.book" :rules="ruleValidate" :label-width="80">
              <Form-item label="出版社：" prop="publisher">
                <Input v-model="data.book.publisher" size="large" placeholder="请输入出版社"></Input>
              </Form-item>
              <Form-item label="定价：" prop="price">
                <Input v-model="data.book.price" size="large" placeholder="请输入定价"></Input>
              </Form-item>
              <Form-item label="出版年：" prop="year">
                <Input v-model="data.book.year" size="large" placeholder="请输入出版年"></Input>
              </Form-item>
              <Form-item label="推荐指数：" prop="popularity">
                <Input v-model="data.book.popularity" size="large" placeholder="请输入推荐指数"></Input>
              </Form-item>
            </Form>
          </i-col>
        </Row>
        <div id="form2">
            <Form ref="data.book" :model="data.book" :rules="ruleValidate" :label-width="100">
              <Form-item label="简介：" prop="description">
                <Input v-model="data.book.description" size="large"
                       type="textarea"
                       rows="5" placeholder="请输入作品简介"></Input>
              </Form-item>
            </Form>
          </div>
        <div id="btn" style="text-align:center">
          <Button type="primary" size="large" @click="submit">提交</Button>
        </div>
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
			ruleValidate: {
				isbn: [
				{required: true, message: 'ISBN不能为空', trigger: 'blur'},
				{type: 'string', len: 13, message: 'ISBN是13位数字，请输入正确格式', trigger: 'blur'}
				],
				title: [{required: true, message: '作品名称不能为空', trigger: 'blur'}],
				author: {
					name: [{required: true, message: '作者不能为空', trigger: 'blur'}]
				},
				publisher: [{required: true, message: '出版社不能为空', trigger: 'blur'}],
				location: [{required: true, message: '位置不能为空', trigger: 'blur'}]
			}
		};
	},
	methods: {

		submit() {
			AuthorService.getByName(this.data.book.author.name)
			.then(res => {
				this.data.book.author = res.data[0];
				console.log(this.data.book.author);
				this.step2();
			}) //作者已在库中
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
			.then(() => this.submitted())
			.catch(e=>console.log(e));
		},
		submitted() {
			this.$Message.success('创建成功！');
			this.$router.push(`/book/${this.data.book.isbn}`);
		},

		async handleISBN(isbn) {
			await BookService.get(isbn)
				.then(res => {
					this.data.book = res.data;
					// this.data.book = {
					// 	title: res.data.title,
					// 	popularity: res.data.popularity,
					// 	year: res.data.year,
					// 	publisher: res.data.publisher,
					// 	isbn: res.data.isbn,
					// 	description: res.data.description,
					// 	price: res.data.price,
					// 	author: {
					// 		name: null
					// 	}
					// };
				});
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

<style scoped>
.submit-form {
	max-width: 70%;
	margin: 30px auto;
}
.form-left {
  width: 50%;
}
.form-right {
  width: 50%;
}
</style>