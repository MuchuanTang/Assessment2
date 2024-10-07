<template>
  <div>
    <div class="flex_row align_center" style="padding: 10px 10px">
      <span> Order ID： </span>
      <el-input
        style="width: 150px"
        size="mini"
        v-model="id"
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
        >Add Order</el-button
      >
    </div>
    <div>
      <el-table
        :data="orderList"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        height="550"
      >
        <el-table-column prop="id" label="ID" width="130">
        </el-table-column>
        <el-table-column prop="productName" label="productName"> </el-table-column>
        <el-table-column prop="productPrice" label="v"></el-table-column>
        <el-table-column prop="buyNum" label="buyNum"> </el-table-column>
        <el-table-column prop="buyAmount" label="buyAmount"> </el-table-column>
        <el-table-column prop="createTime" label="createTime" width="160">
        </el-table-column>
        <el-table-column prop="userName" label="userName"> </el-table-column>
        <el-table-column prop="phone" label="phone"> </el-table-column>
        <el-table-column prop="remark" label="remark"> </el-table-column>
        <el-table-column align="left" label="other" width="150">
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
          <el-col :span="8">
            <el-form-item label="productName">
              <el-select
                size="mini"
                v-model="formF.productName"
                placeholder=""
                @change="productNameChange"
                :disabled="dialogTitle == 'Edit'"
              >
                <el-option
                  v-for="item in productList"
                  :value="item.name"
                  :label="item.name"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="productPrice">
              <el-input
                size="mini"
                v-model="formF.productPrice"
                autocomplete="off"
                disabled
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item label="productNum">
              <el-input
                size="mini"
                v-model="formF.productNum"
                autocomplete="off"
                disabled
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="buyNum">
              <el-input
                size="mini"
                v-model="formF.buyNum"
                autocomplete="off"
                @blur="buyNumBlur"
                :disabled="dialogTitle == 'Edit'"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item label="buyAmount">
              <el-input
                size="mini"
                v-model="formF.buyAmount"
                autocomplete="off"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="createTime">
              <el-input
                size="mini"
                v-model="formF.createTime"
                autocomplete="off"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="userName">
              <el-input
                size="mini"
                v-model="formF.userName"
                autocomplete="off"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="phone">
              <el-input
                size="mini"
                v-model="formF.phone"
                autocomplete="off"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item label="remark">
              <el-input
                size="mini"
                v-model="formF.remark"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="saleChange">
              <el-radio-group
                v-model="sale"
                size="mini"
                style="display: flex; margin-top: 14px"
                @change="saleChange"
              >
                <el-radio v-for="item in sales" :label="item.id" :key="item.id">
                  {{ item.type + "" + item.num }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="money">
              <el-input
                size="mini"
                v-model="money"
                autocomplete="off"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="onClose()">Cancel</el-button>
        <el-button size="mini" type="primary" @click="onSubMit('formF')"
          >SubMit</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
      
<script>
import {
  orderListQuery,
  orderDelete,
  orderEdit,
  orderAdd,
} from "@/api/order";
import {
  productListQuery,
  queryProductDetails,
  productEdit1,
  saleListQuery,
} from "@/api/product";
import moment from "moment";
export default {
  data() {
    return {
      id: "",
      productList: [],
      sales: [],
      sale: "",
      money: 0,
      orderList: [],
      dialogFormShow: false,
      dialogTitle: "",
      formF: {
        remark: "",
        productName: "",
        productPrice: "",
        productNum: "",
        buyNum: "",
        buyAmount: "",
        createTime: moment(new Date()).format("YYYY/MM/DD HH:mm:ss"),
        userName: "",
        phone: "",
        seller: "",
      },
      formBase: {
        remark: "",
        productName: "",
        productPrice: "",
        productNum: "",
        buyNum: "",
        buyAmount: "",
        createTime: moment(new Date()).format("YYYY/MM/DD HH:mm:ss"),
        userName: "",
        phone: "",
        seller: "",
      },
    };
  },
  created() {
    productListQuery({}).then((res) => {
      this.productList = res;
    });
    saleListQuery({}).then((res) => {
      this.sales = res;
    });
    this.query();
  },
  methods: {
    query() {
      orderListQuery({
        id: this.id,
        userName: localStorage.getItem("loginName"),
        seller: localStorage.getItem("loginName"),
      }).then((res) => {
        this.orderList = res;
      });
    },
    productNameChange() {
      queryProductDetails(this.formF.productName).then((res) => {
        let param = res[0];
        if (param.price) {
          this.formF.productPrice = param.price;
          this.formF.productNum = param.lastNum;
          console.log(this.formF);
        }
      });
    },
    buyNumBlur() {
      if (!this.formF.buyNum) {
        return;
      }
      if (Number(this.formF.buyNum) > Number(this.formF.productNum)) {
        this.$message({
          message: "If the saleable quantity exceeds the product stock, please enter it again！",
          type: "warning",
        });
        this.formF.buyNum = this.formF.productNum;
      }
      this.formF.buyAmount = this.formF.productPrice * this.formF.buyNum;
      this.saleChange();
    },
    saleChange() {
      console.log(this.sale);
      if (this.sale == "1") {
        let flag = this.sales[0].num.split("-");
        if (this.formF.buyAmount > flag[0]) {
          this.money = Number(this.formF.buyAmount) - Number(flag[1]);
        } else {
          this.money = this.formF.buyAmount;
        }
      } else if (this.sale == "2") {
        this.money = (Number(this.formF.buyAmount) * this.sales[1].num * 0.1).toFixed(0);
      } else {
        this.money = this.formF.buyAmount;
      }
    },
    onSubMit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param;
          if (this.dialogTitle == "Add") {
            if (this.formF.buyNum == 0) {
              this.$message({
                message: "Please enter the sales quantity ",
                type: "warning",
              });
              return;
            }
            console.log(this.formF);
            param = {
              productName: this.formF.productName,
              productPrice: this.formF.productPrice,
              productNum: "",
              buyNum: this.formF.buyNum,
              buyAmount: this.money ? this.money : this.formF.buyAmount,
              createTime: moment(new Date()).format("YYYY/MM/DD HH:mm:ss"),
              userName: this.formF.userName,
              phone: this.formF.phone,
              seller: this.formF.seller,
              remark: this.formF.remark,
            };
            orderAdd(param).then((res) => {
              console.log(res);
              this.query();
              this.productEdit();
            });
          } else {
            param = JSON.parse(JSON.stringify(this.formF));
            orderEdit(param).then((res) => {
              console.log(res);
              this.query();
              this.productEdit();
            });
          }
          this.$refs.formF.resetFields(); 
          this.dialogFormShow = false;
        } else {
          return false;
        }
      });
    },
    productEdit() {
      productEdit1({
        lastNum: Number(this.formF.productNum) - Number(this.formF.buyNum),
        name: this.formF.productName,
      }).then((res) => {});
    },
    onClose() {
      this.dialogFormShow = false;
    },
    handleEdit(index, row) {
      console.log(row);
      this.formF = { ...row };
      this.dialogFormShow = true;
      this.dialogTitle = "Edit";
      this.productNameChange();
    },
    handleDelete(index, row) {
      orderDelete(row.id).then((res) => {
        this.query();
      });
    },
    dialogFormShowF() {
      this.dialogFormShow = true;
      this.dialogTitle = "Add";
      this.formF = { ...this.formBase };
      this.formF.userName = localStorage.getItem("loginName");
      this.formF.phone = "";
    },
  },
};
</script>
      
<style>
.el-select--mini {
  width: 100%;
}
.red {
  color: #f00;
}
</style>
      