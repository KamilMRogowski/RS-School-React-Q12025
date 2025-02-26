import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    void router.push('/page/1');
  }, [router]);
  return;
};

export default Index;
