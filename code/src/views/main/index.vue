<template>
  <el-card id="container">
    <h1 class="title">Makelivall</h1>
    <h3 class="smalltitle">A website that can generate live wallpapers</h3>
    <el-divider></el-divider>

    <el-form class="form1">
      <el-container class="mycontainer">
        <el-main>
            <el-image class="piccontainer" :src="prefix.image+pic_url" v-show="pic_url!=''"/>
            <img class="piccontainer2" src="@/assets/404_images/404.png" v-show="pic_url==''"/>
        </el-main>
        <el-aside width="50%" style="padding-right:15px;padding-top:30px;color:#f1f1e6;">
          <el-form-item label="封图上传">
            <el-upload
              accept=".jpg, .png"
              class="upload-demo"
              action=""
              :file-list="modal.pic"
              :before-upload="handlePicUpload"
            >
            <el-button size="small" type="primary" >点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              <div>只能上传jpg/png文件</div>
            </div>
            </el-upload>
          </el-form-item>

          <p class="setborder">请输入关键词</p>

          <el-form-item>
            <el-input v-model="modal.description" type="textarea" :rows="5"></el-input>
          </el-form-item>

          <el-form-item>
            <el-switch
              v-model="open"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="可见"
              inactive-text="不可见"
              v-on:mouseover.native="showMsg()"
              v-on:mouseleave.native="clearMsg()">
            </el-switch>
          </el-form-item>

          <el-form-item>
            <el-button @click="submitUpload">生成</el-button>
          </el-form-item>
        </el-aside>
      </el-container>
    </el-form>

    <el-form class="form2">
      <el-container class="mycontainer">
        
        <el-main style="padding-top:30px">

          <el-form-item label="封面上传">
            <el-upload
              accept=".jpg, .png"
              class="upload-demo"
              action=""
              :file-list="modal.pic"
              :before-upload="handlePicUpload"
              list-type="picture"
            >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              <div>只能上传jpg/png文件</div>
            </div>
            </el-upload>
          </el-form-item>

          <p class="setborder">请输入关键词</p>

          <el-form-item>
            <el-input v-model="modal.description" type="textarea" :rows="5"></el-input>
          </el-form-item>

          <el-form-item>
            <el-switch
              v-model="open"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="可见"
              inactive-text="不可见"
              v-on:mouseover.native="showMsg()"
              v-on:mouseleave.native="clearMsg()">
            </el-switch>
          </el-form-item>

          <el-form-item>
            <el-button @click="submitUpload">生成</el-button>
          </el-form-item>
          <el-image class="piccontainer3" :src="prefix.image+pic_url" v-show="pic_url!=''"/>
          <img class="piccontainer4" src="@/assets/404_images/404.png" v-show="pic_url==''"/>
        </el-main>

        

      </el-container>
    </el-form>

  </el-card>
</template>

<script>
import { Message } from 'element-ui'
import { upload,getinfo } from '@/api/api'

const modal_template = {
  pic: [],
  description:"",
}
export default {
  name: 'Work',
  data() {
    return {
      prefix: {
        image: process.env.VUE_APP_BASE_API,
      },
      open:false,
      modal: JSON.parse(JSON.stringify(modal_template)),
      pic_url:"",
      winheight:1000,
      nowIndex: -1,
    }
  },
  computed: {
    
  },
  mounted() {

  },
  methods: {
    showMsg() {
      Message.closeAll();
			Message.info('是否选择公布您的图片结果？')
	  },
    clearMsg(){
      Message.closeAll();
    },
    
    submitUpload() {
      getinfo().then(res=>{
        if(!res.usergroup){
          Message.error("抱歉!您不是vip用户")
          return
        }else{
        if (this.modal.pic.length == 0) { Message.warning('未上传封图'); return }
        if (this.modal.description == '') {Message.warning('未填写关键词');return}
        const form_data = new FormData()
        form_data.append('pic', this.modal.pic[0])
        form_data.append('description', this.modal.description)

        upload(form_data).then(res => {
          this.pic_url=res.pic_url
          Message.success('新增作品成功，后台正在生成，稍后请在您的邮箱中查看')
        })}
      })
    },


    handlePicUpload: function(file) {
      this.modal.pic=[]
      this.modal.pic.push(file)
      return false
    },
  }
}
</script>
<style lang="scss">
.el-upload-list__item-name{
    max-width: 100px;
  }
</style>
<style lang="scss" scoped>
@media screen and (min-width: 1024px){
  .form1{
    display: block;
  }
  .form2{
    display: none;
  }
}
@media screen and (max-width: 1024px){
  .form1{
    display: none;
  }
  .form2{
    display: block;
  }
}
.title {
  font-size: 50px;
  color: #eee;
  margin: 0px auto 0 auto;
  text-align: center;
  font-weight: bold;
  letter-spacing: 0px;
}
.smalltitle {
  color: #eee;
  margin: 0px auto 0 auto;
  text-align: center;
  font-weight: normal;
  letter-spacing: 0px;
}
.piccontainer2{
  position: absolute;
  height: 80%;
  left: 25%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.piccontainer{
  height: 100%;
  left: 50%;
  transform: translate(-50%,0);
}
.piccontainer3{
  width: 100%;
}
.piccontainer4{
  width: 100%;
}
.setborder{
  margin: 10px;
}
.mycontainer{
  background-color:#3e4756;
  color:#f1f1e6;
  min-height: calc(100vh - 300px);
  width: 80%;
  position: relative;
  left: 50%;
  transform: translate(-50%,0);
}
#container{
  min-height: calc(100vh - 90px);
  background-color:#2f3a4b ;
}
.el-card{
  border: 0px;
  border-radius: 0px;
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
  .el-card{
    margin: 3px;
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
    color:#f1f1e6;
  }
  .create_at{
    padding:5px 10px;
    font-size:0.6rem;
    color:#f1f1e6;
  }
  .tags{
    padding: 0px 10px;
    margin:5px 0px;
    .tag{
      font-size:0.7rem;
      margin:5px 1px;
      background:#f1f1e6;
      text-align: center;
      padding:3px 5px;
      border-radius: 10px;
      float:left;
    }
  }
  .btn{
    margin-top:10px;
    width:100%;
  }
}
</style>
<style scoped>
  .el-dialog__wrapper >>> .el-dialog__body{
    padding: 0;
  }
  .el-dialog__wrapper >>> .el-header{
    height: 40px !important;
  }
  .el-dialog__wrapper >>> .el-footer{
    height: 40px !important;
  }
  .el-dialog__wrapper .editor{
    /* height: 77vh; */
  }
  .el-aside .el-form-item{
    margin: 10px;
  }
  .el-upload__tip {
    line-height: 20px;
    color:#f1f1e6;
  }
  .el-main{
    overflow:visible;
  }
  
</style>
<style>
  .tox-tinymce-aux {
    z-index: 3000 !important;
  }
  .el-form-item__label{
  color: #f1f1e6;
  }
  .el-switch__label{
    color: #f1f1e6;
  }
</style>
