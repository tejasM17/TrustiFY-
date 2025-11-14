import React from "react";
import { ArrowRight, Globe, Shield, Zap } from "lucide-react";
import { Button } from "@/componants/ui/button";
import heroImage from "@/assets/hero-currency.jpg";
import { Link } from "react-router";

const GetStarted = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
        }}
      />

      {/* Floating Currency Symbols */}
      <div className="absolute inset-0 pointer-events-none">
        {["$", "€", "£", "¥"].map((symbol, idx) => (
          <div
            key={idx}
            className="absolute text-6xl opacity-20 animate-float"
            style={{
              animationDelay: `${idx * 0.8}s`,
              top: `${20 + idx * 15}%`,
              left: `${idx * 25}%`,
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 px-4 py-20 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-white/10 backdrop-blur-sm">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Trusted by 10M+ users worldwide</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
          Exchange Currency <br />
          <span className="bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
            Anywhere, Anytime
          </span>
        </h1>

        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
          Send money globally with the best exchange rates. Fast, secure, and transparent — no hidden fees.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to='/home/login'>
            <Button className="w-full sm:w-auto group cursor-pointer">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default GetStarted;
