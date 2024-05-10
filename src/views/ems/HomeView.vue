<template>
    <div>
        <el-container  style="height: 700px; border: 1px solid #eee">
            <el-header style="background-color: #2f4154; color: #ffffff; text-align: center; line-height: 60px; font-family: 'Arial', sans-serif; font-size: 24px; letter-spacing: 2px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
    管理系统
            <div style="float: right; margin-right: 20px; margin-top:5px">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
                <span style="margin-left: 10px;"> {{ user.name }} </span>
            </div>
            </el-header>

            <!-- @click="checkPermission($event)" -->
            <!-- @click.prevent="checkPermission -->
            <el-container>
                <el-aside width="220px" style="border: 1px solid #eee">
                    <el-menu :default-openeds="['1', '3']">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-message"></i>系统信息管理</template>
                            <el-menu-item index="1-0">
                                <router-link to="/home">首页</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-1">
                                <router-link to="/dept">部门管理</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-2">
                                <router-link to="/emp">员工管理</router-link>
                            </el-menu-item>
                        </el-submenu>
                        </el-menu>
                </el-aside>


                <el-main>
                    <h3>欢迎进入管理系统</h3>
                </el-main>
            </el-container>
        </el-container>
    </div>
  
</template>

<script>
export default {
    data(){
        return {
            user:{
                name:this.$store.state.userInfo.username,
                rolePlay:this.$store.state.userInfo.rolePlay
            }
        }
    },
    methods: {  
    },  
    mounted(){
        console.log(this.$store.state.userInfo.rolePlay)
    }

}
</script>

<style>
h3 {
    text-align: center;
    color: rgb(43, 75, 107); /* Match the background color of the login container */
    font-size: 24px;
    margin-top: 55px; /* Increase the margin-top value to move the text down */
    text-transform: uppercase;
    letter-spacing: 2px;
  }

</style>