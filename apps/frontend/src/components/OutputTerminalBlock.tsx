
interface OutputTerminalBlockProps {
  outputText: string;
}

const OutputTerminalBlock = ({ outputText }: OutputTerminalBlockProps) => {
  return (
    <div className="bg-black rounded-lg p-4 font-mono text-sm min-h-[100px] overflow-auto">
      <pre className="text-green-400 whitespace-pre-wrap">
        {outputText || "No output to display"}
      </pre>
    </div>
  );
};

export default OutputTerminalBlock;