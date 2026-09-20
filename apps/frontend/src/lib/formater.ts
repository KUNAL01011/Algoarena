import init, { format } from "@wasm-fmt/ruff_fmt";

export const formatPythonCode = async (code: string): Promise<string> => {
  await init();
  try {
    return format(code);
  } catch (error) {
    console.error("Error formatting Python code:", error);
    return code; // Return the original code if formatting fails
  }
};
