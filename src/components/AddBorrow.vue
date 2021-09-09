<template>
  <div>
  <div class="layout-breadcrumb">
    <Breadcrumb>
      <Breadcrumb-item to="/">首页</Breadcrumb-item>
      <Breadcrumb-item to="/borrow">借阅管理</Breadcrumb-item>
      <Breadcrumb-item>新建借阅</Breadcrumb-item>
    </Breadcrumb>
  </div>
  <div class="submit-form">
        <Alert v-if="error">输入的图书/读者编号不存在！或者图书已被借出！</Alert>
        <h4 style="text-align: center ;margin: 20px">新建借阅</h4>
        <Form ref="data" :model="data" :rules="ruleValidate" :label-width="80">
          <Form-item label="图书编号" prop="book_id">
            <Input v-model="data.book_id" size="large" placeholder="请输入图书编号"></Input>
          </Form-item>
          <Form-item label="读者编号" prop="reader_id">
            <Input v-model="data.reader_id" size="large" placeholder="请输入读者编号"></Input>
          </Form-item>
        </Form>
        <div id="btn" style="text-align:center">
          <Button type="primary" size="large" @click="submit">提交</Button>
        </div>
    </div>
    </div>
</template>

<script>
import BookInLibService from '../services/BookInLibService';
import BorrowService from "../services/BorrowService";

export default {
	name: "add-book",
	data() {
		return {
			data: {
        reader_id: null,
        book_id: null,
        borrow_time: null
      },
      error: false
		};
	},
	methods: {
    submit() {
      this.data.borrow_time = new Date().getTime() + 28800000;
      console.log(this.data);
			BorrowService.create(this.data)
        .then(res => {
          console.log(res.data);
          BookInLibService.setstate(this.data.book_id, "已借出")
          .then(()=>this.submitted())
          .catch(e=>console.log(e));
        })
        .catch(e => {
          this.data = {};
          this.error = true;
          console.log(e);
        });
    },
    submitted() {
			this.$Message.success('创建成功！');
			this.$router.push(`/borrow`);
    }
  },
  created() {
    this.data.book_id = this.$route.params.id;
  }
}
</script>

<style>
.submit-form {
	max-width: 300px;
	margin: auto;
}
</style>