<template>
  <div style="width: 100%;display: flex;flex-direction: column;padding:10px;">
    <div style="width: 100%;display: flex;justify-content: space-between;padding:10px;">
      <el-input v-model="tableDataName" @input="doFilter" placeholder="请输入imsi或手机号查找" style="width:500px" />
      <el-page-header @back="goBack" content="">
      </el-page-header>
    </div>


    <el-table
      :data="tempList"
      :header-cell-style="{color:'#303133',font: '14px Base'}"
      :cell-style="{font: '14px Base', color:'#333333'}"
      style="margin-bottom:14px;"
      :empty-text="emptyText"
      :default-sort="{prop:'timestr',order:'descending'}"
      :highlight-current-row="true"
      width="100%"
      height="600px"
    >
      <el-table-column property="imsi" label="imsi" min-width="100px" align="left" />
      <el-table-column property="phone" label="手机号码" min-width="100px" align="left" />
      <el-table-column label="状态" min-width="200px" align="left" >
        <template slot-scope="scope">
          <span :class="imsi_status_show_dict.get(scope.row.imsi_status)" ></span>
          <span >{{imsi_status_dict.get(scope.row.imsi_status)}}</span>
        </template>
      </el-table-column>
      <el-table-column property="timestr" label="时间" min-width="200px" align="left" />
    </el-table>
    <el-pagination
      align="center"
      :current-page="currentPage1"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[5, 10, 50, 100]"
      :page-size="pageSize"
      :total="total1"
      @size-change="handleSizeChange1"
      @current-change="handleCurrentChange1"
    />
  </div>
</template>

<script>
    import store from '../../store'
    export default {
        name: "phoneDetailsShow.vue",
        data() {
            return {
                total1: 10,
                currentPage1: 1,
                pageSize: 10,
                bondsAllList: '',
                tableDataName: '',
                tableDataEnd: '',
                filterTableDataEnd: '',
                flag: 0,
                task_id: '0',
                caseID: '',
                tempList: [],
                emptyText: '',
                imsi_status_dict:new Map([["", "未开始"], ["1", "控制中心下发取号任务"], ["2", "4G主动式上号"],["3", "2G主动式上号"],["4", "控制中心给伪终端发任务"],["5", "伪终端鉴权中"],
                    ["51", "收到伪终端rand"],["52", "收到主动式sres"],["53", "伪终端鉴权成功"],["54", "伪终端鉴权失败"],
                    ["6", "伪终端发送取号短信成功"], ["7", "伪终端发送取号短信失败"],["8", "取号成功"]]),
                imsi_status_show_dict:new Map([["", "status-info"], ["1", "status-success"], ["2", "status-primary"],["3", "status-primary"],["4", "status-warning"],["5", "status-warning"],
                    ["51", "status-warning"],["52", "status-warning"],["53", "status-success"],["54", "status-info"],
                    ["6", "status-success"], ["7", "status-info"],["8", "status-success"]]),
            }
        },
        created() {
            this.init();
        },
        methods: {
            goBack(){
                this.$router.go(-1);
            },
            getParams(){
                this.task_id = this.$route.query.task_id
            },
            init() {
                this.getParams();
                let temp = []
                let temp2 = []
                temp = this.$store.state.phoneDetails.phone_info;
                for (let index in temp)
                {
                    console.log(temp[index])
                    if(temp[index].task_id === this.task_id) {
                        temp2.push(temp[index])
                    }
                }
                this.bondsAllList = temp2
                console.log('phoneDeatilsShow created!')
                console.log(this.task_id)
                console.log(this.bondsAllList)
                this.getCreateTable()
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
                    this.$message.warning('查询条件不能为空！')
                    return
                }
                this.tableDataEnd = []
                this.filterTableDataEnd = []
                this.bondsAllList.forEach((value, index) => {
                    if (value.imsi) {
                        if (value.imsi.indexOf(this.tableDataName) >= 0) {
                            this.filterTableDataEnd.push(value)
                        }
                        else if (value.phone) {
                            if (value.phone.indexOf(this.tableDataName) >= 0) {
                                this.filterTableDataEnd.push(value)
                            }
                        }
                    }
                })
                this.currentPage1 = 1
                this.total1 = this.filterTableDataEnd.length
                this.currentChangePage(this.filterTableDataEnd, this.currentPage1)
                this.flag = 1
            },
        }
    }


</script>

<style scoped>
  .status-info{
    display:inline-block;
    width: 10px;
    height:10px;
    background:#909399;
    border-radius:50%;
    /*border:2px solid #909399;*/
  }
  .status-primary{
    display:inline-block;
    width: 10px;
    height:10px;
    background:#409eff;
    border-radius:50%;
    /*border:2px solid #409eff;*/
  }
  .status-success{
    display:inline-block;
    width: 10px;
    height:10px;
    background:#67c23a;
    border-radius:50%;
    /*border:2px solid #67c23a;*/
  }
  .status-warning{
    display:inline-block;
    width: 10px;
    height:10px;
    background:#e6a23c;
    border-radius:50%;
    /*border:2px solid #e6a23c;*/
  }
  .status-danger{
    display:inline-block;
    width: 10px;
    height:10px;
    background:#f56c6c;
    border-radius:50%;
    /*border:2px solid #f56c6c;*/
  }

</style>
