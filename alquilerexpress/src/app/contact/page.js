"use client";

import React from "react"
import FAQSection from "../../../components/FAQSection"
import CheckoutButton from "../../../components/CheckoutButton"


export default function AboutPage() {
  return (
    <div className="mx-2 flex flex-col gap-6 py-6">
      <FAQSection />
      <CheckoutButton/>
    </div>
  )
}
