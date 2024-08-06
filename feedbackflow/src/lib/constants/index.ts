// constants.js
import { CreditCard, Settings, Keyboard, Users, UserPlus, Mail, MessageSquare, PlusCircle, Plus, Github, LifeBuoy, Cloud, LogOut, MessagesSquare, Home, Sparkles, Laugh, CircleUser, TextCursor, BadgeInfo, Feather, Command, PartyPopper, LayoutDashboard, ScanEye, SquareGanttChart, Wrench, CodeXml, Delete, Check, SlidersVertical, List, User, } from 'lucide-react';

export const navbarRoutes = [
  { name: 'Home', route: '/', icon: Home },
  { name: 'Dashboard', route: '/dashboard', icon: LayoutDashboard },
  { name: 'Featues', route: '/featues', icon: Feather  },
  { name: 'About', route: '/about', icon: BadgeInfo },
  { name: 'Contact', route: '/contact', icon: CircleUser },
  
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
  href: string;
}

export const sidebarData: SidebarItem[] = [
    {name: "Dashboard", option: "dashboard", icon: LayoutDashboard, href: "/panel"},
    {name: "Reviews", option: "reviews", icon: ScanEye, href: "/reviews"},
    {name: "Plan", option: "plan", icon: SquareGanttChart, href:"/plan"},
    {name: "Survey Builder", option: "survey-builder", icon: Wrench, href:"/survey-builder"},
    {name: "Widget", option: "widget", icon: CodeXml, href:"/widget"}
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

export const lessThan5StarQuestions = [
    { question: "How satisfied are you with our product?", type: "rating", options: null, order: 1 },
    { question: "What improvements would you suggest?", type: "text", options: null, order: 2 },
    { question: "Would you recommend our product to others?", type: "yesno", options: null, order: 3 }
  ]

export const fiveStarQuestions = [
    { question: "Rate our service from 1 to 5", type: "fivestar", options: null, order: 1 },
    { question: "What did you like most about our service?", type: "text", options: null, order: 2 },
    { question: "How likely are you to use our service again?", type: "fivestar", options: null, order: 3 }
  ]

export const menuItems = [
  { icon: User, text: "Profile" },
  { icon: CreditCard, text: "Billing" },
  { icon: Settings, text: "Settings" },
  { icon: Github, text: "GitHub" },
  { icon: LifeBuoy, text: "Support" },
  { icon: Cloud, text: "API", disabled: true },
  { icon: LogOut, text: "Log out" }
];
