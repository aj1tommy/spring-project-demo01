<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">

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
                <!-- 表单 -->
                <el-form :inline="true" :model="searchForm" class="demo-form-inline" >
                    <el-form-item label="id">
                        <el-input v-model="searchForm.id" placeholder="id"></el-input>
                    </el-form-item>

                    <el-form-item label="姓名">
                        <el-input v-model="searchForm.name" placeholder="姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="性别">
                        <el-select v-model="searchForm.gender" placeholder="性别">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="入职时期">
                        <el-date-picker
                            v-model="searchForm.entrydate"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>

                <el-button type="primary" @click="dialogFormVisible1 = true">新增员工</el-button>
                <el-dialog title="新增员工" :visible.sync="dialogFormVisible1">
                <el-form :model="form1">
                    <el-form-item label="新增员工姓名" :label-width="formLabelWidth">
                    <el-input v-model="form1.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新增员工职位" :label-width="formLabelWidth">
                    <el-input v-model="form1.job" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-input v-model="form1.age" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新增员工性别" :label-width="formLabelWidth">
                    <el-select v-model="form1.gender" placeholder="请选择性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="入职日期" :label-width="formLabelWidth">
                    <el-input v-model="form1.entryDate" autocomplete="off" placeholder="格式:yyyy-MM-dd"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="add">确 定</el-button>
                </div>
                </el-dialog>

                <!-- 表格 -->
                <el-table :data="tableData" border>
                    
                    <el-table-column prop="id" label="id" width="180">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="gender" label="性别" width="140">
                    </el-table-column>
                    <el-table-column prop="age" label="年龄" width="140">
                    </el-table-column>
                    <el-table-column prop="job" label="职位">
                    </el-table-column>
                    <el-table-column prop="entryDate" label="入职时期">
                    </el-table-column>
                    <el-table-column prop="updateDate" label="最后操作时间">
                    </el-table-column>
                    
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="openEditDialog(scope.row)">编辑</el-button>

                        <el-dialog
                        @open="getOpen"
                        @close="close" title="修改员工"
                        :close-on-click-modal="false" 
                        :visible.sync="dialogFormVisible"
                        width="40%" append-to-body>

                        <el-form ref="form" :model="form" :rules="rules">
                            <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                            <el-input v-model="form.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
                            <el-select v-model="form.gender" placeholder="请选择性别">
                                <el-option label="男" value="男"></el-option>
                                <el-option label="女" value="女"></el-option>
                            </el-select>
                            </el-form-item>
                            <el-form-item label="职位" :label-width="formLabelWidth" prop="job">
                            <el-input v-model="form.job" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
                            <el-input v-model="form.age" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="alter">确 定</el-button>
                        </div>
                        </el-dialog>


                        <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <br>
                <!-- 分页 -->
                <el-pagination backgoround layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="totalItems">
                </el-pagination>

            </el-main>

        </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
