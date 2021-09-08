<template>
  <div class="layout" :class="{'layout-hide-text': hidden === 1}">
    <Row type="flex">
        <i-col class="layout-left" :class="{'layout-left-hidden': hidden === 1}">
          <div class="layout-logo-left" v-if="hidden" align="center">
            <img :src="img1" height="50px"/>
          </div>
          <div class="layout-logo-left" v-else  align="center">
            <img :src="img2" height="50px" />
          </div>
          <Menu :active-name="$route.path" theme="dark" width=auto @on-select="selectFun" class="mleft" :class="{'mcenter': hidden === 1}">
            <Menu-item name="/" class="item">
              <Icon type="ios-home" :size="iconSize"></Icon>
              <span class="layout-text">主页</span>
            </Menu-item>
            <Menu-item name="/reader" class="item">
              <Icon type="ios-people" :size="iconSize"></Icon>
              <span class="layout-text">读者管理</span>
            </Menu-item>
            <Menu-item name="/book" class="item">
              <Icon type="ios-book" :size="iconSize"></Icon>
              <span class="layout-text">图书管理</span>
            </Menu-item>
            <Menu-item name="/borrow" class="item">
              <Icon type="ios-paper" :size="iconSize"></Icon>
              <span class="layout-text">借阅管理</span>
            </Menu-item>
            <Menu-item name="/setting" class="item">
              <Icon type="ios-settings" :size="iconSize"></Icon>
              <span class="layout-text">系统设置</span>
            </Menu-item>
            <Menu-item name="/people" class="item">
              <Icon type="ios-person" :size="iconSize"></Icon>
              <span class="layout-text">个人中心</span>
            </Menu-item>
          </Menu>
        </i-col>
        <i-col class="layout-right" :class="{'layout-right-hidden': hidden === 1}">
          <div class="layout-header">
            <Icon type="ios-menu" size="26" @click="toggleClick" class = btn></Icon>
            <Dropdown class = "drop">
              {{ username }}
              <Icon type="ios-arrow-down"></Icon>
              <Dropdown-menu slot="list">
                <Dropdown-item>退出登录</Dropdown-item>
              </Dropdown-menu>
            </Dropdown>
          </div>
          <div class="layout-content">
            <div>
              <router-view></router-view>
            </div>
          </div>
          <div class="layout-copy">
            2011-2021 &copy; 图书馆管理系统
          </div>
        </i-col>
      </Row>
  </div>
</template>

<script>
export default {
  name: "app",
  data () {
    return {
      hidden: 0,
      username: "Eric",
      img1: require("/assets/logo.png"),
      img2: require("/assets/logologo.png")
    }
  },
  computed: {
    iconSize () {
      return this.hidden === 0 ? 24 : 30;
    }
  },
  methods: {
    toggleClick () {
      if (this.hidden === 0) {
        this.hidden = 1;
      } else {
        this.hidden = 0;
      }
    },
    selectFun (name) {
      this.$router.push(name)
    }
  }
}
</script>

<style>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.layout-breadcrumb{
  padding: 30px 30px 0;
  font-size: 30px;
}
.layout-content{
  min-height: 550px;
  margin: 10px 30px 10px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}
.layout-copy{
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.layout-left{
  background: #464c5b;
  width: 14%;
}
.layout-left-hidden{
  background: #464c5b;
  width: 5%;
}
.layout-right{
  width: 86%;
}
.layout-right-hidden{
  width: 95%;
}
.layout-header{
  height:40px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-logo-left{
  height: 50px;
  margin: 15px;
}
.layout-ceiling-main a{
  color: #9ba7b5;
}
.layout-hide-text .layout-text{
  display: none;
}
.item{
  height: 60px;
  font-size: 18px;
}
.mleft{
  text-align: left;
}
.mcenter{
  text-align: center;
}
.drop{
  float: right;
  color: #464c5b;
  font-size: 16px;
  cursor: pointer;
  padding: 7px;
}
.btn{
  cursor: pointer;
}

</style>