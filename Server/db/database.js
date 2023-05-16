import { config } from '../config.js';
// import MongoDb from 'mongodb';
import mongoose from 'mongoose';

let db;
// export async function connectDB(){
//     return MongoDb.MongoClient.connect(config.db.host)
//         .then((client) => {
//             db = client.db()
//         });
// }

// DB 배포

export async function connectDB(){ // DB 연결
    return mongoose.connect(config.db.host);
}

export function useVirtualId(schema){ // 스키마에 존재하지 않는데 스키마를 사용하게 해주는 key를 가상으로 만든다.
    schema.virtual('id').get(function() {
        return this._id.toString(); // _id로 자동 등록되어 있는 것을 문자열로 받아서 id로 사용할 것이다.
    })
    // schema 세팅
    schema.set('toJSON', {virtuals: true}) // {virtuals: true}로 key를 사용하면서 내보낼때는 toJSON으로 내보내면서 다룬다.
    schema.set('toObject', {virtuals: true}) // 다룰때는 Object 형식으로 다룬다.

    
}

// 몽고디비는 스키마가 없음
// 비정형 형태, 규칙 따로 x

export function getUsers(){
    return db.collection('users');
}

export function getTweets(){
    return db.collection('Tweets');
}