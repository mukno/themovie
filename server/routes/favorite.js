const express = require('express');
const router = express.Router();
const {Favorite}=require('../models/Favorite');

router.post('/favoriteNumber',(req,res)=>{
    //좋아요 숫자 확인용으로 아이디받기
    
    //mongodb에서 favorite숫자를 가져오기
    Favorite.find({"movieId":req.body.movieId})
        .exec((err,info)=>{//400은 실패했단 의미
            if(err) return res.status(400).send(err)
            //200은 성공했단 의미
            res.status(200).json({success:true ,favoriteNumber:info.length})

        })
    

})

router.post('/favorited',(req,res)=>{
    //내가 이 영화를 favorite리스트에 넣었는지 정보를 db에서 가져오기
    
    //mongodb에서 favorite숫자를 가져오기
    Favorite.find({"movieId":req.body.movieId,"userFrom":req.body.userFrom})
        .exec((err,info)=>{//400은 실패했단 의미
            if(err) return res.status(400).send(err)


            let result=false;
            if(info.length!==0){
                result=true
            }



            //200은 성공했단 의미
            res.status(200).json({success:true ,favorited:result})

        })
    

})


router.post('/removeFromFavorite',(req,res)=>{
    
    Favorite.findOneAndDelete({movieId:req.body.movieId,userFrom:req.body.userFrom})
        .exec((err,doc)=>{
            if(err) return res.status(400).send(err)
            return res.status(200).json({success:true})

        })
    

})


router.post('/addToFavorite',(req,res)=>{
    
    const favorite=new Favorite(req.body)
    favorite.save((err,doc)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true})

    });

})




router.post('/getFavoredMovie',(req,res)=>{
    
    
    Favorite.find({'userFrom':req.body.userFrom})
        .exec((err,favorites)=>{
            if(err) return res.status(400).send(err)
            return res.status(200).json({success:true,favorites})

        })

})



router.post('/removeFromFavorite',(req,res)=>{
    
    Favorite.findOneAndDelete({movieId:req.body.movieId,userFrom:req.body.userFrom})
        .exec((err,result)=>{
            if(err)return res.status(400).send(err)
            return res.status(200).json({success:true})

        })
    

})




module.exports = router;
