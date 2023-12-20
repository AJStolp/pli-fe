"use client";

import { Suspense } from "react";
import Mapped from "../components/map";
import MapSkeleton from "../components/skeleton/map-skeleton";

export default function MapPage() {
  return (
    //     <Suspense fallback={<MapSkeleton />}>
    <Mapped />
    //     </Suspense>
  );
}
