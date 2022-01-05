import { ObjectType, Field } from "type-graphql";
import {prop, getModelForClass} from "@typegoose/typegoose";



@ObjectType()
export class User{

    @Field()
    @prop()
     _id !: string;

    @Field()
    @prop()
     user_id : string;
    
    @Field()
    @prop()
    createdAt: Date =new Date;

    @Field()
    @prop()
    updatedAt: Date = new Date;

    @Field()
    @prop({unique:true})    
    username !:string;
    
    @Field()
    @prop()
    password !:string;

    @Field()
    @prop({unique:true})
    email !:string;

    @Field(()=>[String])
    @prop({type:[String]})
    friendList :string[];

    
}
export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } });
