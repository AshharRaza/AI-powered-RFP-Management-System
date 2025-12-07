import fs from 'fs'




export const VendorsBackData = () => {
 const data = fs.readFileSync("./data/vendors.json", "utf-8");
  const vendors = JSON.parse(data);
 return vendors


}





