import { Converter } from "@/components/modules";
import { getRates } from "../api/serverRequests/getRates";

export default async function Home() {
  const ratesData = await getRates();

  return <Converter ratesData={ratesData.rates} />;
}
