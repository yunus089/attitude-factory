import { WarRoomDetail } from "@/src/components/war-room-detail";
import { getKommandozentraleData } from "@/src/lib/kommandozentrale-queries";

export const metadata = {
  title: "30-Tage-Kommando – Attitude Factory Operator OS"
};

export default async function Page() {
  const data = await getKommandozentraleData();
  
  return <WarRoomDetail warRoom={data.warRoom} progress={data.warRoom.progress} />;
}
