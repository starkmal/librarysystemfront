<template>
  <div>
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <Breadcrumb-item to="/">首页</Breadcrumb-item>
        <Breadcrumb-item to="/book">读者管理</Breadcrumb-item>
        <Breadcrumb-item>读者详情</Breadcrumb-item>
      </Breadcrumb>
    </div>

    <div style="margin: 20px 40px 10px">
      <h4>读者详情</h4>
      <Row type="flex" class="info">
        <i-col id="2" span="2">
          <p>姓名：</p>
          <p>联系方式：</p>
          <p>信用：</p>
        </i-col>
        <i-col>
          <div v-if="!edit" style="width: 80%">
            <p>&nbsp;{{reader.name}}</p>
            <p>&nbsp;{{reader.phone}}</p>
           <p>&nbsp;{{reader.credit}}</p>
          </div>
          <div v-else style="width: 80%">
            <Input v-model="reader.name"/>
            <Input v-model="reader.phone"/>
            <Input v-model="reader.credit"/>
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
            <Page class="page" :total="reader.borrows.length" show-elevator show-total :page-size="size" @on-change="changePage"></Page>
          </Row>
          <Table stripe border :context="self" :columns="column" :data="tabledata">
          </Table>
    </div>
  </div>
</template>

<script>
import ReaderService from "@/services/ReaderService";
import BorrowService from "@/services/BorrowService";
import BookInLibService from "@/services/BookInLibService";

export default {
  name: "borrow",
  data() {
    return {
      id: null,
      page: 1,
      size: 5,
      reader:null,
      edit: false,
      borrow: null,
      tabledata: [],
      column: [
        {
          title: 'BID',
          key: 'bid'
        },
        {
          title: '书名',
          key: 'title'
        },
        {
          title: '借阅时间',
          key: 'time',
          sortable: true
        },
        {
          title: '归还时间',
          key: 'rtime',
          sortable: true
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
                  this.finishBorrow(params.row)
                }
              }
            }, '归还');
          }
        }
      ]
    };
  },
  methods: {
    finishBorrow(borrow) {
      if (borrow.rtime != null) {
        alert('该条目已经完成');
        return;
      }
      console.log(borrow);
      let data = {
        id: borrow.id,
        time: new Date().getTime() + 28800000,
      };
      BorrowService.update(data)
      .then(() => {
        BookInLibService.setstate(borrow.bid, "在库")
        .then(() => this.getReader(this.id))
        .catch(e=>console.log(e));
      })
    },
    changeEdit() {
      if(this.edit === false) {
        this.edit = true;
      } else {
        ReaderService.update(this.reader.id, this.reader)
        .then(res => console.log(res))
        .catch(e => console.log(e));
        this.edit = false;
      }
    },
    changePage(index) {
      this.page = index;
      let tmp = this.reader.borrows.slice((index - 1) * this.size, index * this.size);
      this.tabledata = [];
      for (let i = 0; i < tmp.length; i ++)
        this.tabledata.push({
          id: tmp[i].id,
          bid: tmp[i].book.id,
          title: tmp[i].book.book.title,
          time: tmp[i].borrowTime,
          rtime: tmp[i].returnTime
        })
      console.log(this.tabledata);
    },

    getReader(id) {
      console.log(id);
      ReaderService.get(id)
      .then((res) => {
        this.reader = res.data;
        this.changePage(this.page);
        console.log(res.data);
      })
    }
  },
  mounted() {
    this.page = 1;
    this.id = this.$route.params.id;
    this.getReader(this.id);
  }
}
</script>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>