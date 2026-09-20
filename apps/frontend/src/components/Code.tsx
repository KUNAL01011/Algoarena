import { Copy } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  code: string;
  language: string;
}

const langMap = {
  CPP: "cpp",
  JAVA: "java",
  PYTHON: "python",
  JAVASCRIPT: "javascript",
};

const Code = ({code,language}: Props) => {
   const [selected, setSelected] = useState("CPP");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  return (
    <div>
      <div className="px-4 py-2 font-medium capitalize ">
        {language}
      </div>
      <div className="relative group bg-[#212326] text-white text-sm overflow-x-auto">
      <button
          onClick={handleCopy}
          className="absolute top-2 right-2 hidden group-hover:block bg-gray-700 text-white px-2 py-1 rounded text-xs hover:bg-gray-600"
        >
          {copied ? "Copied!" : <Copy size={16} />}
        </button>
        <SyntaxHighlighter
          language={langMap[selected]}
          style={oneDark}
          customStyle={{ margin: 0, padding: "1rem" }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default Code