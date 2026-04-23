'use client'
import { useState } from "react";
import { simpanReservasi } from "@/app/actions/reservation";
import StepOne from './component/step-1'; 
import StepTwo from './component/step-2';
import StepThree from './component/step-3';
import StepFour from './component/step-4';
import StepFive from "./component/step-5";

export default function ReservasiPage() {
  const [step, setStep] = useState(1); 
  const [cart, setCart] = useState([]); 

  const [summary, setSummary] = useState({ type: 'dp', total: 0 });

  const [customerData, setCustomerData] = useState({});

  const handleFinalSubmit = async (paymentData) => {
    // Gabungkan semua data
    const finalData = {
      ...customerData,
      ...paymentData,
      totalBayar: paymentData.total,
      metode: paymentData.type
    };

    // Jalankan Action Simpan ke DB
    const result = await simpanReservasi(finalData, cart);

    if (result.success) {
      setStep(5);
    } else {
      alert("Error: " + result.message);
    }
  };

  return (
    <main className="min-h-screen py-4 md:py-8">
      {step === 1 && 
        <StepOne
          onNext={() => setStep(2)}
        />}
      {step === 2 && (
        <StepTwo 
          onBack={() => setStep(1)} 
          onNext={(data) => {
          setCustomerData(data); 
          setStep(3);
          }}
        />
      )}
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
            setSummary(data);
            handleFinalSubmit(data);
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