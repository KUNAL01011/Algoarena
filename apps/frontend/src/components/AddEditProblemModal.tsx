
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, X } from "lucide-react";
import { Problem } from "@/pages/SheetProblemManagerPage";

interface AddEditProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (problemData: Omit<Problem, 'id' | 'addedDate'>) => void;
  editingProblem?: Problem | null;
}

const AVAILABLE_TAGS = [
  "array", "binary", "tree", "graph", "dynamic", "math", 
  "dp", "greedy", "stack", "queue", "linkedlist", 
  "sorting", "search"
];

const AddEditProblemModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  editingProblem 
}: AddEditProblemModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    likes: 0,
    dislikes: 0,
    questions: 1,
    tags: [] as string[],
    status: "Not Started" as Problem['status']
  });

  const [errors, setErrors] = useState<{ name?: string }>({});

  useEffect(() => {
    if (editingProblem) {
      setFormData({
        name: editingProblem.name,
        description: editingProblem.description || "",
        likes: editingProblem.likes,
        dislikes: editingProblem.dislikes,
        questions: editingProblem.questions,
        tags: editingProblem.tags,
        status: editingProblem.status
      });
    } else {
      setFormData({
        name: "",
        description: "",
        likes: 0,
        dislikes: 0,
        questions: 1,
        tags: [],
        status: "Not Started"
      });
    }
    setErrors({});
  }, [editingProblem, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: { name?: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = "Problem name is required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      ...formData,
      name: formData.name.trim(),
      description: formData.description.trim() || undefined
    });
  };

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-craft-panel border-craft-border max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-craft-text-primary">
            {editingProblem ? "Edit Problem" : "Add New Problem"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Problem Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-craft-text-primary">
              Problem Name *
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter problem name"
              className={`bg-craft-bg border-craft-border text-craft-text-primary ${
                errors.name ? 'border-craft-error' : ''
              }`}
            />
            {errors.name && (
              <p className="text-craft-error text-sm">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-craft-text-primary">
              Description
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter problem description (optional)"
              className="bg-craft-bg border-craft-border text-craft-text-primary"
              rows={3}
            />
          </div>

          {/* Likes and Dislikes */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-craft-text-primary flex items-center">
                <ThumbsUp className="w-4 h-4 mr-1 text-craft-success" />
                Likes
              </label>
              <Input
                type="number"
                min="0"
                value={formData.likes}
                onChange={(e) => setFormData(prev => ({ ...prev, likes: parseInt(e.target.value) || 0 }))}
                className="bg-craft-bg border-craft-border text-craft-text-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-craft-text-primary flex items-center">
                <ThumbsDown className="w-4 h-4 mr-1 text-craft-error" />
                Dislikes
              </label>
              <Input
                type="number"
                min="0"
                value={formData.dislikes}
                onChange={(e) => setFormData(prev => ({ ...prev, dislikes: parseInt(e.target.value) || 0 }))}
                className="bg-craft-bg border-craft-border text-craft-text-primary"
              />
            </div>
          </div>

          {/* Number of Questions */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-craft-text-primary">
              Number of Questions
            </label>
            <Input
              type="number"
              min="1"
              value={formData.questions}
              onChange={(e) => setFormData(prev => ({ ...prev, questions: parseInt(e.target.value) || 1 }))}
              className="bg-craft-bg border-craft-border text-craft-text-primary"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-craft-text-primary">
              Status
            </label>
            <Select
              value={formData.status}
              onValueChange={(value: Problem['status']) => 
                setFormData(prev => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger className="bg-craft-bg border-craft-border text-craft-text-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-craft-panel border-craft-border">
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="Solving">Solving</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-craft-text-primary">
              Tags
            </label>
            
            {/* Selected Tags */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge 
                    key={tag}
                    className="bg-craft-accent/20 text-craft-accent border-craft-accent/30 pr-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:bg-craft-accent/30 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Available Tags */}
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.filter(tag => !formData.tags.includes(tag)).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className="px-3 py-1 text-sm border border-craft-border text-craft-text-secondary rounded-full hover:border-craft-accent hover:text-craft-accent transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-craft-accent hover:bg-craft-accent/80 text-craft-bg"
            >
              {editingProblem ? "Update Problem" : "Add Problem"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditProblemModal;