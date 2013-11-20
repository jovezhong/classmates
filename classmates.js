if (Meteor.isClient) {
  Template.survey.items = function () {
    return [
      {label:'姓名',key:'姓名',value:''},
      {label:'性别',key:'性别',value:''},
    ];
  };
  function submitForm(){
    data={};
    $.each($('#myform').serializeArray(),function(){
      data[this.name]=this.value;
    });
    Meteor.call('saveData',data);
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
