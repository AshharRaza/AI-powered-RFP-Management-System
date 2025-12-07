import { RunnableSequence } from "@langchain/core/runnables"
import { model } from "./Ai.services.js"
import {StructuredOutputParser} from '@langchain/core/output_parsers'

import { VendorsBackData } from "./VendorsData.js"
import {z} from 'zod'


const schema = z.object({
  vendors: z.array(
    z.object({
      name: z.string().describe("Vendor company name"),
      email: z.string().email().describe("Vendor email"),
      category: z.string().describe("Service category"),
      location: z.string().describe("City or Country")
    })
  ).describe("Array of all matching vendors")
});
  

const schemaModel = StructuredOutputParser.fromZodSchema(schema)

export const TalkNode = async(state) => {
    const text = state.text

    const prompt = `You are a response to proposal assistant , Replay like a RFP assistant
    Rule to Follow: 
    1. Dont go out of context.
    2.If user ask unnecessary question which is not relate to RFP then answer "I am only a RFP Agent "
    
    User query : ${text}
    `
    const result = await model.invoke(prompt)
    return {response:result.content}


}

const VendorsList = async(input) => {
    console.log(input)
    const result = schemaModel.getFormatInstructions()

    const vendorsData = await VendorsBackData()
    // console.log(vendorsData)
    const prompt = `Extract the information based on the suitable vendors for a work on request user query
    User query : ${input}
    Vendors List :${JSON.stringify(vendorsData)}
    schema: ${result}
    `
    // console.log(prompt)
    const output = await model.invoke(prompt)
    // console.log(output.content)
    const schemaResult = await schemaModel.invoke(output)
    // console.log("vendor",schemaResult)
    return {query:input, schemaResult}
   
    

}
const CreateRFP = async(input) => {
    
    console.log(input)
    const text = `Generate a one 5-8 line mail to asking for quotation of there product based on the user query
    User Query : ${input.query}

    `
    const result = await model.invoke(text)

    return {query:input,replay:result.content}

}

export const RFPNode = async(state) => {
    const text = state.text
    
    const run = RunnableSequence.from([VendorsList,CreateRFP])
    const result = await run.invoke(text)
    console.log("result ",result)

    return {reply:result}
}
export const AnalysisNode = () => {

    console.log("AnALSYSI NDIE")
}