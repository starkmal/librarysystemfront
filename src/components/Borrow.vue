<template>
  <div class="book">
    <Row type="flex" justify="space-around" class="code-row-bg">
      <i-col class="search">
        <Input v-model="searchTitle" size="large" placeholder="  查询图书">
          <Select v-model="select" slot="prepend" style="width: 80px">
            <Option value="isbn">ISBN</Option>
            <Option value="title">书名</Option>
            <Option value="readername">读者</Option>
          </Select>
          <Button slot="append" icon="ios-search"
          @click="page = 1; retrieveBorrows();"
          ></Button>
        </Input>
      </i-col>
      <i-col class="add">
        <Button type="primary" size="large" @click="addBorrow">新建借阅</Button>
      </i-col>
    </Row>
    <Row>
      <Page class="page" 
      v-bind:total="count" show-total show-elevator show-sizer
      @on-change="handlePageChange"
      @on-page-size-change="handlePageSizeChange"
      ></Page>
    </Row>
    <Row class = "tables">
      <i-table stripe border :columns="column" :data="tabledata"></i-table>
    </Row>
  </div>
</template>

<script>
import AddBorrow from "@/components/AddBorrow";
import BorrowService from "../services/BorrowService";

export default {
  name: "Book",
  components: AddBorrow,
  data () {
    return {
      select: '',
      borrows: [],
      tabledata: [],
      currentBook: null,
      currentIndex: -1,
      searchTitle: "",

      page: 1,
      count: 0,
      pageSize: 10,

      column: [
        {
          title: 'BID',
          key: 'bid'
        },
        {
          title: 'ISBN',
          key: 'isbn'
        },
        {
          title: '书名',
          key: 'title'
        },
        {
          title: '借阅者',
          key: 'name'
        },
        {
          title: '借出时间',
          key: 'time'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render (row,column,index) {
              console.log(column + index);
              return `<i-button type="primary" size="small" >查看</i-button>`;
          }
          // render: (h) => {
          //   return h('div',[
          //       h('span', {
          //         style: {
          //           cursor: 'pointer',
          //           color: '#3399ff',
          //         },
          //         on: {
          //           click: () => {
          //             this.$router.push('/book/${isbn}')
          //           }
          //         }
          //       }, '编辑'),
          //       h('span', '  |  '),
          //       h('span', {
          //         style: {
          //           cursor: 'pointer',
          //           color: '#3399ff',
          //         },
          //         on: {
          //           click: () => {
          //             this.$router.push('/book/bookadd')
          //           }
          //         }
          //       }, '删除')
          //   ]);
          // }
        }
      ]
    }
  },
  methods: {
    addBorrow() {
      this.$router.push('/borrow/addborrow')
    },

    getRequestParams() {
      let params = {};

      if (this.searchTitle) {
        params[this.select] = this.searchTitle;
      }

      if (this.page) {
        params["page"] = this.page - 1;
      }

      if (this.pageSize) {
        params["size"] = this.pageSize;
      }

      return params;
    },

    retrieveBorrows() {
      const params = this.getRequestParams();

      BorrowService.getAll(params)
        .then((res) => {
          const { borrows, totalItems } = res.data;
          this.borrows = borrows;
          this.count = totalItems;
          this.tabledata = [];
          for (let i = 0; i < this.borrows.length; i ++) {
            this.tabledata.push({
              bid: this.borrows[i].book.id,
              isbn: this.borrows[i].book.book.isbn,
              title: this.borrows[i].book.book.title,
              name: this.borrows[i].reader.name,
              time: this.borrows[i].borrowTime
            })
          }
          console.log(this.borrows);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    handlePageChange(value) {
      console.log(value);
      this.page = value;
      this.retrieveBorrows();
    },

    handlePageSizeChange(value) {
      console.log(value);
      this.pageSize = value;
      this.page = 1;
      this.retrieveBorrows();
    }
  }
}
</script>

<style scoped>
.search {
  width: 50%;
  margin: 40px 0 0;
}
.add{
  margin: 40px 0 0;
}
.page{
  margin: 20px 40px 10px;
  float: right;
}
.tables{
  margin: 10px 40px 0;
  border-radius: 10px;
}
.show{
  text-align: center;
  color: #464c5b;
  cursor: pointer;
}
</style>