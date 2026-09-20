import { useState } from "react";
import { z } from "zod";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MarkdownEditor from "@/components/MarkdownEditor";
import TestCaseManager from "@/components/TestCaseManager";
import {
  Eye,
  Send,
  X,
  Code2,
  CheckCircle2,
  Loader,
  Import,
} from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { useCreateProblem } from "@/hooks/useProblems";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/hooks/useAuth";
import { sampledData, sampleStringProblem } from "@/constants/sample";
import { availableTags } from "@/constants/tags";
import { toast } from "sonner";

const langMap = {
  CPP: "cpp",
  JAVA: "java",
  PYTHON: "python",
  JAVASCRIPT: "javascript",
};

// Type definitions
interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
}

interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface CodeSnippets {
  JAVASCRIPT: string;
  JAVA: string;
  CPP: string;
  PYTHON: string;
}

interface ReferenceSolutions {
  JAVASCRIPT: string;
  JAVA: string;
  CPP: string;
  PYTHON: string;
}

type Language = "PYTHON" | "JAVASCRIPT" | "JAVA" | "CPP";
type Difficulty = "Easy" | "Medium" | "Hard";

interface Editorial {
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  code: string;
  codeLanguage: Language;
}

export interface ProblemFormData {
  title: string;
  description: string;
  difficulty: Difficulty;
  tags: string[];
  examples: Example[];
  constraints: string;
  testcases: { input: string; output: string }[];
  codeSnippets: CodeSnippets;
  referenceSolutions: ReferenceSolutions;
  hints: string[];
  editorial: Editorial;
  companyTag?: string;
}

// Zod validation schema
const problemSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  examples: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
        explanation: z.string().optional(),
      })
    )
    .min(1, "At least one example is required"),
  constraints: z.string().optional(),
  testcases: z.array(
    z.object({
      input: z.string(),
      output: z.string(),
    })
  ),
  codeSnippets: z.object({
    PYTHON: z.string(),
    JAVASCRIPT: z.string(),
    JAVA: z.string(),
    CPP: z.string(),
  }),
  referenceSolutions: z.object({
    PYTHON: z.string(),
    JAVASCRIPT: z.string(),
    JAVA: z.string(),
    CPP: z.string(),
  }),
  hints: z.array(z.string()),
  editorial: z.object({
    explanation: z.string(),
    timeComplexity: z.string(),
    spaceComplexity: z.string(),
    code: z.string(),
    codeLanguage: z.enum(["PYTHON", "JAVASCRIPT", "JAVA", "CPP"]),
  }),
  companyTag: z.string().optional(),
});

