<template>
  <div style="width: 100%;height:100%;display: flex;align-items: stretch; padding: 10px; background:#F3F4F7;">
    <!--    <div class="nav" style="flex-shrink: 3;width: 100%;height: 100%">-->
    <!--      <table height="103px" width="100%" />-->
    <div style="width:17%; height:100%; background:#FFFFFF; padding: 10px 10px 40px;">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText" size="mini">
      </el-input>
      <el-scrollbar style="height: 100%;width: 100%; padding-top: 5px">
      <el-tree ref="tree" :data="treeData" :props="defaultProps" node-key="id"
               :default-expanded-keys="treeExpandAddr" :expand-on-click-node="false"
               :filter-node-method="filterNode" highlight-current @node-click="handelNodeClick" >
        <span slot-scope="{ node,data}">
          <i v-if="data.node_ind==='home'" class="el-icon-house" ></i>
           <i v-else-if="data.node_ind==='case'" class="el-icon-folder"></i>

          <svg-icon v-else-if="data.node_ind==='task_number'" icon-class="get_phone_number"></svg-icon>

          <svg-icon v-else-if="data.node_ind==='task_evidence'" icon-class="get_phone_app"></svg-icon>

          <i v-else-if="data.node_ind==='phone'" class="el-icon-phone"></i>
          <!--          <i v-else-if="data.node_ind==='app'" class="el-icon-folder"></i>-->
          <template v-else-if="data.node_ind==='app'">
            <svg-icon :icon-class=data.label />

          </template>
          <span style="font-size: 14px;padding-left: 4px" v-if="data.node_ind==='app'">{{ app_name_dict.get(node.label) }}</span>
          <span style="font-size: 14px;padding-left: 4px" v-else>{{ node.label }}</span>
