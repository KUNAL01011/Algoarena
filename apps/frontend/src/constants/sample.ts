import { ProblemFormData } from "@/pages/CreateProblemPage";

// --- Sample Data and Load Functionality ---
export const sampledData: ProblemFormData = {
  title: "Longest Common Subsequence",
  description:
    "Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return 0.\nA subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.\nFor example, 'ace' is a subsequence of 'abcde'.\nA common subsequence of two strings is a subsequence that is common to both strings.",
  difficulty: "Medium",
  tags: ["Dynamic Programming", "String"],
  examples: [
    {
      input: "abcde\nace",
      output: "3",
      explanation:
        'The longest common subsequence is "ace" and its length is 3.',
    },
    {
      input: "abc\nabc",
      output: "3",
      explanation:
        'The longest common subsequence is "abc" and its length is 3.',
    },
    {
      input: "abc\ndef",
      output: "0",
      explanation: "There is no such common subsequence, so the result is 0.",
    },
  ],
  constraints:
    "1 <= text1.length, text2.length <= 1000\ntext1 and text2 consist of only lowercase English characters.",
  testcases: [
    {
      input: "abcde\nace",
      output: "3",
    },
    {
      input: "abc\nabc",
      output: "3",
    },
    {
      input: "abc\ndef",
      output: "0",
    },
    {
      input: "bsbininm\njmjkbkjkv",
      output: "1",
    },
    {
      input: "test\nabc",
      output: "0",
    },
  ],
  codeSnippets: {
    JAVASCRIPT:
      "// Javascript Code Snippet\nfunction longestCommonSubsequence(text1, text2) {\n  // Your code here\n}",
    JAVA: "// Java Code Snippet\nclass Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        // Your code here\n    }\n}",
    CPP: "// C++ Code Snippet\n#include <string>\n\nclass Solution {\npublic:\n    int longestCommonSubsequence(std::string text1, std::string text2) {\n        // Your code here\n    }\n};",
    PYTHON:
      "# Python Code Snippet\ndef longestCommonSubsequence(text1: str, text2: str) -> int:\n    # Your code here\n    pass",
  },
  referenceSolutions: {
    JAVASCRIPT:
      "// Javascript Reference Solution\nconst fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nconst text1 = input[0];\nconst text2 = input[1];\n\nfunction longestCommonSubsequence(text1, text2) {\n    const m = text1.length;\n    const n = text2.length;\n    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));\n\n    for (let i = 1; i <= m; i++) {\n        for (let j = 1; j <= n; j++) {\n            if (text1[i - 1] === text2[j - 1]) {\n                dp[i][j] = dp[i - 1][j - 1] + 1;\n            } else {\n                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n            }\n        }\n    }\n\n    return dp[m][n];\n}\n\nconsole.log(longestCommonSubsequence(text1, text2));",
    JAVA: "// Java Reference Solution\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String text1 = sc.nextLine();\n        String text2 = sc.nextLine();\n\n        int m = text1.length();\n        int n = text2.length();\n        int[][] dp = new int[m + 1][n + 1];\n\n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {\n                    dp[i][j] = dp[i - 1][j - 1] + 1;\n                } else {\n                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n                }\n            }\n        }\n\n        System.out.println(dp[m][n]);\n    }\n}",
    CPP: "// C++ Reference Solution\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    string text1, text2;\n    getline(cin, text1);\n    getline(cin, text2);\n\n    int m = text1.length();\n    int n = text2.length();\n    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));\n\n    for (int i = 1; i <= m; i++) {\n        for (int j = 1; j <= n; j++) {\n            if (text1[i - 1] == text2[j - 1]) {\n                dp[i][j] = dp[i - 1][j - 1] + 1;\n            } else {\n                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);\n            }\n        }\n    }\n\n    cout << dp[m][n] << endl;\n\n    return 0;\n}",
    PYTHON:
      "# Python Reference Solution\nimport sys\n\ntext1 = sys.stdin.readline().strip()\ntext2 = sys.stdin.readline().strip()\n\ndef longestCommonSubsequence(text1: str, text2: str) -> int:\n    m = len(text1)\n    n = len(text2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if text1[i - 1] == text2[j - 1]:\n                dp[i][j] = dp[i - 1][j - 1] + 1;\n            else:\n                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n\n    return dp[m][n]\n\nprint(longestCommonSubsequence(text1, text2))",
  },
  hints: [
    "Think about using dynamic programming.",
    "Create a 2D array `dp` where `dp[i][j]` represents the length of the longest common subsequence of `text1[0...i-1]` and `text2[0...j-1]`.",
    "If `text1[i-1] == text2[j-1]`, then `dp[i][j] = dp[i-1][j-1] + 1`.",
    "Otherwise, `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`.",
  ],
  editorial: {
    explanation:
      "We can solve this problem using dynamic programming. The `dp[i][j]` table stores the length of the LCS of `text1[0...i-1]` and `text2[0...j-1]`. If `text1[i-1]` and `text2[j-1]` are equal, we increment the LCS length from the previous subproblem. Otherwise, we take the maximum LCS length from either excluding the last character of `text1` or `text2`.",
    timeComplexity:
      "O(m*n), where m and n are the lengths of text1 and text2, respectively.",
    spaceComplexity: "O(m*n)",
    code: "# Python Editorial Code\ndef longestCommonSubsequence(text1: str, text2: str) -> int:\n    m = len(text1)\n    n = len(text2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if text1[i - 1] == text2[j - 1]:\n                dp[i][j] = dp[i - 1][j - 1] + 1;\n            else:\n                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n\n    return dp[m][n]",
    codeLanguage: "PYTHON",
  },
  companyTag: "Apple, Facebook",
};

