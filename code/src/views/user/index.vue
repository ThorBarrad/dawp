<template>
  <el-card id="container" class="mycard">
    <el-row :gutter="0" class="myrow">
      <el-col :span="2">
        <el-image class="personalimg" :src="prefix.image+personal.headpic" v-show="personal.headpic!='None'"/>
        <img class="personalimg" src="@/assets/404_images/tou.png" v-show="personal.headpic=='None'"/>
      </el-col>
      <el-col :span="20">
        <div class="myinfo">
          <div class="title">{{ "昵称: "+personal.name }}</div>
          <div class="smalltitle">{{ "简介: "+personal.description }}</div>
          <div class="smalltitle">{{ "vip: "+personal.usergroup }}</div>
        </div>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" plain @click="add_top_bg" class="rightbuttom">修改信息</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-form size="mini">

      <el-form-item class="myrow1">
        <div class="smalltitle">我的收藏</div>
        <el-row :gutter="10" class="work-list" style="margin-top:10px;">
          <el-col :span="4" v-for="(item,index) in personal.top_bg_list" :key="index">
              <el-card>
                <el-image style="width: 100%;margin-bottom:15px" :src="prefix.image + item.name" v-show="!item.vid"/>
                <video-player class="video-player vjs-custom-skin" v-show="item.vid"
                  ref="videoPlayer" 
                  :playsinline="true" 
                  :options="{
                    autoplay: false,
                    muted: false,
                    loop: false,
                    preload: 'auto',
                    language: 'zh-CN',
                    aspectRatio: '16:9',
                    fluid: true,
                    sources: [{
                      type: 'video/mp4',
                      src: prefix.image+item.name
                    }],
                    poster: '',
                    notSupportedMessage: '此视频暂无法播放，请稍后再试',
                    controlBar: {
                      timeDivider: false,
                      durationDisplay: false,
                      remainingTimeDisplay: false,
                      fullscreenToggle: false
                    }
                  }"
                >
                </video-player>

                <el-button class='btn' type="danger" plain @click="removefav(item)">取消</el-button>
                <el-button class='btn1' type="danger" plain @click="download(item)">下载</el-button>
              </el-card>
          </el-col>
        </el-row>
      </el-form-item>


      <el-form-item class="myrow2">
        <div class="smalltitle">我的收藏</div>
        <el-row :gutter="10" class="work-list" style="margin-top:10px;">
          <el-col :span="24" v-for="(item,index) in personal.top_bg_list" :key="index">
              <el-card>

                <el-image style="width: 100%;margin-bottom:15px" :src="prefix.image + item.name" v-show="!item.vid"/>
                <video-player class="video-player vjs-custom-skin" v-show="item.vid"
                  ref="videoPlayer" 
                  :playsinline="true" 
                  :options="{
                    autoplay: false,
                    muted: false,
                    loop: false,
                    preload: 'auto',
                    language: 'zh-CN',
                    aspectRatio: '16:9',
                    fluid: true,
                    sources: [{
                      type: 'video/mp4',
                      src: prefix.image+item.name
                    }],
                    poster: '',
                    notSupportedMessage: '此视频暂无法播放，请稍后再试',
                    controlBar: {
                      timeDivider: false,
                      durationDisplay: false,
                      remainingTimeDisplay: false,
                      fullscreenToggle: false
                    }
                  }"
                >
                </video-player>

                <el-button class='btn' type="danger" plain @click="removefav(item)">取消</el-button>
                <el-button class='btn1' type="danger" plain @click="download(item)">下载</el-button>
              </el-card>
          </el-col>
        </el-row>
      </el-form-item>

      <el-dialog
      title="修改个人信息"
      :visible.sync="modal.visible"
      center
      >
        <el-form size="mini" class="label">
          <el-form-item label="昵称">
            <el-input v-model="modal.name"></el-input>
          </el-form-item>

          <el-form-item label="密码">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="modal.loginkey"
              :type="passwordType"
              name="password"
              tabindex="2"
              auto-complete="on"
              style="width:95%"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <el-form-item label="确认">
            <el-input
              :key="passwordType2"
              ref="password"
              v-model="modal.confirmkey"
              :type="passwordType2"
              name="password"
              tabindex="2"
              auto-complete="on"
              style="width:95%"
            />
            <span class="show-pwd" @click="showPwd2">
              <svg-icon :icon-class="passwordType2 === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <el-form-item label="邮箱" >
            <el-input v-model="modal.email" class="sw1"/>
            <el-button type="primary" plain @click="postemail" class="sw2">获取验证码</el-button>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="modal.verifycode" />
          </el-form-item>

          <el-form-item label="头像">
            <el-upload
              class="upload-demo"
              action=""
              :file-list="modal.pic"
              :before-upload="handlePicUpload"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
            </el-upload>
          </el-form-item>
        
          <el-form-item label="简介">
            <el-input v-model="modal.description" type="textarea" :rows="5"/>
          </el-form-item>

          

          <el-form-item class="search_button">
            <el-button type="primary" plain @click="submitUpload">提交</el-button>
          </el-form-item>

        </el-form>
      </el-dialog>
    </el-form>
  </el-card>
