"use client";

import useSWR from "swr";

// API Endpoint
const url = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en";

// TypeScript Interface for the Fact
interface Fact {
  id: string;
  text: string;
  source: string;
  source_url: string;
  language: string;
  permalink: string;
}

// Fetcher Function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR<Fact>(url, fetcher);

  if (error) return <div>⚠️ Failed to load fact. Please try again!</div>;

  if (isLoading)
    return (
      <div
        style={{
          height: "100vh", // Full viewport height
          display: "flex",
          justifyContent: "center", // Center vertically
          alignItems: "center", // Center horizontally
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        ⏳ Loading...
      </div>
    );

  const factText = data?.text; 
  const factSource = data?.source_url; 

  return (
    <div
      style={{
        height: "100vh", // Full viewport height
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
        textAlign: "center", // Text align center
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <h1 className="font-black text-3xl">Random Useless Fact 🤓</h1>
      <p style={{ fontSize: "18px", color: "#333" }}>{factText}</p>
      <p>
        <a
          href={factSource}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Source 🔗
        </a>
      </p>
    </div>
  );
}
