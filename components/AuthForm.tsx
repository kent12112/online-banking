"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from '@/components/CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
 

const AuthForm = ({type}: {type: string}) => {
    // 1. Define your form.
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof authFormSchema>>({
      resolver: zodResolver(authFormSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    })
   
    function onSubmit(values: z.infer<typeof authFormSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      setIsLoading(true)
      console.log(values)
      setIsLoading(false)
    }

  
  return (
    <section className="auth-form">
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" className='cursor-pointer flex items-center gap-1'>
            <Image 
            src ="/icons/logo.svg"
            width={34} 
            height={34} 
            alt="Horizon logo" 
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
          </Link>
          <div className='flex flex-col gap-1 md:gap-3'>
            <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>{user ? 'Link Account'
                      : type == 'sign-in'
                        ? "Sign In"
                        : "Sign Up"
                      }</h1>
            <p className='text-16 font-normal text-gray-600'>
              {user
                ? 'Link your account to get started'
                : 'Please enter your details'
                }
            </p>
          </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          {/*plaidLink */}
        </div>
      ): (
        <>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> 
            <CustomInput 
            control ={form.control} 
            name="email" 
            label="Email"
            placeholder="enter your email"/>
            <CustomInput 
            control ={form.control} 
            name="password" 
            label="Password"
            placeholder="enter your password"/>
            <div className='flex flex-col gap-4'>
              <Button disabled={isLoading} className="form-btn" type="submit">{isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin"/> &nbsp;
                  Loading...
                </>
              ): type === "sign-in" ? "Sign in" : "Sign up"
            }</Button>
            </div>
          </form>
        </Form>

        <footer className='flex justify-center gap-1'>
          <p className="text-14 font-normal text-gray-600">{type === 'sign-in' ? "Dno't have account?": "Already have an account?"}</p>
          <Link className="form-link"href={type === "sign-in" ? "/sign-up": "/sign-in"}>
          {type === "sign-in" ? "Sign up": "Sign in"}
          </Link>
        </footer>
        </>
      )}
      </section>             
  )
}

export default AuthForm