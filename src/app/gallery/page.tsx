"use client";

import DefaultTabs from "../components/tabs-default/tabs";

export default function Gallery() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DefaultTabs data={undefined} />
    </main>
  );
}
