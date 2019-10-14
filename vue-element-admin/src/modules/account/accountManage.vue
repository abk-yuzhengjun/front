<template>
  <el-row :gutter="20" >
    <el-col :span=6 :xs="24" >

      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>

      <div class = "account_manage_body" style="height: 500px">
        <el-card>
      <el-tree
        class="filter-tree "
        :data="data"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        ref="tree"
        @node-click="nodeClick">
      </el-tree>
        </el-card>
      </div>

    </el-col>


    <el-col :span="18" :xs="24">
      <el-card style="height: 600px">
      <router-view/>
        </el-card >
    </el-col>

  </el-row>

</template>

<script>
  import Icons from "../../views/icons/index.vue"

  export default{
    components: {Icons},
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      $route(){
        this.accountQueryAllUser()
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      accountQueryAllUser()
      {
        this.$store.dispatch('user/queryAllUser')
          .then((result) => {
//              console.log("accountQueryAllUser:",result)
              this.account_data_init(result)
              this.allUserInfo = result
          })
          .catch(() => {

          })

      },
      account_data_init(msg)
      {
        this.data=[{
          label: '超级管理员',
          children: []
        }, {
          label: '普通用户',
          children: []
        }]
          let tmp = ''
          for (let i in msg)
          {
            tmp = {label:msg[i]["userName"]}
            if (msg[i]["role"] == "superAdmin")
            {
              this.data[0].children.push(tmp)
            }else{
              this.data[1].children.push(tmp)
            }
          }
      },
      nodeClick(data)
      {
//        console.log("click tree node", data)
//        console.log("treeNodeId=", data.$treeNodeId)
        if(data.children)
        {
//          console.log("label=", data.label)
          this.$router.push({name: 'accountAdd', query: {
            label: data.label
          }})
        }
        else
        {
//          console.log("allUserInfo=", this.allUserInfo)
          for(let i in this.allUserInfo)
          {
//            console.log("allUserInfo name=", this.allUserInfo[i].userName)
//            console.log("label=", data.label)
             if(this.allUserInfo[i].userName == data.label)
             {
               this.$router.push({name: 'accountDisplay',query: {
                 data: this.allUserInfo[i]
               }})
               break
             }

          }

        }

      }
    },

    created:function () {
      this.accountQueryAllUser()
    },

    data() {
      return {
        filterText: '',
        allUserInfo:[],
        data: [{
          label: '超级管理员',
          children: []
        }, {
          label: '普通用户',
          children: []
        }],

        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
  };
</script>

<style scoped>
  .account_manage_body{
    padding: 14px;
    height: 100%;

    overflow-y: scroll;
  }
  .account_manage_body::-webkit-scrollbar { /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px;
  }

  .account_manage_body::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 6px;
    -webkit-box-shadow: inset 0 0 5px rgba(168, 168, 168, 0.2);
    background: rgba(168, 168, 168, 1);
  }

  .account_manage_body::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(241, 241, 241, 0.2);
    border-radius: 6px;
    background: rgba(241, 241, 241, 1);
  }
</style>
