import { PromoBanner } from '@/components/PromoBanner';
import { NavHeader } from '@/components/NavHeader';
import { PageHeader } from '@/components/PageHeader';
import { CategoryChips } from '@/components/CategoryChips';
import { ProductList } from '@/components/ProductList';

export default function Page() {
  return (
    <main style={{ backgroundColor: 'rgb(255, 255, 255)', minHeight: '100vh' }}>
      <PromoBanner />
      <NavHeader />
      <PageHeader />
      <CategoryChips />
      <ProductList />
    </main>
  );
}
