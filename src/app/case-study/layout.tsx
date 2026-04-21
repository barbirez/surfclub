import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./case-study.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "WavyClub — A case study by Barbara Rezende",
  description:
    "Experiments in building with AI — №01. A two-day experiment in shipping a real product with AI in the loop, from framing to shipping.",
  openGraph: {
    title: "WavyClub — Experiments in building with AI — №01",
    description:
      "A two-day experiment in shipping a real product with AI in the loop, from framing to shipping.",
    type: "article",
  },
};

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${instrumentSerif.variable} cs-root`}>
      {children}
    </div>
  );
}
