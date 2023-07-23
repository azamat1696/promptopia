import mongoose from 'mongoose';

let isConnected = false; // track the connection

connectDB().then(res =>{
    if(isConnected) {
        console.log('MongoDB is already connected');
         return;
     }
    isConnected = true;
    console.log('DB connected');
}).catch(err => {
    console.log(err)
    isConnected = false;
});
export async function connectDB() {
     // if(isConnected) {
     //     console.log('MongoDB is already connected');
     //  return;
     // }

    await mongoose.connect(`mongodb://localhost:27017/share_prompt`);
}

//
// export const connectToDB = async () => {
//     mongoose.set('strictQuery', true);
//
//     if(isConnected) {
//         console.log('MongoDB is already connected');
//         return;
//     }
//
//     try {
//         await mongoose.connect(process.env.MONGODB_URI, {
//             dbName: "share_prompt",
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         })
//
//         isConnected = true;
//
//         console.log('MongoDB connected')
//     } catch (error) {
//         console.log(error);
//     }
// }
