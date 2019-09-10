<template xmlns:height="http://www.w3.org/1999/xhtml">
  <div style="width: 100%;height:100%">
    <div style="width: 100%;display: flex;justify-content: space-between;padding:10px;">
      <el-button align="left" type="primary" width="320px" @click="jumpToCase">+创建案件</el-button>
      <el-input v-model="tableDataName" align="right" placeholder="请输入案件名" suffix-icon="el-icon-search" style="width:360px"
                @input="doFilter"/>
    </div>
    <div style="width: 100%;height:90%;display: flex;flex-direction: column; padding:10px;">
      <el-table
        :data="tempList"
        :header-cell-style="{color:'#666666',font: '18px large'}"
        :cell-style="{font: '16px Medium',color:'#333333'}"
        stripe
        style="margin-bottom:14px;"
        :empty-text="emptyText"
        :default-sort="{prop:'create_ts',order:'descending'}"
        :highlight-current-row="true"
        width="100%"
        height="1"
      >
        <!--        <el-table-column type="index" :index="indexMethod" label=" " min-width="100px" align="center" />-->
        <el-table-column type="expand" min-width="5px">
          <template slot-scope="props">
            <el-form v-for="(item,index) in props.row.task_list" :key="index" label-position="left" inline
                     class="demo-table-expand">
              <el-form-item label="任务">
                <span> {{ item.task_name }} </span>
                <!--                <el-tag size="medium"> 未开始 </el-tag>-->
                <!--                <el-button size="mini" type="info" @click="jumpToEvidenceDisplay(props.$index,props.row)"> 查看任务 </el-button>-->
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="案件编号" min-width="15px" align="left">
          <template slot-scope="scope">
            <el-button size="medium" type="text" @click="jumpToEvidenceDisplay(scope.$index,scope.row)">{{scope.row.case_id}}</el-button>
          </template>
        </el-table-column>
        <el-table-column property="case_name" label="案件名" min-width="10px" align="center"/>
        <el-table-column property="case_detail" label="案件信息" min-width="20px" align="center"/>
        <el-table-column label="创建时间" min-width="20px" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create_ts }}</span>
          </template>
        </el-table-column>
        <!--        <el-table-column min-width="10px" label="详情" align="center">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-button size="medium" type="success" @click="jumpToEvidenceDisplay(scope.$index,scope.row)">查看案件</el-button>-->
        <!--            &lt;!&ndash;                      <el-button size="medium" type="danger" @click="showDetails(scope.$index,scope.row)">取证</el-button>&ndash;&gt;-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column min-width="10px" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editCaseInfo(scope.$index,scope.row)">编辑</el-button>
            <el-button type="text" @click="deleteCaseInfo(scope.$index,scope.row)">删除</el-button>
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
    <div v-if="dialogFormVisibleCase">
      <el-dialog title="编辑案件" :visible.sync="dialogFormVisibleCase">
        <case_comp :compData ='dialogPropCase' v-on:closeCaseDialog="closeCaseDialog" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
    // eslint-disable-next-line no-undef,no-unused-vars
    import axios from 'axios'
    import store from '../../store'
    import { mapGetters } from 'vuex'
    import case_comp from '../component/case_comp'

    export default {
        name: 'CaseDisplay',
        components: {case_comp},
        data() {
            return {
                total1: 0,
                dialogFormVisibleCase: 0,
                tempList: [],
                emptyText: '',
                currentPage1: 1,
                pageSize: 10,
                bondsAllList: '',
                tableDataName: '',
                taskTableData: '',
                tableDataEnd: '',
                filterTableDataEnd: '',
                flag: 0,
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                dialogPropCase: {
                    type: '',
                    case_name: '',
                    case_detail: '',
                    user_id: '',
                    create_ts: '',
                    update_ts: ''
                },
            }
        },
        created() {
            this.init()
        },
        watch: {
            taskData() {
                this.init()
            }
        },
        computed: {
            taskData() {
                console.log('casedisplay computed run')
                return this.$store.state.forensic.case_info
            },
        },
        methods: {
            init() {
                this.bondsAllList = this.$store.state.forensic.case_info
                if (this.bondsAllList !== '') {
                    this.getCreateTable()
                    this.$store.commit('forensic/getTreeCaseInfo','')
                    this.$store.commit('forensic/getTreeTaskInfo','')
                }
            },
            closeCaseDialog() {
                console.log('------------Case-----------------')
                this.dialogFormVisibleCase = !this.dialogFormVisibleCase
                this.getTreeMessage()
            },
            getTreeMessage() {
                const path2 = 'http://localhost:5000/forensic/casetaskdisplay'
                const param = {
                    user_id: this.$store.state.user.name
                }
                console.log('12345')
                axios.post(path2, JSON.stringify(param))
                    .then((res) => {
                        this.$store.commit('forensic/getCaseInfo', res.data)
                        //this.getTreeData()
                    })
                    .catch((error) => {
                        alert(error)
                    })
            },
            editCaseInfo(index,row) {
                this.dialogFormVisibleCase = !this.dialogFormVisibleCase
                this.dialogPropCase.case_name = row.case_name
                this.dialogPropCase.case_detail = row.case_detail;
                this.dialogPropCase.create_ts = row.create_ts;
                this.dialogPropCase.update_ts = row.update_ts;
                this.dialogPropCase.user_id = this.$store.getters.name
                this.dialogPropCase.case_id = row.case_id
                this.dialogPropCase.type = 1
                console.log(this.dialogPropCase)
            },
            deleteCaseInfo(index,row) {
                return
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.handleDelete(index, row)
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除！'
                        })
                    })
            },
            getMessageByPost2() {
                const path2 = 'http://localhost:5000/forensic/casetaskdisplay'
                const param = {
                    user_id: '14141341414141'
                }
                axios.post(path2, JSON.stringify(param))
                    .then((res) => {
                        this.bondsAllList = res.data
                        this.getCreateTable()
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
                    if (value.case_name) {
                        if (value.case_name.indexOf(this.tableDataName) >= 0) {
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
                const path = 'http://localhost:5000/caseManage/deleteCase'
                const param = {
                    user_id:this.$store.getters.name,
                    case_id:row.case_id
                }
                axios.post(path, param)
                    .then(res => {
                        if(res.data.result === 'success')
                        {
                            this.$message.success('删除成功！')
                        }
                        else
                        {
                            this.$message.warning('删除失败！请刷新后再试！')
                        }
                        this.getTreeMessage()

                    })
                    .catch((error) => {
                        alert(error)
                    })
                    .finally(function () {
                        console.log('delete case_info, update tree!')
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
            jumpToEvidenceDisplay(index, row) {
                this.$store.commit('forensic/getTreeCaseInfo',row.case_id)
                this.$router.push(
                    {
                        name: 'evidencedisplay',
                        query: {
                            caseName: row.case_name,
                            caseId: row.case_id
                        }
                    })
            },
            jumpToCase() {
                this.$router.push(
                    {
                        name: 'CaseCreator'
                    }
                )
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
    height: 100%;
    width: 100%;
    float: left;
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
</style>

