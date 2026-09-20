export class CodeFormatter {
  /**
   * Format code from Monaco Editor for Judge0 submission
   * @param {string} code - Raw code from Monaco Editor
   * @param {string} language - Programming language (python, cpp, java, javascript)
   * @returns {string} - Formatted code ready for Judge0
   */
  static formatForJudge0(code, language) {
    if (!code || typeof code !== "string") {
      return "";
    }

    let formattedCode = code;

    // Step 1: Normalize line endings to \n (Judge0 expects Unix line endings)
    formattedCode = formattedCode.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    // Step 2: Remove BOM (Byte Order Mark) if present
    formattedCode = formattedCode.replace(/^\uFEFF/, "");

    // Step 3: Handle language-specific formatting
    switch (language.toLowerCase()) {
      case "python":
      case "py":
        formattedCode = this.formatPython(formattedCode);
        break;
      case "cpp":
      case "c++":
      case "cxx":
        formattedCode = this.formatCpp(formattedCode);
        break;
      case "java":
        formattedCode = this.formatJava(formattedCode);
        break;
      case "javascript":
      case "js":
        formattedCode = this.formatJavaScript(formattedCode);
        break;
      default:
        formattedCode = this.formatGeneric(formattedCode);
    }

    // Step 4: Final cleanup
    formattedCode = this.finalCleanup(formattedCode);

    return formattedCode;
  }

  /**
   * Format Python code
   */
  static formatPython(code) {
    // Remove trailing whitespace from each line
    let lines = code.split("\n").map((line) => line.trimEnd());

    // Ensure proper indentation (convert tabs to 4 spaces)
    lines = lines.map((line) => line.replace(/\t/g, "    "));

    // Remove excessive blank lines at start and end
    while (lines.length > 0 && lines[0].trim() === "") {
      lines.shift();
    }
    while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
      lines.pop();
    }

    return lines.join("\n");
  }

  /**
   * Format C++ code
   */
  static formatCpp(code) {
    // Convert tabs to spaces
    const formatted = code.replace(/\t/g, "    ");

    // Remove trailing whitespace from each line
    const lines = formatted.split("\n").map((line) => line.trimEnd());

    // Remove excessive blank lines at start and end
    while (lines.length > 0 && lines[0].trim() === "") {
      lines.shift();
    }
    while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
      lines.pop();
    }

    return lines.join("\n");
  }

  /**
   * Format Java code
   */
  static formatJava(code) {
    // Convert tabs to spaces
    const formatted = code.replace(/\t/g, "    ");

    // Remove trailing whitespace from each line
    const lines = formatted.split("\n").map((line) => line.trimEnd());

    // Remove excessive blank lines at start and end
    while (lines.length > 0 && lines[0].trim() === "") {
      lines.shift();
    }
    while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
      lines.pop();
    }

    return lines.join("\n");
  }

  /**
   * Format JavaScript code
   */
  static formatJavaScript(code) {
    // Convert tabs to spaces
    const formatted = code.replace(/\t/g, "    ");

    // Remove trailing whitespace from each line
    const lines = formatted.split("\n").map((line) => line.trimEnd());

    // Remove excessive blank lines at start and end
    while (lines.length > 0 && lines[0].trim() === "") {
      lines.shift();
    }
    while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
      lines.pop();
    }

    return lines.join("\n");
  }

  /**
   * Generic formatting for other languages
   */
  static formatGeneric(code) {
    // Convert tabs to spaces
    const formatted = code.replace(/\t/g, "    ");

    // Remove trailing whitespace from each line
    const lines = formatted.split("\n").map((line) => line.trimEnd());

    // Remove excessive blank lines at start and end
    while (lines.length > 0 && lines[0].trim() === "") {
      lines.shift();
    }
    while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
      lines.pop();
    }

    return lines.join("\n");
  }

  /**
   * Final cleanup operations
   */
  static finalCleanup(code) {
    // Ensure code ends with a single newline
    code = code.replace(/\n+$/, "") + "\n";

    // Remove any null characters that might cause issues
    code = code.replace(/\0/g, "");

    // Handle any remaining problematic Unicode characters
    code = code.replace(
      /[\u2000-\u200B\u2028-\u2029\u202F\u205F\u3000\uFEFF]/g,
      " "
    );

    return code;
  }

  /**
   * Validate if code is safe for submission
   */
  static validateCode(code, language) {
    const issues = [];

    if (!code || code.trim().length === 0) {
      issues.push("Code is empty");
      return { isValid: false, issues };
    }

    // Check for extremely long lines that might cause issues
    const lines = code.split("\n");
    const longLines = lines.filter((line, index) => line.length > 1000);
    if (longLines.length > 0) {
      issues.push("Some lines are extremely long (>1000 characters)");
    }

    // Check for binary content
    if (/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(code)) {
      issues.push("Code contains binary or control characters");
    }

    // Language-specific validation
    switch (language.toLowerCase()) {
      case "python":
        if (!/\S/.test(code)) {
          issues.push("Python code appears to be empty or only whitespace");
        }
        break;
      case "cpp":
      case "c++":
        if (!code.includes("#include") && !code.includes("int main")) {
          issues.push("C++ code might be missing includes or main function");
        }
        break;
      case "java":
        if (
          !code.includes("class") &&
          !code.includes("public static void main")
        ) {
          issues.push("Java code might be missing class or main method");
        }
        break;
    }

    return {
      isValid: issues.length === 0,
      issues: issues,
    };
  }

  /**
   * Get Judge0 language ID for submission
   */
  static getJudge0LanguageId(language) {
    const languageMap = {
      python: 71, // Python 3.8.1
      py: 71,
      cpp: 54, // C++ (GCC 9.2.0)
      "c++": 54,
      cxx: 54,
      java: 62, // Java (OpenJDK 13.0.1)
      javascript: 63, // JavaScript (Node.js 12.14.0)
      js: 63,
    };
    return languageMap[language.toLowerCase()] || null;
  }

  /**
   * Prepare complete submission object for Judge0
   */
  static prepareSubmission(code, language, input = "", expectedOutput = "") {
    const formattedCode = this.formatForJudge0(code, language);
    const validation = this.validateCode(formattedCode, language);
    const languageId = this.getJudge0LanguageId(language);

    if (!validation.isValid) {
      throw new Error(
        `Code validation failed: ${validation.issues.join(", ")}`
      );
    }

    if (!languageId) {
      throw new Error(`Unsupported language: ${language}`);
    }

    return {
      source_code: btoa(formattedCode), // Base64 encode for Judge0
      language_id: languageId,
      stdin: btoa(input),
      expected_output: expectedOutput ? btoa(expectedOutput) : undefined,
    };
  }
}

// Export for Node.js or browser usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = CodeFormatter;
} else if (typeof window !== "undefined") {
  window.CodeFormatter = CodeFormatter;
}

