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
                    <!-- 表格 -->
                    <el-table :data="tableData" border>
                        <el-table-column prop="name" label="名称" width="250"></el-table-column>
                        <el-table-column prop="updatetime" label="最后操作时间" width="250"></el-table-column>
                        <el-table-column label="操作">
                            <el-button type="primary" size="mini">编辑</el-button>
                            <el-button type="danger" size="mini">删除</el-button>
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user:{
                name:this.$store.state.userInfo.username,
                rolePlay:this.$store.state.userInfo.rolePlay
            },
            tableData: [{
                id:1,
                name:"学工部",
                updatetime:"2010-01-01 12:00:00"
            },{
                id:2,
                name:"教研部",
                updatetime:"2010-01-01 12:00:00"
            },{
                id:3,
                name:"就业部",
                updatetime:"2010-01-01 12:00:00"
            },{
                id:4,
                name:"人事部",
                updatetime:"2010-01-01 12:00:00"
            },{
                id:5,
                name:"行政部",
                updatetime:"2010-01-01 12:00:00"
            }]
        }
    },
    methods: {  
        // checkPermission() {
        //     const role = this.$store.state.userInfo.rolePlay;
        //     if (role === "0") {
        //         // 用户没有权限，弹出提示
        //         this.$message.error('您没有权限访问');
        //     } else {
        //         // 用户有权限，使用编程式导航跳转
        //         this.$router.push('/emp');
        //     }
        // }
    },
}
</script>

<style>


</style>