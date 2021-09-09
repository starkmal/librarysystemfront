<template>
  <div>
  <div class="layout-breadcrumb">
    <Breadcrumb>
      <Breadcrumb-item to="/">首页</Breadcrumb-item>
      <Breadcrumb-item to="/book">图书管理</Breadcrumb-item>
      <Breadcrumb-item>书籍详情</Breadcrumb-item>
    </Breadcrumb>
  </div>
  <div style="margin: 20px 40px 10px">
    <h4>《{{book.title}}》</h4>
    <Row type="flex" class="info">
      <i-col id="1" span="3" style="text-align: left">
        <img :src="img" height="150px"/>
      </i-col>
      <i-col id="2" span="2">
        <p>作者：</p>
        <p>定价：</p>
        <p>出版年：</p>
        <p>简介：</p>
      </i-col>
      <i-col id="3" span="6">
        <div v-if="!edit">
          <p>&nbsp;{{book.author.name}}</p>
          <p>&nbsp;{{book.price}}</p>
          <p>&nbsp;{{book.year}}</p>
          <p>&nbsp;{{book.description}}</p>
        </div>
        <div v-else style="width: 80%">
          <p>&nbsp;{{book.author.name}}</p>
          <Input v-model="book.price"/>
          <Input v-model="book.year"/>
          <Input v-model="book.description"/>
        </div>
      </i-col>
      <i-col id="4" span="2">
        <p>ISBN：</p>
        <p>出版社：</p>
        <p>推荐指数：</p>
      </i-col>
      <i-col id="5" span="6">
        <div v-if="!edit">
          <p>&nbsp;{{book.isbn}}</p>
          <p>&nbsp;{{book.publisher}}</p>
          <p>&nbsp;{{book.popularity}}</p>
        </div>
        <div v-else style="width: 80%">
          <p>{{book.isbn}}</p>
          <Input v-model="book.publisher"/>
          <Input v-model="book.popularity"/>
        </div>
      </i-col>
      <i-col id="4" span="5">
        <Button style="float: right" type="primary" size="large" @click="changeEdit">
          <div v-if="!edit">编辑信息</div>
          <div v-else>提交修改</div>
        </Button>
      </i-col>
    </Row>
    <Row id="page">
      <Page class="page" :total="book.repo.length" show-elevator show-total page-size="3" @on-change="changePage"></Page>
    </Row>
    <Table stripe border :context="self" :columns="column" :data="tabledata">
    </Table>
  </div>
  </div>
</template>

<script>
import BookInLibService from '../services/BookInLibService';
import BookService from "../services/BookService";

export default {
  name: "book",
  data() {
    return {
      img: require("/assets/s33734103.jpg"),
      edit: false,
      book: null,
      tabledata: [],
      page: null,
      message: "",
      self: this,
      column: [
        {
          title: 'BID',
          key: 'id'
        },
        {
          title: '位置',
          key: 'location',
          sortable: true
        },
        {
          title: '状态',
          key: 'state',
          sortable: true
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
                  this.tryBorrow(row);
                }
              }
            }, '借出');
          }
        }
      ]
    };
  },
  methods: {
    tryBorrow(row) {
      if (row.state === '已借出') {
        this.$Message.warning('无法借出不在库的图书！');
        return;
      }
      this.$router.push({
        name: `AddBorrow`,
        params: { id: row.id }
        });
    },
    changeEdit() {
      if(this.edit === false) {
        this.edit = true;
      } else {
        BookService.update(this.book.isbn, this.book)
        .then(res => console.log(res))
        .catch(e => console.log(e));
        this.edit = false;
      }
    },
    changePage(index) {
      this.page = index;
      this.tabledata = this.book.repo.slice((index-1) * 3, index * 3);
      console.log(this.tabledata);  
    },
    async getBook(isbn) {
      console.log(isbn);
      await BookService.get(isbn)
        .then((res) => {
          this.book = res.data;
          console.log(res.data);
        })
        .catch((e) => console.log(e));
    },

    updateBook() {
      BookService.update(this.book.isbn, this.book)
        .then((res) => {
          console.log(res.data);
          this.message = "The book was updated successfully!";
        })
        .catch((e) => console.log(e));
    },

    deleteBook() {
      BookService.delete(this.book.isbn)
        .then((res) => {
          console.log(res.data);
          this.$router.push({ name: "book" });
        })
        .catch((e) =>console.log(e));
    },
  },
  async mounted() {
    this.message = "";
    await this.getBook(this.$route.params.id);
    this.changePage(1);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>