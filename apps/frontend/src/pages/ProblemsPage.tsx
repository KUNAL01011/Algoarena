import Header from "@/components/Header";
import ProblemCard from "@/components/ProblemCard";
import FilterBar from "@/components/FilterBar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useProblems } from "@/hooks/useProblems";
import { useCurrentUser } from "@/hooks/useAuth";
import { useMemo } from "react";
import LoadingAnimation from "@/components/LoadingAnimation";

const ProblemsPage = () => {
  const [searchParams] = useSearchParams();
  const {
    data: problemsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isProblemsLoading,
  } = useProblems();
  const authUser = useCurrentUser();

  // Get problems array from the response
  const allProblems = useMemo(() => {
    return problemsData?.problems || [];
  }, [problemsData]);

  // Apply client-side filtering
  const filteredProblems = useMemo(() => {
    const query: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) {
      query[key] = value;
    }

    let filtered = [...allProblems];

    if (query.search) {
      const s = query.search.toLowerCase();
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(s));
    }

    if (query.difficulty) {
      filtered = filtered.filter(
        (p) => p.difficulty.toLowerCase() === query.difficulty.toLowerCase()
      );
    }

    if (query.tags) {
      const tagList = query.tags.split(",").map((t) => t.trim().toLowerCase());
      filtered = filtered.filter((p) =>
        tagList.every((tag) => p.tags.map((t) => t.toLowerCase()).includes(tag))
      );
    }

    if (query.filter && authUser) {
      const filterList = query.filter
        .split(",")
        .map((f) => f.trim().toLowerCase());

      filtered = filtered.filter((p) => {
        const isSolved = p.solvedBy?.includes(authUser?.id);

        if (filterList.includes("solved") && isSolved) return true;
        if (filterList.includes("unsolved") && !isSolved) return true;
        return false;
      });
    }

    if (query.companyTag) {
      const companyList = query.companyTag
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      filtered = filtered.filter((p) =>
        companyList.every((company) =>
          p.tags.map((tag) => tag.toLowerCase()).includes(company)
        )
      );
    }

    return filtered;
  }, [allProblems, searchParams, authUser]);

  const handleLoadMore = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  if (isProblemsLoading) {
    return (
      <div className="min-h-screen bg-craft-bg flex items-center justify-center">
        <LoadingAnimation size="4xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-craft-text-primary mb-2">
              Problems
            </h1>
            <p className="text-craft-text-secondary">
              Sharpen your coding skills with our curated problems
            </p>
          </div>
          <Link to="/problems/create">
            <Button className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg">
              <Plus className="w-4 h-4 mr-2" />
              Create Problem
            </Button>
          </Link>
        </div>

        {/* Filter Bar */}
        <FilterBar />

        {/* Problems List */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-craft-text-primary">
              All Problems
            </h2>
            <div className="flex items-center space-x-2 text-sm text-craft-text-secondary">
              <span>
                {searchParams.size > 0
                  ? `${filteredProblems.length} filtered problems`
                  : `${problemsData?.pagination?.message} problems`}
              </span>
            </div>
          </div>

          <div className="grid gap-4">
            {(searchParams.size > 0 ? filteredProblems : allProblems).map(
              (problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              )
            )}

            {filteredProblems.length === 0 && searchParams.size > 0 && (
              <div className="text-center py-8 text-craft-text-secondary">
                No problems found matching your filters.
              </div>
            )}
          </div>
        </div>

        {/* Load More */}
        {hasNextPage && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent transition-all duration-200"
              onClick={handleLoadMore}
              disabled={isProblemsLoading}
            >
              {isProblemsLoading ? "Loading..." : "Load More Problems"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemsPage;
