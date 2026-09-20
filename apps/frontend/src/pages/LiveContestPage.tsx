
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import LiveContestLayout from "@/components/LiveContestLayout";
import ContestProblemPanel from "@/components/ContestProblemPanel";
import ContestCodePanel from "@/components/ContestCodePanel";
import ContestTopBar from "@/components/ContestTopBar";
import QuestionNavMenu from "@/components/QuestionNavMenu";
import WebcamPreview from "@/components/WebcamPreview";
import SummaryPopup from "@/components/SummaryPopup";
import { toast } from "sonner";

const LiveContestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Contest state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState("");
  const [terminalTestResults, setTerminalTestResults] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(40);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  
  // Question states
  const [questionStates, setQuestionStates] = useState([
    { id: 1, answered: false, timeSpent: 0 },
    { id: 2, answered: false, timeSpent: 0 },
    { id: 3, answered: false, timeSpent: 0 },
    { id: 4, answered: false, timeSpent: 0 }
  ]);

  const questions = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
          input: "nums = [3,2,4], target = 6", 
          output: "[1,2]",
          explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
        }
      ],
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists."
      ],
      starterCode: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Your solution here
    pass`
    },
    {
      id: 2,
      title: "Add Two Numbers",
      difficulty: "Medium",
      description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
      examples: [
        {
          input: "l1 = [2,4,3], l2 = [5,6,4]",
          output: "[7,0,8]",
          explanation: "342 + 465 = 807."
        }
      ],
      constraints: [
        "The number of nodes in each linked list is in the range [1, 100].",
        "0 <= Node.val <= 9",
        "It is guaranteed that the list represents a number that does not have leading zeros."
      ],
      starterCode: `def addTwoNumbers(l1, l2):
    """
    :type l1: ListNode
    :type l2: ListNode
    :rtype: ListNode
    """
    # Your solution here
    pass`
    },
    {
      id: 3,
      title: "Longest Substring",
      difficulty: "Medium",
      description: `Given a string s, find the length of the longest substring without repeating characters.`,
      examples: [
        {
          input: 's = "abcabcbb"',
          output: "3",
          explanation: 'The answer is "abc", with the length of 3.'
        },
        {
          input: 's = "bbbbb"',
          output: "1",
          explanation: 'The answer is "b", with the length of 1.'
        }
      ],
      constraints: [
        "0 <= s.length <= 5 * 10^4",
        "s consists of English letters, digits, symbols and spaces."
      ],
      starterCode: `def lengthOfLongestSubstring(s):
    """
    :type s: str
    :rtype: int
    """
    # Your solution here
    pass`
    },
    {
      id: 4,
      title: "Median of Two Arrays",
      difficulty: "Hard",
      description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).`,
      examples: [
        {
          input: "nums1 = [1,3], nums2 = [2]",
          output: "2.00000",
          explanation: "merged array = [1,2,3] and median is 2."
        }
      ],
      constraints: [
        "nums1.length == m",
        "nums2.length == n",
        "0 <= m <= 1000",
        "0 <= n <= 1000",
        "1 <= m + n <= 2000",
        "-10^6 <= nums1[i], nums2[i] <= 10^6"
      ],
      starterCode: `def findMedianSortedArrays(nums1, nums2):
    """
    :type nums1: List[int]
    :type nums2: List[int]
    :rtype: float
    """
    # Your solution here
    pass`
    }
  ];

  // Request camera permission on load
  useEffect(() => {
    const requestCamera = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraPermission(true);
        toast.success("Camera access granted");
      } catch (error) {
        setCameraPermission(false);
        toast.error("Camera permission denied");
      }
    };
    requestCamera();
  }, []);

  // Set initial code when question changes
  useEffect(() => {
    setCode(questions[currentQuestion].starterCode);
  }, [currentQuestion]);

  const handleQuestionChange = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
    setShowTerminal(false);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setShowTerminal(true);
    setTerminalOutput("Running test cases...\n");
    
    // Simulate API call
    setTimeout(() => {
      const mockOutput = `Test Case 1: ✅ Passed (2ms)
Test Case 2: ✅ Passed (1ms)
Test Case 3: ❌ Failed (Expected: [1,2], Got: [2,1])`;

      const mockTerminalTests = [
        { id: 1, passed: true },
        { id: 2, passed: true },
        { id: 3, passed: false }
      ];

      setTerminalOutput(mockOutput);
      setTerminalTestResults(mockTerminalTests);
      setIsRunning(false);
      toast("Code executed");
    }, 2000);
  };

  const handleMarkSolved = () => {
    setQuestionStates(prev => 
      prev.map((q, idx) => 
        idx === currentQuestion ? { ...q, answered: true } : q
      )
    );
    toast.success("Question marked as solved!");
  };

  const handleSubmitContest = () => {
    setShowSummary(true);
  };

  const handleTimeUp = () => {
    setShowSummary(true);
    toast.error("Time's up! Contest ended.");
  };

  const handleSubmitFinal = () => {
    setShowSummary(false);
    navigate(`/results/${id}`);
    toast.success("Contest submitted successfully!");
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = leftPanelWidth;
    
    const handleMouseMove = (e: MouseEvent) => {
      const diff = e.clientX - startX;
      const newWidth = startWidth + (diff / window.innerWidth) * 100;
      setLeftPanelWidth(Math.max(25, Math.min(60, newWidth)));
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const answeredCount = questionStates.filter(q => q.answered).length;

  return (
    <div className=" bg-craft-bg">    
      {/* Contest Top Bar */}
      <ContestTopBar
        questionsCount={questions.length}
        answeredCount={answeredCount}
        timeLeft={timeLeft}
        onTimeUp={handleTimeUp}
        setTimeLeft={setTimeLeft}
        onSubmitContest={handleSubmitContest}
        onToggleNavMenu={() => setIsNavMenuOpen(!isNavMenuOpen)}
        isNavMenuOpen={isNavMenuOpen}
      />

      <div className="container mx-auto">
        <LiveContestLayout
          leftPanelWidth={leftPanelWidth}
          onResizeStart={handleResizeStart}
          leftPanel={
            <ContestProblemPanel problem={questions[currentQuestion]} />
          }
          rightPanel={
            <ContestCodePanel
              code={code}
              onChange={setCode}
              language={language}
              onLanguageChange={setLanguage}
              onRunCode={handleRunCode}
              onMarkSolved={handleMarkSolved}
              isRunning={isRunning}
              showTerminal={showTerminal}
              terminalOutput={terminalOutput}
              terminalTestResults={terminalTestResults}
              onCloseTerminal={() => setShowTerminal(false)}
            />
          }
        />
      </div>

      {/* Question Navigation Menu */}
      <QuestionNavMenu
        questions={questions}
        questionStates={questionStates}
        currentQuestion={currentQuestion}
        onQuestionChange={handleQuestionChange}
        isOpen={isNavMenuOpen}
        onClose={() => setIsNavMenuOpen(false)}
      />

      {/* Webcam Preview */}
      <WebcamPreview enabled={cameraPermission} />

      {/* Summary Popup */}
      <SummaryPopup
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        onSubmit={handleSubmitFinal}
        questionStates={questionStates}
        timeLeft={timeLeft}
      />
    </div>
  );
};

export default LiveContestPage;