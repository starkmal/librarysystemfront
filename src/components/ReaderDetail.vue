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
<!--          <p>信用：</p>-->
        </i-col>
        <i-col>
          <div v-if="!edit">
            <p>&nbsp;{{reader.name}}</p>
            <p>&nbsp;{{reader.phone}}</p>
<!--            <p>&nbsp;{{reader.credit}}</p>-->
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
            <Page class="page" :total="reader.borrows.length" show-elevator show-total page-size="3" @on-change="changePage"></Page>
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
          title: '状态',
          key: 'state',
          sortable: true
        },
        {
          title: '借阅时间',
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
            let row = params.row;
            return h('span', {
              style: {
                cursor: 'pointer',
                color: '#3399ff',
              },
              on: {
                click: () => {
                  this.finishborrow(params.row.id)
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
        time: new Date().getTime(),
      };
      BorrowService.update(data)
      .then(() => {
        this.retrieveBooks();
        BookInLibService.changestate(borrow.bid)
        .then()
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
      this.tabledata = this.reader.borrows.slice((index - 1) * 3, index * 3);
      console.log(this.tabledata);
    },

    getAllBorrows() {
      const params = this.getRequestParams();
      ReaderService.getAll(params)
      .then((res) => {
        const {borrows, totalItems } = res.data;
        this.borrows = borrows;
        for(let  i = 0;i < this.borrows.length;i ++){
          this.borrows[i].bid = this.borrows[i].id;
          this.borrows[i].btitle = this.borrows[i].title;
          this.borrows[i].btime = this.borrows[i].time;
        }
      })
    }
    async getReader(id) {
      console.log(id);
      await ReaderService.get(id)
      .then((res) => {
        this.reader = res.data;
        console.log(res.data);
      })
    }
  },
  async mounted() {
    await this.getReader(this.$route.params.id);  //获取读者id
    this.changePage(1);
  }
}
</script>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>