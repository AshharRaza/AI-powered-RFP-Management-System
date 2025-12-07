import {ChatGoogleGenerativeAI} from '@langchain/google-genai'
import dotenv from 'dotenv'
import {END, START, StateGraph} from '@langchain/langgraph'
import { AnalysisNode, RFPNode, TalkNode } from './Nodes.js'

dotenv.config()

export const model = new ChatGoogleGenerativeAI({
    model:'gemini-2.5-flash',
    apiKey:process.env.API_KEY

})

export const IntentNode = async(state) => {
    console.log(state)
    const prompt = `You are an AI intent classifier for a response for proposal.
Classify the intent of this user message into one of these:
[smalltalk, buy_request, analysis_request]

User Message: ${state.text}
Return only name of intent

`
const result = await model.invoke(prompt)
console.log(result.content)
const intent= result.content.trim().toLowerCase()

return {intent}



}

const RouteNode = (state) => {
     const intent = state.intent
    console.log("router",state)

    switch(intent){
        case "buy_request": return {next: "RFPNode"}

        case "analysis_request": return {next: "AnalysisNode"}
        case "smalltalk": return {next: "TalkNode"}
        
        default : return {next:"UnknowNode"}


    }

}

async function UnknowNode() {
  return { reply: "Sorry, I didn’t quite understand that. Can you rephrase?" };
}

const graph = new StateGraph({
    channels:{
        text:{type:"string"},
        response:{type:"string"},
        intent:{type:"string"},
        reply:{type:"string"},
        next:{type:"string"},
        rfp:{type:"string"},
    }
})

graph.addNode("IntentNode",IntentNode)
graph.addNode("RouterNode",RouteNode)
graph.addNode("TalkNode",TalkNode)
graph.addNode("RFPNode",RFPNode)
graph.addNode("UnknowNode", UnknowNode)
graph.addNode("AnalysisNode",AnalysisNode)

// graph.addNode("UnknownNode",UnknowNode)

graph.addEdge(START,"IntentNode")
graph.addEdge("IntentNode","RouterNode")
graph.addConditionalEdges("RouterNode",(state) => state.next, {
    TalkNode : "TalkNode",
    RFPNode:"RFPNode",
    AnalysisNode:"AnalysisNode",
    UnknowNode: "UnknowNode",

})
 graph.addEdge("TalkNode", END);
  graph.addEdge("RFPNode", END);
  graph.addEdge("AnalysisNode", END);
  graph.addEdge("UnknowNode", END);

const complier = graph.compile()

export const GetAiResponse = async(input) => {

    const result = await complier.invoke({text:input})
    console.log("final result",result)

    return {date: new Date().toLocaleTimeString(),text:result.text,mail:result.reply.replay,vendors:result.reply.query.schemaResult}

    
}

export const mailGenerate = async(name,mail) => {

    const prompt = `Replace the Supplier Name with ${name} on this  ${mail} and the company name in this is a supplier company name and my company needs products and i am Ashhar Siddiqui`
    const result = await model.invoke(prompt)

    return result.content

}

export const GiveAiForAnalysis = async(analysis) => {

    console.log(analysis)

    const prompt = `Your a quotation analyser and your task is to analyse the quotation and give the best result as output
    Compare data of all the vendors and show the result in short 600 words
    Analyse the Below json document and follow the step and complete each step in 2 lines
    1.Give the result in short and effective
    2.Give the result in well structured format for understanding of user
    3.Give the name and email id of the supplier
    4.Show the difference of price,quantity,models and get best out of it
    5.Show who is the best vendors to buy the products
    6.Best vendors to Buy and its email
    
    ${JSON.stringify(analysis)}
    `
    const result = await model.invoke(prompt)
    console.log(result.content)

    return result.content
}