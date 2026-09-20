
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Edit } from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

const MarkdownEditor = ({ value, onChange, placeholder, label }: MarkdownEditorProps) => {
  const [isPreview, setIsPreview] = useState(false);

  const renderMarkdown = (text: string) => {
    // Simple markdown rendering for bold, italic, and code blocks
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-craft-panel px-1 rounded text-craft-accent">$1</code>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-craft-text-primary font-medium">{label}</label>
      )}
      
      <div className="flex space-x-2 mb-2">
        <Button
          type="button"
          variant={!isPreview ? "default" : "outline"}
          size="sm"
          onClick={() => setIsPreview(false)}
          className={!isPreview ? "bg-craft-accent hover:bg-craft-accent/80 text-craft-bg" : "border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"}
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </Button>
        <Button
          type="button"
          variant={isPreview ? "default" : "outline"}
          size="sm"
          onClick={() => setIsPreview(true)}
          className={isPreview ? "bg-craft-accent hover:bg-craft-accent/80 text-craft-bg" : "border-craft-border text-craft-text-secondary hover:border-craft-accent hover:text-craft-accent"}
        >
          <Eye className="w-4 h-4 mr-1" />
          Preview
        </Button>
      </div>

      {isPreview ? (
        <Card className="bg-craft-panel border-craft-border p-4 min-h-32">
          <div 
            className="text-craft-text-primary prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
          />
        </Card>
      ) : (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-craft-panel border-craft-border text-craft-text-primary placeholder:text-craft-text-secondary focus:border-craft-accent min-h-32"
        />
      )}
    </div>
  );
};

export default MarkdownEditor;
