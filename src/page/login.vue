<template>
  <div class="loginBox">
    <div class="owl">
      <img :src="owl" alt="owl" />
    </div>
    <div class="owlHand" ref="owlHand">
      <div></div>
      <div></div>
    </div>
    <div id="owlArm" ref="owlArm">
      <img class="leftArm" :src="owlArm" alt="leftArm" />
      <img class="rightArm" :src="owlArm" alt="rightArm" />
    </div>
    <div class="loginDiv">
      <!-- <div class="loginDivdiv"> -->
      <div class="usernamediv inputAllDiv">
        <div class="inputHeadAll">
          <i class="el-icon-user"></i>
        </div>
        <input class="username inputAll" v-model="username" />
      </div>
      <div class="passworddiv inputAllDiv">
        <div class="inputHeadAll">
          <i class="el-icon-lock"></i>
        </div>
        <input
          class="password inputAll"
          v-model="password"
          @focus="upArm"
          @blur="downArm"
        />
      </div>
      <div class="verifydiv inputAllDiv">
        <div class="inputHeadAll">
          <i class="el-icon-bell"></i>
        </div>
        <input class="verify inputAll" v-model="verifycode" />
        <div class="verifyimg">
          <img ref="verify" src="" alt="verifycode" @click="getVerifyCode" />
        </div>
      </div>
      <div class="loginBtnDiv">
        <el-button type="primary" style="width: 262px" @click="login"
          >登录</el-button
        >
      </div>

      <!-- </div> -->
    </div>
  </div>
</template>
<style>
.loginBox {
  height: 100%;
}
.owl {
  width: 230px;
  margin: auto;
  z-index: 9;
  position: relative;
  top: 215px;
  left: 10px;
}
.owlHand {
  display: flex;
  position: relative;
  margin: auto;
  width: 400px;
  justify-content: center;
  top: 190px;
  z-index: 11;
}
.owlHand div {
  width: 25px;
  height: 20px;
  border-radius: 40px;
  background-color: #472d20;
  margin-left: 60px;
  margin-right: 60px;
}
#owlArm {
  position: relative;
  margin: auto;
  width: 400px;
  top: 205px;
  z-index: 10;
  transition: top 0.1s;
}
.leftArm {
  position: absolute;
  left: 150px;
  top: -25px;
  transform: rotate(15deg);
}
.rightArm {
  position: absolute;
  left: 215px;
  top: -25px;
  transform: rotateY(180deg) rotate(15deg);
}
.loginDiv {
  width: 400px;
  height: 250px;
  background-color: aliceblue;
  position: relative;
  margin: auto;
  top: 160px;
  z-index: 10;
}
.usernamediv {
  width: 262px;
  position: relative;
  margin: auto;
  top: 40px;
}
.passworddiv {
  width: 262px;
  position: relative;
  margin: auto;
  top: 30px;
}
.verifydiv {
  width: 262px;
  position: relative;
  margin: auto;
  top: 20px;
}
.loginBtnDiv {
  position: relative;
  top: 30px;
  width: 262px;
  margin: auto;
}
.inputAllDiv {
  display: flex;
  margin-top: 20px;
}
.inputAll {
  height: 32px;
  border: 0px;
  outline: none;
  padding-left: 10px;
  font-size: 18px;
}
.inputHeadAll {
  width: 32px;
  height: 32px;
  background-color: #6a7989;
  color: white;
  font-size: 18px;
  text-align: center;
  line-height: 30px;
}
.username {
  width: 220px;
}
.password {
  width: 220px;
}
.verify {
  width: 100px;
}
.verifyimg {
  width: 100px;
  /* background-color: red; */
  margin-left: 20px;
}
</style>
<script>
import owl from "@/assets/images/owl-login.png";
import owlArm from "@/assets/images/owl-login-arm.png";
// import axios from "axios";
import ajax from "@/assets/api/axios.js";

export default {
  data() {
    return {
      owl: owl,
      owlArm: owlArm,
      verifyCodeImg: null,
      username: "",
      password: "",
      verifycode: "",
    };
  },
  mounted() {
    this.getVerifyCode();
  },
  methods: {
    //----------------------登录----------------------
    login() {
      if (this.username == "" || this.password == "" || this.verifycode == "") {
        this.$notify({
          title: "警告",
          message: "请输入有效值",
          type: "warning",
        });
      } else {
        ajax({
          method: "get",
          url: "/login",
          params: {
            username: this.username,
            password: this.password,
            verifycode: this.verifycode,
          },
        })
          .then((res) => {
            switch (res.data.code) {
              case 200:
                this.$notify({
                  title: "成功",
                  message: "登录成功",
                  type: "success",
                });
                this.$router.push({path:"/home"});
                break;
              case 999:
                this.$notify.error({
                  title: "错误",
                  message: "密码错误",
                });
                break;
              case 998:
                this.$notify.error({
                  title: "错误",
                  message: "用户不存在",
                });
                break;
              case 997:
                this.$notify.error({
                  title: "错误",
                  message: "验证码错误",
                });
                break;
              default:
                console.log("?????????");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //-------------------更新验证码-------------------
    getVerifyCode() {
      ajax({
        method: "get",
        url: "getVerify?" + Math.random(),
      })
        .then((res) => {
          this.$refs.verify.src =
            "http://localhost:8088/getVerify?" + Math.random();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //-----------------动画效果操作--------------------
    upArm() {
      this.$refs.owlArm.style.top = "170px";
      this.$refs.owlHand.style.top = "200px";
      this.$refs.owlHand.style.zIndex = "8";
    },
    downArm() {
      this.$refs.owlArm.style.top = "205px";
      setTimeout((res) => {
        this.$refs.owlHand.style.top = "190px";
        this.$refs.owlHand.style.zIndex = "11";
      }, 25);
    },
    //---------------------------------------------------
  },
};
</script>
