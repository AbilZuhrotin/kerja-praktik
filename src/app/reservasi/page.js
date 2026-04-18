'use client'
import { useState } from "react";
import StepOne from './component/step-1'; 
import StepTwo from './component/step-2';
import StepThree from './component/step-3';
import StepFour from './component/step-4';
import StepFive from "./component/step-5";

export default function ReservasiPage() {
  const [step, setStep] = useState(3); 
  const [cart, setCart] = useState([]); 

  const [summary, setSummary] = useState({ type: 'dp', total: 0 });

  return (
    <main className="min-h-screen py-4 md:py-8">
      {/* <StepOne /> */}
      {/* <StepTwo /> */}
      {step === 3 && (
        <StepThree 
          cart={cart} 
          setCart={setCart} 
          onNext={() => setStep(4)} 
        />
      )}
      {step === 4 && (
      <StepFour 
        cart={cart} 
        setCart={setCart} 
        onBack={() => setStep(3)} 
        onNext={(data) => {
          setSummary(data); // Simpan hasil itungan dari Step 4
          setStep(5);
        }} 
      />
    )}

    {step === 5 && (
      <StepFive 
        cart={cart} 
        paymentType={summary.type} 
        totalWajibBayar={summary.total} 
      />
    )}
    </main>
  );
}