<template>
  <el-card id="container">
    <h1 class="title" v-show="!detail">AI Gallery</h1>
    <h3 class="smalltitle" v-show="!detail">A website that can generate live wallpapers</h3>
    <h1 class="title2" v-show="detail" style="position:relative">{{nowname}}'s Gallery</h1>
    <el-button type="danger" v-show="detail" plain @click="goback()" style="position:absolute;transform:translate(0,-100%)">返回</el-button>
    <el-divider></el-divider>

    <waterfall :col="6" :data="top_bg_list" class="work-list" v-show="detail">
      <template>
        <div v-for="(item,index) in top_bg_list" class="work" :key="index">
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

            <el-button class='btn' v-show="!item.fav" type="danger" plain @click="favourite(item)">收藏</el-button>
            <el-button class='btn' v-show="item.fav" type="danger" plain @click="removefavourite(item)">取消</el-button>
            <el-button class='btn1' type="danger" plain @click="download(item)">下载</el-button>
          </el-card>
        </div>
      </template>
    </waterfall>

    <waterfall :col="6" :data="alldocument" class="work-list" v-show="!detail">
      <template>
        <div v-for="(item,index) in alldocument" class="work" :key="index">
          <el-card>
            <el-image style="width: 100%;margin-bottom:15px" :src="prefix.image + item.files[0].name"/>
            <el-button class='btn2' type="danger" plain @click="showdetail(item)">{{item.username}}'s Gallery</el-button>
          </el-card>
        </div>
      </template>
    </waterfall>

    <waterfall :col="1" :data="top_bg_list" class="work-list2" v-show="detail">
      <template>
        <div v-for="(item,index) in top_bg_list" class="work" :key="index">
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
            <el-button class='btn' v-show="!item.fav" type="danger" plain @click="favourite(item)">收藏</el-button>
            <el-button class='btn' v-show="item.fav" type="danger" plain @click="removefavourite(item)">取消</el-button>
            <el-button class='btn1' type="danger" plain @click="download(item)">下载</el-button>
          </el-card>
        </div>
      </template>
    </waterfall>

    <waterfall :col="1" :data="alldocument" class="work-list2" v-show="!detail">
      <template>
        <div v-for="(item,index) in alldocument" class="work" :key="index">
          <el-card>
            <el-image style="width: 100%;margin-bottom:15px" :src="prefix.image + item.files[0].name"/>
            <el-button class='btn2' type="danger" plain @click="showdetail(item)">{{item.username}}'s Gallery</el-button>
          </el-card>
        </div>
      </template>
    </waterfall>

  </el-card>
</template>

<script>
import { Message } from 'element-ui'
import { getallimg,setfavourite,removefavourite,getinfo} from '@/api/api'

import { saveAs } from 'file-saver';


import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'


export default {
  components: {
    videoPlayer
  },
  name: 'Work',
  data() {
    return {
      prefix: {
        image: process.env.VUE_APP_BASE_API,
      },

      nowname:"",
      top_bg_list:[],
      myfav:[],
      vip:false,
      detail:false,
      alldocument:[],
    }
  },
  mounted() {
    this.getmyfav();
  },
  methods: {
    getmyfav(){
      getinfo().then(res=>{
        var that=this
        that.myfav=res.favpicids
        that.vip=res.usergroup
        that.getTopBg()
      })
    },
    showdetail(item){
      this.nowname=item.username
      this.detail=true
      this.top_bg_list=item.files
    },
    goback(){
      this.detail=false
      this.top_bg_list=[]
    },
    getTopBg(){

      getallimg().then(res => {

        var that=this
        that.alldocument=[]
        res.picids.forEach(element => {

          var namelist=element.split("/")
          var str=namelist[namelist.length-1]
          var isvideo=false
          if(str.indexOf(".mp4")!=-1){
            isvideo=true
          }
          
          if(that.alldocument.length==0){
            if(that.myfav.indexOf(element)!=-1){
              that.alldocument.push({username:namelist[namelist.length-2],files:[{name:element,fav:true,vid:isvideo}]})
            }else{
              that.alldocument.push({username:namelist[namelist.length-2],files:[{name:element,fav:false,vid:isvideo}]})
            }
          }else{
            var found=false
            for(var i=0;i<that.alldocument.length;i++){
              if(that.alldocument[i].username==namelist[namelist.length-2]&&that.alldocument[i].files.length<200){
                if(that.myfav.indexOf(element)!=-1){
                  that.alldocument[i].files.push({name:element,fav:true,vid:isvideo})
                }else{
                  that.alldocument[i].files.push({name:element,fav:false,vid:isvideo})
                }
                found=true
                break
              }
            }
            if(!found){
              if(that.myfav.indexOf(element)!=-1){
                that.alldocument.push({username:namelist[namelist.length-2],files:[{name:element,fav:true,vid:isvideo}]})
              }else{
                that.alldocument.push({username:namelist[namelist.length-2],files:[{name:element,fav:false,vid:isvideo}]})
              }
            }
          }
        });
      })
    },
    favourite(item){

      if(this.vip){
        item.fav=true
        setfavourite({picid:item.name}).then(res => {
          Message.success('收藏成功');
        })
      }else{
        Message.error("抱歉!您不是vip用户")
      }
      
    },
    removefavourite(item){
      item.fav=false
      removefavourite({picid:item.name}).then(res => {
        Message.success('取消收藏成功');
      })
    },
    download(item) {
      saveAs(this.prefix.image + item.name, item.name.split('/')[-1]);
   }
  }
}
</script>

<style lang="scss">
.el-card{
    border-radius: 0px;
  }
.work{
  border-radius: 5px;
  .el-card__body{
    background-color:#3e4756;
  }
  .el-card{
    border-radius: 5px;
  }
  .el-button{
    padding-left: 9%;
  }
}

</style>

<style lang="scss" scoped>

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

.video-player{
  margin-bottom: 20px;
}
.title2 {
  font-size: 40px;
  color: #eee;
  margin: 0px auto 0 auto;
  text-align: center;
  font-weight: bold;
}
.el-button+.el-button{
  margin-left: 0px;
}
.work{
  margin: 5px;
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
@media screen and (max-width: 1025px){
  .work-list{
    display: none;
  }
  .work-list2{
    display: block;
  }
}
@media screen and (min-width: 1025px){
  .work-list{
    display: block;
  }
  .work-list2{
    display: none;
  }
}
.work-list{
  width: 100%;
  left: 50%;
  transform: translate(-50%,0);
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
  .btn2{
    position: relative;
    left:50%;
    transform:translate(-50%,0);
  }
}
.work-list2{
  width: 80%;
  left: 50%;
  transform: translate(-50%,0);
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
  .btn2{
    position: relative;
    left:50%;
    transform:translate(-50%,0);
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
