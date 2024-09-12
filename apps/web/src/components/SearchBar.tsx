import { Input } from "@repo/ui/components/ui/input";
import { Search } from "lucide-react";

type SearchBarProps = {
  onChange: (value: string) => void;
};

const SearchBar = ({ onChange }: SearchBarProps) => {
  return (
    <div className="relative flex-1 w-full">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search by sender, or token address"
        className="rounded-lg bg-background pl-8 md:w-[300px] lg:w-[420px]"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
