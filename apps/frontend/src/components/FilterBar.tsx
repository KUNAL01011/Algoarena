import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { availableTags } from "@/constants/tags";

const FilterBar = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [filter, setFilter] = useState("");

  // Load filters from URL on first render
  useEffect(() => {
    const tagsParam = searchParams.get("tags");
    const searchParam = searchParams.get("search");
    const diffParam = searchParams.get("difficulty");
    const filterParam = searchParams.get("filter");

    if (tagsParam) setSelectedTags(tagsParam.split(","));
    if (searchParam) setSearch(searchParam);
    if (diffParam) setDifficulty(diffParam);
    if (filterParam) setFilter(filterParam);
  }, []);

  const updateQuery = (params: {
    tags?: string[];
    search?: string;
    difficulty?: string;
    filter?: string;
  }) => {
    const current = new URLSearchParams(window.location.search);

    if (params.tags) {
      if (params.tags.length > 0) current.set("tags", params.tags.join(","));
      else current.delete("tags");
    }

    if (params.search !== undefined) {
      params.search
        ? current.set("search", params.search)
        : current.delete("search");
    }

    if (params.difficulty !== undefined) {
      params.difficulty
        ? current.set("difficulty", params.difficulty)
        : current.delete("difficulty");
    }

    if (params.filter !== undefined) {
      params.filter
        ? current.set("filter", params.filter)
        : current.delete("filter");
    }

    navigate(`?${current.toString()}`);
  };

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    updateQuery({ tags: newTags });
  };

  return (
    <div className="bg-craft-panel border border-craft-border rounded-lg p-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-craft-text-secondary w-4 h-4" />
          <Input
            placeholder="Search problems..."
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              updateQuery({ search: value });
            }}
            className="pl-10 bg-craft-bg border-craft-border text-craft-text-primary placeholder-craft-text-secondary focus:border-craft-accent focus:ring-craft-accent/20"
          />
        </div>

        <div className="flex gap-2">
          <Select
            value={difficulty}
            onValueChange={(value) => {
              setDifficulty(value);
              updateQuery({ difficulty: value });
            }}
          >
            <SelectTrigger className="w-32 bg-craft-bg border-craft-border text-craft-text-primary">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent className="bg-craft-bg border-craft-border text-craft-text-primary">
              <SelectItem value="easy" className="border-craft-border bg-inherit">Easy</SelectItem>
              <SelectItem value="medium" className="border-craft-border">Medium</SelectItem>
              <SelectItem value="hard" className="border-craft-border">Hard</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filter}
            onValueChange={(value) => {
              setFilter(value);
              updateQuery({ filter: value });
            }}
          >
            <SelectTrigger className="w-32 bg-craft-bg border-craft-border text-craft-text-primary">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="border-craft-border bg-craft-bg text-craft-text-primary">
              <SelectItem value="solved">Solved</SelectItem>
              <SelectItem value="unsolved">Unsolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-craft-text-secondary text-sm font-medium">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 ${
                selectedTags.includes(tag)
                  ? "bg-craft-accent text-craft-bg hover:bg-craft-accent/80"
                  : "border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
