'use client';
import React, { useState } from 'react';
import FormInput from '@/app/components/ui/inputs/FormInput';
import Typography2 from '@/app/components/ui/typography/Typography2';
import Typography1 from '@/app/components/ui/typography/TypographyH1';
import { Button } from '@/components/ui/button';
import GoogleIcon from '@/app/components/ui/svg/googleicon';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Loader2Icon } from 'lucide-react';

const INIT_FORM_VALUE = {
  email: '',
  password: '',
};
const SignInPage = () => {
  const [formValue, setFormValue] = useState({ ...INIT_FORM_VALUE });
  const [loading, setLoading] = useState(false);
  const { email, password } = formValue;
  const inputsDetails = [
    {
      id: 'email1',
      name: 'email',
      type: 'email',
      placeholder: 'Enter Email',
      labelContent: 'Email*',
      label: 'email',
      value: email,
    },
    {
      id: 'pass1',
      name: 'password',
      type: 'password',
      placeholder: '********',
      labelContent: 'Password*',
      label: 'password',
      value: password,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/',
      });
      setFormValue({ ...INIT_FORM_VALUE });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen bg-zinc-900 text-white flex items-center justify-center gap-40 px-20 py-10">
      <div className="left-side h-full flex items-center justify-center">
        <div className="bg-zinc-800 px-20 py-10 rounded-3xl">
          <form
            onSubmit={handleSubmit}
            action=""
            className="w-96 flex flex-col items-start justify-baseline gap-5"
          >
            {inputsDetails.map(
              ({ id, name, type, placeholder, labelContent, label, value }) => (
                <FormInput
                  key={id}
                  labelContent={labelContent}
                  label={label}
                  placeholder={placeholder}
                  type={type}
                  name={name}
                  value={value}
                  onChange={handleChange}
                />
              )
            )}
            <Button type="submit" variant="secondary" disabled={loading}>
              {loading ? <Loader2Icon className="animate-spin" /> : 'Login'}
            </Button>
          </form>
          <div className="mt-10">
            <p>
              I don't have any account
              <Link className="text-blue-400 ml-1" href={'/auth/sign-up'}>
                Create
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="right-side h-full flex flex-col items-baseline justify-center">
        <Typography1>Welcome to Task Management</Typography1>
        <Typography2 className="mt-3 text-blue-400">
          Login your account
        </Typography2>
        <Button variant={'secondary'} className="cursor-pointer mt-10">
          <GoogleIcon />
          continue with google
        </Button>
      </div>
    </div>
  );
};

export default SignInPage;
