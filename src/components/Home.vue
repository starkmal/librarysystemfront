<template>
  <div style="margin: 10px">
    <Row :gutter="10">
      <i-Col span="6">
        <Card>
          <div style="text-align: left">
            <h5>未归还总量</h5>
              <h3>{{num.borrowed}}</h3>

          </div>
        </Card>
      </i-Col>
      <i-Col span="6">
        <Card>
          <div style="text-align: left">
            <h5>本日借书人数</h5>
              <h3>{{num.todayNum}}</h3>
          </div>
        </Card>
      </i-Col>
      <i-Col span="6">
        <Card>
          <div style="text-align: left">
            <h5>馆藏图书</h5>
              <h3>{{num.bookNum}}</h3>
          </div>
        </Card>
      </i-Col>
      <i-Col span="6">
        <Card>
          <div style="text-align: left">
            <h5>读者数量</h5>
              <h3>{{num.readerNum}}</h3>
          </div>
        </Card>
      </i-Col>
    </Row>
    <br>
    <Row :gutter="10">
      <i-Col span="8">
        <Card>
          <p slot="title" style="font-size: 20px; margin: 7px">
            <Icon type="ios-cart"></Icon>
            近期借阅
          </p>
          <ul style="list-style-type: none; padding: 0 7px 0">
            <li v-for="item in borrowList" v-bind:key="item" style="padding: 5px">
              <a @click="jumpReader(item.readerid)" style="color: #3399ff; font-size: 16px; cursor: pointer">{{item.readername}}借阅了《{{item.bookname}}》</a>
              <label style="color: #464c5b; font-size: 16px; float: right">{{item.time}} </label>
            </li>
          </ul>
        </Card>
      </i-Col>
      <i-Col span="8">
        <Card>
          <p slot="title" style="font-size: 20px; margin: 7px">
            <Icon type="ios-book"></Icon>
            热门图书
          </p>
          <!-- <span class="a">书名</span>
          <span class="po">推荐度</span> -->
          <ul style="list-style-type: none; padding: 0 7px 0">
            <li v-for="item in bookList" v-bind:key="item" style="padding: 5px; cursor: pointer; color: #3399ff">
              <a @click="jumpBook(item.isbn)" target="_blank" style="font-size: 16px">{{ item.name }}</a>
                <span class="po">
                  {{ item.popularity }}
                </span>
            <!-- <a @click="jump(item.isbn)">{{item.name}}</a> -->
            <!-- <label class="po">{{item.popularity}}</label> -->
            </li>
          </ul>
          
        </Card>
      </i-Col>
      <i-Col span="8">
       <Card>
         <p slot="title" style="font-size: 20px; margin: 7px">
           <Icon type="ios-person"></Icon>
           周活跃用户数
         </p>
         <div style="height: 356px">
           <shadow-chart></shadow-chart>
         </div>
       </Card>
      </i-Col>
    </Row>


  </div>
</template>
<script>
import BookInLibService from '../services/BookInLibService'
import BookService from '../services/BookService'
import BorrowService from '../services/BorrowService'
import ReaderService from '../services/ReaderService'
import shadowChart from './shadowChart'
export default {
components: {
  shadowChart
},
  data() {
    return {
      bookList: [],
      borrowList: [],
      num:{
        borrowed: null,
        todayNum: null,
        bookNum: null,
        readerNum: null,
      }
    }
  },
  methods: {
    jumpReader(id) {
      this.$router.push(`/reader/${id}`);
    },
    jumpBook(isbn) {
      this.$router.push(`/book/${isbn}`);
    },
    retrieveData() {
      BookService.getTop()
      .then(res => {
        for (let i = 0; i < res.data.length; i ++) {
          this.bookList.push({
            isbn: res.data[i].isbn,
            name: res.data[i].title,
            popularity: res.data[i].popularity
          });
        }
      })
      .catch(e => console.log(e));

      BorrowService.getRecent()
      .then(res=> {
        for (let i = 0; i < res.data.length; i ++) {
          this.borrowList.push({
            readerid: res.data[i].reader.id,
            readername: res.data[i].reader.name,
            bookname: res.data[i].book.book.title,
            time: new Date(res.data[i].borrowTime).toLocaleDateString()
          });
        }
      })
      .catch(e => console.log(e));

      BookInLibService.countBorrowed()
      .then(res => this.num.borrowed = res.data)
      .catch(e => console.log(e));

      BorrowService.countToday()
      .then(res => this.num.todayNum = res.data)
      .catch(e => console.log(e));

      BookInLibService.countAll()
      .then(res => this.num.bookNum = res.data)
      .catch(e => console.log(e));

      ReaderService.countAll()
      .then(res => this.num.readerNum = res.data)
      .catch(e => console.log(e));
    }
  },
  mounted() {
    this.retrieveData();
  }
}
</script>
<style>
.a{
  font-size: 17px;
  color: #3399ff
}
.po{
  float: right;
  color: rgb(253, 181, 44);
  font-size: 16px;
}
.dataNum{
  text-align: center;
  font-size: 40px;
}
.cardSet{
  width: 330px;
}
</style>
<body>

</body>