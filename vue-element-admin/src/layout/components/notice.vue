<template>
  <div style="margin-top: -10px; margin-left: -30px; height:300px; ">
  <dl class="nitice_dd_body">
    <dd v-for = "(item, index) of notic"  :key="index"  >
      <span class="noticeMsg">{{item.msg}}</span>
      <i class="el-icon-close" style="float: right; line-height: 30px;"></i>
    </dd>
  </dl>
  </div>
</template>

<script>
  export default {
    data(){
      return {
          notic:[
            {
              msg:"新消息新消息新消新消息1",
              icon:"el-icon-close"

            },
             {
               msg:"新消息新消息新新消息2",
               icon:""

             },
             {
               msg:"新消息新新消息新消息3",
               icon:""

             },
             {
               msg:"新消息新消息4",
               icon:""

             },
            {
              msg:"新消息新消息新新消息5",
              icon:""

            },
            {
              msg:"新消息新新消息新消息6",
              icon:""

            },
            {
              msg:"新消息新消息7",
              icon:""

            },
            {
              msg:"新消息新消息新新消息8",
              icon:""

            },
            {
              msg:"新消息新新消息新消息9",
              icon:""

            },
            {
              msg:"新消息新消息10",
              icon:""

            },
            {
              msg:"新消息新消息新新消息11",
              icon:""

            },
            {
              msg:"新消息新新消息新消息12",
              icon:""

            },
            {
              msg:"新消息新消息13",
              icon:""

            },
            {
              msg:"新消息新消息10",
              icon:""

            },
            {
              msg:"新消息新消息新新消息11",
              icon:""

            },
            {
              msg:"新消息新新消息新消息12",
              icon:""

            },
            {
              msg:"新消息新消息13",
              icon:""

            },
            {
              msg:"新消息新消息10",
              icon:""

            },
            {
              msg:"新消息新消息新新消息11",
              icon:""

            },
            {
              msg:"新消息新新消息新消息12",
              icon:""

            },
            {
              msg:"新消息新消息13",
              icon:""

            },
            {
              msg:"新消息新消息10",
              icon:""

            },
            {
              msg:"新消息新消息新新消息11",
              icon:""

            },
            {
              msg:"新消息新新消息新消息12",
              icon:""

            },
            {
              msg:"新消息新消息13",
              icon:""

            },
            {
              msg:"新消息新消息10",
              icon:""

            },
            {
              msg:"新消息新消息新新消息11",
              icon:""

            },
            {
              msg:"新消息新新消息新消息12",
              icon:""

            },
            {
              msg:"新消息新消息13",
              icon:""

            },
            {
              msg:"新消息新消息10",
              icon:""

            },
            {
              msg:"新消息新消息新新消息11",
              icon:""

            },
            {
              msg:"新消息新新消息新消息12",
              icon:""

            },
            {
              msg:"新消息新消息13",
              icon:""

            },
            {
              msg:"新消息新消息10",
              icon:""

            },
            {
              msg:"新消息新消息新新消息11",
              icon:""

            },
            {
              msg:"新消息新新消息新消息12",
              icon:""

            },
            {
              msg:"新消息新消息13",
              icon:""

            },
            {
              msg:"新消息新消息10",
              icon:""

            },
            {
              msg:"新消息新消息新新消息11",
              icon:""

            },
            {
              msg:"新消息新新消息新消息12",
              icon:""

            },
            {
              msg:"新消息新消息13",
              icon:""

            },
            {
              msg:"新消息新消息10",
              icon:""

            },
            {
              msg:"新消息新消息新新消息11",
              icon:""

            },
            {
              msg:"新消息新新消息新消息12",
              icon:""

            },
            {
              msg:"新消息新消息13",
              icon:""

            },
            {
              msg:"新消息新消息10",
              icon:""

            },
            {
              msg:"新消息新消息新新消息11",
              icon:""

            },
            {
              msg:"新消息新新消息新消息12",
              icon:""

            },
            {
              msg:"新消息新消息13",
              icon:""

            },
            {
              msg:"新消息新消息10",
              icon:""

            },
            {
              msg:"新消息新消息新新消息11",
              icon:""

            },
            {
              msg:"新消息新新消息新消息12",
              icon:""

            },
            {
              msg:"新消息新消息13",
              icon:""

            },
            {
              msg:"新消息新消息10",
              icon:""

            },
            {
              msg:"新消息新消息新新消息11",
              icon:""

            },
            {
              msg:"新消息新新消息新消息12",
              icon:""

            },
            {
              msg:"新消息新消息13",
              icon:""

            },
            {
              msg:"新消息新消息10",
              icon:""

            },
            {
              msg:"新消息新消息新新消息11",
              icon:""

            },
            {
              msg:"新消息新新消息新消息12",
              icon:""

            },
            {
              msg:"新消息新消息13",
              icon:""

            },
            {
              msg:"新消息新消息10",
              icon:""

            },
            {
              msg:"新消息新消息新新消息11",
              icon:""

            },
            {
              msg:"新消息新新消息新消息12",
              icon:""

            },
            {
              msg:"新消息新消息13",
              icon:""

            },
            {
              msg:"新消息新消息10",
              icon:""

            },
            {
              msg:"新消息新消息新新消息11",
              icon:""

            },
            {
              msg:"新消息新新消息新消息12",
              icon:""

            },
            {
              msg:"新消息新消息13",
              icon:""

            },
            {
              msg:"新消息新消息10",
              icon:""

            },
            {
              msg:"新消息新消息新新消息11",
              icon:""

            },
            {
              msg:"新消息新新消息新消息12",
              icon:""

            },
            {
              msg:"新消息新消息13",
              icon:""

            },
            {
              msg:"新消息新消息10",
              icon:""

            },
            {
              msg:"新消息新消息新新消息11",
              icon:""

            },
            {
              msg:"新消息新新消息新消息12",
              icon:""

            },
            {
              msg:"新消息新消息13",
              icon:""

            }
          ]
      }

      },
      methods: {
        greet: function (event) {
          // `this` 在方法里指向当前 Vue 实例
          alert('Hello ' + this.name + '!')
          // `event` 是原生 DOM 事件
          if (event) {
            alert(event.target.tagName)
          }
        }}
  }
</script>

<style>

.nitice_dd_body{
  padding: 8px;
  height: 100%;
  line-height: 30px;
  overflow-y: scroll;
  overflow-x: scroll;
}
.nitice_dd_body::-webkit-scrollbar { /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 6px;
}

.nitice_dd_body::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
  border-radius: 6px;
  -webkit-box-shadow: inset 0 0 5px rgba(168, 168, 168, 0.2);
  background: rgba(168, 168, 168, 1);
}

.nitice_dd_body::-webkit-scrollbar-track { /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(241, 241, 241, 0.2);
  border-radius: 6px;
  background: rgba(241, 241, 241, 1);
}
  .noticeMsg{
    ont-size: 9px;
  }
  .noticeMsg:hover
  {
    font-size: 15px;
    background-color: #F1F1F1;
  }
</style>
