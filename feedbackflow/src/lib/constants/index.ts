// constants.js
import { MessagesSquare, Sparkles, Laugh, TextCursor, Command, PartyPopper, LayoutDashboard, ScanEye, SquareGanttChart, Wrench, CodeXml, Delete, Check, SlidersVertical, List, User, } from 'lucide-react';

export const navbarRoutes = [
  { name: 'Home', route: '/Home' },
  { name: 'Dashboard', route: '/dashboard' },
  { name: 'Featues', route: '/featues' },
  { name: 'About', route: '/about' },
  { name: 'Contact', route: '/contact' },
  { name: 'Login', route: '/login' },
  { name: 'Sign Up', route: '/signup' },
  
];

export const headerWords = [
  { text: "Capture" },
  { text: "5X" },
  { text: "more" },
  { text: "5" },
  { text: "star" },
  { text: "reviews",
    className: "text-4xl break-all font-bold text-slate-700"
  }
];

export const feedback_features = [
    "Bloat-free, will never slow your product down",
    "Easy to set up in 5 minutes or less",
    "Automate customer feedback while capturing 5-star reviews",
    "Customizable feedback forms for tailored insights",
    "Real-time analytics for actionable feedback",
    "Seamless integration with popular platforms"
]

export const feedbackData = [
  {
    title: "Collect valuable feedback",
    paragraph: "Collect valuable feedback from your users at the most opportune times, and ensure their satisfaction.",
    icon: MessagesSquare
  },
  {
    title: "Encourage 5-star reviews",
    paragraph: "Encourage satisfied users to leave glowing 5-star reviews on your preferred review platform.",
    icon: Sparkles
  },
  {
    title: "Effortless feedback management",
    paragraph: "Automate feedback collection, review analytics effortlessly, and watch positive reviews roll in.",
    icon: Command 
  },
  {
    title: "Build stronger connections",
    paragraph: "Connect with your users on a deeper level by understanding their needs and challenges.",
    icon: PartyPopper
  },
  {
    title: "Seamless user experience",
    paragraph: "Keep users engaged on your site with a non-intrusive feedback form that enhances their experience.",
    icon: Laugh
  },
  {
    title: "Tailored and lightweight solution",
    paragraph: "Customize your feedback widget effortlessly without compromising your site's performance.",
    icon: TextCursor
  }
];

export const strategies = [
  { text: "Leverage automation to move fast" },
  { text: "Always give customers a human to chat to" },
  { text: "Automate customer support and close leads faster" }
];

export const pricingData = [
  {
    title: "Startup",
    price: "$17",
    features: [
      "Up to 50 reviews/month",
      "Drive more feedback and 5-star reviews",
      "1 individual user",
      "Customize your survey and widget",
      "Basic email support",
      "14 Day Free Trial"
    ],
    due: 'per month',
    status: ""
  },
  {
    title: "Growth",
    price: "$47",
    features: [
      "Up to 200 reviews/month",
      "Basic reporting and analytics",
      "1 individual user",
      "Up to 200 feedback ratings per month",
      "Preferred email support",
      "14 Day Free Trial"
    ],
    due: 'per month',
    status: 'Popular'
  },
  {
    title: "Business",
    price: "$77",
    features: [
      "Up to 1,000 reviews/month",
      "Advanced reporting and analytics",
      "Remove TrustLoop branding",
      "Up to 1,000 feedback ratings per month",
      "Priority chat & email support",
      "14 Day Free Trial"
    ],
    due: 'per month',
    status: 'Best'
  },
  {
    title: "Enterprise",
    price: "Contact Us",
    features: [
      "Unlimited reviews/month",
      "Early access to advanced features",
      "Up to 5 individual users",
      "Unlimited feedback ratings per month",
      "Priority chat & 24/7 email support"
    ],
    due: '',
    status: ''
  }
];

interface SidebarItem {
  name: string;
  option: string;
  icon: any; // Define the type of icon as a React component
}

export const sidebarData: SidebarItem[] = [
    {name: "Dashboard", option: "dashboard", icon: LayoutDashboard},
    {name: "Reviews", option: "reviews", icon: ScanEye},
    {name: "Plan", option: "plan", icon: SquareGanttChart},
    {name: "Survey Builder", option: "survey-builder", icon: Wrench},
    {name: "Widget", option: "widget", icon: CodeXml}
]

export const surveyQuestionOptions = [
  {
    icon: Delete,
    name: "Short Question",
    option: "short-question"
  },
  {
    icon: Check,
    name: "Yes or No",
    option: "yes-no"
  },
  {
    icon: SlidersVertical,
    name: "Sliding",
    option: "sliding"
  },
  {
    icon: List,
    name: "Multiple Choice",
    option: "multiple-choice"
  },
  {
    icon: User,
    name: "Contact Info",
    option: "contact-info"
  },
  
];

export const multipleChoiceOptions = [
    { id: 'satisfied', emoji: '😊', label: 'Satisfied' },
    { id: 'dissatisfied', emoji: '😞', label: 'Dissatisfied' },
    { id: 'neutral', emoji: '😐', label: 'Neutral' },
    { id: 'excited', emoji: '😆', label: 'Excited' },
    { id: 'frustrated', emoji: '😠', label: 'Frustrated' }
  ];