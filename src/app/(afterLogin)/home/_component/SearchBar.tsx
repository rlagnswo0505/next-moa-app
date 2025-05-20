import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react';

const SearchBar = () => {
  return (
    <div>
      <form className="w-full relative">
        <div className="bg-[#f9f9f9] flex items-center justify-start rounded-full">
          <Search className="text-muted-foreground/50 absolute top-2 left-2 transform" />
          <Input className="rounded-full pl-10 border-[#f2f2f2]" name="q" placeholder="매장, 음식 검색" />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
