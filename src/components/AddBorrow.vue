<template>
  <div class="submit-form">
      <div v-if="!submitted">
        <Alert v-if="error">输入的图书/读者编号不存在！</Alert>
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
      <div v-else>
        <h4 style="margin: 100px auto">提交成功</h4>
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
      error: false,
			submitted: false
		};
	},
	methods: {
    submit() {
      this.data.borrow_time = new Date().getTime();
      console.log(this.data);
			BorrowService.create(this.data)
        .then(res => {
          console.log(res.data);
          this.submitted = true;
          BookInLibService.setstate(this.data.book_id, "已借出")
          .then()
          .catch(e=>console.log(e));
        })
        .catch(e => {
          this.data = {};
          this.error = true;
          console.log(e);
        });
    }
  }
}
</script>

<style>
.submit-form {
	max-width: 300px;
	margin: auto;
}
</style>