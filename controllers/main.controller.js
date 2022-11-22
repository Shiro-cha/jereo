const path = require("path");
const fs =  require("fs");
const {cwd} = require("process");
const childProcess = require("child_process");
const watch = require("../customAPI/watch");

module.exports = {

  watchFolder : function(folderPath=cwd()){

    //configure folder to be a absolute

    const folder = path.isAbsolute(folderPath) ? folderPath : path.join(cwd(),folderPath);

    //verify if the file exist or if it's a folder

    fs.stat(folder,function(err,stats){
      if(err){
        console.error(err.message);
      }else if(!stats.isDirectory()){
        console.log("This is not a directory");
      }else{

        //all test are success full now test if this folder container a git repository
      //git status
        const status = childProcess.exec(`cd "${folder}" && git status`);
        status.on("close",function(code){
          if(code === 128){
            console.log("This directory is not a git reposistory...");
          }else if(code ===0){
            console.log("jereo on: ["+folder+"] ...");
            //begin watching files
            watch(folder,function(evt,filename){
                if(filename[0] !=="."){
                  console.log();
                console.log(`[event]: ${evt} on ${filename}`);
                console.log();
                console.log("***");
                    console.log(folder);
                    const commit = childProcess.exec(`cd "${folder}" && git add . && git commit -m "${evt} ${filename}"`);
                    if(commit){
                      commit.stdout.on("data",function(data){
                        console.log(data);
                        console.log("***");
                        console.log();
                        console.log("jereo on: ["+folder+"] ...");
                      });
                      commit.stderr.on("data",function(data){
                        console.log(data);
                      })
                    }
            }
            });
          }
        });
      }
    });


  }




}
