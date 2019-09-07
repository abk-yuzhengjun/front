<template xmlns:height="http://www.w3.org/1999/xhtml">
  <div style="width: 100%;height:100%">
    <div style="width: 100%;display: flex;padding-bottom: 10px; background: #F3F4F7">
      <div style="width: 100%; background: #FFFFFF;display: flex; padding: 2px 20px 2px 20px;flex-direction: column;">
        <h2>案件详情</h2>
        <div
          style="display: flex;justify-content: space-between;padding-bottom: 20px;padding-top: 10px;font-size: 18px;color: #333333">
          <span>案件编号:&nbsp; {{ case_id }}</span>
          <span>案件名 : &nbsp;{{ case_name }}</span>
          <span>
            <!--            <el-button type="text" @click="remId(scope.$index)">创建案件</el-button>-->
            <el-button type="text" style="text-decoration: underline; font-size:18px" @click="editCaseInfo">编辑案件</el-button>
          </span>
        </div>
        <span style="font-size: 18px;color: #333333">详情&nbsp;&nbsp;&nbsp;&nbsp;{{ details }}</span>
        <el-divider content-position="center"/>
      </div>
    </div>
    <div
      style="width: 100%;display: flex;justify-content: space-between;padding-left:20px;padding-top: 10px;padding-right: 10px">
      <span style="font-size: 20px;font-weight: bold">任务列表</span>
      <el-input v-model="tableDataName" placeholder="请输入任务名" suffix-icon="el-icon-search" style="width:360px"
                @input="doFilter"/>
    </div>
    <div style="width:100%;padding-left:20px;justify-content: flex-start">
      <el-button type="primary" @click="jumpToTask">+创建任务</el-button>
    </div>
    <!--    <div class="nav">-->
    <!--      <el-tree ref="tree" :data="treeData" :props="defaultProps" default-expand-all="false" @node-click="handelNodeClick" />-->
    <!--    </div>-->
    <div style="width: 100%;height:65%; display: flex;flex-direction: column;padding:10px;">
      <el-table
        :data="tempList"
        :header-cell-style="{color:'#666666',font: '18px large'}"
        :cell-style="{font: '16px Medium',color:'#333333'}"
        stripe
        style="margin-bottom:14px;"
        :empty-text="emptyText"
        :default-sort="{prop:'time',order:'ascending'}"
        :highlight-current-row="true"
        width="100%"
        height="1"
      >
        <!--        <el-table-column type="index" :index="indexMethod" label=" " min-width="100px" align="center" />-->
        <el-table-column type="expand" min-width="5px">
          <template slot-scope="props">
            <el-form v-for="(item,index) in props.row.evidence_content" :key="index" label-position="left" inline
                     class="demo-table-expand">
              <el-form-item label="手机号">
                <span> {{ item.phone }} </span>
              </el-form-item>
              <el-form-item label="imsi">
                <span>{{ item.imsi }}</span>
              </el-form-item>
              <el-form-item label="app">
                <span>{{ item.app_list }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="编号" min-width="13px" align="left">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.task_type === 2" size="medium" type="danger">取证</el-tag>
            <el-tag v-else-if="scope.row.task_type === 1" size="medium">取号</el-tag>
            <el-button type="text" @click="jumpToEvidenceInformation(scope.$index,scope.row)">{{scope.row.task_id}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="任务名" min-width="13px" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.task_name}}</span>
            <el-button type="text" class="el-icon-edit-outline" @click="editTaskInfo(scope.$index,scope.row)"></el-button>
            <div>{{scope.row.task_detail}}</div>
          </template>
        </el-table-column>

        <!--        <el-table-column property="evidence_content[0].phone" label="手机号" min-width="200px" align="center" />-->
        <el-table-column label="创建时间" min-width="10px" align="left">
          <template slot-scope="scope">
            <span >{{ scope.row.create_ts }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="14px" align="left">
          <template slot-scope="scope">
<!--            <el-tag v-if="scope.row.task_status === 'ready'" size="medium" type="primary">准备中</el-tag>-->
            <el-progress  :percentage="100"  :format="format" >准备中</el-progress>
<!--            <el-tag v-else-if="scope.row.task_status === 'running'" size="medium" type="warning">进行中</el-tag>-->
<!--            <el-tag v-else-if="scope.row.task_status === 'complete'" size="medium" type="success">已完成</el-tag>-->
<!--            <el-tag v-else-if="scope.row.task_status === 'failed'" size="medium" type="danger">失败</el-tag>-->
<!--            <el-tag v-else-if="scope.row.task_status === 'canceled'" size="medium" type="info">已取消</el-tag>-->
<!--            <el-progress :percentage="0" v-if="scope.row.task_progress === ''"></el-progress>-->
<!--            <el-progress :percentage="25" v-else-if="scope.row.task_progress === 'step1'"></el-progress>-->
<!--            <el-progress :percentage="50" v-else-if="scope.row.task_progress === 'step2'"></el-progress>-->
<!--            <el-progress :percentage="75" v-else-if="scope.row.task_progress === 'step3'"></el-progress>-->
<!--            <el-progress :percentage="100" status="success"-->
<!--                         v-else-if="scope.row.task_progress === 'step4'"></el-progress>-->
<!--            <el-progress :percentage="0" v-else></el-progress>-->
          </template>
        </el-table-column>
        <!--        <el-table-column label="" align="center" min-width="10px">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-button size="medium" type="success" @click="jumpToEvidenceInformation(scope.$index,scope.row)">详情</el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--        <el-table-column label="" align="center" min-width="10px">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-button size="medium" type="text" @click="jumpToEvidenceInformation(scope.$index,scope.row)">详情</el-button>-->
        <!--            <el-button type="text" @click="editTaskInfo(scope.$index,scope.row)">编辑</el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column label="" align="center" min-width="8px">
          <template slot-scope="scope">
            <i class="el-icon-loading" v-if="scope.row.task_status !== 'ready'"></i>
            <el-button size="mini" type="primary" @click="handelTaskStatus(scope.$index,scope.row)" v-if="scope.row.task_status === 'ready'">开始</el-button>
            <el-button size="mini" type="danger" @click="handelTaskStatus(scope.$index,scope.row)" v-else>结束</el-button>
<!--            <el-button size="mini" type="danger">结束</el-button>-->
          </template>
        </el-table-column>
      </el-table>


      <el-pagination
        align="center"
        :current-page="currentPage1"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="total1"
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
      />
    </div>
    <div v-if="dialogFormVisible">
      <el-dialog title="编辑任务" :visible.sync="dialogFormVisible">
        <task_comp :taskData ='dialogPropTask' />
      </el-dialog>
    </div>
    <div v-if="dialogFormVisibleCase">
      <el-dialog title="编辑案件" :visible.sync="dialogFormVisibleCase">
        <case_comp :compData ='dialogPropCase' />
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import axios from 'axios'
    import store from '../../store'
    import { mapGetters } from 'vuex'
    import case_comp from '../component/case_comp'
    import task_comp from '../component/task_comp'

    export default {
        name: 'EvidenceDisplay',
        components: {task_comp,case_comp},
        data() {
            return {
                dialogFormVisible: 0,
                dialogFormVisibleCase: 0,
                dialogPropCase: {
                    type: '',
                    case_name: '',
                    case_detail: '',
                    user_id: '',
                    create_ts: '',
                    update_ts: ''
                },
                dialogPropTask: {
                    type: '',
                    dev_list: [],
                    oper_list: [],
                    case_list: [],
                    task_info: {
                        user_id: '',
                        case_name: '',
                        case_id: '',
                        task_id: 1,
                        task_name: '',
                        task_detail: '',
                        create_ts: '',
                        task_type: '',
                        number_content: {
                            capture_mode: '',
                            imsi_black_list: [
                                ''
                            ],
                            capture_operation: '',
                            capture_type: ''
                        },
                        evidence_content: [
                            {
                                phone: '',
                                imsi: '',
                                app_list: '',
                            }
                        ]
                    }
                },
                tempList: [],
                emptyText: '',
                case_name: '',
                task_name: '',
                case_id: '',
                total1: 0,
                currentPage1: 1,
                pageSize: 10,
                details: '',
                bondsAllList: '',
                tableDataName: '',
                tableDataEnd: '',
                filterTableDataEnd: '',
                flag: 0,
                treeData: [],
                tempTreeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        created() {
            console.log('created initing');
            this.getParams()
            this.updateTable();
            // this.init()
        },
        // eslint-disable-next-line vue/order-in-components
        watch: {
            '$route': 'updateTable',
            caseInfo() {
                console.log('watch bondsAllList.......');
                this.updateTable()
            }

        },
        computed: {
            ...mapGetters({ caseInfo:'caseInfo'}),
        },
        methods: {
            format(percentage) {
                return percentage === 100 ? '准备中' : `${percentage}%`;
            },
            updateTable(){
                this.$store.commit('forensic/getTreeCaseInfo', this.case_id)
                this.bondsAllList = this.caseInfo.task_list
                this.details = this.caseInfo.case_detail;
                this.case_name = this.caseInfo.case_name;
                console.log('updateTable ALL table')
                if (this.bondsAllList !== undefined && this.bondsAllList !== '') {
                    this.getCreateTable()
                }
            },
            init() {
                this.getParams()
                // this.getMessage()
                //this.getMessageByPost()
                //  this.getMessageByPost2()
                this.bondsAllList = ''
                // this.tempList = []


                // for (let i = 0; i < this.$store.state.forensic.case_info.length; i++) {
                //     if (this.$store.state.forensic.case_info[i].case_id === this.case_id) {
                //
                //         this.bondsAllList = this.$store.state.forensic.case_info[i].task_list;
                //         this.dialogPropCase.case_name = this.$store.state.forensic.case_info[i].case_name;
                //         this.dialogPropCase.case_detail = this.$store.state.forensic.case_info[i].case_detail;
                //         this.dialogPropCase.create_ts = this.$store.state.forensic.case_info[i].create_ts;
                //         this.dialogPropCase.update_ts = this.$store.state.forensic.case_info[i].update_ts;
                //         this.dialogPropCase.user_id = this.$store.getters.name
                //         this.dialogPropCase.case_id = this.$store.state.forensic.case_info[i].case_id
                //         this.dialogPropCase.type = '1'
                //         break
                //     }
                // }
                console.log('dialog')
                console.log(this.dialogPropCase)
                if (this.bondsAllList !== undefined && this.bondsAllList !== '') {
                    this.getCreateTable()
                }
            },
            getMessage() {
                const path = 'http://10.10.100.59:5000/forensic/phonedisplay/' + 2
                axios.get(path)
                    .then((res) => {
                        this.bondsAllList = res.data
                        this.getCreateTable()
                    })
                    .catch((error) => {
                        alert(error)
                    })
            },
            getMessageByPost() {
                const path = 'http://10.10.100.59:5000/forensic/phonedisplay'
                const list = {
                    case_name: this.case_name
                }
                axios.post(path, list)
                    .then((res) => {
                        this.bondsAllList = res.data
                        this.getCreateTable()
                    })
                    .catch((error) => {
                        alert(error)
                    })
            },
            getMessageByPost2() {
                const path2 = 'http://localhost:5000/forensic/casetaskbycaseid'
                console.log(this.case_id)
                const param = {
                    user_id: '14141341414141',
                    case_id: this.case_id
                }
                axios.post(path2, JSON.stringify(param))
                    .then((res) => {
                        this.bondsAllList = res.data[0].task_list
                        this.getCreateTable()
                    })
                    .catch((error) => {
                        alert(error)
                    })
            },
            getMessageByTask(task_id) {
                const path = 'http://localhost:5000/forensic/phonedisplay/' + task_id
                axios.get(path)
                    .then((res) => {
                        this.bondsAllList = res.data
                        this.getCreateTable()
                    })
                    .catch((error) => {
                        alert(error)
                    })
            },
            sendMessage() {
                const path = 'http://localhost:5000/forensic/forensic-details'
                const list = {
                    name: 'yzj',
                    age: 18
                }
                // const jsonList = JSON.stringify(list)
                axios.post(path, list)
                    .then(res => {
                        this.tableDataName = res.data.age
                    })
                    .catch((error) => {
                        alert(error)
                    })
            },
            handleSizeChange1: function (pageSize) { // 每页条数切换
                // eslint-disable-next-line eqeqeq
                if (this.flag === 1) {
                    return
                }
                this.pageSize = pageSize
                this.handleCurrentChange1(this.currentPage1)
            },
            handleCurrentChange1: function (currentPage) { // 页码切换
                this.currentPage1 = currentPage
                // eslint-disable-next-line eqeqeq
                if (this.flag === 0) {
                    this.currentChangePage(this.bondsAllList, currentPage)
                } else {
                    this.currentChangePage(this.filterTableDataEnd, currentPage)
                }
            },
            // 分页方法（重点）
            currentChangePage(list, currentPage) {
                let from = (currentPage - 1) * this.pageSize
                this.tempList = []
                const to = currentPage * this.pageSize
                for (; from < to; from++) {
                    if (list[from]) {
                        this.tempList.push(list[from])
                    }
                }
            },
            editTaskInfo(index, row) {
                this.dialogFormVisible = !this.dialogFormVisible
                this.dialogPropTask.type = '2'
                this.dialogPropTask.task_info.task_detail = row.task_detail
                this.dialogPropTask.dev_list = row.dev_list
                this.dialogPropTask.task_info.task_id = row.task_id
                this.dialogPropTask.task_info.case_id = this.case_id
                this.dialogPropTask.task_info.case_name = this.case_name
                this.dialogPropTask.task_info.task_name = row.task_name
                this.dialogPropTask.task_info.task_type = row.task_type
                this.dialogPropTask.task_info.evidence_content = row.evidence_content
                this.dialogPropTask.task_info.number_content = row.number_content
                console.log(this.dialogPropTask)
                console.log('task dialog')
            },
            editCaseInfo() {
                this.dialogFormVisibleCase = !this.dialogFormVisibleCase
                this.dialogPropCase.case_name = this.caseInfo.case_name
                this.dialogPropCase.case_detail = this.caseInfo.case_detail;
                this.dialogPropCase.create_ts = this.caseInfo.create_ts;
                this.dialogPropCase.update_ts = this.caseInfo.update_ts;
                this.dialogPropCase.user_id = this.$store.getters.name
                this.dialogPropCase.case_id = this.caseInfo.case_id
                this.dialogPropCase.type = '1'
                console.log(this.dialogPropCase)
            },
            getCreateTable() {
                this.total1 = this.bondsAllList.length
                this.flag = 0
                this.handleCurrentChange1(this.currentPage1)
            },
            doFilter() {
                // eslint-disable-next-line eqeqeq
                if (this.tableDataName === '') {
                    this.getCreateTable()
                    return
                }
                this.tableDataEnd = []
                this.filterTableDataEnd = []
                this.bondsAllList.forEach((value, index) => {
                    if (value.task_name) {
                        if (value.task_name.indexOf(this.tableDataName) >= 0) {
                            this.filterTableDataEnd.push(value)
                        }
                    }
                })
                this.currentPage1 = 1
                this.total1 = this.filterTableDataEnd.length
                this.currentChangePage(this.filterTableDataEnd, this.currentPage1)
                this.flag = 1
            },
            openData() {
                this.tableDataName = []
                this.getCreateTable()
            },
            confirmDelete(index, row) {
                this.$confirm('确认删除' + ' time: ' + row.time + '  data: ' + row.data, '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.$message({
                            type: 'success',
                            message: '开始删除'
                        })
                        this.handleDelete(index, row)
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除！'
                        })
                    })
            },
            handleDelete(index, row) {
                const path = 'http://localhost:5000/forensic/forensic-details/1'
                axios.post(path, row)
                    .then(res => {
                        this.$message.warning('删除成功！')
                        this.bondsAllList = res.data
                        this.getCreateTable()
                    })
                    .catch((error) => {
                        alert(error)
                    })
            },
            handelTaskStatus(index, row) {
                const path2 = 'http://localhost:5000/caseManage/caseInfo/taskStateSubmit'
                if(row.task_status === 'ready') {
                    row.task_status = 'running'
                } else if(row.task_status === 'running') {
                    row.task_status = 'ready'
                }
                const param = {
                    user_id: '123',
                    case_id: this.case_id,
                    task_id: row.task_id,
                    task_status: row.task_status
                }
                console.log(param)
                axios.post(path2, param)
                    .then((res) => {
                        console.log(res.data)
                    })
                    .catch((error) => {
                        alert(error)
                    })
            },
            jumpToPhoneDisplay(index, row) {
                this.$router.push(
                    {
                        name: 'phonedisplay',
                        query: {
                            caseID: row.case_id
                        }
                    })
            },
            jumpToEvidenceInformation(index,row) {
                this.$store.commit('forensic/getTreeCaseInfo', this.case_id)
                this.$store.commit('forensic/getTreeTaskInfo', row.task_id)
                if (row.task_type === 2) {
                    this.$router.push(
                        {
                            name: 'evidenceinformation',
                            query: {
                                taskID: row.task_id,
                                taskName: row.task_name,
                                caseName: this.case_name
                            }
                        })
                } else if (row.task_type === 1) {
                    this.$router.push(
                        {
                            name: 'phoneinformation',
                            query: {
                                taskID: row.task_id,
                                taskName: row.task_name,
                                caseName: this.case_name
                            }
                        })
                } else {
                    this.$router.push(
                        {
                            name: 'evidenceinformation',
                            query: {
                                taskID: row.task_id,
                                taskName: row.task_name,
                                caseName: this.case_name
                            }
                        })
                }
            },
            jumpToCase() {
                this.$router.push(
                    {
                        name: 'CaseCreator'
                    }
                )
            },
            jumpToTask() {
                this.dialogFormVisible = !this.dialogFormVisible
                this.dialogPropTask.type = '1'
                this.dialogPropTask.task_info.case_id = this.case_id
                this.dialogPropTask.task_info.case_name = this.case_name
                this.dialogPropTask.task_info.task_detail = ''
                this.dialogPropTask.dev_list = []
                this.dialogPropTask.task_info.task_id = ''
                this.dialogPropTask.task_info.case_id = ''
                this.dialogPropTask.task_info.task_name = ''
                this.dialogPropTask.task_info.task_type = ''
                this.dialogPropTask.task_info.evidence_content = []
                this.dialogPropTask.task_info.number_content = []
            },
            handelNodeClick(data) {
                if (data.id > 10) {
                    this.getMessageByTask(data.label)
                } else {
                    this.jumpToCaseDisplay()
                }
            },
            getParams() {
                // this.tempTreeData = JSON.parse(this.$route.query.treeTempList)
                this.case_id = this.$route.query.caseId
            },
        }
    }
</script>

<style scoped>
  .header {
    /*background: #C1CDCD;*/
    background: #F3F4F7;
    width: 100%;
    padding: 5px;
    float: right;
  }

  /*>>>.el-progress-bar__inner{*/
  /*    background: #a13e0d;*/
  /*}*/
  .nav {
    background: #F3F4F7;
    height: 1024px;
    width: 10%;
    float: left;
    padding: 5px;
  }

  .section {
    background: #F3F4F7;
    height: 100%;
    width: 100%;
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
    color: white;
    clear: both;
    text-align: center;
    padding: 5px;
  }

  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 100px;
  }

  .el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 100px;
  }
</style>

