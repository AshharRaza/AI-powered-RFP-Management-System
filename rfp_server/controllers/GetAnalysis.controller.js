import { GetAnalysisData, StoreResult } from "../schema/rfc.model.js"
import { GiveAiForAnalysis } from "../services/Ai.services.js"

export const GetAnalysis = async(req,res) => {

    const data = req.body
    console.log(data)
    
     
    try {
        
        const analysis = await GetAnalysisData(data.id)
        console.log(analysis)
        if(analysis.length == 0){
            return res.status(400).json("Data is not Available for Analysis")
        }
        const TakeAIResponse = await GiveAiForAnalysis(analysis)
        const storeInDatabase = await StoreResult(data.id,TakeAIResponse)
        return res.status(200).json(TakeAIResponse)
        
    } catch (error) {

        return res.status(400).json("Something went Wrong")
        
    }
    
}

