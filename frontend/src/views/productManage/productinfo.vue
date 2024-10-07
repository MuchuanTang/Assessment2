<template>
  <div>
    <div class="flex_row align_center" style="padding: 10px 10px">
      <span> 产品名称： </span>
      <el-input
        style="width: 100px"
        size="mini"
        v-model="name"
        autocomplete="off"
      ></el-input>
      <el-button class="mar_l10" @click="query" size="mini" type="primary"
        >查询</el-button
      >
      <el-button
        class="mar_l10"
        size="mini"
        type="primary"
        @click="dialogFormShowF()"
        >新增产品</el-button
      >
      <el-checkbox class="mar_l10" v-model="isSelect" @change="isSelectChange"
        >只展示库存预警数据</el-checkbox
      >
      <el-input
        style="width: 50px"
        size="mini"
        v-model="lastNumWarn"
        placeholder=""
        autocomplete="off"
        @blur="query"
      ></el-input>
      (库存预警默认为5)
    </div>
    <div>
      <el-table
        :data="productList"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        height="550"
      >
        <el-table-column prop="id" label="产品ID"> </el-table-column>
        <el-table-column prop="name" label="产品名称"> </el-table-column>
        <el-table-column prop="des" label="描述"> </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="creatDate" label="录入时间"> </el-table-column>
        <el-table-column prop="supplier" label="产品类型"> </el-table-column>
        <el-table-column label="库存数量">
          <template slot-scope="scope">
            <span v-if="scope.row.warn" style="color: red;">
              {{ scope.row.lastNum }} <i class="el-icon-warning"></i>
            </span>
            <span v-else>
              {{ scope.row.lastNum }}
            </span>
          </template>  
        </el-table-column>
        <el-table-column align="left" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新增/修改 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormShow"
      :close-on-click-modal="false"
    >
      <el-form ref="formF" :model="formF" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="供应商种类">
              <el-select
                size="mini"
                v-model="formF.supplier"
                placeholder="请选择供应商种类"
              >
                <el-option
                  v-for="item in this.supplierList"
                  :value="item.name"
                  :label="item.name"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品名称">
              <el-input
                size="mini"
                v-model="formF.name"
                autocomplete="off"
                :disabled="dialogTitle == '修改'"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="描述">
              <el-input
                size="mini"
                v-model="formF.des"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格" type="price">
              <el-input
                size="mini"
                v-model="formF.price"
                autocomplete="off"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="录入时间" type="creatDate">
              <el-input
                size="mini"
                v-model="formF.creatDate"
                autocomplete="off"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="库存数量" type="lastNum">
              <el-input
                size="mini"
                v-model="formF.lastNum"
                autocomplete="off"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="onClose()">取 消</el-button>
        <el-button size="mini" type="primary" @click="onSubMit('formF')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
      
<script>
import {
  productListQuery,
  productDelete,
  productEdit,
  productAdd,
} from "@/api/product";
import { supplierList } from "@/common/contant";
import moment from "moment";
export default {
  data() {
    return {
      name: "",
      lastNumWarn: '5',
      isSelect: false,
      supplierList: [],
      productList: [],
      dialogFormShow: false,
      dialogTitle: "",
      formF: {
        supplier: "",
        name: "",
        des: "",
        price: "",
        creatDate: moment(new Date()).format('YYYY/MM/DD HH:mm:ss'),
        lastNum: "",
      },
      formBase: {
        supplier: "",
        name: "",
        des: "",
        price: "",
        creatDate: moment(new Date()).format('YYYY/MM/DD HH:mm:ss'),
        lastNum: "",
      },
    };
  },
  created() {
    this.supplierList = supplierList
    this.query();
  },
  methods: {
    query() {
      productListQuery({
        name: this.name,
      }).then((res) => {
        this.productList = res.map((item)=>{
          if(item.lastNum <= this.lastNumWarn){
            item.warn = true
          } else {
            item.warn = false
          }
          return item
        });
      });
    },
    isSelectChange(){
      if(this.isSelect){
        this.productList = this.productList.filter(e => e.warn)
      } else {
        this.query()
      }
    },
    onSubMit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param;
          //新增菜单
          if (this.dialogTitle == "新增") {
            let flag = this.productList.find(e => e.name == this.formF.name)
            if(flag){
              this.$message({
                message: "产品名已存在！",
                type: "warning",
              });
              return
            }
            console.log(this.formF);
            param = {
              supplier: this.formF.supplier,
              name: this.formF.name,
              des: this.formF.des,
              price: this.formF.price,
              creatDate: moment(new Date()).format('YYYY/MM/DD HH:mm:ss'),
              lastNum: this.formF.lastNum,
            };
            productAdd(param).then((res) => {
              console.log(res);
              this.query();
            });
          } else {
            //修改菜单
            param = { ...this.formF };
            delete param.warn
            productEdit(param).then((res) => {
              console.log(res);
              this.query();
            });
          }
          this.$refs.formF.resetFields(); //清空所有表单项
          this.dialogFormShow = false;
        } else {
          return false;
        }
      });
    },
    onClose() {
      this.dialogFormShow = false;
    },
    handleEdit(index, row) {
      console.log(row);
      this.dialogFormShow = true;
      this.dialogTitle = "修改";
      this.formF = { ...row };
    },
    handleDelete(index, row) {
      productDelete(row.id).then((res) => {
        // console.log(res);
        this.query();
      });
    },
    dialogFormShowF() {
      this.dialogFormShow = true;
      this.dialogTitle = "新增";
      this.formF = { ...this.formBase };
    },
  },
};
</script>
      
<style>
.el-select--mini {
  width: 100%;
}
.red{
  color: #f00;
}
</style>
      