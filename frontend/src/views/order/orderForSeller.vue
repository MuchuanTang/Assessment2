<template>
  <div>
    <div class="flex_row align_center" style="padding: 10px 10px">
      <span> 订单编号： </span>
      <el-input
        style="width: 150px"
        size="mini"
        v-model="id"
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
        >新增订单</el-button
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
        <el-table-column prop="id" label="订单ID" width="130">
        </el-table-column>
        <el-table-column prop="productName" label="产品名称"> </el-table-column>
        <el-table-column prop="productPrice" label="产品价格"></el-table-column>
        <!-- <el-table-column prop="productNum" label="产品库存"> </el-table-column> -->
        <el-table-column prop="buyNum" label="销售数量"> </el-table-column>
        <el-table-column prop="buyAmount" label="销售金额"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="160">
        </el-table-column>
        <el-table-column prop="userName" label="用户"> </el-table-column>
        <el-table-column prop="phone" label="联系方式"> </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <!-- <el-table-column prop="seller" label="销售"> </el-table-column> -->
        <el-table-column align="left" label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="sell(scope.$index, scope.row)"
              >出库</el-button
            >
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
      title="销售数据分析"
      :visible.sync="dialogFormShow"
      :close-on-click-modal="false"
    >
      <el-form ref="formF" :model="formF" label-width="80px">
        <el-row :gutter="20">
         
          <el-col :span="12">
            <el-form-item label="时间段">
              <el-input
                size="mini"
                v-model="rang"
                autocomplete="off"
                disabled
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="销售员">
              <el-input
                size="mini"
                v-model="seller"
                autocomplete="off"
                disabled
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="产品">
              <el-input
                size="mini"
                v-model="product"
                autocomplete="off"
                disabled
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="数量">
              <el-input
                size="mini"
                v-model="num"
                autocomplete="off"
                @blur="buyNumBlur"
                disabled
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="总价">
              <el-input
                size="mini"
                v-model="price"
                autocomplete="off"
                disabled
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="成本">
              <el-input
                size="mini"
                v-model="money"
                autocomplete="off"
                @blur="buyNumBlur"
                disabled
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button size="mini" @click="onClose()">取 消</el-button> -->
        <el-button size="mini" type="primary" @click="onSubMit('formF')"
          >确定</el-button
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
      name: "向阳",
      rang: "近一个月",
      seller: "seller1",
      num: "720",
      price: "89000",
      money: "68300",
      product: "产品一",
      productList: [],
      sales: [],
      sellList: [],
      sale: "",
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
    //查询活动列表
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
          message: "可销售数量超过产品库存，请重新输入！",
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
        this.money = (
          Number(this.formF.buyAmount) *
          this.sales[1].num *
          0.1
        ).toFixed(0);
      } else {
        this.money = this.formF.buyAmount;
      }
    },
    onSubMit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param;
          //新增菜单
          if (this.dialogTitle == "新增") {
            if (this.formF.buyNum == 0) {
              this.$message({
                message: "请输入销售数量！",
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
            //修改菜单
            param = JSON.parse(JSON.stringify(this.formF));
            orderEdit(param).then((res) => {
              console.log(res);
              this.query();
              this.productEdit();
            });
          }
          this.$refs.formF.resetFields(); //清空所有表单项
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
    sell() {
      //出库操作确认提示
      this.$confirm("该操作产品库存将实时减少, 确认是否继续?", "出库", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "出库成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消出库操作",
          });
        });
    },
    handleEdit(index, row) {
      console.log(row);
      this.formF = { ...row };
      this.dialogFormShow = true;
      this.dialogTitle = "出库";
      this.productNameChange();
    },
    handleDelete(index, row) {
      orderDelete(row.id).then((res) => {
        // console.log(res);
        this.query();
      });
    },
    dialogFormShowF() {
      this.dialogFormShow = true;
      this.dialogTitle = "新增";
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
      