</template>

<script>
import { Message } from 'element-ui'
import { updateinfo, getinfo,getemailcode,varifyemail,upload,removefavourite } from '@/api/api'
import { removeToken } from '@/utils/auth'
import { saveAs } from 'file-saver';
export default {
  name: 'Work',
  data() {
    return {
      posted:false,
      prefix: {
        image: process.env.VUE_APP_BASE_API,
      },
      passwordType:"password",
      passwordType2:"password",
      personal:{
        headpic:"",
        name:"",
        description:"",
        top_bg_list:[],
        usergroup:false,
        email:""
      },
      modal: {
        visible: false,
        pic: [],
        name:"",
        description:"",
        loginkey:"",
        email:"",
        verifycode:"",
        confirmkey:""
      },
    }
  },
  mounted() {
    this.getpersonalinfo();
  },
  methods: {
    async logout() {
      removeToken()
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    showPwd2() {
      if (this.passwordType2 === 'password') {
        this.passwordType2 = ''
      } else {
        this.passwordType2 = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    postemail(){
      getemailcode({email:this.modal.email}).then((res)=>{
        Message.success("邮箱已发送至"+this.modal.email)
        var that=this
        that.posted=true
      })
    },
    removefav(item){
      removefavourite({picid:item}).then(res => {
        Message.success('取消收藏成功');
        var that=this
        var index=that.personal.top_bg_list.indexOf(item)
        that.personal.top_bg_list.splice(index,1)
      })
    },
    download(item){
      saveAs(this.prefix.image + item, item.split('/')[-1]);
    },
    getpersonalinfo(){
      getinfo().then(res => {
        var that=this
        that.personal.name=res.username
        that.personal.description=res.description
        that.personal.top_bg_list=[]
        if(res.headpic=="static/img/tou.png"){
          that.personal.headpic="None"
        }else{
          that.personal.headpic=res.headpic
        }
        
        that.personal.usergroup=res.usergroup
        that.personal.email=res.email
        res.favpicids.forEach(element => {
          var namelist=element.split("/")
          var str=namelist[namelist.length-1]
          var isvideo=false
          if(str.indexOf(".mp4")!=-1){
            isvideo=true
          }
          that.personal.top_bg_list.push({name:element,vid:isvideo})
        });
      })
    },
    add_top_bg(){
      this.modal={
        visible: true,
        pic:[],
        name:this.personal.name,
        description:this.personal.description,
        loginkey:"",
        confirmkey:"",
        email:"",
        verifycode:"",
      }
    },
    handlePicUpload: function(file) {
      this.modal.pic=[]
      this.modal.pic.push(file)
      return false
    },

    
    submitUpload(){
      if(!this.posted){
        const form_data = new FormData()
        if (this.modal.pic.length != 0 && this.personal.usergroup){
          const form_data2 = new FormData()
          form_data2.append('pic', this.modal.pic[0])
          upload(form_data2).then(res => {
            form_data.append('headpic', res.pic_url)
            form_data.append('username', this.modal.name)
            form_data.append('description', this.modal.description)
            if(this.modal.loginkey !="" && this.modal.loginkey==this.modal.confirmkey){
              form_data.append('password', this.modal.loginkey)
            }else if(this.modal.loginkey!=this.modal.confirmkey){
              Message.warning("两次输入的密码不一致")
              return
            }
            updateinfo(form_data).then(res => {
              this.getpersonalinfo();
              this.modal.visible=false
            })
            return
          })
        }
        else{
          form_data.append('username', this.modal.name)
          form_data.append('description', this.modal.description)
          if(this.modal.loginkey !="" && this.modal.loginkey==this.modal.confirmkey){
            form_data.append('password', this.modal.loginkey)
          }else if(this.modal.loginkey!=this.modal.confirmkey){
            Message.warning("两次输入的密码不一致")
            return
          }
          updateinfo(form_data).then(res => {
            this.getpersonalinfo();
            this.modal.visible=false
          })
          return
        }
      }

    else{
      varifyemail({email:this.modal.email,emailcode:this.modal.verifycode}).then((res)=>{
        if(res=="ok"){
          const form_data = new FormData()


          if (this.modal.pic.length != 0 && this.personal.usergroup){
            const form_data2 = new FormData()
            form_data2.append('pic', this.modal.pic[0])
            upload(form_data2).then(res => {
              form_data.append('email', this.modal.email)
              form_data.append('headpic', res.pic_url)
              form_data.append('username', this.modal.name)
              form_data.append('description', this.modal.description)
              if(this.modal.loginkey !="" && this.modal.loginkey==this.modal.confirmkey){
                form_data.append('password', this.modal.loginkey)
              }else if(this.modal.loginkey!=this.modal.confirmkey){
                Message.warning("两次输入的密码不一致")
                return
              }
              updateinfo(form_data).then(res => {
                this.modal.visible=false
              })
              return
            })
          }
          else{
            form_data.append('email', this.modal.email)
            form_data.append('username', this.modal.name)
            form_data.append('description', this.modal.description)
            if(this.modal.loginkey !="" && this.modal.loginkey==this.modal.confirmkey){
              form_data.append('password', this.modal.loginkey)
            }else if(this.modal.loginkey!=this.modal.confirmkey){
              Message.warning("两次输入的密码不一致")
              return
            }
            updateinfo(form_data).then(res => {
              this.modal.visible=false
            })
            return
          }
        } else{
          Message.error("邮箱验证码错误")
        }
      })
      }
    },
  }
}
</script>

<style lang="scss">
@media screen and (max-width: 700px){
  .el-dialog{
    width: 300px;
  }
  .label{
    .el-form-item__label{
      width: 60px;
    }
    .el-form-item__content{
      margin-left: 60px;
    }
    .sw1{
      width: 100%;
    }
    .sw2{
      width: 50%;
    }
  }
}
@media screen and (min-width: 700px){
  .el-dialog{
    width: 600px;
  }
  .label{
    .el-form-item__label{
      width: 100px;
    }
    .el-form-item__content{
      margin-left: 100px;
    }
    .sw1{
      width: 80%;
    }
    .sw2{
      width: 20%;
    }
  }
}
.mycard{
    border-radius: 0px;
}
.work-list{
  border-radius: 5px;
  .el-card__body{
    background-color:#3e4756;
  }
  .el-card{
    border-radius: 5px;
  }
}
.myrow1{
  .el-button{
    padding-left: 9%;
  }
}
.myrow2{
  .el-button{
    padding-left: 5%;
  }
}
</style>


<style lang="scss" scoped>

.video-player{
  margin-bottom: 20px;
}
.show-pwd{
  position: absolute;
  left: 100%;
  transform: translate(-100%,0);
}
.el-button+.el-button{
  margin-left: 0px;
}
.myinfo{
  position: absolute;
  top: 50%;
  transform: translate(50%,-50%);
}
.title {
  font-size: 23px;
  color: #eee;
  margin: 0px auto 0 auto;
  font-weight: bold;
  letter-spacing: 0px;
}
.smalltitle {
  color: #eee;
  margin: 0px auto 0 auto;
  font-weight: normal;
  letter-spacing: 0px;
}
.desc{
  font-size: 20px;
  line-height: 30px;
}
.myrow{
  width: 90%;
  position: relative;
  left: 50%;
  transform: translate(-50%,0);
}
.leftbuttom{
  position: absolute;
  left: 100%;
  transform: translate(-150%,0%);
}
@media screen and (min-width: 700px){
  .rightbuttom{
    position: absolute;
    left: 100%;
    transform: translate(-150%,100%);
  }
  .myrow1{
    width: 90%;
    position: relative;
    left: 50%;
    transform: translate(-50%,0);
    display: block;
  }
  .myrow2{
    width: 90%;
    position: relative;
    left: 50%;
    transform: translate(-50%,0);
    display: none;
  }
}
@media screen and (max-width: 700px){
  .rightbuttom{
    position: absolute;
    left: 100%;
    transform: translate(-75%,100%);
  }
  .myrow1{
    width: 90%;
    position: relative;
    left: 50%;
    transform: translate(-50%,0);
    display: none;
  }
  .myrow2{
    width: 90%;
    position: relative;
    left: 50%;
    transform: translate(-50%,0);
    display: block;
  }
}
.personalimg{
  position: relative;
  left:50%;
  transform: translate(-50%,0);
  height: 100px;
  width: 100px;
  border-radius: 50px;
  background-color: aqua;
}
#container{
  min-height: calc(100vh - 90px);
  background-color:#2f3a4b ;
}
.el-card{
  border: 0px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  margin-left: 10px;
  width: 90px;
  vertical-align: bottom;
}
.search_button{
  display: flex;
  align-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.work-list{
  .el-col{
    margin-bottom: 10px;
  }
  .el-image{
    border-radius: 10px;
  }
  .title{
    font-size:1.2rem;
    font-weight: bold;
    padding:0px 10px;
  }
  .desc{
    padding:5px 10px; 
    font-size:0.6rem;
    color:#666;
  }
  .create_at{
    padding:5px 10px; 
    font-size:0.6rem;
    color:#666;
  }
  .tags{
    padding: 0px 10px;
    margin:5px 0px;
    .tag{
      font-size:0.7rem;
      margin:5px 0px;
      margin-right:5px;
      background:rgba(0,0,0,0.1);
      text-align: center;
      padding:3px 10px;
      border-radius: 10px;
    }
  }
  .btn{
    position: relative;
  }
  .btn1{
    position: relative;
    left:100%;
    transform:translate(-200%,0);
  }

}
.sec-line{
  height: 50px;
  line-height: 50px;
  border-radius: 10px;
  border: 1px solid #eee;
  padding: 5px 20px;
  box-sizing: content-box;
  margin: 10px 0px;
  box-shadow: 0px 5px 10px -5px rgba(0,0,0,.1);
  .title{
      font-size: 1.6rem;
      font-weight: bold;
      margin-right: 20px;
      float:left;
  }
  .desc{
      font-size: 0.8rem;
      width: calc(80% - 100px);
      height:100%;
      overflow: hidden;
      display: block;
      float:left;
      color:#666;
  }
  .edit{
      float:right;
      margin:0px 5px;
  }
  .delete{
      float:right;
      margin:0px 5px;
  }
}
</style>
