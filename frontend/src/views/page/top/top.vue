<template>
  <div class="topBox">
    <div class="top-bar__right">
      Distribution management system
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
    };
  },
  created() {
  },
  mounted() {},
  computed: {},
  props: [],
  methods: {
  },
};
</script>
<style>
.topBox {
  position: relative;
  height: 50px;
  padding: 0 20px;
  background: #121a41;
  /* background: rgb(248, 248, 248); */
  text-align: center;
  line-height: 50px;
}
.top_row {
  height: 50px;
  display: flex;
  align-items: center;
  /* float: right; */
  text-align: center;
  margin: 0 10px;
}
.userInfoBar {
  /* width: 50px; */
}
.userInfoBar img {
  width: 30px;
}
.userhead {
  width: 34px;
  height: 34px;
  border-radius: 20px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.userhead img {
  width: 30px;
}
.fr {
  float: right;
}
.pwdBox {
  position: fixed;
  z-index: 10;
  width: 300px;
  height: 200px;
  background: #ccc;
  top: 20%;
  left: 50%;
}
</style>