const CreateProblemPage = () => {
  const navigate = useNavigate();
  const authUser = useCurrentUser();
  const { mutate: createProblem, isPending } = useCreateProblem();
  const [formData, setFormData] = useState<ProblemFormData>({
    title: "",
    description: "",
    difficulty: "Easy",
    tags: [],
    examples: [
      {
        input: "",
        output: "",
        explanation: "",
      },
    ],
    constraints: "",
    testcases: [],
    codeSnippets: {
      JAVASCRIPT: "",
      JAVA: "",
      CPP: "",
      PYTHON: "",
    },
    referenceSolutions: {
      JAVASCRIPT: "",
      JAVA: "",
      CPP: "",
      PYTHON: "",
    },
    hints: [""],
    editorial: {
      explanation: "",
      timeComplexity: "",
      spaceComplexity: "",
      code: "",
      codeLanguage: "PYTHON",
    },
    companyTag: "",
  });

  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importJsonContent, setImportJsonContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const validateForm = (): boolean => {
    try {
      const dataToValidate = {
        ...formData,
        tags: selectedTags,
        testcases: testCases.map((tc) => ({
          input: tc.input,
          output: tc.expectedOutput,
        })),
      };

      problemSchema.parse(dataToValidate);
      setValidationErrors([]);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(
          (err) => `${err.path.join(".")}: ${err.message}`
        );
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (action: "preview" | "submit") => {
    const finalData = {
      ...formData,
      tags: selectedTags,
      testcases: testCases.map((tc) => ({
        input: tc.input,
        output: tc.expectedOutput,
      })),
    };

    if (action === "submit") {
      if (!validateForm()) {
        console.error("Validation failed:", validationErrors);
        return;
      }

      createProblem(finalData, {
        onSuccess: () => {
          navigate("/problems");
        },
      });
    }

    if (action === "preview") {
      setIsPreviewMode(true);
    }
  };

  const handleExampleRemove = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      examples: prev.examples.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleHintRemove = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      hints: prev.hints.filter((_, index) => index !== indexToRemove),
    }));
  };

  const isFormValid =
    formData.title && formData.description && selectedTags.length > 0;

  const loadSampleData = (sampleType: "DP" | "String") => {
    const sampleData = sampleType === "DP" ? sampledData : sampleStringProblem;

    setFormData(sampleData);
    setSelectedTags(sampleData.tags);
    setTestCases(
      sampleData.testcases.map((tc) => ({
        id: Math.random().toString(36).substring(2, 11), // Generate a simple ID
        input: tc.input,
        expectedOutput: tc.output,
      }))
    );
  };

  const handleImportJson = () => {
    try {
      const parsedJson = JSON.parse(importJsonContent);

      // Convert test cases format
      const convertedTestCases = parsedJson.testcases.map((tc: any) => ({
        id: Math.random().toString(36).substring(2, 11),
        input: tc.input,
        expectedOutput: tc.output,
      }));

      setFormData({
        ...parsedJson,
        codeSnippets: parsedJson.codeSnippets || {
          JAVASCRIPT: "",
          JAVA: "",
          CPP: "",
          PYTHON: "",
        },
        referenceSolutions: parsedJson.referenceSolutions || {
          JAVASCRIPT: "",
          JAVA: "",
          CPP: "",
          PYTHON: "",
        },
      });
      setSelectedTags(parsedJson.tags || []);
      setTestCases(convertedTestCases);
      setImportDialogOpen(false);
      toast.success("Problem data imported successfully!");
    } catch (error) {
      toast.error("Error importing JSON. Please check the format.");
      console.error("Import error:", error);
    }
  };

  // --- End Sample Data and Load Functionality ---
  if (isPreviewMode) {
    return (
      <div className="min-h-screen bg-craft-bg">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-craft-text-primary">
              Problem Preview
            </h1>
            <Button
              onClick={() => setIsPreviewMode(false)}
              variant="outline"
              className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
            >
              <X className="w-4 h-4 mr-2" />
              Exit Preview
            </Button>
          </div>

          <Card className="bg-craft-panel border-craft-border p-8 space-y-6">
            {/* Title and Difficulty */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-craft-text-primary">
                {formData.title}
              </h2>
              <Badge
                className={
                  formData.difficulty === "Easy"
                    ? "bg-craft-success/20 text-craft-success border-craft-success/30"
                    : formData.difficulty === "Medium"
                    ? "bg-craft-accent-secondary/20 text-craft-accent-secondary border-craft-accent-secondary/30"
                    : "bg-craft-error/20 text-craft-error border-craft-error/30"
                }
              >
                {formData.difficulty}
              </Badge>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
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

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-craft-text-primary mb-3">
                Description
              </h3>
              <div
                className="text-craft-text-secondary leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: formData.description.replace(/\n/g, "<br>"),
                }}
              />
            </div>

            {/* Examples */}
            {formData.examples.map((example, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-craft-text-primary mb-3">
                    Example {index + 1} Input
                  </h3>
                  <pre className="bg-craft-bg border border-craft-border rounded p-3 text-craft-text-primary font-mono text-sm">
                    {example.input}
                  </pre>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-craft-text-primary mb-3">
                    Example {index + 1} Output
                  </h3>
                  <pre className="bg-craft-bg border border-craft-border rounded p-3 text-craft-text-primary font-mono text-sm">
                    {example.output}
                  </pre>
                </div>
                {example.explanation && (
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-craft-text-primary mb-3">
                      Explanation
                    </h3>
                    <p className="text-craft-text-secondary leading-relaxed">
                      {example.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Constraints */}
            {formData.constraints && (
              <div>
                <h3 className="text-lg font-semibold text-craft-text-primary mb-3">
                  Constraints
                </h3>
                <p className="text-craft-text-secondary leading-relaxed">
                  {formData.constraints}
                </p>
              </div>
            )}
          </Card>

          {/* Actions */}
          <Card className="bg-craft-panel border-craft-border p-6 mt-6">
            <h3 className="text-lg font-semibold text-craft-text-primary mb-4">
              Actions
            </h3>

            <div className="space-y-3">
              <Button
                onClick={() => setImportDialogOpen(true)}
                variant="outline"
                className="w-full border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
              >
                <Import className="w-4 h-4 mr-2" />
                Import Problem
              </Button>

              <Button
                onClick={() => handleSubmit("preview")}
                variant="outline"
                className="w-full border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
                disabled={!isFormValid}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>

              <Button
                onClick={() => handleSubmit("submit")}
                className="w-full bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
                disabled={!isFormValid}
              >
                {isPending ? (
                  <Loader className="w-4 h-4" />
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Problem
                  </>
                )}
              </Button>
            </div>

            {!isFormValid && (
              <p className="text-craft-error text-sm mt-2">
                Please fill in all required fields before submitting.
              </p>
            )}

            {validationErrors.length > 0 && (
              <div className="mt-4 p-3 bg-craft-error/10 border border-craft-error/30 rounded">
                <p className="text-craft-error text-sm font-semibold mb-1">
                  Please fix the following errors:
                </p>
                <ul className="text-craft-error text-xs space-y-1">
                  {validationErrors.slice(0, 3).map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                  {validationErrors.length > 3 && (
                    <li>• ...and {validationErrors.length - 3} more</li>
                  )}
                </ul>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-craft-bg">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-craft-text-primary mb-2">
            Create Problem
          </h1>
          <p className="text-craft-text-secondary">
            Design a new coding challenge for the community
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="bg-craft-panel border-craft-border p-6">
              <h2 className="text-xl font-semibold text-craft-text-primary mb-4">
                Basic Information
              </h2>

              <div className="space-y-4">
                {/* Title */}
                <div>
                  <Label htmlFor="title" className="text-craft-text-primary">
                    Problem Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Enter problem title..."
                    className="bg-craft-bg border-craft-border text-craft-text-primary placeholder:text-craft-text-secondary focus:border-craft-accent"
                  />
                </div>

                {/* Description */}
                <MarkdownEditor
                  label="Problem Description *"
                  value={formData.description}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, description: value }))
                  }
                  placeholder="Describe the problem in detail. You can use markdown formatting..."
                />

                {/* Examples */}
                <div className="flex flex-col space-y-4">
                  <h3 className="text-craft-text-primary font-semibold">
                    Examples *
                  </h3>
                  {formData.examples.map((ex, i) => (
                    <Card
                      key={i}
                      className="bg-craft-panel border-craft-border p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-craft-text-primary">
                          Example {i + 1}
                        </h4>
                        {formData.examples.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleExampleRemove(i)}
                            className="border-craft-error/50 text-craft-error hover:bg-craft-error/10"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <Textarea
                          placeholder="Input"
                          value={ex.input}
                          className="bg-craft-bg border-craft-border text-craft-text-primary placeholder:text-craft-text-secondary focus:border-craft-accent"
                          onChange={(e) => {
                            const newExamples = [...formData.examples];
                            newExamples[i].input = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              examples: newExamples,
                            }));
                          }}
                        />
                        <Textarea
                          placeholder="Output"
                          value={ex.output}
                          className="bg-craft-bg border-craft-border text-craft-text-primary placeholder:text-craft-text-secondary focus:border-craft-accent"
                          onChange={(e) => {
                            const newExamples = [...formData.examples];
                            newExamples[i].output = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              examples: newExamples,
                            }));
                          }}
                        />
                        <Textarea
                          placeholder="Explanation (optional)"
                          value={ex.explanation}
                          className="bg-craft-bg border-craft-border text-craft-text-primary placeholder:text-craft-text-secondary focus:border-craft-accent"
                          onChange={(e) => {
                            const newExamples = [...formData.examples];
                            newExamples[i].explanation = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              examples: newExamples,
                            }));
                          }}
                        />
                      </div>
                    </Card>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        examples: [
                          ...prev.examples,
                          { input: "", output: "", explanation: "" },
                        ],
                      }))
                    }
                  >
                    Add Example
                  </Button>
                </div>
              </div>
            </Card>

            {/* Code Editor Section */}
            <Card className="bg-craft-panel border-craft-border p-6">
              <h2 className="text-xl font-semibold text-craft-text-primary mb-4">
                Code Templates & Solutions
              </h2>
              {(["JAVASCRIPT", "JAVA", "CPP", "PYTHON"] as Language[]).map(
                (language) => (
                  <div
                    key={language}
                    className="mb-8 p-4 border border-craft-border rounded-lg"
                  >
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-craft-text-primary">
                      <Code2 className="w-5 h-5" />
                      {language}
                    </h3>
                    <div className="space-y-6">
                      {/* Starter Code */}
                      <div>
                        <h4 className="font-semibold text-craft-text-primary mb-2">
                          Starter Code Template
                        </h4>
                        <div className="border rounded-md overflow-hidden">
                          <Editor
                            height="300px"
                            language={langMap[language]}
                            theme="vs-dark"
                            value={formData.codeSnippets[language]}
                            onChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                codeSnippets: {
                                  ...prev.codeSnippets,
                                  [language]: value || "",
                                },
                              }))
                            }
                            options={{
                              minimap: { enabled: false },
                              fontSize: 14,
                              lineNumbers: "on",
                              roundedSelection: false,
                              scrollBeyondLastLine: false,
                              automaticLayout: true,
                              padding: { top: 12 },
                            }}
                          />
                        </div>
                      </div>

                      {/* Reference Solution */}
                      <div>
                        <h4 className="font-semibold text-craft-text-primary mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          Reference Solution
                        </h4>
                        <div className="border rounded-md overflow-hidden">
                          <Editor
                            height="300px"
                            language={langMap[language]}
                            theme="vs-dark"
                            value={formData.referenceSolutions[language]}
                            onChange={(value) =>
                              setFormData((prev) => ({
                                ...prev,
                                referenceSolutions: {
                                  ...prev.referenceSolutions,
                                  [language]: value || "",
                                },
                              }))
                            }
                            options={{
                              minimap: { enabled: false },
                              fontSize: 14,
                              lineNumbers: "on",
                              roundedSelection: false,
                              scrollBeyondLastLine: false,
                              automaticLayout: true,
                              padding: { top: 12 },
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </Card>

            {/* Test Cases */}
            <Card className="bg-craft-panel border-craft-border p-6">
              <TestCaseManager testCases={testCases} onChange={setTestCases} />
            </Card>

            {/* Additional Information */}
            <Card className="bg-craft-panel border-craft-border p-6">
              <h2 className="text-xl font-semibold text-craft-text-primary mb-4">
                Additional Information
              </h2>
              <div className="space-y-6">
                {/* Hints */}
                <div>
                  <Label className="text-craft-text-primary">Hints</Label>
                  {formData.hints.map((hint, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <Input
                        value={hint}
                        onChange={(e) => {
                          const newHints = [...formData.hints];
                          newHints[i] = e.target.value;
                          setFormData((prev) => ({ ...prev, hints: newHints }));
                        }}
                        className="bg-craft-bg border-craft-border text-craft-text-primary placeholder:text-craft-text-secondary focus:border-craft-accent"
                        placeholder={`Hint ${i + 1}`}
                      />
                      {formData.hints.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleHintRemove(i)}
                          className="border-craft-error/50 text-craft-error hover:bg-craft-error/10"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        hints: [...prev.hints, ""],
                      }))
                    }
                    className="mt-2"
                  >
                    Add Hint
                  </Button>
                </div>

                {/* Editorial */}
                <div>
                  <Label className="text-craft-text-primary">Editorial</Label>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Explanation"
                      value={formData.editorial.explanation}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          editorial: {
                            ...prev.editorial,
                            explanation: e.target.value,
                          },
                        }))
                      }
                      className="bg-craft-bg border-craft-border text-craft-text-primary placeholder:text-craft-text-secondary focus:border-craft-accent"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Time Complexity (e.g., O(n))"
                        value={formData.editorial.timeComplexity}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            editorial: {
                              ...prev.editorial,
                              timeComplexity: e.target.value,
                            },
                          }))
                        }
                        className="bg-craft-bg border-craft-border text-craft-text-primary placeholder:text-craft-text-secondary focus:border-craft-accent"
                      />
                      <Input
                        placeholder="Space Complexity (e.g., O(1))"
                        value={formData.editorial.spaceComplexity}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            editorial: {
                              ...prev.editorial,
                              spaceComplexity: e.target.value,
                            },
                          }))
                        }
                        className="bg-craft-bg border-craft-border text-craft-text-primary placeholder:text-craft-text-secondary focus:border-craft-accent"
                      />
                    </div>
                    <Textarea
                      placeholder="Editorial Code"
                      value={formData.editorial.code}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          editorial: {
                            ...prev.editorial,
                            code: e.target.value,
                          },
                        }))
                      }
                      className="bg-craft-bg border-craft-border text-craft-text-primary placeholder:text-craft-text-secondary focus:border-craft-accent"
                    />
                    <div>
                      <Label className="text-craft-text-primary">
                        Language
                      </Label>
                      <select
                        value={formData.editorial.codeLanguage}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            editorial: {
                              ...prev.editorial,
                              codeLanguage: e.target.value as Language,
                            },
                          }))
                        }
                        className="w-full p-2 rounded bg-craft-bg border-craft-border text-craft-text-primary"
                      >
                        <option value="JAVASCRIPT">JavaScript</option>
                        <option value="PYTHON">Python</option>
                        <option value="JAVA">Java</option>
                        <option value="CPP">C++</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Constraints */}
                <div>
                  <Label
                    htmlFor="constraints"
                    className="text-craft-text-primary"
                  >
                    Constraints
                  </Label>
                  <Textarea
                    id="constraints"
                    value={formData.constraints}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        constraints: e.target.value,
                      }))
                    }
                    placeholder="List any constraints (e.g., 1 ≤ n ≤ 10^5)..."
                    className="bg-craft-bg border-craft-border text-craft-text-primary placeholder:text-craft-text-secondary focus:border-craft-accent"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Metadata */}
            <Card className="bg-craft-panel border-craft-border p-6">
              <h3 className="text-lg font-semibold text-craft-text-primary mb-4">
                Metadata
              </h3>

              <div className="space-y-4">
                <div>
                  <Label className="text-craft-text-primary">
                    Difficulty Level
                  </Label>
                  <div className="flex space-x-2 mt-2">
                    {(["Easy", "Medium", "Hard"] as const).map((level) => (
                      <Button
                        key={level}
                        type="button"
                        variant={
                          formData.difficulty === level ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            difficulty: level,
                          }))
                        }
                        className={
                          formData.difficulty === level
                            ? "bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
                            : "border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
                        }
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="companyTag"
                    className="text-craft-text-primary"
                  >
                    Company Tag
                  </Label>
                  <Input
                    id="companyTag"
                    value={formData.companyTag}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        companyTag: e.target.value,
                      }))
                    }
                    placeholder="e.g., Google, Facebook..."
                    className="bg-craft-bg border-craft-border text-craft-text-primary placeholder:text-craft-text-secondary focus:border-craft-accent"
                  />
                </div>
              </div>
            </Card>

            {/* Tags */}
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
            </Card>

            {/* Load Sample Data Buttons */}
            <Card className="bg-craft-panel border-craft-border p-6">
              <h3 className="text-lg font-semibold text-craft-text-primary mb-4">
                Load Sample Data
              </h3>
              <div className="space-y-3">
                <Button
                  onClick={() => loadSampleData("DP")}
                  variant="outline"
                  className="w-full "
                >
                  Load DP Problem Sample
                </Button>
                <Button
                  onClick={() => loadSampleData("String")}
                  className="w-full bg-craft-accent/80 hover:bg-craft-accent/60 text-black"
                >
                  Load String Problem Sample
                </Button>
              </div>
            </Card>

            {/* Actions */}
            <Card className="bg-craft-panel border-craft-border p-6">
              <h3 className="text-lg font-semibold text-craft-text-primary mb-4">
                Actions
              </h3>

              <div className="space-y-3">
                <Button
                  onClick={() => setImportDialogOpen(true)}
                  variant="outline"
                  className="w-full border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
                >
                  <Import className="w-4 h-4 mr-2" />
                  Import Problem
                </Button>

                <Button
                  onClick={() => handleSubmit("preview")}
                  variant="outline"
                  className="w-full border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
                  disabled={!isFormValid}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>

                <Button
                  onClick={() => handleSubmit("submit")}
                  className="w-full bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
                  disabled={!isFormValid}
                >
                  {isPending ? (
                    <Loader className="w-4 h-4 mr-2" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Problem
                    </>
                  )}
                </Button>
              </div>

              {!isFormValid && (
                <p className="text-craft-error text-sm mt-2">
                  Please fill in all required fields before submitting.
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>{" "}
      {/* Import JSON Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent className="max-w-4xl p-6 mx-auto bg-craft-bg border border-craft-border rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-craft-text-primary">
              Import Problem from JSON
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 border rounded-md overflow-hidden">
            <Editor
              height="500px"
              language="json"
              theme="vs-dark"
              value={importJsonContent}
              onChange={(value) => setImportJsonContent(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 12 },
                formatOnPaste: true,
                formatOnType: true,
              }}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() => setImportDialogOpen(false)}
              variant="outline"
              className="border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleImportJson}
              className="bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
            >
              <Import className="w-4 h-4 mr-2" />
              Import JSON
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProblemPage;
