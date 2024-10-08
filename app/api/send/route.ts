import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const response = await req.json() ;
  console.log(response);
  try {
    const data = await resend.emails.send({
      from: 'FILESHARING@resend.dev',
      to: ['20bcs232@iiitdmj.ac.in'],
      subject: "HI",
      react: '',
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
