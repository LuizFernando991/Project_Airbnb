import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'
import bcrypt from 'bcrypt'

interface IRegisterData {
  email: string
  name: string
  password: string
}

export async function POST(request: Request) {
  const body = await request.json()

  const { email, name, password }: IRegisterData = body
  // Add validations
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  })

  return NextResponse.json(user)
}
