<template>
  <div class = "reader">
    <Row type="flex" justify="space-around" class = "code-row-bg">
      <i-col class="search">
        <Input v-model="searchTitle" size="large" placeholder="  查询读者">
          <Select v-model="select" slot="prepend" style="width: 80px">
            <Option value="id">读者ID</Option>
            <Option value="name">姓名</Option>
            <Option value="phone">联系方式</Option>
          </Select>
          <Button slot="append" icon="ios-search"
                  @click="page = 1; retrieveReaders();"
          ></Button>
        </Input>
      </i-col>
      <i-col class="add">
        <Button type="primary" size="large" @click="addReader">新增读者</Button>
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
import ReaderService from "@/services/ReaderService";
import AddReader from "@/components/AddReader";
export default {
  name: "Reader",
  components: AddReader,
  data () {
    return {
      select: '',
      readers: [],
      tabledata: [],
      currentReader: null,
      searchTitle: "",

      page: 1,
      count: 0,
      pageSize: 10,

      column: [
        {
          title: 'id',
          key: 'id',
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name',
          align: 'center'
        },
        {
          title: '联系方式',
          key: 'phone',
          align: 'center'
        },
        {
          title: '信用等级',
          key: 'credit',
          align: 'center'
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
                  this.$router.push(`/reader/${row.id}`);
                }
              }
            }, '查看');
          }
        }
      ]
    }
  },
  methods: {
    addReader() {
      this.$router.push('/reader/addreader')
    },

    getRequestParams() {
      let params = {};

      if (this.searchTitle) {
        params[this.select] = this.searchTitle;
      }

      if(this.page) {
        params["page"] = this.page - 1;
      }

      if(this.pageSize) {
        params["size"] = this.pageSize;
      }

      return params;
    },

    retrieveReaders() {
      const params = this.getRequestParams();

      ReaderService.getAll(params)
          .then((res) => {
            const { readers, totalItems} = res.data;
            this.readers = readers;
            this.count = totalItems;
            this.tabledata = [];
            for(let i = 0;i < this.readers.length;i ++) {
              this.tabledata.push({
                id: this.readers[i].id,
                name: this.readers[i].name,
                phone: this.readers[i].phone
              })
            }
            this.count = totalItems;
            console.log(this.readers);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    handlePageChange(value) {
      console.log(value);
      this.page = value;
      this.retrieveReaders();
    },

    handlePageSizeChange(value) {
      console.log(value);
      this.pageSize = value;
      this.page = 1;
      this.retrieveReaders();
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