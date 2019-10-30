<template>
  <el-table
    height="300"
    :data="dvAdress.data">
    <el-table-column
      v-if="show.name"
      prop="name"
      label="收货人"
      width="300">
    </el-table-column>
    <el-table-column
      v-if="show.address"
      prop="address"
      label="收货地址"
      width="300">
    </el-table-column>
    <el-table-column
      v-if="show.phone"
      prop="phone"
      label="号码"
      width="280">
    </el-table-column>
    <el-table-column
      v-if="show.post"
      prop="post"
      label="邮编"
      width="200">
    </el-table-column>
    <el-table-column
      v-if="show.is_default"
      prop="is_default"
      label="是否默认"
      width="200">
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "cs_address",
        props: ["dvAdress"],
        data(){
            return{
                show:{
                    "address":"",
                    "name":"",
                    "phone":"",
                    "post":"",
                    "is_default":"",
                    "class":""
                }
            }
        },
        methods:{
            existence_identification(){
                for(var key in this.dvAdress['data'][0])
                {
                    console.log("key",key)
                    this.show[key]=true;

                }
                console.log("show :",this.show)
            }

        },
        watch: {
            '$route': 'existence_identification'
        },
        created() {
            this.existence_identification();
            console.log("dvAdress",this.dvAdress)
        }
    }
</script>

<style scoped>

</style>
