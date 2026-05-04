import { MediaLibraryPreview } from "@/src/components/media-library-preview";
import { getMediaLibraryData } from "@/src/lib/content-queries";

export default async function MedienPage() {
  const data = await getMediaLibraryData();

  return <MediaLibraryPreview data={data} />;
}
