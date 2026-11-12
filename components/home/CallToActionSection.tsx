// import { ArrowUpRight, Sparkles } from "lucide-react";
// import Link from "next/link";

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
// ];

// const CallToActionSection = () => {
//   return (
//     <section className="relative isolate overflow-hidden bg-[#F8F7F3] dark:bg-[#0E0F12]">

//       {/* Background glow + particles */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0 -z-10"
//       >
//         <div className="absolute left-1/2 top-[-140px] h-[380px] w-[780px] -translate-x-1/2 rounded-full bg-[#24252A]/5 blur-3xl dark:bg-white/5" />

//         <div className="absolute bottom-[-220px] left-1/2 h-[420px] w-[960px] -translate-x-1/2 rounded-full bg-[#24252A]/[0.07] blur-3xl dark:bg-white/[0.08]" />

//         {stars.map((star, index) => (
//           <span
//             key={index}
//             className="absolute rounded-full bg-[#24252A]/20 dark:bg-white/30"
//             style={{
//               top: star.top,
//               left: star.left,
//               height: star.size,
//               width: star.size,
//               animation: `hero-pulse 3.5s ease-in-out ${star.delay} infinite`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Content */}
//       <div className="mx-auto flex max-w-[1440px] flex-col items-center px-5 py-20 text-center sm:px-8 sm:py-24 lg:px-12 lg:py-28">

//         {/* Badge */}
//         <div className="flex items-center gap-2.5 rounded-full border border-[#D6D4CE] bg-white px-4 py-2.5 dark:border-[#44464B] dark:bg-[#191A1E]">
//           <Sparkles
//             size={15}
//             strokeWidth={1.7}
//             className="text-[#777980] dark:text-[#B8B5AC]"
//           />

//           <span className="font-[family-name:var(--font-space-mono)] text-[12px] font-bold tracking-wide text-[#24252A] dark:text-[#EAE7DE]">
//             YOUR NEXT CHAPTER STARTS HERE
//           </span>
//         </div>

//         {/* Headline */}
//         <h2 className="mt-8 max-w-3xl bg-gradient-to-b from-[#24252A] to-[#565860] bg-clip-text text-center text-[38px] font-bold leading-[1.08] tracking-[-2px] text-balance text-transparent sm:text-[52px] lg:text-[62px] dark:from-[#F1EEE6] dark:to-[#A5A5A2]">
//           Your next opportunity is closer than you think.
//         </h2>

//         {/* Subtitle */}
//         <p className="mt-6 max-w-xl text-center text-[15px] leading-relaxed text-[#777980] sm:text-base dark:text-[#A5A5A2]">
//           Build your profile, discover roles that fit your goals, and take the
//           next step in your career with HireLoop.
//         </p>

//         {/* Buttons */}
//         <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">

//           <Link
//             href="/sign-up"
//             className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25262B] px-7 text-sm font-semibold text-[#F2F0E9] transition duration-300 hover:-translate-y-0.5 hover:bg-[#41434A] dark:bg-[#E5E2D9] dark:text-[#202126] dark:hover:bg-white"
//           >
//             Create a free account

//             <ArrowUpRight
//               size={16}
//               className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
//             />
//           </Link>

//           <Link
//             href="/jobs"
//             className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#D6D4CE] bg-white px-7 text-sm font-semibold text-[#42434A] transition duration-300 hover:border-[#999A9F] hover:bg-[#F1F0EA] dark:border-[#44464B] dark:bg-[#191A1E] dark:text-[#E5E2D9] dark:hover:border-[#777980] dark:hover:bg-[#22232A]"
//           >
//             Explore open roles
//           </Link>

//         </div>

//         {/* Bottom text */}
//         <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[11px] text-[#898B91] dark:text-[#777980]">

//           <span className="flex items-center gap-2">
//             <span className="h-1.5 w-1.5 rounded-full bg-[#777980] dark:bg-[#B8B5AC]" />
//             Opportunities for every career stage
//           </span>

