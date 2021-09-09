<template>
  <div class="book">
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <Breadcrumb-item to="/">首页</Breadcrumb-item>
        <Breadcrumb-item>借阅管理</Breadcrumb-item>
      </Breadcrumb>
    </div>
    <Row type="flex">
      <i-col class="add">
        <Button type="primary" size="large" @click="addBorrow">+ 新建借阅</Button>
      </i-col>
      <i-col class="search">
        <Input v-model="searchTitle" size="large" placeholder="  查询借阅记录">
          <Select v-model="select" slot="prepend" style="width: 80px">
            <Option value="isbn">ISBN</Option>
            <Option value="title">书名</Option>
            <Option value="readername">读者用户名</Option>
            <Option value="id">BID</Option>
          </Select>
          <Button slot="append" icon="ios-search"
          @click="page = 1; retrieveBorrows();"
          ></Button>
        </Input>
      </i-col>
      <i-col class="switch">
        <span style="color: rgb(141,146,158); margin-right: 10px">仅显示未归还</span>
        <i-switch v-model="borrowed"></i-switch>
      </i-col>
    </Row>
    
    <Row class = "tables">
      <i-table stripe border :columns="column" :data="tabledata"></i-table>
    </Row>
    <Row>
      <Page class="page" 
      v-bind:total="count" show-total show-elevator show-sizer
      @on-change="handlePageChange"
      @on-page-size-change="handlePageSizeChange"
      ></Page>
    </Row>
  </div>
</template>

<script>
import AddBorrow from "@/components/AddBorrow";
import BorrowService from "../services/BorrowService";
import BookInLibService from '../services/BookInLibService';

export default {
  name: "Book",
  components: AddBorrow,
  data () {
    return {
      select: 'title',
      borrows: [],
      tabledata: [],
      currentBook: null,
      currentIndex: -1,
      searchTitle: "",
      borrowed: true,

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
          title: '归还时间',
          key: 'rtime'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('span', {
                  style: {
                    cursor: 'pointer',
                    color: '#3399ff',
                  },
                  on: {
                    click: () => {
                      this.finishborrow(params.row);
                    }
                  }
                }, '完成');
          }
        }
      ]
    }
  },
  methods: {
    finishborrow(borrow) {
      if (borrow.rtime != null) {
        this.$Message.error('该次借阅已经完成！');
        return;
      }
      console.log(borrow);
      let data = {
        id: borrow.id,
        time: new Date().getTime() + 28800000
      };
      BorrowService.update(data)
      .then(() => {
        this.retrieveBorrows();
        BookInLibService.setstate(borrow.bid, "在库")
        .then(()=>this.$Message.success('归还成功！'))
        .catch(e=>console.log(e));
      })
      .catch(e => console.log(e));
    },
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

      params["borrowed"] = this.borrowed;

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
              id: this.borrows[i].id,
              bid: this.borrows[i].book.id,
              isbn: this.borrows[i].book.book.isbn,
              title: this.borrows[i].book.book.title,
              name: this.borrows[i].reader.name,
              time: this.borrows[i].borrowTime,
              rtime: this.borrows[i].returnTime
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
  margin: 40px 40px 0;
}
.switch{
  margin: 45px 40px 0;
  
}
.page{
  margin: 20px 40px 10px;
  float: right;
}
.tables{
  margin: 30px 40px 0;
  border-radius: 10px;
}
</style>