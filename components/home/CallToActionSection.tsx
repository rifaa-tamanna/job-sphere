// import { ArrowUpRight, Sparkles } from 'lucide-react';
// import Link from 'next/link';

// const stars = [
//   { top: "18%", left: "8%", size: 3, delay: "0s" },
//   { top: "32%", left: "15%", size: 2, delay: "1.2s" },
//   { top: "64%", left: "5%", size: 2, delay: "0.6s" },
//   { top: "78%", left: "12%", size: 3, delay: "1.8s" },
//   { top: "24%", left: "88%", size: 2, delay: "0.9s" },
//   { top: "46%", left: "93%", size: 3, delay: "2.1s" },
//   { top: "72%", left: "85%", size: 2, delay: "0.3s" },
//   { top: "86%", left: "78%", size: 2, delay: "1.5s" },
//   { top: "90%", left: "46%", size: 3, delay: "1.1s" },
//   { top: "12%", left: "52%", size: 2, delay: "2.4s" },
// ]


// const CallToActionSection = () => {
//     return (
//         <div>
//             <section className="relative isolate overflow-hidden border-y border-[#D6D4CE] bg-[#F1F0EA] dark:border-[#303137] dark:bg-[#121318]">
//         <div
//           aria-hidden
//           className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
//         >
//           <div className="absolute -top-48 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[#A7A39A]/20 blur-[100px] dark:bg-[#7771D9]/20" />
//           <div className="absolute -right-24 -bottom-56 h-[360px] w-[420px] rounded-full bg-[#C8C4B9]/30 blur-[100px] dark:bg-[#5551A8]/15" />
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.65),transparent_58%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.055),transparent_58%)]" />
//           <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#B9B6AC] to-transparent dark:via-[#44464B]" />
//         </div>

//         <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
//           <div className="absolute top-[-140px] left-1/2 h-[380px] w-[780px] -translate-x-1/2 rounded-full bg-[#24252A]/5 blur-3xl dark:bg-white/5" />
//           <div className="absolute bottom-[-220px] left-1/2 h-[420px] w-[960px] -translate-x-1/2 rounded-full bg-[#24252A]/[0.07] blur-3xl dark:bg-white/[0.08]" />

//           {stars.map((star, index) => (
//             <span
//               key={index}
//               className="absolute rounded-full bg-[#24252A]/20 dark:bg-white/30"
//               style={{
//                 top: star.top,
//                 left: star.left,
//                 height: star.size,
//                 width: star.size,
//                 animation: `hero-pulse 3.5s ease-in-out ${star.delay} infinite`,
//               }}
//             />
//           ))}
//         </div>

//         <div className="mx-auto flex max-w-[1440px] flex-col items-center px-5 py-20 text-center sm:px-8 sm:py-24 lg:px-12 lg:py-28">
//           <div className="inline-flex items-center gap-2 rounded-full border border-[#D6D4CE] bg-white/70 px-4 py-2 dark:border-[#44464B] dark:bg-[#1B1C22]/80">
//             <Sparkles
//               size={14}
//               className="text-[#777980] dark:text-[#C7C3B8]"
//             />
//             <span className="font-[family-name:var(--font-space-mono)] text-[11px] font-bold tracking-[0.12em] text-[#686A71] dark:text-[#C1BEB5]">
//               YOUR NEXT CHAPTER STARTS HERE
//             </span>
//           </div>

//           <h2 className="mt-7 max-w-3xl bg-gradient-to-b from-[#24252A] to-[#686A71] bg-clip-text text-[38px] leading-[1.08] font-bold tracking-[-2px] text-balance text-transparent sm:text-[52px] lg:text-[62px] dark:from-[#F1EEE6] dark:to-[#A5A5A2]">
//             Your next opportunity is closer than you think.
//           </h2>

//           <p className="mt-5 max-w-xl text-[14px] leading-7 text-[#777980] sm:text-base dark:text-[#A5A5A2]">
//             Build your profile, discover roles that fit your goals, and take the
//             next step in your career with HireLoop.
//           </p>

//           <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
//             <Link
//               href="/sign-up"
//               className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25262B] px-7 text-sm font-semibold text-[#F2F0E9] transition duration-300 hover:-translate-y-0.5 hover:bg-[#41434A] dark:bg-[#E5E2D9] dark:text-[#202126] dark:hover:bg-white"
//             >
//               Create a free account
//               <ArrowUpRight
//                 size={16}
//                 className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
//               />
//             </Link>
//             <Link
//               href="/jobs"
//               className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#D0CEC6] bg-white/60 px-7 text-sm font-semibold text-[#42434A] transition duration-300 hover:border-[#999A9F] hover:bg-white dark:border-[#44464B] dark:bg-[#1B1C22]/70 dark:text-[#E5E2D9] dark:hover:border-[#777980] dark:hover:bg-[#22232A]"
//             >
//               Explore open roles
//             </Link>
//           </div>

