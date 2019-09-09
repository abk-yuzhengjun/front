<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view  />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  },
    created(){
            const axios = require('axios')
            const host = 'http://localhost:5000'
            var data={user_id:''}
            data.user_id = this.$store.getters.name

            axios.post(host + '/login/usrInfoGet', data)
                .then(response=>{
                    console.log("resoinse",response.data)
                    this.$store.commit('baseInfo/setCaseList',response.data.res.case_list);
                    this.$store.commit('baseInfo/setDevList',response.data.res.dev_list);
                    this.$store.commit('baseInfo/setAppList',response.data.res.app_list);
                    this.$store.commit('baseInfo/setOperList',response.data.res.oper_list);
                })
                .catch(function(error) {
                    // handle error
                    console.log(error)
                })
                .finally(function() {
                    console.log('get request finally')
                })


    }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
