import CardContainer from "@/components/card-container";
import Hero from "@/components/hero";
import { useTranslations } from 'next-intl';
export default function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('Index');
  const tHero = useTranslations('Hero');
  const heroText = {
    title: tHero('title'),
    description: tHero('description')
  }
  const tNavbar = useTranslations('Navbar')
  const tProducts = useTranslations('Products')
  const tPagination = useTranslations('Pagination')
  const productText = {
    Products: tNavbar('Products'),
    Search: tProducts('Search'),
    Categories: tProducts('Categories'),
    All: tProducts('All'),
    NoProducts: tProducts('NoProducts'),
    Next: tPagination('Next'),
    Previous: tPagination('Previous'),
  }
  return (
    <div className="">
      <Hero heroText={heroText} />
      <CardContainer productText={productText} />

      {/* <CardContainer productText={productText||""}/> */}
    </div>
  );
}