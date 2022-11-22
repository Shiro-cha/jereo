
const path = require("path");
const fs = require("fs");
const process = require("process");
const {ChildProcess} = require("child_process");

module.exports=function(file,callback){

let folder;
if(file){
   folder = path.isAbsolute(file)? file : path.join(process.cwd(),file);
}else{
  folder = process.cwd();
}
fs.stat(folder,function(err,stats){
  if(err){
    console.log(err.message);
  }else if(stats.isDirectory()){
    allFolder(folder,callback);
    (async function(){
    return fs.watch(folder,function(evt,filename){
        callback(evt,filename);
    });})()
}
});
function allFolder(f,callback){
if(!f.includes(".git")){
    console.log(f);
    fs.readdir(f,function(err,listes){
    for (var i = 0; i < listes.length; i++) {
      let list = path.join(f,listes[i]);
      fs.stat(list,function(err,stats){
        if(err){
          console.log(err.message);
        }else if(stats.isDirectory() && listes[0]!=='.'){
          new Promise(function(success,reject){
            if(!list.includes(".git")){
              fs.watch(list,function(evt,filename){
              if(filename[0]!=='.'){
                  callback(evt,path.join(list,filename));
              }
              })
            }
            success(list);
          }).then(function(){
            //console.log("watch: "+list);
          });

          allFolder(list,callback);
        }
      });
    }
  });

}
}


}
