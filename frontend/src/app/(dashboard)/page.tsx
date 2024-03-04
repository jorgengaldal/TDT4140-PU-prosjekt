'use client';
import ScrollWindow from "@/components/ScrollWindow/ScrollWindow";
import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ScrollWindow filterBy="genres" filterValue="Comedy" />
        <ScrollWindow filterBy="genres" filterValue="Action" />
        <ScrollWindow filterBy="genres" filterValue="Fantasy" />
        <ScrollWindow filterBy="genres" filterValue="Animation" />
    </main>
  );
}
