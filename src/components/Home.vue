<template>
  <div>
    <Row :gutter="16" style="margin-left: 20px;margin-top: 20px">
      <i-Col span="6">
        <Card class="card1">
          <div style="text-align: left">
            <h4>未归还总量</h4>
            <ul v-for="item in num" v-bind:key="item" class="dataNum">
              <label>{{item.noReturn}}</label>
            </ul>
            <label></label>
          </div>
        </Card>
      </i-Col>
      <i-Col span="6">
        <Card class="card1">
          <div style="text-align: left">
            <h4>本日借书人数</h4>
            <ul v-for="item in num" v-bind:key="item" class="dataNum">
              <label>{{item.peopleNum}}</label>
            </ul>
          </div>
        </Card>
      </i-Col>
      <i-Col span="6">
        <Card class="card1">
          <div style="text-align: left">
            <h4>馆藏图书</h4>
            <ul v-for="item in num" v-bind:key="item" class="dataNum">
              <label>{{item.bookNum}}</label>
            </ul>
          </div>
        </Card>
      </i-Col>
      <i-Col span="6">
        <Card class="card1">
          <div style="text-align: left">
            <h4>读者数量</h4>
            <ul v-for="item in num" v-bind:key="item" class="dataNum">
              <label>{{item.readerNum}}</label>
            </ul>
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
          <ul  v-for="item in readerList" v-bind:key="item" class="a">
              <a>{{item.readerid}}</a>
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

import shadowChart from './shadowChart'
export default {
components: {
  shadowChart
},
  data() {
    return {
      bookList: [
        {
          name: '',
          popularity: '22222',
        },
        {
          name: '1212',
          popularity: '22222',
        },
        {
          name: '1212',
          popularity: '22222',
        },
        {
          name: '1212',
          popularity: '22222',
        },
        {
          name: '1212',
          popularity: '22222',
        },
        {
          name: '1212',
          popularity: '22222',
        }, {
          name: '1212',
          popularity: '22222',
        }, {
          name: '1212',
          popularity: '22222',
        },
      ],
      num:[{
        noReturn:'20',
        peopleNum:'3',
        bookNum:'500',
        readerNum:'100',
      }
    ],
      readerList:[{
        bookname:'2222',
        readerid:'21212',
      }]

    }
  },
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