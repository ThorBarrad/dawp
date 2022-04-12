<template>
  <el-card id="container">
    <h1 class="title">About Us</h1>
    <h3 class="smalltitle">A website that can generate live wallpapers</h3>
    <el-divider></el-divider>
    <el-form class="myform">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-container class="mycontainer1">
            <img src="@/assets/404_images/graph.png" class="mygraph">
          </el-container>
        </el-col>
        <el-col :span="12">
          <el-container class="mycontainer2">
            <span class="smalltitle2">本项目的整体模型以StyleGAN3官方开源的人脸预训练模型为基础，切换小样本的大量中国风画作图片为新的数据集进行迁移学习，然后把图片、文字的特征作为label进一步训练openAI研究并开源的预训练的CLIP和Jukebox的多模态模型，CLIP会不断的输出监督信号便于StyleGAN调整生成器，最后利用FFmpeg把在CLIP监督下StyleGAN生成的多张图片和Jukebox生成的音频合成为视频。</span>
          </el-container>
        </el-col>
      </el-row>
    </el-form>

    <el-form class="myform2">
      <el-row :gutter="10">
        
        <el-col :span="24">
          <el-container class="mycontainer2">
            <p class="smalltitle2">本项目的整体模型以StyleGAN3官方开源的人脸预训练模型为基础，切换小样本的大量中国风画作图片为新的数据集进行迁移学习，然后把图片、文字的特征作为label进一步训练openAI研究并开源的预训练的CLIP和Jukebox的多模态模型，CLIP会不断的输出监督信号便于StyleGAN调整生成器，最后利用FFmpeg把在CLIP监督下StyleGAN生成的多张图片和Jukebox生成的音频合成为视频。</p>
          </el-container>
        </el-col>
        <el-col :span="24">
          <el-container class="mycontainer1">
            <img src="@/assets/404_images/graph.png" class="mygraph">
          </el-container>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
import { Message } from 'element-ui'
export default {
  name: 'Work',
  data() {
    return {
      
    }
  },
  computed: {
    
  },
  mounted() {
    
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.mygraph{
  padding: 10px;
  width: 100%;
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
.smalltitle2 {
  color: #eee;
  margin: 0px auto 0 auto;
  // text-align: center;
  font-weight: normal;
  letter-spacing: 0px;
  padding: 10px;
  font-size: 20px;
  line-height: 30px;
}
@media screen and (max-width: 700px){
  .myform{
    width: 80%;
    position: absolute;
    left: 50%;
    transform: translate(-50%,0);
    display: none;
    
  }
  .myform2{
    width: 95%;
    position: absolute;
    left: 50%;
    transform: translate(-50%,0);
    display: block;
    .mycontainer2{
      margin: 10px;
      display: relative;
    }
    .mycontainer1{
      margin: 10px;
      display: relative;
    }
  }
  #container{
    min-height: calc(200vh - 330px);
    background-color:#2f3a4b ;
  }
}
@media screen and (min-width: 700px){
  .myform{
    width: 80%;
    position: absolute;
    left: 50%;
    transform: translate(-50%,0);
    display: block;
  }
  .myform2{
    width: 80%;
    position: absolute;
    left: 50%;
    transform: translate(-50%,0);
    display: none;
  }
  #container{
    min-height: calc(100vh - 90px);
    background-color:#2f3a4b ;
  }
}
.mycontainer1{
  margin: 30px;
  background-color:#3e4756;
  min-height: calc(100vh - 300px);
}
.mycontainer2{
  margin: 30px;
  background-color:#3e4756;
  min-height: calc(100vh - 300px);
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
      margin:5px 1px;
      background:rgba(0,0,0,0.1);
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
