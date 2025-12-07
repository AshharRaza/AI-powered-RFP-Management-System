import {  GetAllRequestfromBack, StoreBackData } from '../schema/rfc.model.js'
import { GetAiResponse, mailGenerate } from '../services/Ai.services.js'
import nodemailer from "nodemailer";
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()


export const AiResponseData = async(req,res) => {
   
    
    const data = req.body.value

    const aiResponse = await GetAiResponse(data)
   
    console.log("adas",aiResponse)
    if(!aiResponse){
        return res.status(400).json({message:"Something Wrong try again"})
    }

    return res.status(200).json(aiResponse)
    


    

}

export const UserResponse = async(req,res) => {

    const {vendors,mail,rfpId} = req.body
   const data = StoreBackData(req.body)
   for (const vendor of vendors) {
    const prompt = await mailGenerate(vendor.name,mail)
      await sendRfpMail({
        vendorEmail: vendor.email,
        subject: `RFP-${rfpId} | New Proposal Request`,
        message: prompt,
      });
    }
   if(!data){
    return res.status(404).json("Data not found")
   }
   return res.status(200).json("Data store Sucessfully")

}



export const sendRfpMail = async ({ vendorEmail, subject, message }) => {
    console.log(vendorEmail, subject, message)
    console.log(process.env.email,process.env.EMAIL_KEY)
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_KEY,
      },
    });

    await transporter.sendMail({
      from: `"RFP Automation" ${process.env.EMAIL}`,
      to: vendorEmail,
      subject,
      text: message,
    });

    console.log(`Mail sent to: ${vendorEmail}`);
    return true;

  } catch (error) {
    console.log("Mail Error:", error);
    return false;
  }
};

export const GetAllRequest = async(req,res) =>  {

  try {
    const allRequest = await GetAllRequestfromBack()
    if(!allRequest){
      return res.status(400).json("data is not available")
    }
    return res.status(200).json(allRequest)
    
  } catch (error) {

    return res.status(400).json("Something Went Wrong")
    
  }
}



