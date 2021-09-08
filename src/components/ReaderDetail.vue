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
<!--        <i-col id="1" span="3" style="text-align: left">-->
<!--          <img :src="img" height="150px"/>-->
<!--        </i-col>-->
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
            <Page class="page" :total="borrow.repo.length" show-elevator show-total page-size="3" @on-change="changePage"></Page>
          </Row>
          <Table stripe border :context="self" :columns="column" :data="tabledata">
          </Table>
    </div>
  </div>
</template>

<script>
import ReaderService from "@/services/ReaderService";

export default {
  name: "ReaderDetail",
  data() {
    return {
      reader:null,
      edit: false,
      borrow: null,
      tabledata: [],
      column: [
        {
          title: "ID",
          key: 'id'
        },
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
                  this.finishborrow(params.row.id);
                }
              }
            }, '完成');
          }
        }
      ]
    };
  },
  methods: {
    // 粗糙ing
    changeEdit() {
      if(this.edit == false) {
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
      this.tabledata = this.reader.repo.slice((index - 1) * 3, index * 3);
      console.log(this.tabledata);
    },
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
    this.message = "";
    await this.getReader(this.$route.params.id);  //获取读者id
  }
}
</script>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>