export const sampleStringProblem: ProblemFormData = {
  title: "Reverse String",
  description:
    "Write a function that reverses a string. The input string is given as an array of characters `s`.\nYou must do this by modifying the input array `in-place` with O(1) extra memory.",
  difficulty: "Easy",
  tags: ["String", "Two Pointers", "In-place"],
  examples: [
    {
      input: "hello",
      output: "olleh",
      explanation: "The reversed string of 'hello' is 'olleh'.",
    },
    {
      input: "Hannah",
      output: "hannaH",
      explanation: "The reversed string of 'Hannah' is 'hannaH'.",
    },
  ],
  constraints: "1 <= s.length <= 10^5\ns[i] is a printable ASCII character.",
  testcases: [
    {
      input: "hello",
      output: "olleh",
    },
    {
      input: "Hannah",
      output: "hannaH",
    },
    {
      input: "a",
      output: "a",
    },
    {
      input: "new",
      output: "wen",
    },
    {
      input: "racecar",
      output: "racecar",
    },
  ],
  codeSnippets: {
    JAVASCRIPT:
      "// Javascript Code Snippet\nfunction reverseString(s) {\n    // Write your code here\n    // Modify the array s in-place instead.\n}",
    PYTHON:
      '# Python Code Snippet\ndef reverseString(s: list[str]) -> None:\n    """Do not return anything, modify s in-place instead."""\n    # Write your code here\n    pass',
    JAVA: "// Java Code Snippet\nclass Solution {\n    public void reverseString(char[] s) {\n        // Write your code here\n        // Do not return anything, modify s in-place instead.\n    }\n}",
    CPP: "// C++ Code Snippet\n#include <vector>\n\nclass Solution {\npublic:\n    void reverseString(std::vector<char>& s) {\n        // Write your code here\n        // Do not return anything, modify s in-place instead.\n    }\n};",
  },
  referenceSolutions: {
    JAVASCRIPT:
      "// Javascript Reference Solution\nconst fs = require('fs');\n\nlet s = fs.readFileSync(0, 'utf-8').trim().split('');\n\nfunction reverseString(s) {\n    let left = 0;\n    let right = s.length - 1;\n\n    while (left < right) {\n        [s[left], s[right]] = [s[right], s[left]];\n        left++;\n        right--;\n    }\n}\n\nreverseString(s);\nconsole.log(s.join(''));",
    PYTHON:
      "# Python Reference Solution\nimport sys\n\ns = list(sys.stdin.readline().strip())\n\ndef reverseString(s: list[str]) -> None:\n    left, right = 0, len(s) - 1\n    while left < right:\n        s[left], s[right] = s[right], s[left]\n        left += 1\n        right -= 1\n\nreverseString(s)\nprint(''.join(s))",
    JAVA: "// Java Reference Solution\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String input = sc.nextLine();\n        char[] s = input.toCharArray();\n\n        int left = 0;\n        int right = s.length - 1;\n\n        while (left < right) {\n            char temp = s[left];\n            s[left] = s[right];\n            s[right] = temp;\n            left++;\n            right--;\n        }\n\n        System.out.println(new String(s));\n    }\n}",
    CPP: "// C++ Reference Solution\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    string input;\n    getline(cin, input);\n    vector<char> s(input.begin(), input.end());\n\n    int left = 0;\n    int right = s.size() - 1;\n\n    while (left < right) {\n        swap(s[left], s[right]);\n        left++;\n        right--;\n    }\n\n    for (char c : s) {\n        cout << c;\n    }\n    cout << endl;\n\n    return 0;\n}",
  },
  hints: [
    "Use the two-pointer technique.",
    "Initialize two pointers, one at the beginning and one at the array",
    "Swap the characters at the two pointers and move the pointers towards the middle of the array.",
  ],
  editorial: {
    explanation:
      "The two-pointer technique is used to reverse the string in-place. We initialize two pointers, `left` at the beginning of the array and `right` at the end. We swap the characters at `left` and `right` and move the pointers towards the middle until `left` and `right` cross each other.",
    timeComplexity: "O(N), where N is the length of the string.",
    spaceComplexity: "O(1)",
    code: "// C++ Editorial Code\n#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    string input;\n    getline(cin, input);\n    vector<char> s(input.begin(), input.end());\n\n    int left = 0;\n    int right = s.size() - 1;\n\n    while (left < right) {\n        swap(s[left], s[right]);\n        left++;\n        right--;\n    }\n\n    for (char c : s) {\n        cout << c;\n    }\n    cout << endl;\n\n    return 0;\n}",
    codeLanguage: "CPP",
  },
  companyTag: "Apple, Facebook",
};