//           <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[11px] text-[#898B91] dark:text-[#777980]">
//             <span className="flex items-center gap-2">
//               <span className="h-1.5 w-1.5 rounded-full bg-[#777980] dark:bg-[#B8B5AC]" />
//               Opportunities for every career stage
//             </span>
//             <span className="hidden h-3 w-px bg-[#D0CEC6] sm:block dark:bg-[#44464B]" />
//             <span>Find work that moves you forward</span>
//           </div>
//         </div>
//       </section>
//         </div>
//     );
// };

// export default CallToActionSection;


import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

const stars = [
  { top: "18%", left: "8%", size: 3, delay: "0s" },
  { top: "32%", left: "15%", size: 2, delay: "1.2s" },
  { top: "64%", left: "5%", size: 2, delay: "0.6s" },
  { top: "78%", left: "12%", size: 3, delay: "1.8s" },
  { top: "24%", left: "88%", size: 2, delay: "0.9s" },
  { top: "46%", left: "93%", size: 3, delay: "2.1s" },
  { top: "72%", left: "85%", size: 2, delay: "0.3s" },
  { top: "86%", left: "78%", size: 2, delay: "1.5s" },
  { top: "90%", left: "46%", size: 3, delay: "1.1s" },
  { top: "12%", left: "52%", size: 2, delay: "2.4s" },
];

const CallToActionSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#F8F7F3] dark:bg-[#0E0F12]">

      {/* Background glow + particles */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-[-140px] h-[380px] w-[780px] -translate-x-1/2 rounded-full bg-[#24252A]/5 blur-3xl dark:bg-white/5" />

        <div className="absolute bottom-[-220px] left-1/2 h-[420px] w-[960px] -translate-x-1/2 rounded-full bg-[#24252A]/[0.07] blur-3xl dark:bg-white/[0.08]" />

        {stars.map((star, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-[#24252A]/20 dark:bg-white/30"
            style={{
              top: star.top,
              left: star.left,
              height: star.size,
              width: star.size,
              animation: `hero-pulse 3.5s ease-in-out ${star.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="mx-auto flex max-w-[1440px] flex-col items-center px-5 py-20 text-center sm:px-8 sm:py-24 lg:px-12 lg:py-28">

        {/* Badge */}
        <div className="flex items-center gap-2.5 rounded-full border border-[#D6D4CE] bg-white px-4 py-2.5 dark:border-[#44464B] dark:bg-[#191A1E]">
          <Sparkles
            size={15}
            strokeWidth={1.7}
            className="text-[#777980] dark:text-[#B8B5AC]"
          />

          <span className="font-[family-name:var(--font-space-mono)] text-[12px] font-bold tracking-wide text-[#24252A] dark:text-[#EAE7DE]">
            YOUR NEXT CHAPTER STARTS HERE
          </span>
        </div>

        {/* Headline */}
        <h2 className="mt-8 max-w-3xl bg-gradient-to-b from-[#24252A] to-[#565860] bg-clip-text text-center text-[38px] font-bold leading-[1.08] tracking-[-2px] text-balance text-transparent sm:text-[52px] lg:text-[62px] dark:from-[#F1EEE6] dark:to-[#A5A5A2]">
          Your next opportunity is closer than you think.
        </h2>

        {/* Subtitle */}
        <p className="mt-6 max-w-xl text-center text-[15px] leading-relaxed text-[#777980] sm:text-base dark:text-[#A5A5A2]">
          Build your profile, discover roles that fit your goals, and take the
          next step in your career with HireLoop.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">

          <Link
            href="/sign-up"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25262B] px-7 text-sm font-semibold text-[#F2F0E9] transition duration-300 hover:-translate-y-0.5 hover:bg-[#41434A] dark:bg-[#E5E2D9] dark:text-[#202126] dark:hover:bg-white"
          >
            Create a free account

            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          <Link
            href="/jobs"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#D6D4CE] bg-white px-7 text-sm font-semibold text-[#42434A] transition duration-300 hover:border-[#999A9F] hover:bg-[#F1F0EA] dark:border-[#44464B] dark:bg-[#191A1E] dark:text-[#E5E2D9] dark:hover:border-[#777980] dark:hover:bg-[#22232A]"
          >
            Explore open roles
          </Link>

        </div>

        {/* Bottom text */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[11px] text-[#898B91] dark:text-[#777980]">

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#777980] dark:bg-[#B8B5AC]" />
            Opportunities for every career stage
          </span>

          <span className="hidden h-3 w-px bg-[#D0CEC6] sm:block dark:bg-[#44464B]" />

          <span>Find work that moves you forward</span>

        </div>

      </div>
    </section>
  );
};

export default CallToActionSection;
