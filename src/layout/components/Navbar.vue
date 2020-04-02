<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <tags-view class="tags-view"></tags-view>
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <svg-icon icon-class="username" style="font-size: 32px;color:#87A7D6;"></svg-icon>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>Home</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import TagsView from '@/components/TagsView'
import TagsView2 from '@/components/TagsView/index2'
import Hamburger from '@/components/Hamburger'
import { Loading } from 'element-ui'

export default {
  components: {
    // Breadcrumb,
    TagsView2,
    TagsView,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      const loading = Loading.service({ fullscreen: true })
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push('/login')
        setTimeout(() => {
          loading.close()
        }, 200);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$navBorderColor: #F0F3F4;
.navbar {
  height: 70px;
  line-height: 70px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: none;
  border-bottom: 1px solid $navBorderColor;
  position: fixed;
  z-index: 999;  
  width: calc(100% - 251px);
  transition: all 0.3s;
  display: flex;
  .tags-view{
    flex: auto;
  }
  .hamburger-container {
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    padding-right: 20px;
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
        transition: background 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
