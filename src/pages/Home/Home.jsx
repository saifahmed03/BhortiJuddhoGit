// src/pages/Home/Home.jsx
import React from "react";
import { motion } from "framer-motion";
import Layout from "../../components/Layout";

const Home = () => {
  return (
    <Layout>

      {/* HERO SECTION */}
      <section className="pt-32 pb-28 bg-gradient-to-br from-[#1A1A24] via-[#13131A] to-[#0E0E14] text-white text-center px-6">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent 
                     bg-gradient-to-r from-[#FF4FD2] via-[#4F9CFF] to-[#C5FF66]"
        >
          Welcome to Bhortijuddho
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
        >
          Your next-gen smart admission companion — faster, smoother, and fully student-focused.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex justify-center gap-4 flex-wrap"
        >
          <a
            href="/auth/register"
            className="px-8 py-3 rounded-lg text-lg font-semibold 
                       bg-gradient-to-r from-[#FF4FD2] via-[#4F9CFF] to-[#C5FF66]
                       text-black shadow-xl hover:opacity-90 transition"
          >
            Get Started
          </a>

          <a
            href="/auth/login"
            className="px-8 py-3 rounded-lg text-lg font-semibold border border-gray-500
                       text-gray-300 hover:bg-gray-800 transition"
          >
            Already a user?
          </a>
        </motion.div>

      </section>

      {/* FEATURES / CARDS SECTION */}
      <section className="py-24 px-6 bg-[#16161C] text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">What We Offer</h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="p-8 rounded-xl bg-[#1E1E25] border border-white/10 shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3 text-white">Smart Dashboard</h3>
            <p className="text-gray-400">
              Track applications, deadlines, and academic progress seamlessly.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-xl bg-[#1E1E25] border border-white/10 shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3 text-white">Admin Tools</h3>
            <p className="text-gray-400">
              A powerful admin panel built for efficiency and clarity.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-xl bg-[#1E1E25] border border-white/10 shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-3 text-white">Student-Friendly</h3>
            <p className="text-gray-400">
              Designed with simplicity, speed, and accessibility in mind.
            </p>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Home;

