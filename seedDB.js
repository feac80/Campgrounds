const Campground = require("./models/campground"),
      Comment = require("./models/comment");

const data = [
    {
        name:"Autokemp Nyrsko",
        image:"https://images-camping.info/CampsiteImages/43999_Large.jpg?width=325&height=216&mode=crop",
        descriptions:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a dapibus ipsum. Integer quam eros, dictum at consequat a, lobortis ac est. Nam posuere mauris porta arcu mollis vehicula. Nullam dictum efficitur molestie. Proin tristique odio at aliquet fermentum. Nam quis nulla dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam finibus lectus eu bibendum blandit. Cras interdum purus urna, in fringilla tellus pharetra in. Duis in dui eu ante efficitur posuere. Sed vulputate aliquam enim. Aenean convallis dolor ut fringilla faucibus. Quisque ut nisl pharetra, facilisis ipsum ut, facilisis ex."
    },
    {
        name:"Praha Camp",
        image:"https://images-camping.info/CampsiteImagesOriginal/152023_Original.jpg?width=1200&height=562&mode=max",
        descriptions:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a dapibus ipsum. Integer quam eros, dictum at consequat a, lobortis ac est. Nam posuere mauris porta arcu mollis vehicula. Nullam dictum efficitur molestie. Proin tristique odio at aliquet fermentum. Nam quis nulla dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam finibus lectus eu bibendum blandit. Cras interdum purus urna, in fringilla tellus pharetra in. Duis in dui eu ante efficitur posuere. Sed vulputate aliquam enim. Aenean convallis dolor ut fringilla faucibus. Quisque ut nisl pharetra, facilisis ipsum ut, facilisis ex."
    },
    {
        name:"Brno Camp",
        image:"https://images-camping.info/CampsiteImagesOriginal/44142_Original.jpg?width=1200&height=562&mode=max",
        descriptions:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a dapibus ipsum. Integer quam eros, dictum at consequat a, lobortis ac est. Nam posuere mauris porta arcu mollis vehicula. Nullam dictum efficitur molestie. Proin tristique odio at aliquet fermentum. Nam quis nulla dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam finibus lectus eu bibendum blandit. Cras interdum purus urna, in fringilla tellus pharetra in. Duis in dui eu ante efficitur posuere. Sed vulputate aliquam enim. Aenean convallis dolor ut fringilla faucibus. Quisque ut nisl pharetra, facilisis ipsum ut, facilisis ex."
    }
    
    ];

function seedDB(){
    Campground.remove({}, function(err, removedCamps){
    //   if(err){
    //       console.log(err);
    //   }else{
    //       console.log("The DB has been removed");
    //       // Add some Campsground
    //       data.forEach(function (item){
    //             Campground.create(item, function(err, newcamp){
    //               if (err){
    //                   console.log(err);
    //               }else{
    //                   console.log(`The camp: ${item.name} has been added`);
    //                   Comment.create({
    //                       text:"I wish I had Internet",
    //                       author:"Frank"
    //                   }, function (err, newcomment ){
    //                         if(err){
    //                             console.log(err);
    //                         }else{
    //                         newcamp.comments.push(newcomment);
    //                         newcamp.save(function (err, savedcamp){
    //                           if(err){
    //                               console.log(err);
    //                           } else{
    //                               console.log("the new comment has been saved");
    //                           }
    //                         });
    //                         }
                           
    //                   });
    //               }
                   
    //             });
    //         });
    //   } 
    });



}



module.exports = seedDB;