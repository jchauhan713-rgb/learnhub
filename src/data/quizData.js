const quizData = {
  "programming": [
    {
      question: "What does 'var' stand for in JavaScript?",
      options: ["Variable", "Variant", "Value", "Vector"],
      answer: 0
    },
    {
      question: "Which of the following is not a programming paradigm?",
      options: ["Object-oriented", "Functional", "Procedural", "Algorithmic"],
      answer: 3
    },
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
      answer: 1
    },
    {
      question: "Which data structure uses LIFO (Last In, First Out)?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      answer: 1
    },
    {
      question: "What does API stand for?",
      options: ["Application Programming Interface", "Advanced Programming Interface", "Automated Programming Interface", "Application Process Interface"],
      answer: 0
    },
    {
      question: "Which of these is a strongly typed language?",
      options: ["Python", "JavaScript", "Java", "Ruby"],
      answer: 2
    }
  ],
  "web-development": [
    {
      question: "What does HTML stand for?",
      options: ["HyperText Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
      answer: 0
    },
    {
      question: "Which CSS property is used to change the text color?",
      options: ["font-color", "text-color", "color", "foreground-color"],
      answer: 2
    },
    {
      question: "What is the purpose of JavaScript in web development?",
      options: ["Styling", "Structure", "Interactivity", "Database"],
      answer: 2
    },
    {
      question: "Which HTTP method is used to retrieve data?",
      options: ["POST", "PUT", "GET", "DELETE"],
      answer: 2
    },
    {
      question: "What does CSS stand for?",
      options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
      answer: 2
    },
    {
      question: "Which of these is a JavaScript framework?",
      options: ["Django", "React", "Laravel", "Flask"],
      answer: 1
    }
  ],
  "data-science": [
    {
      question: "What is the primary purpose of data cleaning?",
      options: ["To make data look pretty", "To remove errors and inconsistencies", "To add more data", "To compress data"],
      answer: 1
    },
    {
      question: "Which library is commonly used for data manipulation in Python?",
      options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
      answer: 1
    },
    {
      question: "What does ML stand for in data science?",
      options: ["Machine Learning", "Manual Learning", "Mathematical Logic", "Main Library"],
      answer: 0
    },
    {
      question: "Which of these is a supervised learning algorithm?",
      options: ["K-means clustering", "Linear Regression", "PCA", "t-SNE"],
      answer: 1
    },
    {
      question: "What is the purpose of data visualization?",
      options: ["To store data", "To present data insights graphically", "To clean data", "To analyze text"],
      answer: 1
    },
    {
      question: "Which Python library is used for machine learning?",
      options: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
      answer: 2
    }
  ],
  "design": [
    {
      question: "What does UI stand for?",
      options: ["User Interface", "Universal Interface", "User Integration", "Unified Interface"],
      answer: 0
    },
    {
      question: "Which color model is used for digital displays?",
      options: ["CMYK", "RGB", "HSB", "Pantone"],
      answer: 1
    },
    {
      question: "What is the purpose of wireframing?",
      options: ["Final design", "Low-fidelity layout planning", "Color selection", "Typography choice"],
      answer: 1
    },
    {
      question: "Which principle refers to the visual weight distribution?",
      options: ["Balance", "Contrast", "Hierarchy", "Alignment"],
      answer: 0
    },
    {
      question: "What does UX stand for?",
      options: ["User Experience", "Universal Experience", "User Exploration", "Unified Experience"],
      answer: 0
    },
    {
      question: "Which tool is commonly used for UI design?",
      options: ["Photoshop", "Figma", "Excel", "Word"],
      answer: 1
    }
  ],
  "artificial-intelligence": [
    {
      question: "What is the goal of supervised learning?",
      options: ["Unsupervised data exploration", "Learning from labeled data", "Clustering data", "Dimensionality reduction"],
      answer: 1
    },
    {
      question: "Which algorithm is used for image recognition?",
      options: ["Linear Regression", "Decision Trees", "Convolutional Neural Networks", "K-Means"],
      answer: 2
    },
    {
      question: "What does NLP stand for?",
      options: ["Natural Language Processing", "Neural Language Programming", "New Learning Process", "Network Language Protocol"],
      answer: 0
    },
    {
      question: "Which of these is an AI technique?",
      options: ["Genetic Algorithms", "Bubble Sort", "Binary Search", "Quick Sort"],
      answer: 0
    },
    {
      question: "What is the Turing Test designed to measure?",
      options: ["Computer speed", "Machine intelligence", "Data storage", "Network bandwidth"],
      answer: 1
    },
    {
      question: "Which type of AI can learn and adapt?",
      options: ["Narrow AI", "General AI", "Machine Learning", "Expert Systems"],
      answer: 2
    }
  ],
  "marketing": [
    {
      question: "What does SEO stand for?",
      options: ["Search Engine Optimization", "Social Email Outreach", "Sales Enhancement Operation", "Site Enhancement Optimization"],
      answer: 0
    },
    {
      question: "Which platform is primarily used for professional networking?",
      options: ["Facebook", "Instagram", "LinkedIn", "Twitter"],
      answer: 2
    },
    {
      question: "What is the purpose of A/B testing?",
      options: ["Testing website speed", "Comparing two versions of content", "Analyzing user demographics", "Tracking social media engagement"],
      answer: 1
    },
    {
      question: "Which metric measures website traffic?",
      options: ["CTR", "CPA", "Page views", "ROI"],
      answer: 2
    },
    {
      question: "What does CTR stand for?",
      options: ["Click-Through Rate", "Cost-To-Reach", "Customer Transaction Ratio", "Content Transfer Rate"],
      answer: 0
    },
    {
      question: "Which marketing channel focuses on paid advertisements?",
      options: ["SEO", "Content Marketing", "PPC", "Email Marketing"],
      answer: 2
    }
  ],
  "mobile-development": [
    {
      question: "Which programming language is primarily used for iOS development?",
      options: ["Java", "Kotlin", "Swift", "C#"],
      answer: 2
    },
    {
      question: "What does APK stand for in Android development?",
      options: ["Android Package Kit", "Application Package", "Android Programming Kit", "App Package Key"],
      answer: 0
    },
    {
      question: "Which framework is used for cross-platform mobile development?",
      options: ["Django", "React Native", "Laravel", "Spring"],
      answer: 1
    },
    {
      question: "What is the purpose of mobile app testing?",
      options: ["To design the app", "To ensure app functionality and performance", "To market the app", "To deploy the app"],
      answer: 1
    },
    {
      question: "Which of these is a mobile UI component?",
      options: ["Button", "Database", "Server", "API"],
      answer: 0
    },
    {
      question: "What does SDK stand for?",
      options: ["Software Development Kit", "System Design Kit", "Software Deployment Kit", "System Development Kit"],
      answer: 0
    }
  ],
  "cybersecurity": [
    {
      question: "What is a common type of cyber attack?",
      options: ["Phishing", "Email", "Website", "Document"],
      answer: 0
    },
    {
      question: "What does VPN stand for?",
      options: ["Virtual Private Network", "Very Protected Network", "Virtual Protection Node", "Verified Private Node"],
      answer: 0
    },
    {
      question: "Which of these is a strong password practice?",
      options: ["Using 'password123'", "Using a mix of characters", "Using your name", "Using sequential numbers"],
      answer: 1
    },
    {
      question: "What is encryption used for?",
      options: ["Speeding up data", "Protecting data confidentiality", "Storing data", "Deleting data"],
      answer: 1
    },
    {
      question: "What does malware include?",
      options: ["Viruses", "Antivirus software", "Firewalls", "Passwords"],
      answer: 0
    },
    {
      question: "Which protocol is used for secure web browsing?",
      options: ["HTTP", "FTP", "HTTPS", "SMTP"],
      answer: 2
    }
  ]
};

export default quizData;