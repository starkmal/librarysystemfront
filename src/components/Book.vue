<template>
  <div>
  <div class="layout-breadcrumb">
    <Breadcrumb>
      <Breadcrumb-item to="/">首页</Breadcrumb-item>
      <Breadcrumb-item>图书管理</Breadcrumb-item>
    </Breadcrumb>
  </div>
  <div class="book">
    <Row type="flex" >
      
      <i-col class="add">
        <Button type="primary" size="large" @click="addBook">+  新建图书</Button>
      </i-col>
      <i-col class="search">
        <Input v-model="searchTitle" size="large" placeholder="  查询图书" @keydown.enter.native="retrieveBooks">
          <Select v-model="select" slot="prepend" style="width: 80px">
            <Option value="isbn">ISBN</Option>
            <Option value="title">标题</Option>
            <Option value="author">作者</Option>
          </Select>
          <Button slot="append" icon="ios-search"
          @click="page = 1; retrieveBooks();"
          ></Button>
        </Input>
      </i-col>
    </Row>
    
    <Row class = "tables">
      <i-table stripe border :columns="column" :data="books"></i-table>
    </Row>
    <Row>
      <Page class="page" 
      v-bind:total="count" show-total show-elevator show-sizer
      @on-change="handlePageChange"
      @on-page-size-change="handlePageSizeChange"
      ></Page>
    </Row>
  </div>
  </div>
</template>

<script>
import AddBook from "@/components/AddBook";
import BookService from "../services/BookService";

export default {
  name: "Book",
  components: AddBook,
  data () {
    return {
      select: 'title',
      books: [],
      currentBook: null,
      currentIndex: -1,
      searchTitle: "",

      page: 1,
      count: 0,
      pageSize: 10,

      column: [
        {
          title: 'ISBN',
          key: 'isbn'
        },
        {
          title: '书名',
          key: 'title'
        },
        {
          title: '作者',
          key: 'authorname'
        },
        {
          title: '在库数量',
          key: 'repolength'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            let row = params.row;
            return h('span', {
                  style: {
                    cursor: 'pointer',
                    color: '#3399ff',
                  },
                  on: {
                    click: () => {
                      this.$router.push(`/book/${row.isbn}`);
                    }
                  }
                }, '详情');
          }
        }
      ]
    }
  },
  methods: {
    addBook() {
      this.$router.push('/book/addbook')
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

    retrieveBooks() {
      const params = this.getRequestParams();

      BookService.getAll(params)
        .then((res) => {
          const { books, totalItems } = res.data;
          this.books = books;
          for (let i = 0; i < this.books.length; i ++) {
            this.books[i].authorname = this.books[i].author.name;
            this.books[i].repolength = this.books[i].repo.length;
          }
          this.count = totalItems;

          console.log(this.books);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    handlePageChange(value) {
      console.log(value);
      this.page = value;
      this.retrieveBooks();
    },

    handlePageSizeChange(value) {
      console.log(value);
      this.pageSize = value;
      this.page = 1;
      this.retrieveBooks();
    }
  }
}
</script>

<style scoped>

.page{
  margin: 20px 40px 10px;
  float: right;
}
.tables{
  margin: 30px 40px 0;
  border-radius: 10px;
}
.add{
  margin: 40px 40px 0;
}
</style>