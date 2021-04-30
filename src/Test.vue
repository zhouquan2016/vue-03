<template>
  <a-layout id="app">
    
    <a-layout-header class="header">
      <div class="logo">
      </div>
      <button @click.stop="showContent($event,menus)">xxxxx</button>
      <a-menu
        theme="dark"
        mode="horizontal"
        :selectedKeys="[menus.activeId+'']"
        @select="onSelect"
        :style="{ lineHeight: '64px' }"
      >
        
        <a-menu-item v-for="menu in menus.header" :key="menu.id" class="menus-item">{{
          menu.name
        }}</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" theme="light" style="min-height:750px">
        
        <a-menu
          mode="inline"
          theme="light"
          :inline-collapsed="collapsed"
          @click="showContent"
        >
          <template v-for="item in sideMenus">
            <a-menu-item v-if="item.isLeaf" :key="item.id">
              <a-icon type="pie-chart"></a-icon>
              <router-link :to="item.path" class="menu-item-link" @click.native="showContent">{{ item.name }}</router-link>
            </a-menu-item>
            <sub-menu v-else :key="item.id" :menu-info="item" />
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px',
          }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import BaseApi from "./config/BaseApi";
// import {Menu} from "ant-design-vue"

import { Menu } from "ant-design-vue";
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.id" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon type="mail"></a-icon>
          <span>{{ menuInfo.name }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="item.isLeaf" :key="item.id">
            <a-icon type="pie-chart"></a-icon>
            <router-link :to="item.path" class="menu-item-link" @click.native="showContent">{{ item.name }}</router-link>
          </a-menu-item>
          <sub-menu v-else :key="item.id" :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
  name: "SubMenu",
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
};

export default {
  components: {
    "sub-menu": SubMenu,
  },
  data() {
    return {
      collapsed: false,
      menus: {},
    };
  },
  created() {
    let $this = this;
    BaseApi.get("/menu/list").then((data) => {
      $this.menus = data;
    });
  },
  computed: {
    sideMenus() {
      if (!this.menus.header) return [];
      let menu = this.menus.header.filter(
        (menu) => menu.id === this.menus.activeId
      )[0];
      return menu ? menu.children : [];
    },
  },
  methods:{
    onSelect({  key }) {
      this.menus.activeId = key;
    },
    showContent : function({ item }) {
      console.log(item);
    }
  }
};
</script>

<style>
#app .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
  text-align: center;
}
#app .header{
  clear: both;
}
#app .menus-item{
  text-align: center;
}
#app .menu-item-link{
  display: inline;
}
</style>
