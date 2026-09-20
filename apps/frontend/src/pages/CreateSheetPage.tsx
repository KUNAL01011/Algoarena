import { useEffect, useState } from "react";
import { z } from "zod";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import MarkdownEditor from "@/components/MarkdownEditor";
import { Send } from "lucide-react";
import { availableTags } from "@/constants/tags";
import { useSheet, useCreateSheet, useUpdateSheet } from "@/hooks/useSheets";
import { FormData } from "@/api/sheets";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProblems } from "@/hooks/useProblems";

const problemSchema = z.object({
  name: z.string().min(1, "Name is required").max(200, "Name too long"),
  description: z.string().min(1, "Description is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  visibility: z.enum(["Public", "Private"]),
});

const CreateSheetPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sheetId = searchParams.get("edit");

  // React Query hooks
  const { data: currentSheet } = useSheet(sheetId || "");
  const createSheetMutation = useCreateSheet();
  const updateSheetMutation = useUpdateSheet();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    tags: [],
    visibility: "Private",
  });

  const { data } = useProblems();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Set formData if currentSheet is fetched
  useEffect(() => {
    if (sheetId && currentSheet) {
      setFormData({
        name: currentSheet.name ?? "",
        description: currentSheet.description ?? "",
        tags: currentSheet.tags ?? [],
        visibility:
          (currentSheet.visibility as "Public" | "Private") ?? "Private",
      });
      setSelectedTags(currentSheet.tags ?? []);
    }
  }, [currentSheet, sheetId]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleProblemToggle = (problemId: string) => {
    setSelectedProblems((prev) =>
      prev.includes(problemId)
        ? prev.filter((id) => id !== problemId)
        : [...prev, problemId]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "hard":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-craft-bg text-craft-text-secondary border-craft-border";
    }
  };

  const validateForm = (): boolean => {
    try {
      const dataToValidate = {
        ...formData,
        tags: selectedTags,
      };
      problemSchema.parse(dataToValidate);
      setValidationErrors([]);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(
          error.errors.map((err) => `${err.path.join(".")}: ${err.message}`)
        );
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    const finalData = {
      ...formData,
      tags: selectedTags,
      problemIds: selectedProblems.length > 0 ? selectedProblems : undefined,
    };

    if (!validateForm()) return;
    try {
      if (sheetId) {
        await updateSheetMutation.mutateAsync({ sheetId, formData: finalData });
      } else {
        await createSheetMutation.mutateAsync(finalData);
      }
      navigate("/sheets");
    } catch (error) {
      // Error handling is done in the mutation hooks
      console.error("Submit error:", error);
    }
  };

  const isFormValid =
    formData?.name?.trim() &&
    formData?.description?.trim() &&
    selectedTags?.length > 0;

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-craft-text-primary mb-2">
            {sheetId ? "Edit Sheet" : "Create Sheet"}
          </h1>
          <p className="text-craft-text-secondary">
            {sheetId
              ? "Update your existing Sheet"
              : "Design a new Sheet for the community"}
          </p>
        </div>

        {validationErrors.length > 0 && (
          <Card className="bg-craft-error/10 border-craft-error/30 p-4 mb-6">
            <h3 className="text-craft-error font-semibold mb-2">
              Validation Errors:
            </h3>
            <ul className="text-craft-error text-sm space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="bg-craft-panel border-craft-border p-6">
              <h2 className="text-xl font-semibold text-craft-text-primary mb-4">
                Basic Information
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-craft-text-primary">
                    Sheet Name *
                  </Label>
                  <Input
                    id="title"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Enter sheet name..."
                    className="bg-craft-bg border-craft-border text-craft-text-primary placeholder:text-craft-text-secondary focus:border-craft-accent"
                  />
                </div>

                <MarkdownEditor
                  label="Problem Description *"
                  value={formData.description}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: value,
                    }))
                  }
                  placeholder="Describe the problem in detail..."
                />
              </div>
            </Card>

            {/* Tags & Visibility */}
            <Card className="bg-craft-panel border-craft-border p-6">
              <h3 className="text-lg font-semibold text-craft-text-primary mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      selectedTags.includes(tag)
                        ? "bg-craft-accent text-craft-bg hover:bg-craft-accent/80"
                        : "border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
                    }`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-craft-text-primary mb-2">
                  Visibility
                </h3>
                <div className="flex space-x-2">
                  {(["Private", "Public"] as const).map((level) => (
                    <Button
                      key={level}
                      type="button"
                      variant={
                        formData.visibility === level ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, visibility: level }))
                      }
                      className={
                        formData.visibility === level
                          ? "bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
                          : "border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
                      }
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Add Problems */}
            <Card className="bg-craft-panel border-craft-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-craft-text-primary">
                  Add Problems
                </h3>
                {selectedProblems.length > 0 && (
                  <Badge
                    variant="outline"
                    className="border-craft-accent text-craft-accent"
                  >
                    {selectedProblems.length} selected
                  </Badge>
                )}
              </div>

              {(data?.problems || []).length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-craft-text-secondary">
                    No problems available
                  </p>
                </div>
              ) : (
                <div className="border-craft-border border-2 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-craft-border hover:bg-craft-bg/50 bg-craft-bg/70">
                        <TableHead className="w-12 text-craft-text-primary">
                          <span className="sr-only">Select</span>
                        </TableHead>
                        <TableHead className="text-craft-text-primary">
                          Problem
                        </TableHead>
                        <TableHead className="text-craft-text-primary">
                          Difficulty
                        </TableHead>
                        <TableHead className="text-craft-text-primary">
                          Tags
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(data?.problems || []).map((problem) => (
                        <TableRow
                          key={problem.id}
                          className="border-craft-border hover:bg-craft-bg/30 transition-colors cursor-pointer"
                          onClick={() => handleProblemToggle(problem.id)}
                        >
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              checked={selectedProblems.includes(problem.id)}
                              onCheckedChange={() =>
                                handleProblemToggle(problem.id)
                              }
                              className="border-craft-border data-[state=checked]:bg-craft-accent data-[state=checked]:border-craft-accent"
                            />
                          </TableCell>
                          <TableCell className="font-medium text-craft-text-primary">
                            {problem.title}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getDifficultyColor(problem.difficulty)}
                            >
                              {problem.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {(problem.tags || []).slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs border-craft-border text-craft-text-secondary"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {(problem.tags || []).length > 3 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs border-craft-border text-craft-text-secondary"
                                >
                                  +{(problem.tags || []).length - 3}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </Card>

            {/* Submit */}
            <Card className="bg-craft-panel border-craft-border p-6">
              <h3 className="text-lg font-semibold text-craft-text-primary mb-4">
                Actions
              </h3>
              <Button
                onClick={handleSubmit}
                className="w-full bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
                disabled={
                  !isFormValid ||
                  createSheetMutation.isPending ||
                  updateSheetMutation.isPending
                }
              >
                <Send className="w-4 h-4 mr-2" />
                {createSheetMutation.isPending || updateSheetMutation.isPending
                  ? "Saving..."
                  : sheetId
                  ? "Update Sheet"
                  : "Create Sheet"}
              </Button>

              {!isFormValid && (
                <p className="text-craft-error text-sm mt-2">
                  Please fill in all required fields before submitting.
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSheetPage;
