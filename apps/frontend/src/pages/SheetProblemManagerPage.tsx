import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  CheckCircle,
} from "lucide-react";
import {
  useSheet,
  useAddProblemsToSheet,
  useRemoveProblemsFromSheet,
} from "@/hooks/useSheets";
import { useSolvedProblems, useProblems } from "@/hooks/useProblems";
import { Problem } from "@/api/problems";
import { toast } from "sonner";
import TagsList from "@/components/TagsList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { userInfo } from "os";

// Helper function for difficulty colors
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty?.toUpperCase()) {
    case "EASY":
      return "bg-craft-success/20 text-craft-success border-craft-success/30";
    case "MEDIUM":
      return "bg-craft-accent-secondary/20 text-craft-accent-secondary border-craft-accent-secondary/30";
    case "HARD":
      return "bg-craft-error/20 text-craft-error border-craft-error/30";
    default:
      return "bg-craft-text-secondary/20 text-craft-text-secondary border-craft-text-secondary/30";
  }
};

// SheetProblemCard component
interface SheetProblemCardProps {
  problem: Problem;
  isSolved: boolean;
  onProblemClick: () => void;
  onRemove: () => void;
}

const SheetProblemCard = ({
  problem,
  isSolved,
  onProblemClick,
  onRemove,
}: SheetProblemCardProps) => {
  return (
    <Card className="bg-craft-panel border-craft-border hover:border-craft-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-craft-accent/10 group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1">
            {isSolved && (
              <CheckCircle className="w-5 h-5 text-craft-success flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <h3
                className="text-craft-text-primary font-semibold group-hover:text-craft-accent transition-colors cursor-pointer truncate"
                onClick={onProblemClick}
              >
                {problem.title}
              </h3>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-craft-text-secondary hover:text-craft-text-primary"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-craft-panel border-craft-border"
            >
              <DropdownMenuItem
                onClick={onProblemClick}
                className="text-craft-text-primary hover:bg-craft-accent/10 hover:text-craft-accent cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4" />
                Solve Problem
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onRemove}
                className="text-craft-error hover:bg-craft-error/10 hover:text-craft-error cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove from Sheet
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between mb-4">
          <Badge className={getDifficultyColor(problem.difficulty)}>
            {problem.difficulty}
          </Badge>
          {isSolved && (
            <Badge className="bg-craft-success/20 text-craft-success border-craft-success/30">
              Solved
            </Badge>
          )}
        </div>

        {problem.description && (
          <p className="text-craft-text-secondary text-sm mb-4 line-clamp-2">
            {problem.description}
          </p>
        )}

        <TagsList
          tags={problem.tags}
          maxVisible={3}
          className="mb-4"
          tagClassName="text-craft-text-secondary border-craft-border"
        />

        <div className="flex items-center justify-between text-sm">
          <span className="text-craft-text-secondary">
            Created: {new Date(problem.createdAt).toLocaleDateString()}
          </span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-craft-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="text-craft-text-secondary group-hover:text-craft-accent transition-colors">
              {isSolved ? "Solved" : "Solve"}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

const SheetProblemManagerPage = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { sheetId: id } = useParams<{ sheetId: string }>();
  const navigate = useNavigate();

  // Fetch sheet data and related data using React Query
  const { data: sheetData, isLoading, error: sheetError } = useSheet(id || "");
  const { data: solvedProblemsData = [] } = useSolvedProblems();
  const { data: allProblemsData } = useProblems(1);

  // Mutations
  const addProblemsMutation = useAddProblemsToSheet();
  const removeProblemsMutation = useRemoveProblemsFromSheet();

  // Local state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState<Problem | null>(null);
  const [addProblemsDialogOpen, setAddProblemsDialogOpen] = useState(false);
  const [selectedProblemsToAdd, setSelectedProblemsToAdd] = useState<string[]>(
    []
  );


  // Transform data
  const problems = useMemo(() => {
    return sheetData?.problems?.map((p) => p.problem) || [];
  }, [sheetData?.problems]);

  const sheetName = sheetData?.name || "Loading...";

  // Get solved problem IDs for current user
  const solvedProblemIds = useMemo(() => {
    return solvedProblemsData.map((solved) => solved.problemId);
  }, [solvedProblemsData]);

  // Calculate progress
  const solvedCount = problems.filter((problem) =>
    solvedProblemIds.includes(problem.id)
  ).length;
  const totalCount = problems.length;
  const progressPercentage =
    totalCount > 0 ? (solvedCount / totalCount) * 100 : 0;

  // Available problems to add (exclude already added ones)
  const availableProblems = useMemo(() => {
    const currentProblemIds = problems.map((p) => p.id);
    return (
      allProblemsData?.problems?.filter(
        (p) => !currentProblemIds.includes(p.id)
      ) || []
    );
  }, [allProblemsData?.problems, problems]);

  // Handlers
  const handleAddProblems = async () => {
    if (selectedProblemsToAdd.length === 0) {
      toast.error("Please select at least one problem to add");
      return;
    }

    try {
      await addProblemsMutation.mutateAsync({
        sheetId: id!,
        problemIds: { problemIds: selectedProblemsToAdd },
      });
      setSelectedProblemsToAdd([]);
      setAddProblemsDialogOpen(false);
      toast.success("Problems added successfully!");
    } catch (error) {
      console.error("Error adding problems:", error);
    }
  };

  const handleRemoveProblem = async (problemId: string) => {
    try {
      await removeProblemsMutation.mutateAsync({
        sheetId: id!,
        problemIds: { problemIds: [problemId] },
      });
      setDeleteDialogOpen(false);
      setProblemToDelete(null);
      toast.success("Problem removed successfully!");
    } catch (error) {
      console.error("Error removing problem:", error);
    }
  };

  const confirmDelete = () => {
    if (problemToDelete) {
      handleRemoveProblem(problemToDelete.id);
    }
  };

  const handleProblemClick = (problemId: string) => {
    navigate(`/problem/${problemId}`);
  };

  // Handle error states
  if (sheetError) {
    return (
      <div className="min-h-screen bg-craft-bg">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <Card className="bg-craft-panel border-craft-border">
            <div className="p-12 text-center">
              <p className="text-craft-error mb-4">Failed to load sheet data</p>
              <p className="text-craft-text-secondary">
                Please try refreshing the page
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-craft-bg">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <Card className="bg-craft-panel border-craft-border">
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-craft-accent" />
              <p className="text-craft-text-secondary">Loading sheet data...</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />

      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-craft-text-primary mb-2">
              {sheetName}
            </h1>
            <p className="text-craft-text-secondary">
              Manage and track problems in this sheet
            </p>
          </div>
          {sheetData?.userId === userInfo.id && (
            <Button
              onClick={() => setAddProblemsDialogOpen(true)}
              className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Problems
            </Button>
          )}
        </div>

        {/* Progress Section */}
        <Card className="bg-craft-panel border-craft-border mb-8">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-craft-text-primary font-semibold">
                Progress
              </h3>
              <span className="text-craft-text-secondary text-sm">
                {solvedCount} of {totalCount} completed (
                {Math.round(progressPercentage)}%)
              </span>
            </div>
            <Progress value={progressPercentage} className="w-full h-3" />
          </div>
        </Card>

        {/* Problems List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {problems.length === 0 ? (
            <Card className="bg-craft-panel border-craft-border col-span-full">
              <div className="p-12 text-center">
                <p className="text-craft-text-secondary mb-4">
                  No problems in this sheet yet
                </p>
                {sheetData?.userId === userInfo.id && (
                  <Button
                    onClick={() => setAddProblemsDialogOpen(true)}
                    variant="outline"
                    className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Problem
                  </Button>
                )}
              </div>
            </Card>
          ) : (
            problems.map((problem) => (
              <SheetProblemCard
                key={problem.id}
                problem={problem}
                isSolved={solvedProblemIds.includes(problem.id)}
                onProblemClick={() => handleProblemClick(problem.id)}
                onRemove={() => {
                  setProblemToDelete(problem);
                  setDeleteDialogOpen(true);
                }}
              />
            ))
          )}
        </div>
      </div>

      {/* Add Problems Dialog */}
      <Dialog
        open={addProblemsDialogOpen}
        onOpenChange={setAddProblemsDialogOpen}
      >
        <DialogContent className="bg-craft-panel border-craft-border max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-craft-text-primary">
              Add Problems to Sheet
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 max-h-96 overflow-y-auto">
              {availableProblems.map((problem) => (
                <div
                  key={problem.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedProblemsToAdd.includes(problem.id)
                      ? "border-craft-accent bg-craft-accent/10"
                      : "border-craft-border hover:border-craft-accent/50"
                  }`}
                  onClick={() => {
                    setSelectedProblemsToAdd((prev) =>
                      prev.includes(problem.id)
                        ? prev.filter((id) => id !== problem.id)
                        : [...prev, problem.id]
                    );
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-craft-text-primary font-medium">
                        {problem.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          className={getDifficultyColor(problem.difficulty)}
                        >
                          {problem.difficulty}
                        </Badge>
                        <TagsList tags={problem.tags} maxVisible={3} />
                      </div>
                    </div>
                    <div className="flex items-center">
                      {selectedProblemsToAdd.includes(problem.id) && (
                        <CheckCircle className="w-5 h-5 text-craft-accent" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-craft-border">
              <Button
                variant="outline"
                onClick={() => {
                  setAddProblemsDialogOpen(false);
                  setSelectedProblemsToAdd([]);
                }}
                className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddProblems}
                disabled={
                  selectedProblemsToAdd.length === 0 ||
                  addProblemsMutation.isPending
                }
                className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
              >
                {addProblemsMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  `Add ${selectedProblemsToAdd.length} Problem${
                    selectedProblemsToAdd.length !== 1 ? "s" : ""
                  }`
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-craft-panel border-craft-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-craft-text-primary">
              Remove Problem
            </AlertDialogTitle>
            <AlertDialogDescription className="text-craft-text-secondary">
              Are you sure you want to remove "{problemToDelete?.title}" from
              this sheet? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-craft-error hover:bg-craft-error/80 text-white"
              disabled={removeProblemsMutation.isPending}
            >
              {removeProblemsMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Removing...
                </>
              ) : (
                "Remove"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SheetProblemManagerPage;
