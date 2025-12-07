import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017")

await client.connect()


export const StoreBackData = (data) => {

   try {
        console.log("data",data)
        const db = client.db("rfc-project")
        const userCollection = db.collection("user_info")


        userCollection.insertOne(data)

        return data
        
    } catch (error) {
        console.log(error)
        
    }

}

export const StoreReply = async(id,message,data,from) => {

    console.log("store this data",id,message,data,from)
    try {
        
        const db = client.db("rfc-project")
        const userCollection = db.collection("reply_info")


        const result = await userCollection.insertOne({rfpId:id,message:message,data:data,replymail:from})

        return result
        
    } catch (error) {
        console.log(error)
        
    }

}
export const GetAnalysisData = async(id) => {
   
     const db = client.db("rfc-project")
   const userCollection = db.collection("reply_info")
   const result = await userCollection.find({"rfpId": {"$eq":id}}).toArray()
   

   return result


}
export const StoreResult = async(id,data) => {
    try {
        // console.log("data",data)
        const db = client.db("rfc-project")
        const userCollection = db.collection("analysis_info")


        const result = await userCollection.insertOne({rfpId:id,result:data})

        return result
        
    } catch (error) {
        console.log(error)
        
    }

}


export const GetAllRequestfromBack = async() => {
   
   const db = client.db("rfc-project")
   const userCollection = db.collection("user_info")
   const result = await userCollection.find({}).toArray()
   console.log(result)

   return result
}