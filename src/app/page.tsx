import { LandingPage } from '@/components/landing/LandingPage';
import { getVideos } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const videos = await getVideos();
  return <LandingPage videos={videos} />;
}
