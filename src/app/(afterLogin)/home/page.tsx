import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react';

const page = () => {
  return (
    <div>
      <section>
        <form className="fixed w-[inherit]">
          <div className="bg-muted-foreground/10 flex items-center justify-start rounded-full">
            <Search className="text-muted-foreground absolute top-2 left-2 transform" />
            <Input className="rounded-full pl-10" name="q" />
          </div>
        </form>
      </section>
      <section></section>
      <section></section>
      <section></section>
    </div>
  );
};

export default page;
