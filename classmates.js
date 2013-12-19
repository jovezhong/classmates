if (Meteor.isClient) {
  Template.survey.items = function () {
    var list=[
      {label:'必填项',legend:true},
      {label:'防外人骚扰，请输入口令',key:'passcode',password:true,required:true},
      {label:'学号',value:'9924???',required:true},
      {label:'姓名',required:true},
      {label:'性别',options:['男','女']},
      {label:'手机',required:true},
      {label:'邮箱',required:true},
      {label:'工作单位',required:true},
      {label:'职位',required:true},

      {label:'聚会统计',legend:true},
      {label:'是否参加12月21号的聚会',key:'聚会',options:['来','来不了','还不确定']},
      {label:'是否带家属',options:['是','否']},
      {label:'是否带小孩',options:['是','否']},

      {label:'联络方式',legend:true},
      {label:'常驻国家',options:['中国','美国','日本','英国','澳大利亚','其他']},
      {label:'常驻国家_其他'},
      {label:'常驻城市',options:['上海','北京','香港','加州','西雅图','东京','悉尼','其他']},
      {label:'常驻城市_其他'},
      {label:'QQ'},
      {label:'微信号'},
      {label:'weibo'},
      {label:'twitter'},
      {label:'facebook'},
      {label:'Skype'},
      {label:'Apple ID',key:'AppleID'},
      {label:'Google ID',key:'GoogleID'},

      {label:'工作情况',legend:true},
      {label:'所处行业'},
      {label:'还在做IT？',key:'IT',options:['是','否']},
      {label:'如果还在IT圈,主要角色',key:'IT_Role',options:['开发','测试','运维','产品设计','售前','技术支持','管理','其他']},
      {label:'做领导了?',key:'管理',options:['做管理','不做管理']},

      {label:'家庭情况',legend:true},
      {label:'当前婚姻状况',options:['结婚','单身','发展中']},
      //{label:'有离过婚么',options:['是','否']},
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

      {label:'其他',legend:true},
      {label:'对本次聚会的建议和期望',textarea:true},
      {label:'顺便灌个水吧',textarea:true},
    ];
    for(var i in list){
      if(list[i].hasOwnProperty('key')==false)
        list[i].key=list[i].label;
      if(list[i].hasOwnProperty('value')==false)
        list[i].value='';  
      list[i].requiredStr=''; 
      if(list[i].hasOwnProperty('required')==true&&list[i].required===true)
        list[i].requiredStr='required';       
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
    $('#myform').validate();
    data={};
    $.each($('#myform').serializeArray(),function(){
      data[this.name]=this.value;
    });
    //two checks: one for passcode, the other for required fields
    if(rightPasscode(data.passcode)===false){
      alert("口令不对");
    }else{
      delete data.passcode;
      Meteor.call('saveData',data);
      alert("信息提交成功。此系统制作仓促，请勿再次填写。");
      $('body').html("<pre>让我们相约12.21，共同见证十年的成长</pre>");
    }
  }
  function rightPasscode(code){
    return code==="mypwd"//TODO change this passcode in your deployment
  }

  Template.survey.events({
    'keyup .passcode':function(event){
      var str=rightPasscode(event.currentTarget.value)?"OK":''
      $('.passcodeOK').text(str);
    },
    'submit' : function (event) {
      submitForm();
      event.preventDefault();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    fs = Npm.require('fs');
    dataFile='/Users/jzhong/Dev/git_projects/data.txt'
  });
  Meteor.methods({
    saveData: function(data){
      data.time=new Date();
      var str=JSON.stringify(data)+"\n";
      fs.appendFileSync(dataFile,str,'utf8');
    },
    getData: function(){
      return fs.readFileSync(dataFile,'utf8')
      //return Assets.getText('data.txt');
    }
  });
}