<!--          <span>-->
<!--            <el-tag v-if="data.node_ind === 'task_number'" :type="task_status_show_dict.get(data.task_status)" size="mini">{{task_status_dict.get(data.task_status)}}</el-tag>-->
<!--            <el-tag v-if="data.node_ind === 'task_evidence'" :type="task_status_show_dict.get(data.task_status)" size="mini">{{task_status_dict.get(data.task_status)}}</el-tag>-->
<!--          </span>-->
        </span>

      </el-tree>
      </el-scrollbar>
    </div>
    <div style="width:1%; height: 100%; background:#F3F4F7;"/>
    <!--    </div>-->
    <div style="width:82%; ; background:#FFFFFF;">
      <el-scrollbar style="height: 100%;width: 100%; padding-top: 5px">
        <router-view/>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
    // eslint-disable-next-line no-undef,no-unused-vars
    import axios from 'axios'
    import store from '../../store'

    const appIconMap = new Map([['微信','wechat'],['微博','weibo'],['支付宝','alipay']])
    export default {
        name: 'TreeDisplay',
        data() {
            return {
                filterText: '',
                taskTableData: '',
                tableDataEnd: '',
                treeExpandAddr: [1],
                treeData: [],
                lastTreeId : 0,
                treeLabelData: [],
                treeIdData: [],
                app_name_dict: new Map([['Taobao','淘宝'],['Meituanwaimai','美团外卖'],['Pinduoduo','拼多多'],['Tongchenglvyou','同城旅游'],['Baidutieba','百度贴吧'],['Cainiaoguoguo','菜鸟裹裹'],
                    ['Haluochuxing','哈罗出行'],['Meituan','美团'],['Mango','芒果电单车'],['Mobike','摩拜单车'],['Sinaweibo','新浪微博'],['Xiechenglvxing','携程旅行'],['Qunar','去哪儿']]),
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                task_status_dict: new Map([["ready", "未开始"], ["running", "运行中"], ["complete", "已完成"], ["failed", "已失败"], ["canceled", "已取消"]]),
                task_status_show_dict: new Map([["ready", 'primary'], ["running", "danger"], ["complete", 'success'], ["failed", 'warning'], ["canceled", 'info']]),
            }
        },
        watch: {
            getVuexTreeCaseInfo() {
                console.log('getVuexTreeCaseInfo watch refresh')
                this.highLightShowTree()
            },
            getVuexTreeTaskInfo() {
                console.log('getVuexTreeTaskInfo watch refresh')
                this.highLightShowTree()
            },
            getVuexTreeInfo() {
                console.log('treeData watch refresh')
                this.getTreeData()
            },
            filterText(val) {
                this.$refs.tree.filter(val);
            },
            treeData() {
                console.log('treeData watch refresh222')
                this.$nextTick(function(){
                    this.highLightShowTree()
                });
            }
        },
        computed: {
            key() {
                return this.$route.path
            },
            getVuexTreeCaseInfo() {
                console.log('getVuexTreeCaseInfo computed refresh')
                return this.$store.state.forensic.case_id
            },
            getVuexTreeTaskInfo() {
                console.log('getVuexTreeTaskInfo computed refresh')
                return this.$store.state.forensic.task_id
            },
            getVuexTreeInfo() {
                console.log('123 computed refresh')
                return this.$store.state.forensic.case_info
            }
        },
        created() {
            console.log('treedisplay reinit')
            // this.getMessage()
            // this.getMessageByPost()
            this.getMessageByPost2()
            // this.$nextTick(function(){
            //         this.$refs.tree.setCurrentKey(1011)
            //     })
        },
        updated(){
          // console.log('upodated  test hilighted')  ;
        },
        methods: {
          appIconGen(appname){
            return appIconMap.get(appname)
          },
            getMessageByPost2() {
                const path2 = this.$store.getters.host + '/forensic/casetaskdisplay'
                const param = {
                    user_id: this.$store.state.user.name
                }
                axios.post(path2, JSON.stringify(param))
                    .then((res) => {
                        // this.taskTableData = res.data
                        this.taskTableData = res.data
                        console.log('tree get data')
                        this.$store.commit('forensic/getCaseInfo', this.taskTableData)
                        this.getTreeData()
                        this.highLightShowTree()
                        //this.getTreeData()
                    })
                    .catch((error) => {
                        alert(error)
                    })
            },
            filterNode(value, treeData) {
                if (!value) return true;
                return treeData.label.indexOf(value) !== -1;
            },
            highLightShowTree() {
                console.log('highLightShowTree enter :' + this.$store.state.forensic.case_id + '*******' + this.$store.state.forensic.task_id+"*******");
                let treeId = 1;
                if(this.$store.state.forensic.case_id === '' && this.$store.state.forensic.task_id === '')
                {
                    console.log('highLightShowTree: default status ... ' );
                }
                else if(this.$store.state.forensic.case_id !== '' && this.$store.state.forensic.task_id === '')
                {
                    treeId = this.treeIdData[this.$store.state.forensic.case_id + ':' + ':' +':']
                }
                else if(this.$store.state.forensic.case_id !== '' && this.$store.state.forensic.task_id !== '')
                {
                    treeId = this.treeIdData[this.$store.state.forensic.case_id + ':' + this.$store.state.forensic.task_id + ':' +':']
                }
                this.treeExpandAddr = []
                this.treeExpandAddr.push(treeId)
                this.$refs.tree.setCurrentKey(treeId)
                this.lastTreeId = treeId
            },
            jumpToEvidenceDisplayByTree(caseId) {
                this.$store.commit('forensic/getTreeCaseInfo', caseId)
                this.$store.commit('forensic/getTreeTaskInfo', '')
                console.log('caseId:' + caseId)
                this.$router.push(
                    {
                        name: 'evidencedisplay',
                        query: {
                            caseId: caseId
                        }
                    })
            },
            jumpToCaseDisplay() {
                this.$router.push(
                    {
                        name: 'casedisplay'
                    }
                )
            },
            jumpToEvidenceInformation(caseId, taskId) {
                this.$store.commit('forensic/getTreeCaseInfo', caseId)
                this.$store.commit('forensic/getTreeTaskInfo', taskId)
                this.$router.push(
                    {
                        name: 'evidenceinformation',  //取证任务
                        query: {
                            caseId: caseId,
                            taskId: taskId
                        }
                    }
                )
            },
            jumpToPhoneInformation(caseId, taskId) {
                this.$store.commit('forensic/getTreeCaseInfo', caseId)
                this.$store.commit('forensic/getTreeTaskInfo', taskId)
                this.$router.push(
                    {
                        name: 'phoneinformation',   //取号任务
                        query: {
                            caseId: caseId,
                            taskId: taskId
                        }
                    }
                )
            },
            jumpToAppDisplay(caseId, taskId, phone) {
                this.$router.push(
                    {
                        name: 'evidenceinformation',
                        query: {
                            caseId: caseId,
                            taskId: taskId,
                            // phone: phone
                        }
                    }
                )
            },
            jumpToAppInformation(taskId,appName,phone) {
              console.log("jumpToAppInformation")
                this.$router.push(
                    {
                        name: 'appinformation',
                        query:{
                            task_id:taskId,
                            phone:phone,
                            appName:appName
                        }
                    }
                )
            },
            getTreeData() {
              this.taskTableData = this.$store.state.forensic.case_info
              let treeId = 2
                const temp_list = []
                const index = {
                    label: '主页',
                    id: 1,
                    node_ind:'home',
                    children: []
                }
                for (var i = 0; i < this.taskTableData.length; i++) {
                    const obj = {
                        label: this.taskTableData[i].case_name,
                        case_id: this.taskTableData[i].case_id,
                        id: treeId++,
                        node_ind:'case',
                        children: []
                    }
                    this.treeIdData[this.taskTableData[i].case_id + ':' + ':' +':'] = obj.id
                    this.treeLabelData[obj.id] = obj.label
                    if (this.taskTableData[i].hasOwnProperty('task_list') && this.taskTableData[i].task_list.length >= 1) {
                        let temp = this.taskTableData[i].task_list.length
                        while (temp > 0) {
                            // eslint-disable-next-line no-unused-vars
                            const obj_child = {
                                label: this.taskTableData[i].task_list[this.taskTableData[i].task_list.length - temp].task_name,
                                id: treeId++,
                                evidence: 0,
                                node_ind:'task_number',
                                task_status: this.taskTableData[i].task_list[this.taskTableData[i].task_list.length - temp].task_status,
                                children: []
                            }
                            if (this.taskTableData[i].task_list[this.taskTableData[i].task_list.length - temp].task_type === 2) {
                                obj_child.evidence = 1
                                obj_child.node_ind = 'task_evidence'
                            }
                            this.treeIdData[this.taskTableData[i].case_id + ':' +this.taskTableData[i].task_list[this.taskTableData[i].task_list.length - temp].task_id + ':' +':'] = obj_child.id
                            this.treeLabelData[obj_child.id] = obj_child.label
                            if (this.taskTableData[i].task_list[this.taskTableData[i].task_list.length - temp].hasOwnProperty('evidence_content') && this.taskTableData[i].task_list[this.taskTableData[i].task_list.length - temp].evidence_content.length >= 1) {
                                const evidence_length = this.taskTableData[i].task_list[this.taskTableData[i].task_list.length - temp].evidence_content.length
                                let temp_length = this.taskTableData[i].task_list[this.taskTableData[i].task_list.length - temp].evidence_content.length
                                // eslint-disable-next-line no-unmodified-loop-condition
                                while (temp_length > 0) {
                                    const obj_child_child = {
                                        label: this.taskTableData[i].task_list[this.taskTableData[i].task_list.length - temp].evidence_content[evidence_length - temp_length].phone,
                                        id: treeId++,
                                        node_ind:'phone',
                                        children: []
                                    }
                                    this.treeIdData[this.taskTableData[i].case_id + ':' +this.taskTableData[i].task_list[this.taskTableData[i].task_list.length - temp].task_id + ':' +obj_child_child.label +':'] = obj_child_child.id
                                    this.treeLabelData[obj_child_child.id] = obj_child_child.label
                                    if (this.taskTableData[i].task_list[this.taskTableData[i].task_list.length - temp].evidence_content[evidence_length - temp_length].hasOwnProperty('app_list')  && this.taskTableData[i].task_list[this.taskTableData[i].task_list.length - temp].evidence_content[evidence_length - temp_length].app_list.length >= 1) {
                                        const phone_length = this.taskTableData[i].task_list[this.taskTableData[i].task_list.length - temp].evidence_content[evidence_length - temp_length].app_list.length
                                        let temp_phone_length = this.taskTableData[i].task_list[this.taskTableData[i].task_list.length - temp].evidence_content[evidence_length - temp_length].app_list.length
                                        if(this.taskTableData[i].task_list[this.taskTableData[i].task_list.length - temp].evidence_content[evidence_length - temp_length].app_list[phone_length - temp_phone_length].hasOwnProperty('app_name')) {
                                            while (temp_phone_length > 0) {
                                                const obj_child_child_child = {
                                                    label: this.taskTableData[i].task_list[this.taskTableData[i].task_list.length - temp].evidence_content[evidence_length - temp_length].app_list[phone_length - temp_phone_length].app_name,
                                                    id: treeId++,
                                                    node_ind: 'app',
                                                }
                                                this.treeIdData[this.taskTableData[i].case_id + ':' + this.taskTableData[i].task_list[this.taskTableData[i].task_list.length - temp].task_id + ':' + obj_child_child.label + ':' + obj_child_child_child.label] = obj_child_child_child.id
                                                this.treeLabelData[obj_child_child_child.id] = obj_child_child_child.label
                                                temp_phone_length--
                                                obj_child_child.children.push(obj_child_child_child)
                                            }
                                        }
                                    }
                                    temp_length--
                                    obj_child.children.push(obj_child_child)
                                }
                            }
                            temp--
                            obj.children.push(obj_child)
                        }
                    }
                    index.children.push(obj)
                    // temp_list.push(obj)
                }
                temp_list.push(index)
                this.treeData = temp_list
            },
            handelNodeClick(data) {
                console.log('click tree node')
                let treeCaseId = []
                let treeTaskId = []
                let treePhone = []
                let treeApp = []
                for(let index in this.treeIdData)
                {
                    if(data.id === this.treeIdData[index])
                    {
                        let tempStr = index.split(":")
                        treeCaseId = tempStr[0]
                        treeTaskId = tempStr[1]
                        treePhone = tempStr[2]
                        treeApp = tempStr[3]
                        console.log(treeCaseId + '***** ' + treeTaskId + ' *****' + treePhone +  '*****  ' + treeApp)
                    }
                }
                if(treeCaseId === '' || data.id === 1)//主页
                {
                    this.jumpToCaseDisplay()
                }
                else if(treeTaskId === '')//案件
                {
                    this.jumpToEvidenceDisplayByTree(treeCaseId)
                }
                else if(treePhone === '')//任务
                {
                    if (data.evidence === 1) {
                        this.jumpToEvidenceInformation(treeCaseId,treeTaskId)
                    } else if (data.evidence === 0) {
                        this.jumpToPhoneInformation(treeCaseId, treeTaskId)
                    }
                }
                else if(treeApp === '')//手机号
                {
                    this.jumpToAppDisplay(treeCaseId, treeTaskId, treePhone)
                }
                else
                {
                    this.jumpToAppInformation(treeTaskId,treeApp,treePhone)
                }
            }
        }
    }
</script>

<style scoped>
  .header {
    background: #F3F4F7;
    width: 100%;
    padding: 5px;
    float: right;
  }

  .nav {
    background: #F3F4F7;
    height: 1024px;
    width: 10%;
    float: left;
    padding: 5px;
  }

  .section {
    background: #F3F4F7;
    width: 100%;
    /*float:left;*/
    padding: 10px;
  }

  #section2 {
    width: 150px;
    float: left;
    padding: 10px;
  }

  #section3 {
    width: 260px;
    float: left;
    padding: 10px;
  }

  .footer {
    background: #F3F4F7;
    clear: both;
    text-align: center;
    padding: 5px;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 60px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }

  .tree{
    overflow-y: hidden;
    overflow-x: scroll;
    width:80px;
    height: 500px;
  }
  .el-tree {
    min-width: 100%;
    display:inline-block !important;
  }

  .el-tree--highlight-current /deep/ .el-tree-node.is-checked > .el-tree-node__content {
    background-color: #F3F4F7;
    color: rgb(64, 158, 255);
  }

  .el-tree--highlight-current /deep/ .el-tree-node.is-current > .el-tree-node__content {
    background-color: #F3F4F7;
    color: rgb(0, 158, 255);
  }
</style>

