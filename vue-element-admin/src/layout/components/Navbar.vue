<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />

        <!--<error-log class="errLog-container right-menu-item hover-effect" />-->

        <!--<screenfull id="screenfull" class="right-menu-item hover-effect" />-->

        <!--<el-tooltip content="Global Size" effect="dark" placement="bottom">-->
          <!--<size-select id="size-select" class="right-menu-item hover-effect" />-->
        <!--</el-tooltip>-->

      </template>

      <el-dropdown class=" right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">


          <i class="el-icon-bell" ></i>
          <el-badge :value="14" :max="99" style="font-size:1px"></el-badge>


        </div>
        <el-dropdown-menu slot="dropdown" >
          <div style="margin-left: 10px;margin-right: 8px; font-size: 10px">
          <el-tabs style="font-size: 5px" value="tongzhi">
            <el-tab-pane name="tongzhi" class="el_tab_style" >
              <span slot="label">通知
                <el-badge :value="11" :max="99" style="font-size:1px"></el-badge>
              </span>
              <Notice></Notice>

            </el-tab-pane>

            <!--<el-badge :value="14" :max="99">-->
            <el-tab-pane name="xiaoxi" class="el_tab_style">

                <span slot="label">消息
                  <el-badge :value="1" :max="99" style="font-size:1px"></el-badge>
                </span>

              <span>新消息1</span>

            </el-tab-pane>
            <!--</el-badge>-->

            <el-tab-pane name="daiban"  class="el_tab_style">
                <span slot="label">代办
                <el-badge :value="1" :max="99" style="font-size:1px"></el-badge>
                </span>

              <span>代办消息1</span>

            </el-tab-pane>

          </el-tabs>
          </div>



        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <!--<img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">-->
          <svg-icon icon-class="user" class="el-icon-user"/>
          <!--<i class="el-icon-caret-bottom" />-->
          <div class="el_icon_user_name"><span >{{userName}}</span></div>
        </div>
        <el-dropdown-menu slot="dropdown">

          <router-link to="/account/index">
            <el-dropdown-item>账户</el-dropdown-item>
          </router-link>
          <!--<router-link to="/">-->
            <!--<el-dropdown-item>Dashboard</el-dropdown-item>-->
          <!--</router-link>-->
          <!--<a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">-->
            <!--<el-dropdown-item>Github</el-dropdown-item>-->
          <!--</a>-->
          <!--<a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">-->
            <!--<el-dropdown-item>Docs</el-dropdown-item>-->
          <!--</a>-->
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import SvgIcon from "../../components/SvgIcon/index.vue"
import Notice from "./notice.vue"
import { getMyToken } from '@/utils/auth'
import store from "@/store"

export default {
  components: {
    SvgIcon,
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search,Notice
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
    ,
    userName:function () {
      return this.$store.getters.name;
    }

  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }

}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: 0px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
    .el-icon-user {
      cursor: pointer;
      /*position:relative;*/
      margin: auto;
      margin-bottom: 5px;
    }
    .el_icon_user_name{
      font-size: 10px;
      float: right;
      margin-bottom: 5px;
      margin-left: 5px;

    }
  }
}

  .el_tab_style{
    width: 240px;
    min-height: 50px;
    height: 300px;
    margin: auto;
    /*font-size: 5px;*/
  }
  .el-badge-tip{
    margin-bottom: -25px;
    margin-right: 40px;
  }
</style>
