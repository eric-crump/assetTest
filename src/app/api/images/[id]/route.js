//import { Stack } from "@/lib/cstack";
import { NextResponse } from "next/server";
import contentstack from '@contentstack/management'

export async function GET(request){
    // const asset = await Stack.getImage('bltc6d770f343361373');
    // console(asset);
    const theStack = client.stack({
        api_key: process.env.CONTENTSTACK_API_KEY,
        management_token: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
    })

    return NextResponse.json({theResult:"success"});
}