import faker from "faker";
import { PostModel } from "../entities/post.entity";
import { ObjectId } from "mongodb";
import { UserModel } from "../entities/user.entity";


export const seedMongoWithPosts=async(howmuch:number)=>{
    
   
    for(let i=0; i<howmuch;i+=1){
        const _id = new ObjectId();
        const content =  faker.lorem.paragraph((Math.floor(Math.random() * 5)+1))
        const randomUser = await UserModel.aggregate([{ $sample: { size: 1 } }])
    
        let post = new PostModel({
            _id,
            user_id: randomUser[0]._id,
            post_id:_id,
            content:content
          });
          try{
            await UserModel.findOneAndUpdate({_id:randomUser[0]._id},{$push:{postList:_id}})   
             await post.save();
            }
            catch(err){
                console.log(err);
            }       
    }
    console.log(`🌱database seeded whit ${howmuch} new posts🌱 `)
   
}