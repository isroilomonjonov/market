import CardContainer from "@/components/card-container";
import Hero from "@/components/hero";
import { ToggleLanguage } from "@/components/toggle-language";
import { useTranslations } from 'next-intl';
export default function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('Index');
  const tHero = useTranslations('Hero');
  const heroText = {
    title: tHero('title'),
    description: tHero('description')
  }
  return (
    <div className="">
      <Hero heroText={heroText} />
      <CardContainer />
    </div>
  );
}
