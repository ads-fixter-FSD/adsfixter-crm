// "use client";

// import { useMemo, useState } from "react";
// import PortfoliosHeader from "./components/PortfoliosHeader";
// import PlatformSelector from "./components/PlatformSelector";
// import BusinessManagersList from "./components/BusinessManagersList";
// import { getBusinessManagersByPlatform, type PlatformId } from "./portfolios-data";

// export default function PortfoliosPage() {
//   const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>("meta");

//   const managers = useMemo(
//     () => getBusinessManagersByPlatform(selectedPlatform),
//     [selectedPlatform],
//   );

//   return (
//     <div className="flex w-full flex-col gap-5 pb-10">
//       <PortfoliosHeader />
//       <PlatformSelector selectedPlatform={selectedPlatform} onSelect={setSelectedPlatform} />
//       <BusinessManagersList platform={selectedPlatform} managers={managers} />
//     </div>
//   );
// }


import BusinessPortfoliosPage from "@/components/dashboard/portfolios/BusinessPortfoliosPage";
import BusinessPortfoliosSkeleton from "@/components/dashboard/portfolios/BusinessPortfoliosSkeleton";
import { Suspense } from "react";


export default function Page() {
  return (
    <div className=" py-6">
      <Suspense fallback={<BusinessPortfoliosSkeleton />}>
        <BusinessPortfoliosPage />
      </Suspense>
    </div>
  );
}