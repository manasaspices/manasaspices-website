import { NextResponse } from 'next/server';
import connectDB from '@/utils/db';
import Assets from '@/models/assets'; 

export async function GET() {
  try {
    await connectDB(); 
    const data = await Assets.findOne(); 
    return NextResponse.json({ slides: data?.home_slides || [] });
  } catch (err) {
    console.error("Error fetching home slides:", err);
    return NextResponse.json({ error: "Failed to fetch home slides" }, { status: 500 });
  }
}
