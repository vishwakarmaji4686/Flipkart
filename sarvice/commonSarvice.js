class commonSarvice {
    constructor() {}

    generateImageName(oldName){
        return new Promise(function(resolve, reject) {
            console.log("show old Nem",oldName )
            let oldNameArr = oldName.split(".");
            console.log("oldNameArr", oldNameArr)
            const fileExtanaction = oldNameArr.splice(-1).toString();
            console.log("fileExtanaction", fileExtanaction);
            const currentDate = new Date();
            let imageNewName = currentDate.getTime() + Math.round(Math.random(11111, 99999) * 10000) + "." + fileExtanaction;
            console.log("imageNewName", imageNewName)
            resolve(imageNewName);
        })
    }

    uplodeImage(fileInfo){
        return new Promise(function (resolve, reject) {
            let uplodePath = __dirname + '/../public/product_Images/' + fileInfo.name;
            fileInfo.mv(uplodePath, function(error){
                if(error){
                    reject(error)
                }else{
                    resolve(true)
                }
            })
        })
    }


}



module.exports = new commonSarvice