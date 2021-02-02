const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const FavoriteSchema = mongoose.Schema({
    userFrom:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    movieId:{
        type:String
    },movieTitle:{
        type:String
    },
    moviePost:{
        type:String
    },
    movieRunTime:{
        type:String
    }

   //timestamps :생선된 시간 이런걸자동 등록
},{timestamps:true})



const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = { Favorite }