//           <span className="hidden h-3 w-px bg-[#D0CEC6] sm:block dark:bg-[#44464B]" />

//           <span>Find work that moves you forward</span>

//         </div>

//       </div>
//     </section>
//   );
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
  { top: "52%", left: "24%", size: 2, delay: "0.8s" },
  { top: "16%", left: "72%", size: 3, delay: "1.6s" },
];

const CallToActionSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#0E0F12] transition-colors duration-500 dark:bg-white">

      {/* Background glow + particles */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* Top glow */}
        <div className="absolute left-1/2 top-[-150px] h-[380px] w-[780px] -translate-x-1/2 rounded-full bg-white/[0.06] blur-3xl dark:bg-[#D6D4CE]/40" />

        {/* Bottom glow */}
        <div className="absolute bottom-[-220px] left-1/2 h-[420px] w-[960px] -translate-x-1/2 rounded-full bg-white/[0.07] blur-3xl dark:bg-[#EAE8E1]/70" />

        {/* Center glow */}
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#777980]/[0.08] blur-[100px] dark:bg-[#D6D4CE]/50" />

        {/* Animated stars */}
        {stars.map((star, index) => (
          <span
            key={index}
            className={`absolute rounded-full ${
              index % 3 === 0
                ? "bg-white/50 dark:bg-[#777980]/50"
                : index % 3 === 1
                  ? "bg-[#D6D4CE]/60 dark:bg-[#C5BDAA]"
                  : "bg-[#A5A5A2]/60 dark:bg-[#A5A29A]"
            }`}
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
        <div className="flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.07] px-4 py-2.5 shadow-sm dark:border-[#D6D4CE] dark:bg-[#F8F7F3]">
          <Sparkles
            size={15}
            strokeWidth={1.7}
            className="text-[#B8B5AC] dark:text-[#777980]"
          />

          <span className="font-[family-name:var(--font-space-mono)] text-[12px] font-bold tracking-wide text-[#EAE7DE] dark:text-[#42434A]">
            YOUR NEXT CHAPTER STARTS HERE
          </span>
        </div>

        {/* Headline */}
        <h2 className="mt-8 max-w-3xl bg-gradient-to-b from-[#F1EEE6] via-[#D6D4CE] to-[#A5A5A2] bg-clip-text text-center text-[38px] leading-[1.08] font-bold tracking-[-2px] text-transparent text-balance sm:text-[52px] lg:text-[62px] dark:from-[#24252A] dark:via-[#41434A] dark:to-[#777980]">
          Your next opportunity is closer than you think.
        </h2>

        {/* Subtitle */}
        <p className="mt-6 max-w-xl text-center text-[15px] leading-relaxed text-[#A5A5A2] sm:text-base dark:text-[#777980]">
          Build your profile, discover roles that fit your goals, and take the
          next step in your career with HireLoop.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">

          <Link
            href="/sign-up"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#E5E2D9] px-7 text-sm font-semibold text-[#202126] shadow-md shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg dark:bg-[#25262B] dark:text-[#F2F0E9] dark:hover:bg-[#41434A]"
          >
            Create a free account

            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          <Link
            href="/jobs"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-white/[0.06] px-7 text-sm font-semibold text-[#E5E2D9] transition duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 dark:border-[#D6D4CE] dark:bg-[#F8F7F3] dark:text-[#42434A] dark:hover:border-[#999A9F] dark:hover:bg-[#F1F0EA]"
          >
            Explore open roles
          </Link>

        </div>

        {/* Bottom text */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[11px] text-[#898B91] dark:text-[#777980]">

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B8B5AC] dark:bg-[#777980]" />
            Opportunities for every career stage
          </span>

          <span className="hidden h-3 w-px bg-white/20 sm:block dark:bg-[#D0CEC6]" />

          <span>Find work that moves you forward</span>

        </div>

      </div>
    </section>
  );
};

export default CallToActionSection;
