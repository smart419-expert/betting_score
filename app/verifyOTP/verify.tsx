"use client"

import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtp = async ({ email }: { email: string }) => {
    const otp = generateOtp();

    const { error } = await supabase.from('otps').insert([{ email, code: otp }]);
    if (error) {
        toast.error('Failed to store OTP');
        return false;
    }

    toast.success(`OTP code sent to ${email}: ${otp}`);
    // Return the OTP if you want to display it (for dev/testing), or just return true
    return otp;
};

export const verifyAndSignUp = async ({ email, password, name, otpInput }: { email: string, password: string, name: string, otpInput: string }) => {
    const { data: result } = await supabase
        .from('otps')
        .select('*')
        .eq('email', email)
        .eq('code', otpInput)
        .order('created_at', { ascending: false })
        .limit(1);

    if (!result || result.length === 0) {
        toast.error('Invalid or expired OTP');
        return false;
    }
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
    });

    if (error) {
        toast.error(error.message);
        return false;
    }

    toast.success('Signup successful! Check your email to confirm login.');
    return true;
};