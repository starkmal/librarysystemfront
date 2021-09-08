<template>
  <div>
    <Row :gutter="16" style="margin-left: 20px;margin-top: 20px">
      <i-Col span="6">
        <Card class="card1">
          <div style="text-align: left">
            <h4>未归还总量</h4>
              <label>{{num.borrowed}}</label>
            <label></label>
          </div>
        </Card>
      </i-Col>
      <i-Col span="6">
        <Card class="card1">
          <div style="text-align: left">
            <h4>本日借书人数</h4>
              <label>{{num.todayNum}}</label>
          </div>
        </Card>
      </i-Col>
      <i-Col span="6">
        <Card class="card1">
          <div style="text-align: left">
            <h4>馆藏图书</h4>
              <label>{{num.bookNum}}</label>
          </div>
        </Card>
      </i-Col>
      <i-Col span="6">
        <Card class="card1">
          <div style="text-align: left">
            <h4>读者数量</h4>
              <label>{{num.readerNum}}</label>
          </div>
        </Card>
      </i-Col>
    </Row>
    <br>
    <Row>
      <i-Col span="8">
        <Card class="cardSet">
          <p slot="title" style="font-size: 20px">
            <Icon type="ios-cart"></Icon>
            近期借阅
          </p>
          <ul  v-for="item in borrowList" v-bind:key="item" class="a">
              <a>{{item.readername}}</a>
              <label class="po">{{item.bookname}}</label>
          </ul>
        </Card>
      </i-Col>
      <i-Col span="8">
        <Card class="cardSet">
          <p slot="title" style="font-size: 20px">
            <Icon type="ios-book"></Icon>
            热门图书
          </p>
          <ul>
            <li v-for="item in bookList" v-bind:key="item" class="a">
              <a>{{item.name}}</a>
              <label class="po">{{item.popularity}}</label>
            </li>
          </ul>
        </Card>
      </i-Col>
      <i-Col span="8">
       <Card>
         <p slot="title" style="font-size: 20px">
           <Icon type="ios-person"></Icon>
           周活跃用户数
         </p>
         <div style="height: 300px">
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
    retrieveData() {
      BookService.getTop()
      .then(res => {
        for (let i = 0; i < res.data.length; i ++) {
          this.bookList.push({
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
            readername: res.data[i].reader.name,
            bookname: res.data[i].book.book.title
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
.card1{
  width: 250px;
  height:100px;
}
.a{
  margin: 8px;
  font-size: 17px;
}
.po{
  float: right;
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