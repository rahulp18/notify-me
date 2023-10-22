import { NextResponse } from "next/server";

import { getLowestPrice,getHighestPrice,getAveragePrice,getEmailNotificationType } from "@/lib/actions/utils";

import { connectToDB } from "@/lib/mongoose";
import Product from "@/models/product.model";
import { scrapeAmazonProduct } from "@/lib/scraper";
import { generateEmailBody,SendEMail } from "@/lib/nodemailer";


export const maxDuration = 30; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
export const revalidate = 0;


export async function GET(request:Request){
    try {
        connectToDB();
        const products=await Product.find({});
        if(!products) throw new Error("No product fetched");

        const updatedProducts=await Promise.all(
            products.map(async(currentProduct)=>{
                const scrapedProduct=await scrapeAmazonProduct(currentProduct.url);

                if(!scrapedProduct) return;
                const updatedPriceHistory=[
                    ...currentProduct.priceHistory,
                    {
                        price:scrapedProduct.currentPrice
                    }
                ];

                const product={
                    ...scrapedProduct,
                    priceHistory:updatedPriceHistory,
                    lowestPrice: getLowestPrice(updatedPriceHistory),
                    highestPrice: getHighestPrice(updatedPriceHistory),
                    averagePrice: getAveragePrice(updatedPriceHistory),
                };

                const updatedProduct=await Product.findOneAndUpdate({
                    url:product.url,
                },
                product
                );
                const emailNotifType = getEmailNotificationType(
                    scrapedProduct,
                    currentProduct
                  );

                  if(emailNotifType && updatedProduct.users.length>0){
                    const productInfo={
                        title:updatedProduct.title,
                        url:updatedProduct.url
                    }
                    const emailContent = await generateEmailBody(productInfo, emailNotifType);
                    // Get array of user emails
                    const userEmails = updatedProduct.users.map((user: any) => user.email);
                    // Send email notification
                    await SendEMail(emailContent, userEmails); 
                  }
                  return updatedProduct;
            })
        )
        return NextResponse.json({
            message: "Ok",
            data: updatedProducts,
          });

    }catch (error: any) {
        throw new Error(`Failed to get all products: ${error.message}`);
      }
}

