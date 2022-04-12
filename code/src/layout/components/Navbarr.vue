<template>
  <div class="navbar">
    <div @click="$router.push('/aboutus')" class="toaboutus">关于我们</div>
    <div @click="$router.push('/feedback')" class="tofeedback">问题反馈</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Logout } from '@/api/api'
import { removeToken } from '@/utils/auth'

export default {
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      Logout().then(() => {
        removeToken()
        this.$store.state.user.token = null
        this.$store.state.user.name = null
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.toaboutus{
  color: aliceblue;
  position: absolute;
  font-size: 17px;
  margin: 10px;
}
.tofeedback{
  color: aliceblue;
  transform: translate(130%,0);
  position: absolute;;
  font-size: 17px;
  margin: 10px;
}
.navbar {
  height: 40px;
  overflow: hidden;
  position: relative;
  background: #3e4756;
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
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
