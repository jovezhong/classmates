if (Meteor.isClient) {
  Template.survey.items = function () {
    var list=[
      {label:'基本信息',legend:true},
      {label:'防外人骚扰，请输入口令',key:'passcode',password:true},
      {label:'姓名'},
      {label:'性别',options:['男','女']},
      {label:'学号',value:'9924???'},

      {label:'聚会统计',legend:true},
      {label:'是否参加12月21号的聚会',key:'聚会',options:['来','来不了','还不确定']},
      {label:'是否带家属',options:['是','否']},
      {label:'是否带小孩',options:['是','否']},
      {label:'是否上午来帮忙',options:['是','否']},
      {label:'是否想参观江湾校区',key:'江湾',options:['是','否']},
      {label:'是否想参观张江校区',key:'张江',options:['是','否']},

      {label:'联络方式',legend:true},
      {label:'常驻国家',options:['中国','美国','日本','英国','澳大利亚','其他']},
      {label:'常驻国家_其他'},
      {label:'常驻城市',options:['上海','北京','香港','加州','西雅图','东京','悉尼','其他']},
      {label:'常驻城市_其他'},
      {label:'手机'},
      {label:'Email'},
      {label:'QQ'},
      {label:'微信号'},
      {label:'weibo'},
      {label:'twitter'},
      {label:'facebook'},
      {label:'Skype'},
      {label:'Apple ID',key:'AppleID'},
      {label:'Google ID',key:'GoogleID'},

      {label:'工作情况',legend:true},
      {label:'当前单位'},
      {label:'职位'},
      {label:'所处行业'},
      {label:'还在做IT？',key:'IT',options:['是','否']},
      {label:'如果还在IT圈,主要角色',key:'IT_Role',options:['开发','测试','运维','产品设计','售前','技术支持','管理','其他']},
      {label:'偏管理还是偏IC',key:'管理',options:['Manager','Individual Contributor']},

      {label:'家庭情况',legend:true},
      {label:'当前婚姻状况',options:['结婚','单身','发展中']},
      {label:'有离过婚么',options:['是','否']},
      {label:'有小孩了么',options:['有','无']},
      {label:'几个男孩',options:['0','1','2']},
      {label:'几个女孩',options:['0','1','2']},
      {label:'小孩几岁(多个小孩取平均)',options:['0','1','2','3','4','5','6','7+']},
      {label:'买房了么',options:['是','否']},
      {label:'买车了么',options:['是','否']},

      {label:'怀旧一下',legend:true},
      {label:'大学期间最难忘的事',textarea:true},
      {label:'大学期间最郁闷的事',textarea:true},
      {label:'大学期间最后悔的事',textarea:true},
      {label:'大学期间最爽的事',textarea:true},
    ];
    for(var i in list){
      if(list[i].hasOwnProperty('key')==false)
        list[i].key=list[i].label;
      if(list[i].hasOwnProperty('value')==false)
        list[i].value='';      
      if(list[i].hasOwnProperty('options')){
        var _options=list[i].options
        var newOptions=[];
        for(var j in _options){
          newOptions.push({
            label:list[i].label,
            key:list[i].key,
            option:_options[j]
          });
        }
        list[i].options=newOptions;
      }
    }
    return list;
  };
  Template.survey.inputIs=function (inputType) {
    var myType="text";
    if(this.hasOwnProperty('options'))
      myType="radio"
    if(this.hasOwnProperty('legend')&&this.legend)
      myType="legend"   
    if(this.hasOwnProperty('password')&&this.password)
      myType="password"     
    if(this.hasOwnProperty('textarea')&&this.textarea)
      myType="textarea"   
    return myType===inputType
  };
  function submitForm(){
    data={};
    $.each($('#myform').serializeArray(),function(){
      data[this.name]=this.value;
    });
    if(data.passcode==="mypwd"){
      delete data.passcode;
      Meteor.call('saveData',data);
    }else{
      alert("口令不对");
    }
  }

  Template.survey.events({
    'submit' : function () {
      submitForm();
      event.preventDefault();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    fs = Npm.require('fs');
  });
  Meteor.methods({
    saveData: function(data){
      data.time=new Date();
      var str=JSON.stringify(data)+"\n";
      fs.appendFileSync('/Users/jzhong/Dev/git_projects/classmates/private/data.txt',str,'utf8');
    }
  });
}
