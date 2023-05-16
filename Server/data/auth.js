// import { getUsers } from '../db/database.js';
// import MongoDb from 'mongodb';

// const ObjectID = MongoDb.ObjectId; // rDBMS에서는 pk와 같음, 랜덤문자 발행

import mongoose from "mongoose";
import {useVirtualId} from "../db/database.js"

// 스키마(collection)생성
const userSchema = new mongoose.Schema({
    // collection에 저장된 형태를 만들어 낼 수 있다
    username: {type: String, required: true}, // required로 저장을 하게 해준다.
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}, // 여러가지 옵션을 넣는다면 {}안에서 해결한다.
    url: String // 옵션이 하나만 있을 경우 이런 형식으로 해도 된다.
})

useVirtualId(userSchema);
const User = mongoose.model('User', userSchema);

export async function findByUsername(username){
    return User.findOne( {username} );
}

export async function createUser(user){
    return new User(user).save().then((data) => data.id);
}

export async function findById(id){
    return User.findById(id);
}