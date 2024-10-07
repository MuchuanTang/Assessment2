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
        >query</el-button
      >
      <el-button
        class="mar_l10"
        size="mini"
        type="primary"
        @click="dialogFormShowF()"
        >Add Product</el-button
      >
      <el-checkbox class="mar_l10" v-model="isSelect" @change="isSelectChange"
        >Only display the inventory warning data</el-checkbox
      >
      <el-input
        style="width: 50px"
        size="mini"
        v-model="lastNumWarn"
        placeholder=""
        autocomplete="off"
        @blur="query"
      ></el-input>
      (Inventory alert defaults to 5)
    </div>
    <div>
      <el-table
        :data="productList"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        height="550"
      >
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="name" label="Name"> </el-table-column>
        <el-table-column prop="des" label="Des"> </el-table-column>
        <el-table-column prop="price" label="Price"> </el-table-column>
        <el-table-column prop="creatDate" label="CreatDate"> </el-table-column>
        <el-table-column prop="supplier" label="Supplier"> </el-table-column>
        <el-table-column label="quantityInStock">
          <template slot-scope="scope">
            <span v-if="scope.row.warn" style="color: red;">
              {{ scope.row.lastNum }} <i class="el-icon-warning"></i>
            </span>
            <span v-else>
              {{ scope.row.lastNum }}
            </span>
          </template>  
        </el-table-column>
        <el-table-column align="left" label="other">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormShow"
      :close-on-click-modal="false"
    >
      <el-form ref="formF" :model="formF" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Supplier Type">
              <el-select
                size="mini"
                v-model="formF.supplier"
                placeholder=""
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
            <el-form-item label="Name">
              <el-input
                size="mini"
                v-model="formF.name"
                autocomplete="off"
                :disabled="dialogTitle == 'Edit'"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Des">
              <el-input
                size="mini"
                v-model="formF.des"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Price" type="price">
              <el-input
                size="mini"
                v-model="formF.price"
                autocomplete="off"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="creatDate" type="creatDate">
              <el-input
                size="mini"
                v-model="formF.creatDate"
                autocomplete="off"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="quantityInStock" type="lastNum">
              <el-input
                size="mini"
                v-model="formF.lastNum"
                autocomplete="off"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="onClose()">cancle</el-button>
        <el-button size="mini" type="primary" @click="onSubMit('formF')"
          >SubMit</el-button
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
          if (this.dialogTitle == "Add") {
            let flag = this.productList.find(e => e.name == this.formF.name)
            if(flag){
              this.$message({
                message: "Product name already exists!",
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
            param = { ...this.formF };
            delete param.warn
            productEdit(param).then((res) => {
              console.log(res);
              this.query();
            });
          }
          this.$refs.formF.resetFields(); 
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
      this.dialogTitle = "Edit";
      this.formF = { ...row };
    },
    handleDelete(index, row) {
      productDelete(row.id).then((res) => {
        this.query();
      });
    },
    dialogFormShowF() {
      this.dialogFormShow = true;
      this.dialogTitle = "Add";
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
      