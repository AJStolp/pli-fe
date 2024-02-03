"use client";

import { Suspense } from "react";
import Mapped from "../components/map/map";
import MapSkeleton from "../components/skeleton/map-skeleton";

export default function MapPage() {
  return (
    <>
      <Mapped />
    </>
  );
}
