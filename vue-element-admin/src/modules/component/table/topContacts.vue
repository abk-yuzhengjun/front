<template>
  <el-table
    height="300"

    :data="contact.data">
    <el-table-column
      v-if = show.name
      prop="name"
      label="姓名"
      width="300px">
    </el-table-column>
    <el-table-column
      v-if = show.gender
      prop="gender"
      label="性别"
      width="150px">
    </el-table-column>
    <el-table-column
      v-if = show.phone
      prop="phone"
      label="手机号"
      width="300px">
    </el-table-column>
    <el-table-column
      v-if = show.identity_card_number
      prop="identity_card_number"
      label="身份证"
      width="380px">
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "topContacts",
        props: ["contact"],
        data(){
            return {
                show:{
                    "name":"",
                    "gender":"",
                    "identity_card_number":"",
                    "phone":""
                }
            }
        },
        methods:{
            existence_identification(){
                for(var key in this.contact['data'][0])
                {
                    this.show[key]=true;
                }
            }
        },
        watch: {
            '$route': 'existence_identification'
        },
        created() {
            this.existence_identification();
        }

    }
</script>

<style scoped>

</style>
