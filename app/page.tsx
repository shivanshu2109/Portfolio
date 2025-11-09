"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Brain,
  Cpu,
  Zap,
  X,
  ChevronDown,
  ChevronUp,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { ChatbotWidget } from "@/components/chatbot-widget"

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [animatedSections, setAnimatedSections] = useState<Set<string>>(new Set())
  const [aiNodes, setAiNodes] = useState<Array<{ x: number; y: number; connections: number[] }>>([])
  const [binaryStreams, setBinaryStreams] = useState<Array<{ x: number; y: number; speed: number; opacity: number }>>(
    [],
  )
  const [dataFlows, setDataFlows] = useState<Array<{ x: number; y: number; angle: number; speed: number }>>([])
  const [clickedWorkCard, setClickedWorkCard] = useState<number | null>(null)
  const [clickedProjectCard, setClickedProjectCard] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [currentGraphIndex, setCurrentGraphIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  const aboutRef = useRef<HTMLElement>(null)
  const experienceRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsMounted(true) // Set mounted state for client-side only rendering
    
    const handleBeforeUnload = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString())
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    // Restore scroll position on mount
    const savedPosition = sessionStorage.getItem("scrollPosition")
    if (savedPosition) {
      window.scrollTo(0, Number.parseInt(savedPosition))
      sessionStorage.removeItem("scrollPosition")
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    setIsVisible(true)

    const generateAINodes = () => {
      const nodes = []
      for (let i = 0; i < 15; i++) {
        nodes.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          connections: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => Math.floor(Math.random() * 15)),
        })
      }
      setAiNodes(nodes)
    }

    const generateBinaryStreams = () => {
      const streams = []
      for (let i = 0; i < 12; i++) {
        streams.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          speed: 0.5 + Math.random() * 1.5,
          opacity: 0.1 + Math.random() * 0.3,
        })
      }
      setBinaryStreams(streams)
    }

    const generateDataFlows = () => {
      const flows = []
      for (let i = 0; i < 8; i++) {
        flows.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          angle: Math.random() * 360,
          speed: 0.3 + Math.random() * 0.7,
        })
      }
      setDataFlows(flows)
    }

    generateAINodes()
    generateBinaryStreams()
    generateDataFlows()

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id || entry.target.getAttribute("data-section")
          if (sectionId) {
            setAnimatedSections((prev) => new Set([...prev, sectionId]))
          }
        }
      })
    }, observerOptions)

    const sections = [
      aboutRef.current,
      experienceRef.current,
      projectsRef.current,
      skillsRef.current,
      contactRef.current,
    ]
    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const handleCompanyClick = (index: number) => {
    setClickedWorkCard(index)
    setTimeout(() => {
      setSelectedExperience(index)
      setClickedWorkCard(null)
    }, 150)
  }

  const handleProjectClick = (index: number) => {
    setClickedProjectCard(index)
    setTimeout(() => {
      setSelectedProject(index)
      setClickedProjectCard(null)
    }, 150)
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
  }

  const closeExperienceModal = () => {
    setSelectedExperience(null)
  }

  const handleDownloadResume = () => {
    // Download the existing PDF file from the public folder
    const link = document.createElement('a')
    link.href = '/Shivanshu-Mishra-Resume.pdf'
    link.download = 'Shivanshu_Mishra_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const workExperience = [
    {
      title: "AI Engineer Intern",
      company: "Samtek",
      location: "Virginia",
      period: "June 2025 - August 2025",
      logo: "/images/samtek-logo-new.png",
      details: [
        "Used Python, AWS Bedrock, and NLP to develop a robust scalable, AI-powered cloud configuration system that automatically converts cloud setup files, reducing manual effort by 30 hours per week",
        "Designed a Streamlit based app using FastAPI and CI/CD pipeline for file handling, conversion and validation using LLMs across different cloud platforms and used Power BI dashboards for real-time process monitoring",
        "Built a dual Interface platform with both web and CLI access, ensuring adoption by technical and non-technical users and simplifying workflows across teams",
        "Implemented a caching framework using Python OOP and Machine Learning libraries (NumPy, Pandas, scikit-learn), cutting API calls by 80% and enabling faster cache tracking",
      ],
      qaData: [
        {
          question: "What was the project?",
          answer:
            "The project was a Cloud Converter Calculator for Samtek. It helps clients evaluate the cost and feasibility of migrating their applications from a source cloud service to a target cloud service. Additionally, it allows clients to check the pricing of cloud services if they want to deploy their applications on a specific cloud platform.",
        },
        {
          question: "What was your role?",
          answer:
            "I worked as an AI Intern, responsible for implementing the cloud service YAML conversion pipeline. My role involved developing an automated conversion system using LLMs that transforms a source cloud service YAML file into a target cloud YAML file, with efficiency and accuracy checks.",
        },
        {
          question: "How did you approach it?",
          answer:
            "My approach had three key steps:\n\nLLM-based Conversion: I created a prompt for the LLM (via the company-provided API) to convert the source YAML configuration to the target cloud YAML.\n\nCaching System: I implemented a caching mechanism to store previously converted configurations, reducing redundant API calls and improving efficiency.\n\nValidation Layer: I added a validation step by passing the output YAML back to the LLM with a validation prompt. The LLM verified if the conversion was accurate. If not, it flagged errors for manual review.",
        },
        {
          question: "What were the results?",
          answer:
            "Reduced API calls significantly thanks to caching.\n\nIncreased reliability, with automated validation ensuring correct cloud YAML conversion.\n\nProvided a scalable solution that clients can use for cloud migration cost estimation and configuration assessment.",
        },
      ],
    },
    {
      title: "Technical Lead Intern",
      company: "Alternative Clinic",
      location: "Mumbai",
      period: "June 2023 - September 2023",
      logo: "/medical-clinic-logo.png",
      details: [
        "Led development of a predictive data model using Pandas and Scikit-learn, reducing false positives by 15% and making it possible for patients to get treatment earlier",
        "Worked in a client-facing role and launched a digital clinic portal using Flask and AWS (S3) for storage with appointment booking and health record access, reducing admin workload",
      ],
      qaData: [
        {
          question: "What was the project?",
          answer:
            "The project focused on optimizing clinic operations and patient care at Alternative Clinic. This included building a predictive model for diagnosis alerts, creating an online clinic portal, and improving the appointment confirmation process. The goal was to enhance patient experience, reduce administrative overhead, and improve operational efficiency.",
        },
        {
          question: "What was your role?",
          answer:
            "I served as the Technical Lead, overseeing the development and implementation of data-driven solutions and digital tools to improve clinic workflows, patient engagement, and predictive healthcare alerts.",
        },
        {
          question: "How did you approach it?",
          answer:
            "My approach involved three main components:\n\nPredictive Modeling: I engineered a predictive model using patient data to reduce false positive diagnosis alerts by 15%, enabling earlier interventions for patients.\n\nDigital Clinic Portal: I designed and launched an online portal that automated appointment scheduling and provided digital access to health records, streamlining administrative tasks.\n\nAppointment Confirmation Optimization: I integrated SMS reminders into the appointment system, reducing no-show appointments by 28% and improving the efficiency of doctor schedules.",
        },
        {
          question: "What were the results?",
          answer:
            "Reduced false positive diagnosis alerts by 15%, positively impacting ~500 patients in the first quarter.\n\nIncreased new patient acquisition by 43% through the online clinic portal.\n\nAchieved a 28% reduction in no-show appointments, optimizing patient flow and administrative efficiency.",
        },
      ],
    },
    {
      title: "AI and ML Intern",
      company: "V-Line Infotech Pvt Ltd",
      location: "Delhi",
      period: "January 2023 - April 2023",
      logo: "/images/vline-logo.png",
      details: [
        "Framed and enhanced an ML pipeline using TensorFlow, OpenCV, and Tesseract OCR to extract text from bank statements, achieving a 15% accuracy improvement through iterative testing and fine-tuning",
        "Built an ETL pipeline for financial documents by fine-tuning LayoutLM (Hugging Face) and deploying with Kubernetes, improving parsing speed 20% and ensuring reliable key information extraction",
      ],
      qaData: [
        {
          question: "What was the project?",
          answer:
            "The project focused on automating text extraction from bank statements using advanced OCR and machine learning techniques. The goal was to improve accuracy and efficiency in processing large volumes of financial documents.",
        },
        {
          question: "What was your role?",
          answer:
            "I worked as an Artificial Intelligence and Machine Learning Intern, responsible for developing, optimizing, and testing machine learning models for text extraction, as well as preprocessing and annotating large datasets to improve model performance.",
        },
        {
          question: "How did you approach it?",
          answer:
            "My approach involved three main steps:\n\nModel Development and Optimization: I designed and refined an OCR-based machine learning model to extract text from bank statements, improving text extraction accuracy by 15%.\n\nData Preprocessing and Annotation: I collaborated with the team to preprocess and manually annotate a dataset of 40,000+ bank statements to ensure high-quality training data.\n\nEfficiency Improvements: Through iterative testing and workflow optimization, we reduced document parsing time by 20% while improving recognition accuracy.",
        },
        {
          question: "What were the results?",
          answer:
            "• Increased text extraction accuracy by 15% using optimized OCR and ML techniques.\n\n• Reduced document parsing time by 20%, streamlining large-scale financial document processing.\n\n• Created a high-quality annotated dataset of over 40,000 bank statements for future ML applications.",
        },
      ],
    },
  ]

  const projects = [
    {
      title: "Cheque Image Feature Extraction System",
      description: "Automated Cheque Information Extraction",
      logo: "/images/checksmart-logo.png",
      githubLink: "https://github.com/shivanshu2109/CheckSmart.git",
      content:
        "Worked with deep learning models (TrOCR, Donut, and Tesseract) to build OCR systems for handwritten financial checks, using transfer learning, and maintained a Git repository for teamwork.",
      tags: ["TrOCR", "Donut", "Tesseract", "OpenCV", "Computer Vision"],
      achievement:
        "Used Computer vision techniques with OpenCV and matplotlib to preprocess 14k+ check images and deployed on GCP for user interaction.",
      graphs: [
        {
          src: "/images/graphs/train-vs-validation-all-models.png",
          title: "Train vs Validation Accuracy for All Models",
        },
        { src: "/images/graphs/accuracy-amount-words.png", title: "Accuracy for Amount Words" },
        { src: "/images/graphs/top-20-amount-digits.png", title: "Top 20 Most Frequent Amount Digits" },
        { src: "/images/graphs/accuracy-amount-digits.png", title: "Accuracy for Amount Digits" },
        { src: "/images/graphs/accuracy-date.png", title: "Accuracy for Date" },
        { src: "/images/graphs/accuracy-payee.png", title: "Accuracy for Payee" },
        { src: "/images/graphs/top-20-payee-names.png", title: "Top 20 Most Frequent Payee Names" },
      ],
      detailedSections: [
        {
          title: "Overview",
          content:
            "CheckSmart is an automated cheque processing system designed to extract key fields from Indian cheque images using OCR and deep learning. The system supports both single and batch image processing, delivering structured outputs in CSV or JSON formats.",
        },
        {
          title: "Extracted Fields",
          content: "• Payee Name\n• Date\n• Amount in Digits\n• Amount in Words",
        },
        {
          title: "Core Technologies",
          content:
            "• Python & PyTorch\n• HuggingFace Transformers (TrOCR)\n• Google Cloud Platform (GCP)\n• TorchVision for data augmentation",
        },
        {
          title: "How It Works",
          content:
            "1. Image Preprocessing: Resize, crop, and mask cheque images.\n2. Manual Labeling: Each field annotated and stored in JSON.\n3. Field-Specific OCR Models: Trained separate TrOCR models (microsoft/trocr-base-handwritten) for each field.\n4. Inference & Output: Final structured data exported as .csv or .json.",
        },
        {
          title: "Model Performance",
          isTable: true,
          tableData: [
            {
              field: "Payee Name",
              training: "98.82%",
              validation: "52.28%",
              notes: "Overfitting due to label imbalance",
            },
            { field: "Date", training: "68.85%", validation: "64.77%", notes: "Format inconsistencies" },
            { field: "Amount (Digits)", training: "99.06%", validation: "91.09%", notes: "Most reliable field" },
            {
              field: "Amount (Words)",
              training: "88.60%",
              validation: "49.78%",
              notes: "Hardest due to handwriting variety",
            },
          ],
        },
      ],
    },
    {
      title: "Cloud Configuration Translator & Validator",
      description: "AI-Powered Multi-Cloud Migration Tool",
      logo: "/cloud-infrastructure-aws-azure-gcp.jpg",
      githubLink: "https://github.com/shivanshu2109/Cloud-Service-Conveter.git",
      content:
        "Enterprise-grade AI-powered application that automates cloud infrastructure configuration translation between AWS, Azure, and GCP platforms, reducing manual migration effort by 90%.",
      tags: ["AWS Bedrock", "Python", "Streamlit", "Claude 3.5", "LLaMA", "PyYAML"],
      achievement:
        "Reduced API costs by 80% through intelligent caching and provided seamless multi-cloud translation with hybrid AI validation.",
      detailedSections: [
        {
          title: "Project Overview",
          content:
            "An enterprise-grade AI-powered application that automates cloud infrastructure configuration translation between AWS, Azure, and GCP platforms. Built during a summer internship, this system reduces manual cloud migration effort by 90% while ensuring accuracy through intelligent validation and provides significant cost savings through smart caching.",
        },
        {
          title: "Key Features",
          content:
            "• Multi-Cloud Translation: Seamless conversion between AWS, Azure, and GCP configurations\n• AI-Powered Validation: Hybrid validation system combining AI analysis with rule-based checks\n• Intelligent Caching: Reduces API costs by 80% through sophisticated caching mechanisms\n• Interactive Web Interface: User-friendly Streamlit dashboard for real-time processing\n• Manual Editing: In-browser YAML editor with syntax validation\n• Batch Processing: Support for multiple resource configurations\n• Error Recovery: Comprehensive error handling with graceful fallbacks",
        },
        {
          title: "Technology Stack",
          content:
            "Core Technologies:\n• Backend: Python 3.8+\n• Frontend: Streamlit\n• AI/ML: AWS Bedrock (Claude 3.5, LLaMA, Nova Pro)\n• Data Processing: PyYAML, JSON\n• Cloud SDK: boto3 for AWS integration\n\nAI Models Supported:\n• Claude 3.5 Sonnet: Latest and most capable model\n• Claude 3 Sonnet: Balanced performance and cost\n• Claude 3.7 Sonnet: Specialized cloud expertise\n• LLaMA 3.1 70B: Open-source alternative\n• DeepSeek Coder V2: Code-focused model\n• Nova Pro: Amazon's latest model",
        },
        {
          title: "Architecture",
          content:
            "Frontend (Streamlit):\n• User-friendly web interface\n• Real-time processing feedback\n• Manual YAML editing capabilities\n\nCore Engine:\n• Translation: LLM-powered configuration conversion\n• Validation: Hybrid AI + rule-based validation\n• Caching: Intelligent cache management system\n\nAI Services:\n• AWS Bedrock integration\n• Multiple LLM model support\n• Prompt template management\n\nData Layer:\n• File I/O operations\n• Cache storage and retrieval\n• Configuration management",
        },
        {
          title: "Security & Best Practices",
          content:
            "Security Measures:\n• AWS IAM: Least privilege access for Bedrock services\n• Credential Management: Environment-based configuration\n• Data Privacy: No sensitive data stored in cache\n• Error Handling: Comprehensive exception management\n\nBest Practices:\n• Cost Optimization: Use caching to minimize API calls\n• Validation: Always validate critical translations\n• Backup: Regular cache backups for important translations\n• Monitoring: Track cache hit rates and performance",
        },
      ],
    },
    {
      title: "Multi-Modal Movie Genre Classification",
      description: "Multi-Modal AI System",
      logo: "/movie-film-reel-cinema.jpg",
      githubLink: "https://github.com/shivanshu2109/MultiModalMovieGenreClassifier.git",
      content:
        "Implemented a multi-modal AI system combining NLP (DistilBERT) and computer vision (ConvNeXt-tiny, Torchvision) to classify movies, trained on large datasets and optimized for scalable performance.",
      tags: ["ConvNeXt", "DistilBERT", "PyTorch", "Torchvision", "Multi-Modal"],
      achievement:
        "Developed and deployed a cloud-ready full-stack web application with Flask and REST APIs, implementing CI/CD pipelines.",
      graphs: [
        {
          src: "/images/graphs/movie-evaluation-metrics.png",
          title: "Evaluation Metrics per Epoch",
        },
        {
          src: "/images/graphs/movie-loss-per-epoch.png",
          title: "Loss per Epoch",
        },
      ],
      detailedSections: [
        {
          title: "Overview",
          content:
            "A sophisticated multi-modal classification system that combines visual features from movie posters using ConvNeXt-tiny architecture with textual features from plot summaries using DistilBERT. The system achieves high accuracy by fusing information from both modalities through a custom fusion layer.",
        },
        {
          title: "Technical Architecture",
          content:
            "• Visual Processing: ConvNeXt-tiny for poster image feature extraction\n• Text Processing: DistilBERT for plot summary encoding\n• Fusion Layer: Custom neural network combining both modalities\n• Training: Large-scale dataset with 10 epochs achieving 94%+ accuracy",
        },
        {
          title: "Key Features",
          content:
            "• Multi-modal learning combining vision and language\n• Transfer learning from pre-trained models\n• Scalable cloud deployment with Flask REST APIs\n• CI/CD pipeline for continuous integration",
        },
      ],
    },
    {
      title: "EfficientNet-B0 vs B1 Comparison",
      description: "Deep Learning Model Architecture Analysis",
      logo: "/efficientnet-neural-network-architecture.jpg",
      githubLink: "https://github.com/shivanshu2109/EfficientNet-B0-vs-B1-Comparison.git",
      content:
        "Compare training speed, accuracy, and generalization between two EfficientNet-Lite architectures built from scratch in PyTorch on the CIFAR-100 dataset.",
      tags: ["PyTorch", "EfficientNet", "CIFAR-100", "MBConv", "Deep Learning"],
      achievement:
        "Built custom EfficientNet architectures from scratch with MBConv blocks and achieved 34.37% validation accuracy with B0-like model, demonstrating superior generalization.",
      graphs: [
        {
          src: "/images/graphs/efficientnet-validation-loss.png",
          title: "Validation Loss vs. Epochs",
        },
        {
          src: "/images/graphs/efficientnet-validation-accuracy.png",
          title: "Validation Top-1 Accuracy vs. Epochs",
        },
      ],
      detailedSections: [
        {
          title: "Project Overview",
          content:
            "This project implements and compares EfficientNet-Lite B0 and a mini B1 variant on the CIFAR-100 dataset using PyTorch. We build the models from scratch to understand performance trade-offs across training speed, validation accuracy, and generalization over 100 epochs.",
        },
        {
          title: "Key Features",
          content:
            "• EfficientNet-Lite Implementation: Custom modules built using PyTorch\n• MBConv Blocks: Includes depthwise/pointwise convolutions, SE blocks, and skip connections\n• Custom Swish Activation: Implemented as x * sigmoid(x)\n• CIFAR-100 Dataset: Automatically downloaded and preprocessed\n• Side-by-Side Comparison: Visual & quantitative comparison between B0 and mini B1",
        },
        {
          title: "Model Comparison",
          isTable: true,
          tableData: [
            {
              field: "B0-like Model",
              training: "Baseline",
              validation: "34.37%",
              notes: "✅ Best performance - Stable learning",
            },
            {
              field: "Mini B1 Model",
              training: "Deeper, more complex",
              validation: "24.14%",
              notes: "❌ Lower accuracy - Early overfitting",
            },
          ],
        },
        {
          title: "Technical Implementation",
          content:
            "Architecture Components:\n• 3-layer Convolutional Neural Network for feature extraction\n• MBConv blocks with depthwise separable convolutions\n• Squeeze-and-Excitation (SE) blocks for channel attention\n• Skip connections for gradient flow\n• Custom Swish activation function\n\nTraining Details:\n• Dataset: CIFAR-100 (100 classes)\n• Epochs: 100\n• Framework: PyTorch\n• Preprocessing: Automatic normalization and augmentation",
        },
        {
          title: "Technologies Used",
          content:
            "• PyTorch: Deep learning framework\n• torchvision: Dataset loading and preprocessing\n• matplotlib: Visualization of training curves\n• scikit-learn: Evaluation metrics\n• seaborn: Statistical data visualization\n• numpy: Numerical computations",
        },
        {
          title: "Conclusion",
          content:
            "The B0-like model generalizes better and is preferred for deployment or further improvement. Key findings:\n\n• B0-like model achieved 34.37% final validation accuracy with stable learning\n• Mini B1 model showed early overfitting with 24.14% validation accuracy\n• Deeper models require more careful regularization and training strategies\n• Custom implementation provides deep understanding of EfficientNet architecture",
        },
      ],
    },
    {
      title: "Handwriting-to-Text Converter",
      description: "Custom RNN Architecture",
      logo: "/handwriting-text-pen-writing.jpg",
      githubLink: "https://github.com/shivanshu2109/handwriting-recognition",
      content:
        "Built sentence-level handwriting recognition using custom CRNN with 3-layer CNN and bidirectional LSTM.",
      tags: ["CRNN", "LSTM", "CTC Loss", "TensorFlow"],
      achievement: "Achieved robust transcription performance on IAM Sentences dataset with CTC loss optimization.",
      detailedSections: [
        {
          title: "Overview",
          content:
            "This project implements a custom Convolutional Recurrent Neural Network (CRNN) architecture for handwriting recognition. The system uses a 3-layer CNN for feature extraction followed by a 2-layer bidirectional LSTM for sequence modeling, trained with Connectionist Temporal Classification (CTC) loss for alignment-free training.",
        },
        {
          title: "Architecture Details",
          content:
            "• 3-layer Convolutional Neural Network for feature extraction\n• 2-layer Bidirectional LSTM for sequence modeling\n• CTC Loss for alignment-free training\n• Trained on IAM Sentences dataset",
        },
        {
          title: "Performance Metrics",
          content:
            "• Character Error Count (CEC): 2,453\n• Word Error Count (WEC): 3,968\n• Greedy decoding for transcription\n• Robust performance on handwritten text",
        },
      ],
    },
  ]

  const handleShowMoreProjects = () => {
    setShowAllProjects(!showAllProjects)
    
    if (!showAllProjects) {
      // Smooth scroll to show expanded projects after animation starts
      setTimeout(() => {
        if (projectsRef.current) {
          const allCards = projectsRef.current.querySelectorAll('.grid')
          const secondGrid = allCards[1] as HTMLElement
          if (secondGrid) {
            secondGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          }
        }
      }, 300)
    }
  }

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 3)

  const nextGraph = () => {
    if (selectedProject !== null && projects[selectedProject].graphs) {
      setCurrentGraphIndex((prev) => (prev + 1) % projects[selectedProject].graphs!.length)
    }
  }

  const prevGraph = () => {
    if (selectedProject !== null && projects[selectedProject].graphs) {
      setCurrentGraphIndex(
        (prev) => (prev - 1 + projects[selectedProject].graphs!.length) % projects[selectedProject].graphs!.length,
      )
    }
  }

  const goToGraph = (index: number) => {
    setCurrentGraphIndex(index)
  }

  useEffect(() => {
    if (selectedProject !== null && projects[selectedProject].graphs) {
      const interval = setInterval(() => {
        nextGraph()
      }, 5000) // Change slide every 5 seconds

      return () => clearInterval(interval)
    }
  }, [selectedProject, currentGraphIndex])

  useEffect(() => {
    if (selectedProject !== null) {
      setCurrentGraphIndex(0)
    }
  }, [selectedProject])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/10 to-indigo-900/10"></div>

        <svg className="absolute inset-0 w-full h-full opacity-10">
          {aiNodes.map((node, i) => (
            <g key={i}>
              {node.connections.map((targetIndex, j) => {
                if (targetIndex < aiNodes.length && targetIndex !== i) {
                  const target = aiNodes[targetIndex]
                  return (
                    <line
                      key={j}
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2={`${target.x}%`}
                      y2={`${target.y}%`}
                      stroke="url(#aiGradient)"
                      strokeWidth="1"
                      className="animate-pulse"
                      style={{ animationDelay: `${j * 0.5}s` }}
                    />
                  )
                }
                return null
              })}
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="3"
                fill="#8b5cf6"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            </g>
          ))}
          <defs>
            <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>

        {["Neural Networks", "Deep Learning", "Computer Vision", "NLP", "Machine Learning", "AI"].map((term, i) => (
          <div
            key={term}
            className="absolute text-purple-400/10 text-sm font-mono animate-float-slow pointer-events-none"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${20 + i * 3}s`,
            }}
          >
            {term}
          </div>
        ))}

        {isMounted && [...Array(10)].map((_, i) => {
          const left = Math.random() * 100
          const top = Math.random() * 100
          const delay = Math.random() * 10
          const duration = 15 + Math.random() * 10
          return (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/20 rounded-full animate-float"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          )
        })}
        <div
          className="absolute w-96 h-96 bg-purple-500/3 rounded-full blur-3xl transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      <section className="min-h-screen flex items-center justify-center px-4 z-10 relative">
        <div
          className={`text-center space-y-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="relative mb-8">
            <div className="w-48 h-48 mx-auto relative group">
              {isMounted && binaryStreams.map((stream, i) => (
                <div
                  key={`binary-${i}`}
                  className="absolute text-xs font-mono text-purple-400/20 animate-float-slow pointer-events-none"
                  style={{
                    left: `${stream.x}%`,
                    top: `${stream.y}%`,
                    opacity: stream.opacity,
                    animationDelay: `${i * 0.8}s`,
                    animationDuration: `${15 + stream.speed * 5}s`,
                  }}
                >
                  {Array.from({ length: 8 }, () => Math.round(Math.random())).join("")}
                </div>
              ))}

              <svg
                className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
                style={{ transform: "scale(2)" }}
              >
                <defs>
                  <pattern id="circuit" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 20h40M20 0v40" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.3" />
                    <circle cx="20" cy="20" r="2" fill="#8b5cf6" opacity="0.4" />
                    <circle cx="0" cy="20" r="1" fill="#3b82f6" opacity="0.3" />
                    <circle cx="40" cy="20" r="1" fill="#3b82f6" opacity="0.3" />
                    <circle cx="20" cy="0" r="1" fill="#3b82f6" opacity="0.3" />
                    <circle cx="20" cy="40" r="1" fill="#3b82f6" opacity="0.3" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#circuit)" />
              </svg>

              {dataFlows.map((flow, i) => (
                <div
                  key={`flow-${i}`}
                  className="absolute w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse pointer-events-none"
                  style={{
                    left: `${flow.x}%`,
                    top: `${flow.y}%`,
                    animationDelay: `${i * 0.6}s`,
                    animationDuration: `${2 + flow.speed}s`,
                  }}
                />
              ))}

              {["TensorFlow", "PyTorch", "OpenCV", "Scikit-learn", "Pandas", "NumPy"].map((term, i) => (
                <div
                  key={`term-${i}`}
                  className="absolute text-xs font-mono text-indigo-400/30 animate-float-slow pointer-events-none whitespace-nowrap"
                  style={{
                    left: `${-50 + i * 40}%`,
                    top: `${-30 + (i % 3) * 60}%`,
                    animationDelay: `${i * 1.2}s`,
                    animationDuration: `${18 + i * 2}s`,
                  }}
                >
                  {term}
                </div>
              ))}

              {["Neural Networks", "Deep Learning", "Computer Vision", "NLP", "Machine Learning", "AI"].map(
                (term, i) => (
                  <div
                    key={`bg-term-${i}`}
                    className="absolute text-purple-400/10 text-sm font-mono animate-float-slow pointer-events-none"
                    style={{
                      left: `${10 + i * 15}%`,
                      top: `${20 + i * 10}%`,
                      animationDelay: `${i * 2}s`,
                      animationDuration: `${20 + i * 3}s`,
                    }}
                  >
                    {term}
                  </div>
                ),
              )}

              {isMounted && [...Array(10)].map((_, i) => {
                const left = Math.random() * 100
                const top = Math.random() * 100
                const delay = Math.random() * 10
                const duration = 15 + Math.random() * 10
                return (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-purple-400/20 rounded-full animate-float"
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      animationDelay: `${delay}s`,
                      animationDuration: `${duration}s`,
                    }}
                  />
                )
              })}

              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ transform: "scale(1.5)" }}>
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <defs>
                    <pattern id="hexagons" x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
                      <polygon
                        points="10,1 18.66,6 18.66,16 10,21 1.34,16 1.34,6"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#hexagons)" />
                </svg>
              </div>

              <svg
                className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
                style={{ transform: "scale(2.5)" }}
              >
                {Array.from({ length: 6 }, (_, i) => {
                  const angle = i * 60 * (Math.PI / 180)
                  const x1 = 50 + Math.cos(angle) * 30
                  const y1 = 50 + Math.sin(angle) * 30
                  const x2 = 50 + Math.cos(angle + Math.PI / 3) * 30
                  const y2 = 50 + Math.sin(angle + Math.PI / 3) * 30
                  return (
                    <g key={i}>
                      <line
                        x1={`${x1}%`}
                        y1={`${y1}%`}
                        x2={`${x2}%`}
                        y2={`${y2}%`}
                        stroke="#8b5cf6"
                        strokeWidth="1"
                        className="animate-pulse"
                        style={{ animationDelay: `${i * 0.3}s` }}
                      />
                      <circle
                        cx={`${x1}%`}
                        cy={`${y1}%`}
                        r="2"
                        fill="#3b82f6"
                        className="animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    </g>
                  )
                })}
              </svg>

              <img
                src="/images/shivanshu-profile.jpg"
                alt="Shivanshu Mishra"
                className="w-48 h-48 rounded-full object-cover border-3 border-purple-400 relative z-10"
              />
              <div className="absolute inset-0 rounded-full border-2 border-purple-400/50 animate-pulse z-10"></div>
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center animate-bounce z-20">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div
                className="absolute -bottom-2 -left-2 w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center animate-bounce z-20"
                style={{ animationDelay: "0.5s" }}
              >
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <div className="absolute top-1/2 -right-3 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center animate-pulse z-20">
                <Zap className="w-3 h-3.5 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-fade-in-up relative">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent blur-sm opacity-30"></span>
              <span className="relative">Code Conjurer & Machine Learning Magician</span>
            </h1>

            <p className="text-lg text-slate-200 max-w-2xl mx-auto text-center leading-relaxed animate-fade-in-up animation-delay-200">
              Passionate about building intelligent systems that solve real-world problems. Currently pursuing MS in AI
              at SUNY Buffalo.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4 animate-fade-in-up animation-delay-300">
              <span className="bg-purple-900/30 px-3 py-1.5 text-sm rounded-full border border-purple-600/30">
                Computer Vision
              </span>
              <span className="bg-purple-900/30 px-3 py-1.5 text-sm rounded-full border border-purple-600/30">Deep Learning</span>
              <span className="bg-purple-900/30 px-3 py-1.5 text-sm rounded-full border border-purple-600/30">NLP</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-6 animate-fade-in-up animation-delay-400">
            <Button
              onClick={() => scrollToSection("experience")}
              className="bg-purple-600 text-white px-6 py-2.5 text-base rounded-lg"
            >
              <span>View Experience</span>
            </Button>
            <Button onClick={() => setShowResumeModal(true)} className="bg-indigo-600 text-white px-6 py-2.5 text-base rounded-lg">
              <span>Resume</span>
            </Button>
          </div>

          <div className="flex justify-center gap-6 pt-6 animate-fade-in-up animation-delay-500">
            <a href="mailto:shivanshu985@gmail.com" className="text-slate-400 hover:text-purple-400 transition-colors">
              <Mail className="w-7 h-7" />
            </a>
            {/* CHANGE: Updated LinkedIn URL to correct profile */}
            <a
              href="https://www.linkedin.com/in/shivanshumishra21"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-purple-400 transition-colors"
            >
              <Linkedin className="w-7 h-7" />
            </a>
            {/* CHANGE: Updated GitHub URL to correct username */}
            <a
              href="https://github.com/shivanshu2109"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-purple-400 transition-colors"
            >
              <Github className="w-7 h-7" />
            </a>
          </div>
        </div>
      </section>

      <section
        className={`py-16 px-4 bg-slate-800/30 relative z-10 transition-all duration-700 ${
          animatedSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
        ref={aboutRef}
        data-section="about"
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-3xl font-bold text-center mb-12 relative transition-all duration-700 ${
              animatedSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Debug.exe: About Me & Education
            </span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full animate-pulse"></div>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - About Me */}
            <div
              className={`space-y-6 transition-all duration-700 ${
                animatedSections.has("about") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <h3 className="text-2xl font-semibold text-purple-300 mb-6 text-center">About Me</h3>
              {/* CHANGE: Increased padding to align with education images */}
              <div className="space-y-6 pt-24">
                <p className="text-lg text-slate-100 leading-relaxed">
                  I'm an AI/ML Engineer with a passion for developing innovative solutions that bridge the gap between
                  cutting-edge research and practical applications. Currently pursuing my MS in Artificial Intelligence
                  at SUNY Buffalo.
                </p>
                <p className="text-lg text-slate-100 leading-relaxed">
                  My expertise spans machine learning, computer vision, natural language processing, and cloud
                  infrastructure. I've successfully delivered enterprise-grade AI solutions that have reduced manual
                  effort by up to 90% and improved system performance significantly.
                </p>
              </div>
              {/* Location and Phone at the end */}
              <div className="pt-16 mt-auto space-y-3 border-t border-slate-700">
                <div className="flex items-center justify-center gap-3 text-purple-200">
                  <MapPin className="w-5 h-5 flex-shrink-0" />
                  <span>Buffalo, New York</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-purple-200">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span>+1 (716) 612-0226</span>
                </div>
              </div>
            </div>

            {/* Right Column - Education */}
            <div
              className={`space-y-6 transition-all duration-700 ${
                animatedSections.has("about") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              <h3 className="text-2xl font-semibold text-indigo-300 mb-6 text-center">Education</h3>
              <div className="space-y-4">
                {/* SUNY Buffalo */}
                <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900/50">
                  <div className="h-40 overflow-hidden">
                    <img
                      src="/images/buffalo-city.jpg"
                      alt="Buffalo, New York"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-semibold text-indigo-300">SUNY Buffalo</h4>
                    <p className="text-sm text-slate-300">Master of Science in Artificial Intelligence</p>
                    <p className="text-xs text-slate-400">Aug 2024 - Dec 2025 (Anticipated)</p>
                  </div>
                </div>

                {/* University of Mumbai */}
                <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900/50">
                  <div className="h-40 overflow-hidden">
                    <img src="/images/mumbai-city.jpg" alt="Mumbai, India" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-semibold text-indigo-300">University of Mumbai</h4>
                    <p className="text-sm text-slate-300">
                      Bachelor of Technology in Artificial Intelligence and Machine Learning
                    </p>
                    <p className="text-xs text-slate-400">2020 - 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedExperience !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={closeExperienceModal}
        >
          <div
            className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700 p-6 flex justify-between items-start z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center border-2 border-slate-500">
                  <img
                    src={workExperience[selectedExperience].logo || "/placeholder.svg"}
                    alt={`${workExperience[selectedExperience].company} logo`}
                    className="w-14 h-14 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-100">{workExperience[selectedExperience].company}</h3>
                  <p className="text-purple-300 font-semibold">{workExperience[selectedExperience].title}</p>
                  <p className="text-slate-400 text-sm">
                    {workExperience[selectedExperience].location} • {workExperience[selectedExperience].period}
                  </p>
                </div>
              </div>
              <button
                onClick={closeExperienceModal}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6 text-slate-400 hover:text-slate-100" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {workExperience[selectedExperience].qaData.map((qa, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    {qa.question}
                  </h4>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-line ml-4">{qa.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <section
        id="experience"
        ref={experienceRef}
        data-section="experience"
        className={`py-16 px-4 bg-slate-900/30 relative z-10 transition-all duration-700 ${
          animatedSections.has("experience") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-3xl font-bold text-center mb-12 relative transition-all duration-700 ${
              animatedSections.has("experience") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              My Corporate Survival Stories 💼
            </span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {workExperience.map((job, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-slate-700 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-200 cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${
                  animatedSections.has("experience") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                } ${clickedWorkCard === index ? "animate-card-click" : ""} card-hover-effect group relative overflow-hidden`}
                onClick={() => handleCompanyClick(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/20 group-hover:to-cyan-500/10 transition-all duration-200 pointer-events-none" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-shimmer"></div>
                </div>

                <CardHeader className="pb-4 relative z-10">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div
                      className={`w-32 h-32 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center border-2 border-slate-600 shadow-lg transition-all duration-300 group-hover:border-purple-400 group-hover:shadow-lg group-hover:shadow-purple-500/20`}
                    >
                      <img
                        src={job.logo || "/placeholder.svg"}
                        alt={`${job.company} logo`}
                        className="w-28 h-28 object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    <div className="space-y-2 transition-all duration-300 group-hover:scale-105">
                      <CardTitle className="text-xl text-slate-100 transition-colors duration-300 group-hover:text-purple-300">
                        {job.title}
                      </CardTitle>
                      <CardDescription className="text-purple-300 font-semibold text-lg transition-colors duration-300 group-hover:text-purple-200">
                        {job.company}
                      </CardDescription>
                      <p className="text-sm text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                        {job.location}
                      </p>
                      <Badge
                        variant="secondary"
                        className="bg-purple-800 text-purple-100 border-purple-600 px-3 py-1 transition-all duration-300 group-hover:bg-purple-700 group-hover:shadow-lg group-hover:shadow-purple-500/30"
                      >
                        {job.period}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {selectedProject !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={closeProjectModal}
        >
          <div
            className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700 p-6 flex justify-between items-start z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center border-2 border-slate-500">
                  <img
                    src={projects[selectedProject].logo || "/placeholder.svg"}
                    alt={`${projects[selectedProject].title} logo`}
                    className="w-14 h-14 object-contain rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-100">{projects[selectedProject].title}</h3>
                  <p className="text-purple-300 font-semibold">{projects[selectedProject].description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {/* CHANGE: Removed opacity-0 group-hover:opacity-100 from GitHub button */}
                <a
                  href={projects[selectedProject].githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-700/50 rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-5 h-5 text-slate-300" />
                </a>
                <button
                  onClick={closeProjectModal}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-slate-400 hover:text-slate-100" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-8">
                  {projects[selectedProject].detailedSections?.map((section, index) => (
                    <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 75}ms` }}>
                      {/* Section Header with animated underline */}
                      <div className="mb-4 pb-3 border-b border-purple-500/30">
                        <h4 className="text-xl font-bold bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent">
                          {section.title}
                        </h4>
                      </div>

                      {/* Content Rendering */}
                      {section.isTable ? (
                        <div className="overflow-x-auto bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-slate-600">
                                <th className="text-left py-3 px-2 text-purple-300 font-semibold">Field</th>
                                <th className="text-left py-3 px-2 text-purple-300 font-semibold">Training</th>
                                <th className="text-left py-3 px-2 text-purple-300 font-semibold">Validation</th>
                                <th className="text-left py-3 px-2 text-purple-300 font-semibold">Notes</th>
                              </tr>
                            </thead>
                            <tbody>
                              {section.tableData?.map((row, rowIndex) => (
                                <tr
                                  key={rowIndex}
                                  className="border-b border-slate-700/50 transition-colors duration-200"
                                >
                                  <td className="py-3 px-2 text-slate-200 font-medium">{row.field}</td>
                                  <td className="py-3 px-2 text-green-400 font-semibold">{row.training}</td>
                                  <td className="py-3 px-2 text-yellow-400 font-semibold">{row.validation}</td>
                                  <td className="py-3 px-2 text-slate-400 text-sm">{row.notes}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p className="text-slate-200 leading-relaxed whitespace-pre-line text-base">
                          {section.content}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Sidebar - Quick Info and Tags */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Project Tags Card */}
                  {projects[selectedProject].tags && (
                    <div
                      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-4 border border-purple-500/20 animate-fade-in-up"
                      style={{ animationDelay: "0ms" }}
                    >
                      <h5 className="text-sm font-bold text-purple-300 mb-3 uppercase tracking-widest">Technologies</h5>
                      <div className="flex flex-wrap gap-2">
                        {projects[selectedProject].tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-purple-500/20 text-purple-200 text-xs font-medium rounded-full border border-purple-500/30 inline-block"
                            style={{ animationDelay: `${75 + idx * 50}ms` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Achievement Card */}
                  {projects[selectedProject].achievement && (
                    <div
                      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-4 border border-cyan-500/20 animate-fade-in-up"
                      style={{ animationDelay: "75ms" }}
                    >
                      <h5 className="text-sm font-bold text-cyan-300 mb-2 uppercase tracking-widest">
                        Key Achievement
                      </h5>
                      <p className="text-slate-300 text-sm leading-relaxed">{projects[selectedProject].achievement}</p>
                    </div>
                  )}

                  {/* Quick Stats */}
                  <div
                    className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-4 border border-slate-700/50 animate-fade-in-up"
                    style={{ animationDelay: "150ms" }}
                  >
                    <h5 className="text-sm font-bold text-slate-300 mb-3 uppercase tracking-widest">Quick Info</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Status</span>
                        <span className="text-emerald-400 font-semibold">Active</span>
                      </div>
                      <div className="h-px bg-slate-700/50"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Sections</span>
                        <span className="text-slate-300 font-semibold">
                          {projects[selectedProject].detailedSections?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedProject === 0 && projects[selectedProject].graphs && (
                <div
                  className="mt-12 pt-8 border-t border-slate-700/50 animate-fade-in-up"
                  style={{ animationDelay: "300ms" }}
                >
                  <h4 className="text-xl font-bold bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent mb-4">
                    Performance Graphs
                  </h4>
                  <div className="relative bg-slate-900/50 rounded-lg overflow-hidden group">
                    <div className="relative h-64">
                      {projects[selectedProject].graphs.map((graph, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                            index === currentGraphIndex
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-95 pointer-events-none"
                          }`}
                        >
                          <img
                            src={graph.src || "/placeholder.svg"}
                            alt={graph.title}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Navigation controls */}
                    <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-t border-slate-700">
                      <button
                        onClick={() =>
                          setCurrentGraphIndex(
                            currentGraphIndex === 0
                              ? projects[selectedProject].graphs.length - 1
                              : currentGraphIndex - 1,
                          )
                        }
                        className="p-2 rounded-lg bg-slate-700/50 transition-colors duration-200"
                      >
                        <ChevronLeft className="w-4 h-4 text-slate-300" />
                      </button>

                      <div className="flex gap-2">
                        {projects[selectedProject].graphs.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentGraphIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentGraphIndex ? "w-8 bg-purple-500" : "bg-slate-600"
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() =>
                          setCurrentGraphIndex((currentGraphIndex + 1) % projects[selectedProject].graphs.length)
                        }
                        className="p-2 rounded-lg bg-slate-700/50 transition-colors duration-200"
                      >
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                      </button>
                    </div>

                    {/* Graph title */}
                    <div className="px-4 py-2 bg-slate-900/50 text-center border-t border-slate-700">
                      <p className="text-sm text-slate-400">
                        {projects[selectedProject].graphs[currentGraphIndex]?.title}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Similar graphs for other projects */}
              {selectedProject === 2 && projects[selectedProject].graphs && (
                <div
                  className="mt-12 pt-8 border-t border-slate-700/50 animate-fade-in-up"
                  style={{ animationDelay: "300ms" }}
                >
                  <h4 className="text-xl font-bold bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent mb-4">
                    Performance Graphs
                  </h4>
                  <div className="relative bg-slate-900/50 rounded-lg overflow-hidden">
                    <div className="relative h-64">
                      {projects[selectedProject].graphs.map((graph, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                            index === currentGraphIndex
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-95 pointer-events-none"
                          }`}
                        >
                          <img
                            src={graph.src || "/placeholder.svg"}
                            alt={graph.title}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-t border-slate-700">
                      <button
                        onClick={() =>
                          setCurrentGraphIndex(
                            currentGraphIndex === 0
                              ? projects[selectedProject].graphs.length - 1
                              : currentGraphIndex - 1,
                          )
                        }
                        className="p-2 rounded-lg bg-slate-700/50 transition-colors duration-200"
                      >
                        <ChevronLeft className="w-4 h-4 text-slate-300" />
                      </button>

                      <div className="flex gap-2">
                        {projects[selectedProject].graphs.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentGraphIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentGraphIndex ? "w-8 bg-purple-500" : "bg-slate-600"
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() =>
                          setCurrentGraphIndex((currentGraphIndex + 1) % projects[selectedProject].graphs.length)
                        }
                        className="p-2 rounded-lg bg-slate-700/50 transition-colors duration-200"
                      >
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                      </button>
                    </div>

                    <div className="px-4 py-2 bg-slate-900/50 text-center border-t border-slate-700">
                      <p className="text-sm text-slate-400">
                        {projects[selectedProject].graphs[currentGraphIndex]?.title}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedProject === 3 && projects[selectedProject].graphs && (
                <div
                  className="mt-12 pt-8 border-t border-slate-700/50 animate-fade-in-up"
                  style={{ animationDelay: "300ms" }}
                >
                  <h4 className="text-xl font-bold bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 bg-clip-text text-transparent mb-4">
                    Performance Graphs
                  </h4>
                  <div className="relative bg-slate-900/50 rounded-lg overflow-hidden">
                    <div className="relative h-64">
                      {projects[selectedProject].graphs.map((graph, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                            index === currentGraphIndex
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-95 pointer-events-none"
                          }`}
                        >
                          <img
                            src={graph.src || "/placeholder.svg"}
                            alt={graph.title}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-t border-slate-700">
                      <button
                        onClick={() =>
                          setCurrentGraphIndex(
                            currentGraphIndex === 0
                              ? projects[selectedProject].graphs.length - 1
                              : currentGraphIndex - 1,
                          )
                        }
                        className="p-2 rounded-lg bg-slate-700/50 transition-colors duration-200"
                      >
                        <ChevronLeft className="w-4 h-4 text-slate-300" />
                      </button>

                      <div className="flex gap-2">
                        {projects[selectedProject].graphs.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentGraphIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              index === currentGraphIndex ? "w-8 bg-purple-500" : "bg-slate-600"
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() =>
                          setCurrentGraphIndex((currentGraphIndex + 1) % projects[selectedProject].graphs.length)
                        }
                        className="p-2 rounded-lg bg-slate-700/50 transition-colors duration-200"
                      >
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                      </button>
                    </div>

                    <div className="px-4 py-2 bg-slate-900/50 text-center border-t border-slate-700">
                      <p className="text-sm text-slate-400">
                        {projects[selectedProject].graphs[currentGraphIndex]?.title}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <section
        ref={projectsRef}
        data-section="projects"
        className={`py-16 px-4 bg-slate-800/30 relative z-10 transition-all duration-700 ${
          animatedSections.has("projects") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-3xl font-bold text-center mb-12 relative transition-all duration-700 ${
              animatedSections.has("projects") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Code Babies I'm Proud Of 👶💻
            </span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
          </h2>
          <div className="transition-all duration-500 ease-in-out">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ease-in-out">
              {projects.slice(0, 3).map((project, index) => (
                <Card
                  key={index}
                  className={`bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-slate-700 hover:border-pink-400 hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-200 cursor-pointer transform hover:scale-105 hover:-translate-y-2 group relative overflow-hidden card-hover-effect ${
                    animatedSections.has("projects") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  } ${clickedProjectCard === index ? "animate-card-click" : ""}`}
                  onClick={() => handleProjectClick(index)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/15 transition-all duration-200 pointer-events-none" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/10 to-transparent animate-shimmer"></div>
                  </div>

                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 z-10 group/github p-2 bg-slate-700/80 rounded-lg transition-all duration-300 group-hover/github:bg-purple-600 group-hover/github:shadow-lg group-hover/github:shadow-purple-500/40"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-5 h-5 text-slate-300 transition-all duration-300 group-hover/github:text-white group-hover/github:scale-110" />
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/github:opacity-100 whitespace-nowrap pointer-events-none">
                      View on GitHub
                    </div>
                  </a>

                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div
                        className={`w-32 h-32 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center border-2 border-slate-600 shadow-lg transition-all duration-300 group-hover:border-purple-400 group-hover:shadow-lg group-hover:shadow-purple-500/20 ${
                          clickedProjectCard === index ? "animate-logo-bounce scale-110" : ""
                        }`}
                      >
                        <img
                          src={project.logo || "/placeholder.svg"}
                          alt={`${project.title} logo`}
                          className="w-28 h-28 object-contain rounded-lg transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      <div className="space-y-2 transition-all duration-300 group-hover:scale-105">
                        <CardTitle className="text-xl text-slate-100 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-purple-300">
                          {project.title}
                          <ExternalLink className="w-5 h-5 text-slate-400 transition-colors duration-300 group-hover:text-purple-400 group-hover:rotate-45" />
                        </CardTitle>
                        <CardDescription className="text-purple-300 font-semibold transition-colors duration-300 group-hover:text-purple-200">
                          {project.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 relative z-10 transition-all duration-300 group-hover:text-slate-100">
                    <p className="text-slate-300 text-center transition-colors duration-300 group-hover:text-slate-200">
                      {project.content}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          className="bg-purple-800/50 text-purple-200 border-purple-600/50 transition-all duration-300 group-hover:bg-purple-700/70 group-hover:text-purple-100 group-hover:border-purple-500"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-slate-400 text-center italic transition-colors duration-300 group-hover:text-slate-300">
                      {project.achievement}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional projects container with smooth expansion */}
            {showAllProjects && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {projects.slice(3).map((project, index) => (
                  <Card
                    key={index + 3}
                    className={`bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-slate-700 hover:border-pink-400 hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-200 cursor-pointer transform hover:scale-105 hover:-translate-y-2 group relative overflow-hidden animate-slide-down-fade-in ${
                      clickedProjectCard === index + 3 ? "animate-card-click" : ""
                    }`}
                    style={{
                      animationDelay: `${index * 150}ms`,
                    }}
                    onClick={() => handleProjectClick(index + 3)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/15 transition-all duration-200 pointer-events-none" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/10 to-transparent animate-shimmer"></div>
                    </div>

                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 z-10 group/github p-2 bg-slate-700/80 rounded-lg transition-all duration-300 group-hover/github:bg-purple-600 group-hover/github:shadow-lg group-hover/github:shadow-purple-500/40"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-5 h-5 text-slate-300 transition-all duration-300 group-hover/github:text-white group-hover/github:scale-110" />
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/github:opacity-100 whitespace-nowrap pointer-events-none">
                        View on GitHub
                      </div>
                    </a>

                    <CardHeader className="pb-4 relative z-10">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div
                          className={`w-32 h-32 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center border-2 border-slate-600 shadow-lg transition-all duration-300 group-hover:border-purple-400 group-hover:shadow-lg group-hover:shadow-purple-500/20`}
                        >
                          <img
                            src={project.logo || "/placeholder.svg"}
                            alt={`${project.title} logo`}
                            className="w-28 h-28 object-contain rounded-lg transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>

                        <div className="space-y-2 transition-all duration-300 group-hover:scale-105">
                          <CardTitle className="text-xl text-slate-100 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-purple-300">
                            {project.title}
                            <ExternalLink className="w-5 h-5 text-slate-400 transition-colors duration-300 group-hover:text-purple-400 group-hover:rotate-45" />
                          </CardTitle>
                          <CardDescription className="text-purple-300 font-semibold transition-colors duration-300 group-hover:text-purple-200">
                            {project.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10 transition-all duration-300 group-hover:text-slate-100">
                      <p className="text-slate-300 text-center transition-colors duration-300 group-hover:text-slate-200">
                        {project.content}
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            className="bg-purple-800/50 text-purple-200 border-purple-600/50 transition-all duration-300 group-hover:bg-purple-700/70 group-hover:text-purple-100 group-hover:border-purple-500"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-slate-400 text-center italic transition-colors duration-300 group-hover:text-slate-300">
                        {project.achievement}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center mt-12">
            <Button
              onClick={handleShowMoreProjects}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <span className="relative flex items-center gap-2">
                {showAllProjects ? (
                  <>
                    Show Less
                    <ChevronUp className="w-5 h-5 animate-bounce" />
                  </>
                ) : (
                  <>
                    More Projects
                    <ChevronDown className="w-5 h-5 animate-bounce" />
                  </>
                )}
              </span>
            </Button>
          </div>
        </div>
      </section>

      <section
        ref={skillsRef}
        data-section="skills"
        className={`py-16 px-4 bg-slate-900/30 relative z-10 transition-all duration-700 ${
          animatedSections.has("skills") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-3xl font-bold text-center mb-12 relative transition-all duration-700 ${
              animatedSections.has("skills") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              My Digital Superpowers & Cheat Codes 🦸‍♂️
            </span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full animate-pulse"></div>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "💻",
                title: "Programming & Tools",
                skills: ["Python", "SQL", "GitHub", "AWS", "GCP", "Power BI"],
              },
              {
                icon: "🤖",
                title: "ML & AI Frameworks",
                skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Hugging Face", "XGBoost", "OpenCV", "MLflow"],
              },
              {
                icon: "🧠",
                title: "Specialized Techniques",
                skills: ["Computer Vision", "NLP", "CNNs", "OCR", "Transfer Learning", "PCA", "t-SNE", "GridSearchCV"],
              },
              {
                icon: "⚙️",
                title: "Additional Skills",
                skills: ["FastAPI", "Flask", "Streamlit", "Kubernetes", "CI/CD"],
              },
            ].map((skillGroup, index) => (
              <Card
                key={index}
                className={`text-center bg-slate-800/60 backdrop-blur-sm border border-slate-700 hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-200 hover:scale-105 group ${
                  animatedSections.has("skills") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: animatedSections.has("skills") ? `${400 + index * 150}ms` : "0ms",
                }}
              >
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-800/50 rounded-full flex items-center justify-center group-hover:bg-purple-700/50 transition-colors">
                    <span className="text-2xl">{skillGroup.icon}</span>
                  </div>
                  <CardTitle className="text-xl text-slate-100 group-hover:text-purple-300 transition-colors">
                    {skillGroup.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {skillGroup.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        className="bg-purple-800/60 text-purple-100 border-purple-600/30 hover:bg-purple-700/60 hover:text-purple-50 transition-colors text-center"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        ref={contactRef}
        data-section="contact"
        className={`py-16 px-4 bg-slate-800/30 relative z-10 transition-all duration-700 ${
          animatedSections.has("contact") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={`text-3xl font-bold mb-8 relative transition-all duration-700 ${
              animatedSections.has("contact") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Slide Into My DMs 📱✨
            </span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
          </h2>
          <p
            className={`text-lg text-slate-200 mb-12 max-w-2xl mx-auto text-center transition-all duration-700 ${
              animatedSections.has("contact") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            I'm always interested in discussing new opportunities, innovative projects, or collaborations in AI/ML. Feel
            free to reach out!
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Mail, title: "Email", content: "shivanshu985@gmail.com", link: "mailto:shivanshu985@gmail.com" },
              {
                icon: Linkedin,
                title: "LinkedIn",
                content: "Connect with me",
                link: "https://www.linkedin.com/in/shivanshumishra21",
              },
              { icon: Github, title: "GitHub", content: "View my projects", link: "https://github.com/shivanshu2109" },
            ].map((contact, index) => (
              <Card
                key={index}
                className={`text-center bg-slate-700/60 border border-slate-600 hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-200 hover:scale-105 group cursor-pointer ${
                  animatedSections.has("contact") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                onClick={() => window.open(contact.link, contact.link.startsWith("mailto:") ? "_self" : "_blank")}
              >
                <CardContent className="pt-8">
                  <contact.icon className="w-8 h-8 mx-auto mb-4 text-purple-300 group-hover:text-purple-200 transition-colors" />
                  <h3 className="font-semibold mb-2 text-slate-100 group-hover:text-purple-200 transition-colors text-center">
                    {contact.title}
                  </h3>
                  <p className="text-slate-200 text-center">{contact.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-slate-700 bg-slate-900/60 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">© 2025 Shivanshu Mishra. Built with passion for AI and innovation.</p>
        </div>
      </footer>

      {showResumeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowResumeModal(false)}
        >
          <div
            className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700 p-6 flex justify-between items-start z-10">
              <div>
                <h3 className="text-2xl font-bold text-slate-100">Shivanshu Mishra</h3>
                <p className="text-purple-300 font-semibold">AI/ML Engineer</p>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    shivanshu985@gmail.com
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Buffalo, New York
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleDownloadResume}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-slate-400 hover:text-slate-100" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Education Section */}
              <div>
                <h4 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  EDUCATION
                </h4>
                <div className="space-y-4 ml-4">
                  <div>
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <p className="text-lg font-semibold text-slate-100">SUNY Buffalo</p>
                        <p className="text-purple-300">MS in Artificial Intelligence</p>
                      </div>
                      <p className="text-slate-400">June 2024 – Dec 2025</p>
                    </div>
                    <p className="text-slate-400 text-sm mt-1">New York</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <p className="text-lg font-semibold text-slate-100">University of Mumbai</p>
                        <p className="text-purple-300">BE in AI and ML</p>
                      </div>
                      <p className="text-slate-400">Aug 2020 – May 2024</p>
                    </div>
                    <p className="text-slate-400 text-sm mt-1">India</p>
                  </div>
                </div>
              </div>

              {/* Work Experience Section */}
              <div>
                <h4 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  WORK EXPERIENCE
                </h4>
                <div className="space-y-6 ml-4">
                  <div>
                    <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                      <div>
                        <p className="text-lg font-semibold text-slate-100">AI Engineer Intern</p>
                        <p className="text-purple-300">Samtek – Virginia</p>
                      </div>
                      <p className="text-slate-400">June 2025 – August 2025</p>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
                      <li>
                        Used Python, AWS Bedrock, and NLP to develop a robust scalable, AI-powered cloud configuration
                        system that automatically converts cloud setup files, reducing manual effort by 30 hours per
                        week.
                      </li>
                      <li>
                        Designed a Streamlit based app using FastAPI and CI/CD pipeline for file handling, conversion
                        and validation using LLMs across different cloud platforms and used Power BI dashboards for
                        real-time process monitoring.
                      </li>
                      <li>
                        Built a dual Interface platform with both web and CLI access, ensuring adoption by technical and
                        non-technical users and simplifying workflows across teams.
                      </li>
                      <li>
                        Implemented a caching framework using Python OOP and Machine Learning libraries (NumPy, Pandas,
                        scikit-learn), cutting API calls by 80% and enabling faster cache tracking.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                      <div>
                        <p className="text-lg font-semibold text-slate-100">Technical Lead Intern</p>
                        <p className="text-purple-300">Alternative Clinic – Mumbai</p>
                      </div>
                      <p className="text-slate-400">June 2023 – September 2023</p>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
                      <li>
                        Led development of a predictive data model using Pandas and Scikit-learn, reducing false
                        positives by 15% and making it possible for patients to get treatment earlier.
                      </li>
                      <li>
                        Worked in a client-facing role and launched a digital clinic portal using Flask and AWS (S3) for
                        storage with appointment booking and health record access, reducing admin workload.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                      <div>
                        <p className="text-lg font-semibold text-slate-100">AI and ML Intern</p>
                        <p className="text-purple-300">VLine Infotech Pvt Ltd – Delhi</p>
                      </div>
                      <p className="text-slate-400">January 2023 – April 2023</p>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
                      <li>
                        Framed and enhanced an ML pipeline using TensorFlow, OpenCV, and Tesseract OCR to extract text
                        from bank statements, achieving a 15% accuracy improvement through iterative testing and
                        fine-tuning.
                      </li>
                      <li>
                        Built an ETL pipeline for financial documents by fine-tuning LayoutLM (Hugging Face) and
                        deploying with Kubernetes, improving parsing speed 20% and ensuring reliable key information
                        extraction.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Projects Section */}
              <div>
                <h4 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  PROJECTS
                </h4>
                <div className="space-y-4 ml-4">
                  <div>
                    <p className="text-lg font-semibold text-slate-100 mb-2">Cheque Image Feature Extraction System</p>
                    <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
                      <li>
                        Worked with deep learning models (TrOCR, Donut, and Tesseract) to build OCR systems for
                        handwritten financial checks, using transfer learning, and maintained a Git repository for
                        teamwork.
                      </li>
                      <li>
                        Used Computer vision techniques (resolution normalization, ROI cropping) with OpenCV and
                        matplotlib to preprocess 14k+ check images and created a front end and deployed on GCP for user
                        interaction.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-lg font-semibold text-slate-100 mb-2">Multi-Modal Movie Genre Classification</p>
                    <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
                      <li>
                        Implemented a multi-modal AI system combining NLP (DistilBERT) and computer vision
                        (ConvNeXt-tiny, Torchvision) to classify movies, trained on large datasets and optimized for
                        scalable performance.
                      </li>
                      <li>
                        Developed and deployed a cloud-ready full-stack web application with Flask and REST APIs,
                        implementing CI/CD pipelines, scalable data handling, and performance optimizations.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div>
                <h4 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  SKILLS
                </h4>
                <div className="space-y-3 ml-4">
                  <div>
                    <p className="text-slate-100 font-semibold mb-2">Programming & Tools:</p>
                    <div className="flex flex-wrap gap-2">
                      {["Python", "SQL", "GitHub", "AWS", "GCP", "Power BI"].map((skill, index) => (
                        <Badge key={index} className="bg-purple-800/50 text-purple-200 border-purple-600/50">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-100 font-semibold mb-2">ML & AI Frameworks:</p>
                    <div className="flex flex-wrap gap-2">
                      {["TensorFlow", "PyTorch", "Scikit-learn", "Hugging Face", "XGBoost", "OpenCV", "MLflow"].map(
                        (skill, index) => (
                          <Badge key={index} className="bg-purple-800/50 text-purple-200 border-purple-600/50">
                            {skill}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-100 font-semibold mb-2">Specialized Techniques:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Computer Vision",
                        "NLP",
                        "CNNs",
                        "OCR",
                        "Transfer Learning",
                        "PCA",
                        "t-SNE",
                        "GridSearchCV",
                      ].map((skill, index) => (
                        <Badge key={index} className="bg-purple-800/50 text-purple-200 border-purple-600/50">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ChatbotWidget />
    </div>
  )
}