export default{
    data(){
        return {
            user:{
                name:this.$store.state.userInfo.username,
                rolePlay:this.$store.state.userInfo.rolePlay
            },
            getOpen: false,
            currentPage: 1,
            pageSize: 10,
            totalItems: 0,
            tableData:[],
            searchForm:{
                id:"",
                name:"",
                gender:"",
                age:'',
                entryDate:"",
                updateDate:''
            },
            dialogFormVisible1:false,
            form1:{
                name:'',
                job:'',
                age:'',
                gender:'',
                entryDate:'',
                updateDate:'',
                deleted:false
            },
            dialogFormVisible:false,
            form: {
                name: '',
                job: '',
                gender:'',
                age:''
                },
            formLabelWidth: '120px'

        }
    },
    methods:{
        del(id) {
    this.$confirm('确定删除该员工吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        axios.get('http://localhost:8080/emp/del/' + id)
            .then(response => {
                console.log("删除成功", response.data);
                this.loadAllEmployees();
            })
            .catch(error => {
                console.error('删除失败', error);
            });
    }).catch(() => {
        // 如果用户取消删除，则不执行任何操作
    });
},
        add(){
            if(!this.form1.name){
                alert("姓名不能为空！")
                return;
            }
            let currentDate = new Date();
            let formattedDate = currentDate.toISOString().slice(0, 10);
            this.form1.updateDate = formattedDate;
            axios.post('http://localhost:8080/emp/save',this.form1).then(response=>{
                console.log(response.data);
                this.dialogFormVisible1=false;
                this.loadAllEmployees();
            }).catch(error=>{
                console.log(error);
            })
        },
        onSubmit(){
            // 确保ID不为空
        if (!this.searchForm.id) {
        alert('ID不能为空');
        return;

        }

        // 使用axios发送GET请求，注意这里的URL需要正确传递id参数
        axios.get(`http://localhost:8080/emp/findOne/${encodeURIComponent(this.searchForm.id)}`) 
        .then(response => {
        if (response.data.code === 1 && response.data.msg === 'success') {
          this.tableData = [response.data.data];
          // 如果需要对返回的员工数据做进一步处理，可以在这里进行
        } else {
          alert('查询失败：' + response.data.msg);
        }
      })
      .catch(error => {
        console.error('查询失败，错误信息：', error);
        alert('查询失败，请检查ID或联系管理员');
      });



        //     axios.get('http://localhost:8080/emp/findOne/'+this.searchForm.id)
        //     .then(response => {
        //     // 请求成功处理
        //     console.log(response.data)
        //     if (response.data.success) { // 假设success字段表示操作成功
        //   this.tableData = [response.data.data]; // 将查询到的员工信息设置到tableData
        //     }}).catch(error => {
        //   // 处理请求错误
        //   console.error(error);
        // });
        //     alert("查询数据")
        },
        handleSizeChange(size) {
        this.pageSize=size;
        this.loadAllEmployees();
      },
        handleCurrentChange(page) {
        this.currentPage=page;
        this.loadAllEmployees();
      },
        openEditDialog(row) {
      // 将当前行数据填充到表单中
      this.form = {
        name: row.name,
        gender: row.gender,
        job: row.job,
        age: row.age
      };
      this.editingRow = row;
      this.dialogFormVisible = true;
    },
        alter(){
        const data={
            id: this.editingRow.id,
            name:this.form.name,
            gender:this.form.gender,
            age:this.form.age,
            job:this.form.job
        }
        axios.put('http://localhost:8080/emp/update',data).then(response=>{
            console.log(data.id)
            console.log('修改成功', response.data);
            this.dialogFormVisible = false; // 关闭对话框
            this.loadAllEmployees();
      }).catch(error => {
        // 处理错误响应
        console.error('修改失败', error);
        })
      },
      loadAllEmployees() {
        axios.get("http://localhost:8080/emp/find",{
            params:{
                page:this.currentPage,
                pageSize:this.pageSize
            }
        }).then((result) => {
            this.totalItems=result.data.data.total;
            this.tableData = result.data.data.rows;
        });
    },
    },
    mounted(){
        this.loadAllEmployees();
    }

}
</script>

<style>
.el-aside {
    background-color: #ffffff; /* 白色背景 */
    border-right: none; /* 移除右侧边框 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影，提供层次感 */
}

.el-menu {
    border: none; /* 移除菜单的边框 */
}

.el-submenu__title {
    font-size: 16px; /* 字体大小 */
    color: #333333; /* 字体颜色 */
    font-weight: 500; /* 字体加粗 */
    height: 50px; /* 高度 */
    line-height: 50px; /* 行高，垂直居中 */
}

.el-submenu__title:hover,
.el-submenu__title:focus {
    background-color: #f5f5f5; /* 鼠标悬浮时的背景颜色 */
}

.el-menu-item {
    height: 45px; /* 高度 */
    line-height: 45px; /* 行高，垂直居中 */
    font-size: 14px; /* 字体大小 */
    color: #666666; /* 字体颜色 */
}

.el-menu-item:hover,
.el-menu-item:focus {
    background-color: #ebeef5; /* 鼠标悬浮时的背景颜色 */
    color: #409eff; /* 字体高亮颜色 */
}

.el-submenu__icon {
    color: #409eff; /* 图标颜色 */
    margin-right: 10px; /* 图标右侧边距 */
}

/* 路由链接样式 */
.el-submenu__title,
.el-menu-item {
    display: flex;
    align-items: center; /* 垂直居中 */
}

/* 移除默认的图标样式 */
.el-icon-message {
    font-size: 18px !important;
}
</style>