(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e92115ca"],{"66b5":function(t,e,n){"use strict";n("7944")},7944:function(t,e,n){},a7e0:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-card",{attrs:{id:"container"}},[n("h1",{staticClass:"title"},[t._v("Feedback")]),n("h3",{staticClass:"smalltitle"},[t._v("A website that can generate live wallpapers")]),n("el-divider"),n("el-form",{staticClass:"myfeedback",attrs:{size:"mini"}},[n("el-form-item",[n("p",{staticClass:"smalltitle2"},[t._v("请在下方输入框提交您的问题反馈，或者邮箱联系我们zhuoliang233@163.com")])]),n("el-form-item",[n("el-input",{attrs:{type:"textarea",rows:15},model:{value:t.comment,callback:function(e){t.comment=e},expression:"comment"}})],1),n("el-form-item",[n("el-button",{staticClass:"leftbuttom",on:{click:t.clear}},[t._v("清空")]),n("el-button",{staticClass:"rightbuttom",attrs:{type:"danger",plain:""},on:{click:t.submitUpload}},[t._v("提交")])],1)],1)],1)},c=[],s=n("5c96"),i=n("4ec3"),l={name:"Work",data:function(){return{comment:""}},computed:{},mounted:function(){},methods:{clear:function(){this.comment=""},submitUpload:function(){""!=this.comment?Object(i["m"])({comment:this.comment}).then((function(t){s["Message"].success("提交成功")})):s["Message"].warning("未填写")}}},o=l,m=(n("66b5"),n("2877")),r=Object(m["a"])(o,a,c,!1,null,"0abeff7c",null);e["default"]=r.exports}}]);