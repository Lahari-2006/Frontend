import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, TrendingUp, Shield, Users } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

// Words for typewriter animation
const words = [
  "Accounting",
  "Financial Solutions",
  "Registrations",
  "Certificates",
];

// Custom typewriter hook
const useTypewriter = (
  wordList: string[],
  typingSpeed = 80,
  pauseTime = 1500,
  deletingSpeed = 40
) => {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    let timer: number;
    const currentWord = wordList[wordIndex % wordList.length];

    if (!isDeleting) {
      if (display.length < currentWord.length) {
        timer = window.setTimeout(() => {
          if (mounted.current)
            setDisplay(currentWord.slice(0, display.length + 1));
        }, typingSpeed);
      } else {
        timer = window.setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else {
      if (display.length > 0) {
        timer = window.setTimeout(() => {
          if (mounted.current) setDisplay(display.slice(0, -1));
        }, deletingSpeed);
      } else {
        timer = window.setTimeout(() => {
          if (mounted.current) {
            setIsDeleting(false);
            setWordIndex((i) => i + 1);
          }
        }, 200);
      }
    }

    return () => window.clearTimeout(timer);
  }, [display, isDeleting, wordIndex, wordList, typingSpeed, deletingSpeed, pauseTime]);

  return display;
};

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: "Trusted Expertise",
      description: "Years of experience in financial consulting and compliance services",
    },
    {
      icon: Users,
      title: "Client-Focused",
      description: "Personalized solutions tailored to your business needs",
    },
    {
      icon: TrendingUp,
      title: "Growth Oriented",
      description: "Strategic advice to help your business thrive",
    },
    {
      icon: CheckCircle2,
      title: "Comprehensive Services",
      description: "End-to-end solutions for all your financial requirements",
    },
  ];

  const display = useTypewriter(words, 70, 1500, 35);

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO */}
      <section className="relative h-screen flex items-center overflow-hidden">

        {/* Background */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "saturate(0.9) contrast(0.9)",
          }}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-10 backdrop-blur-[2px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,20,50,0.92) 0%, rgba(8,30,80,0.55) 70%)",
          }}
        />

        <div className="container mx-auto px-6 relative z-20 pt-32 md:pt-40 lg:pt-48">
          <div className="max-w-3xl">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="inline-block px-3 py-1 rounded-full bg-white/10 text-sm text-white/80 mb-6">
                <span className="font-medium">RB Financial Consultancy</span>
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
                <span className="block">Your Trusted Partner for</span>
                <span className="mt-2 inline-block text-4xl md:text-5xl lg:text-6xl text-blue-300">
                  {display}
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-6 text-lg md:text-xl text-blue-100 max-w-xl"
              >
                Professional consultancy services for taxation, compliance,
                registrations, and sustainable business growth.
              </motion.p>

              {/* BUTTONS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-8 flex flex-col sm:flex-row gap-4"
              >
                {/* PRIMARY BUTTON — GRADIENT BLUE */}
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-6 py-3 
                             bg-gradient-to-r from-blue-600 to-blue-500
                             text-white font-semibold shadow-xl
                             hover:scale-[1.03] transition"
                >
                  <Link to="/app/services">Explore Services</Link>
                </Button>

                {/* SECONDARY BUTTON — LIGHT BLUE GLASS */}
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full px-6 py-3
                             border-blue-300 text-blue-100
                             bg-blue-600/20 backdrop-blur-sm
                             hover:bg-blue-600/30 hover:text-white
                             transition"
                >
                  <Link to="/app/contact">Book Appointment</Link>
                </Button>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              About RB Financial Consultancy
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We provide taxation, compliance, registrations and advisory services
              ensuring your financial success and peace of mind.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white/10 border border-white/10 
                           rounded-2xl p-6 text-center 
                           backdrop-blur-sm shadow-sm"
              >
                {/* BLUE ICON */}
                <div className="inline-flex items-center justify-center 
                                w-16 h-16 rounded-full 
                                bg-blue-100 text-blue-600 mb-4 shadow-md">
                  <feature.icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    {/* CTA SECTION */}
<section className="relative py-20 bg-gradient-to-r from-blue-800 to-blue-600">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-3xl mx-auto"
    >
      {/* WHITE HEADING */}
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Ready to Get Started?
      </h2>

      {/* SEMI-BOLD SUBTEXT */}
      <p className="text-lg text-blue-100 font-semibold mb-6">
        Let us help you navigate your financial journey with expert guidance.
      </p>

      <Button
        asChild
        size="lg"
        className="rounded-full px-6 py-3 
                   bg-gradient-to-r from-blue-500 to-blue-400
                   text-white font-semibold shadow-xl
                   hover:scale-[1.03] transition"
      >
        <Link to="/app/contact">Schedule a Consultation</Link>
      </Button>
    </motion.div>
  </div>

  {/* SMOOTH RECTANGLE TRANSITION */}
  <div className="absolute bottom-[-1px] left-0 w-full h-16 bg-white rounded-t-3xl shadow-lg"></div>
</section>


    </div>
  );
};

export default Home;
