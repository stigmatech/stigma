export type CourseModule = {
    hour: string;
    title: string;
    description: string;
};

export type CourseData = {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    level: string;
    duration: string;
    format: string;
    tag: string;
    prerequisiteSlug?: string;
    skills: string[];
    outcomes: string[];
    syllabus: CourseModule[];
    prerequisites: string;
    whoItIsFor: string;
};

const courses: Record<string, { en: CourseData; fr: CourseData }> = {
    "ia-decouverte": {
        en: {
            slug: "ai-discovery",
            title: "AI Discovery",
            subtitle: "Acculturation and Foundations of Generative AI",
            description: "A comprehensive session to demystify AI and identify high-impact use cases for your specific business sector.",
            level: "Beginner",
            duration: "7 Hours",
            format: "On-site or Virtual",
            tag: "FOUNDATIONS",
            skills: ["AI Foundations", "Strategic Vision", "Use Case Identification", "Ethical AI"],
            outcomes: [
                "Understand the core mechanics of LLMs (ChatGPT, Claude, Gemini)",
                "Identify at least 5 automation opportunities in your daily workflows",
                "Master basic prompting techniques for immediate results",
                "Understand security risks and data privacy (Loi 25)"
            ],
            syllabus: [
                { hour: "9:00 - 10:30", title: "The GenAI Revolution", description: "History, current landscape, and why now is the tipping point for SMEs." },
                { hour: "10:45 - 12:00", title: "How it Works", description: "Demystifying LLMs, hallucinations, and the importance of context." },
                { hour: "12:00 - 13:00", title: "Lunch Break", description: "Lunch included via Uber Eats or Doordash." },
                { hour: "13:00 - 14:30", title: "Industry Use Cases", description: "Deep dive into successful AI implementations in your specific industry." },
                { hour: "14:45 - 16:00", title: "Hands-on Discovery", description: "First steps with ChatGPT and Claude: prompt engineering basics." },
                { hour: "16:00 - 17:00", title: "Strategy & Roadmap", description: "Drafting your company's first AI adoption plan." }
            ],
            prerequisites: "None. Open to all levels.",
            whoItIsFor: "Business owners, managers, and teams curious about AI transformation."
        },
        fr: {
            slug: "ia-decouverte",
            title: "IA Découverte",
            subtitle: "Acculturation et Fondamentaux de l'IA Générative",
            description: "Une session complète pour démystifier l'IA et identifier les cas d'usage à fort impact pour votre secteur d'activité.",
            level: "Débutant",
            duration: "7 Heures",
            format: "En entreprise ou Virtuel",
            tag: "FONDAMENTAUX",
            skills: ["Fondamentaux IA", "Vision Stratégique", "Identification Use-Cases", "Éthique IA"],
            outcomes: [
                "Comprendre le fonctionnement des LLM (ChatGPT, Claude, Gemini)",
                "Identifier au moins 5 opportunités d'automatisation dans vos processus",
                "Maîtriser les techniques de prompt de base",
                "Comprendre les risques de sécurité et la Loi 25"
            ],
            syllabus: [
                { hour: "9h00 - 10h30", title: "La Révolution GenAI", description: "Histoire, paysage actuel et pourquoi c'est le moment charnière pour les PME." },
                { hour: "10h45 - 12h00", title: "Fonctionnement Interne", description: "Démystification des LLM, hallucinations et importance du contexte." },
                { hour: "12h00 - 13h00", title: "Pause Déjeuner", description: "Lunch offert via Uber Eats ou Doordash." },
                { hour: "13h00 - 14h30", title: "Cas d'usage Sectoriels", description: "Analyse approfondie de réussites IA dans votre industrie spécifique." },
                { hour: "14h45 - 16h00", title: "Découverte Pratique", description: "Premiers pas avec ChatGPT et Claude : base du prompt engineering." },
                { hour: "16h00 - 17h00", title: "Stratégie & Feuille de route", description: "Ébauche de votre premier plan d'adoption IA pour votre entreprise." }
            ],
            prerequisites: "Aucun. Ouvert à tous les niveaux.",
            whoItIsFor: "Propriétaires d'entreprises, gestionnaires et équipes curieuses de la transformation IA."
        }
    },
    "ia-booster": {
        en: {
            slug: "ai-booster",
            title: "AI Booster",
            subtitle: "Master Everyday Productivity with Generative AI",
            description: "Turn AI into your most efficient assistant. Focus on practical tools and advanced prompting to save hours every week.",
            level: "Intermediate",
            duration: "7 Hours",
            format: "Workshop Style",
            tag: "PRODUCTIVITY",
            prerequisiteSlug: "ai-discovery",
            skills: ["Advanced Prompting", "Workflows Automation", "Content Creation", "Data Analysis"],
            outcomes: [
                "Create advanced prompt chains for complex tasks",
                "Automate email management and reporting",
                "Generate professional documents and marketing copy in seconds",
                "Analyze complex data sets using Code Interpreter / Advanced Data Analysis"
            ],
            syllabus: [
                { hour: "Hour 1-2", title: "Advanced Prompting Patterns", description: "Chain-of-thought, Few-shot, and iterative prompting techniques." },
                { hour: "Hour 3-4", title: "The Productivity Stack", description: "Beyond ChatGPT: Claude, Perplexity, and specialized productivity tools." },
                { hour: "12:00 - 13:00", title: "Lunch Break", description: "Lunch included via Uber Eats or Doordash." },
                { hour: "Hour 5-6", title: "Content & Comm Engine", description: "Accelerating writing, presenting, and communicating using AI assistants." },
                { hour: "Hour 7", title: "Personalized Workflow", description: "Participants build one custom workflow for their specific role." }
            ],
            prerequisites: "Basic experience with ChatGPT or similar tools.",
            whoItIsFor: "Professionals and teams looking to boost their individual and collective productivity."
        },
        fr: {
            slug: "ia-booster",
            title: "IA Booster",
            subtitle: "Maîtrisez la Productivité au Quotidien avec l'IA",
            description: "Faites de l'IA votre assistant le plus efficace. Focus sur les outils pratiques et le prompt avancé pour gagner des heures chaque semaine.",
            level: "Intermédiaire",
            duration: "7 Heures",
            format: "Atelier Pratique",
            tag: "PRODUCTIVITÉ",
            prerequisiteSlug: "ia-decouverte",
            skills: ["Prompting Avancé", "Automatisation Workflow", "Création de Contenu", "Analyse de Données"],
            outcomes: [
                "Créer des chaînes de prompts complexes",
                "Automatiser la gestion des courriels et rapports",
                "Générer des documents et copies marketing en quelques secondes",
                "Analyser des jeux de données complexes avec l'analyse de données avancée"
            ],
            syllabus: [
                { hour: "Heure 1-2", title: "Patterns de Prompt Avancés", description: "Techniques de Chain-of-thought, Few-shot et prompting itératif." },
                { hour: "Heure 3-4", title: "Le Stack Productivité", description: "Au-delà de ChatGPT : Claude, Perplexity et outils de productivité spécialisés." },
                { hour: "12h00 - 13h00", title: "Pause Déjeuner", description: "Lunch offert via Uber Eats ou Doordash." },
                { hour: "Heure 5-6", title: "Moteur de Contenu & Comm", description: "Accélérer la rédaction, les présentations et la communication." },
                { hour: "Heure 7", title: "Workflow Personnalisé", description: "Les participants créent un flux de travail spécifique à leur poste." }
            ],
            prerequisites: "Expérience de base avec ChatGPT ou outils similaires.",
            whoItIsFor: "Professionnels et équipes souhaitant booster leur productivité individuelle et collective."
        }
    },
    "ia-performer": {
        en: {
            slug: "ai-performer",
            title: "AI Performer",
            subtitle: "Expert Automation and Custom AI Agents",
            description: "Move beyond chat interfaces. Learn to build custom agents and integrate AI directly into your business operations.",
            level: "Advanced",
            duration: "7 Hours",
            format: "Intensive Tech Workshop",
            tag: "AUTOMATION",
            prerequisiteSlug: "ai-booster",
            skills: ["Custom GPTs", "AI Agents", "API Integration", "Process Re-engineering"],
            outcomes: [
                "Build and deploy custom GPTs with specific organizational knowledge",
                "Understand the landscape of AI Agents (AutoGPT, CrewAI foundations)",
                "Integrate AI with No-code tools (Zapier, Make.com)",
                "Design a multi-step automated business process"
            ],
            syllabus: [
                { hour: "Hour 1-2", title: "Custom GPT Architecture", description: "Designing knowledge bases and specific instructions for custom agents." },
                { hour: "Hour 3-4", title: "No-code AI Automation", description: "Connecting LLMs to your favorite apps via Zapier and Make." },
                { hour: "12:00 - 13:00", title: "Lunch Break", description: "Lunch included via Uber Eats or Doordash." },
                { hour: "Hour 5-6", title: "Agentic Workflows", description: "Introduction to multi-agent systems and task delegation." },
                { hour: "Hour 7", title: "Prototype Lab", description: "Building a functional automated prototype for a business problem." }
            ],
            prerequisites: "Good mastery of basic prompting and business processes.",
            whoItIsFor: "Operations managers, tech leads, and innovators looking for deep automation."
        },
        fr: {
            slug: "ia-performer",
            title: "IA Performer",
            subtitle: "Automatisation Experte et Agents IA Personnalisés",
            description: "Allez au-delà des interfaces de chat. Apprenez à construire des agents sur mesure et à intégrer l'IA dans vos opérations.",
            level: "Avancé",
            duration: "7 Heures",
            format: "Atelier Tech Intensif",
            tag: "AUTOMATISATION",
            prerequisiteSlug: "ia-booster",
            skills: ["GPTs Personnalisés", "Agents IA", "Intégration API", "Ré-ingénierie de Processus"],
            outcomes: [
                "Bâtir et déployer des GPTs personnalisés avec vos propres données",
                "Comprendre l'écosystème des Agents IA",
                "Intégrer l'IA avec des outils No-code (Zapier, Make.com)",
                "Concevoir un processus d'affaires automatisé multi-étapes"
            ],
            syllabus: [
                { hour: "Heure 1-2", title: "Architecture GPT Personnalisé", description: "Conception de bases de connaissances et instructions spécifiques." },
                { hour: "12h00 - 13h00", title: "Pause Déjeuner", description: "Lunch offert via Uber Eats ou Doordash." },
                { hour: "Heure 3-4", title: "IA & Automatisation No-code", description: "Connecter les LLM à vos applications via Zapier et Make." },
                { hour: "Heure 5-6", title: "Workflows Agentiques", description: "Introduction aux systèmes multi-agents et délégation de tâches." },
                { hour: "Heure 7", title: "Prototype Lab", description: "Construction d'un prototype automatisé fonctionnel." }
            ],
            prerequisites: "Bonne maîtrise du prompt et des processus d'affaires.",
            whoItIsFor: "Responsables des opérations, leads techniques et innovateurs."
        }
    },
    "ia-crea": {
        en: {
            slug: "ai-crea",
            title: "AI Creative",
            subtitle: "Visual Design and Marketing Content with AI",
            description: "Master visual creation tools like Midjourney and Canva AI. Perfect for marketing, designers, and creative teams.",
            level: "Intermediate",
            duration: "7 Hours",
            format: "Creative Lab",
            tag: "CREATIVE",
            prerequisiteSlug: "ai-discovery",
            skills: ["Midjourney Mastery", "Canva AI", "Visual Branding", "Video/Audio GenAI"],
            outcomes: [
                "Generate hyper-realistic branded imagery with Midjourney",
                "Master Canva's Magic Studio for rapid design iteration",
                "Create AI-generated short videos for social media",
                "Establish a consistent visual brand guidelines using AI tools"
            ],
            syllabus: [
                { hour: "Hour 1-2", title: "Midjourney Deep Dive", description: "Parameters, styles, and advanced image generation techniques." },
                { hour: "Hour 3-4", title: "Design with Canva AI", description: "Magic Edit, Magic Expand, and AI-driven layout design." },
                { hour: "12:00 - 13:00", title: "Lunch Break", description: "Lunch included via Uber Eats or Doordash." },
                { hour: "Hour 5-6", title: "Video & Animation GenAI", description: "Exploring HeyGen, Lumen5, or similar tools for motion content." },
                { hour: "Hour 7", title: "Creative Campaign Lab", description: "Designing a complete multi-channel visual campaign." }
            ],
            prerequisites: "A creative eye and basic computer skills.",
            whoItIsFor: "Marketing teams, graphic designers, social media managers, and entrepreneurs."
        },
        fr: {
            slug: "ia-crea",
            title: "IA Créa",
            subtitle: "Design Visuel et Marketing avec l'IA",
            description: "Maîtrisez les outils de création visuelle comme Midjourney et Canva IA. Parfait pour le marketing et les créatifs.",
            level: "Intermédiaire",
            duration: "7 Heures",
            format: "Lab Créatif",
            tag: "CRÉATIF",
            prerequisiteSlug: "ia-decouverte",
            skills: ["Maîtrise Midjourney", "Canva IA", "Branding Visuel", "Vidéo/Audio GenAI"],
            outcomes: [
                "Générer des images de marque hyper-réalistes avec Midjourney",
                "Maîtriser le Magic Studio de Canva pour des itérations rapides",
                "Créer des vidéos courtes générées par l'IA pour les réseaux sociaux",
                "Établir des lignes directrices visuelles cohérentes avec l'IA"
            ],
            syllabus: [
                { hour: "Heure 1-2", title: "Plongée Midjourney", description: "Paramètres, styles et techniques avancées de génération d'images." },
                { hour: "Heure 3-4", title: "Design avec Canva IA", description: "Magic Edit, Magic Expand et mise en page pilotée par l'IA." },
                { hour: "12h00 - 13h00", title: "Pause Déjeuner", description: "Lunch offert via Uber Eats ou Doordash." },
                { hour: "Heure 5-6", title: "IA Vidéo & Animation", description: "Exploration d'outils comme HeyGen ou Runway pour le contenu animé." },
                { hour: "Heure 7", title: "Atelier Campagne Créative", description: "Conception d'une campagne visuelle multi-canal complète." }
            ],
            prerequisites: "Un œil créatif et des compétences informatiques de base.",
            whoItIsFor: "Équipes marketing, designers graphiques, gestionnaires de réseaux sociaux."
        }
    },
    "microsoft-copilot": {
        en: {
            slug: "microsoft-copilot",
            title: "Microsoft Copilot Mastery",
            subtitle: "Empower Your Business with Microsoft 365 AI",
            description: "Seamlessly integrate Copilot into your Word, Excel, PowerPoint, and Teams workflows. Secure and enterprise-ready.",
            level: "Beginner/Intermediate",
            duration: "7 Hours",
            format: "Corporate Hands-on",
            tag: "OFFICE 365",
            prerequisiteSlug: "ai-discovery",
            skills: ["Office 365 AI", "Excel with Copilot", "AI-Powered Presentations", "Meeting Summarization"],
            outcomes: [
                "Automate document drafting and refinement in Word",
                "Analyze complex Excel data and generate formulas instantly",
                "Transform text notes into professional PowerPoint decks",
                "Master real-time meeting notes and summaries in Teams"
            ],
            syllabus: [
                { hour: "Hour 1-2", title: "Copilot Foundations", description: "Setting up Copilot for 365 and understanding data boundaries." },
                { hour: "Hour 3-4", title: "The Office Power User", description: "Drafting in Word and automating data in Excel." },
                { hour: "12:00 - 13:00", title: "Lunch Break", description: "Lunch included via Uber Eats or Doordash." },
                { hour: "Hour 5-6", title: "Communication Mastery", description: "Meetings with Teams and emails with Outlook Copilot." },
                { hour: "Hour 7", title: "Governance & Best Practices", description: "Securing company data while using Copilot features." }
            ],
            prerequisites: "Active Microsoft 365 environment.",
            whoItIsFor: "Corporate teams and departments using the Microsoft 365 ecosystem."
        },
        fr: {
            slug: "microsoft-copilot",
            title: "Maîtrise Microsoft Copilot",
            subtitle: "Propulsez votre Entreprise avec l'IA de Microsoft 365",
            description: "Intégrez Copilot dans vos flux Word, Excel, PowerPoint et Teams. Session sécurisée et orientée entreprise.",
            level: "Débutant/Intermédiaire",
            duration: "7 Heures",
            format: "Atelier Corporatif",
            tag: "OFFICE 365",
            prerequisiteSlug: "ia-decouverte",
            skills: ["Office 365 IA", "Excel avec Copilot", "Présentations IA", "Résumés de Réunions"],
            outcomes: [
                "Automatiser la rédaction et le polissage de documents dans Word",
                "Analyser des données Excel et générer des formules instantanément",
                "Transformer des notes en présentations PowerPoint professionnelles",
                "Maîtriser les comptes-rendus de réunion en temps réel dans Teams"
            ],
            syllabus: [
                { hour: "Heure 1-2", title: "Fondations Copilot", description: "Configuration de Copilot 365 et compréhension des barrières de données." },
                { hour: "Heure 3-4", title: "Le Power User Office", description: "Rédaction dans Word et automatisation de données dans Excel." },
                { hour: "12h00 - 13h00", title: "Pause Déjeuner", description: "Lunch offert via Uber Eats ou Doordash." },
                { hour: "Heure 5-6", title: "Maîtrise de la Comm", description: "Réunions avec Teams et rédaction avec Outlook Copilot." },
                { hour: "Heure 7", title: "Gouvernance & Bonnes Pratiques", description: "Protéger les données de l'entreprise avec Copilot." }
            ],
            prerequisites: "Environnement Microsoft 365 actif.",
            whoItIsFor: "Équipes et départements utilisant l'écoustème Microsoft 365."
        }
    },
    "atelier-sur-mesure": {
        en: {
            slug: "custom-workshop",
            title: "Custom AI Workshop",
            subtitle: "Industry-Specific AI Training tailored to you",
            description: "You choose the modules, we build the training. Targeted solutions for Real Estate, Legal, HR, Finance, and more.",
            level: "Custom",
            duration: "7 to 14 Hours",
            format: "Bespoke Consulting & Training",
            tag: "BESPOKE",
            skills: ["Specific AI Applications", "Industrial Automation", "Bespoke Prompting", "Strategic Implementation"],
            outcomes: [
                "Solve specific industry pain points using AI technology",
                "Implement tools tested and validated for your niche",
                "Train your team on the exact software they use daily",
                "Direct output: A custom AI policy for your organization"
            ],
            syllabus: [
                { hour: "Custom", title: "Phase 1: Diagnosis", description: "Audit of current business processes and tech stack." },
                { hour: "Custom", title: "Phase 2: Curriculum Design", description: "Co-creating the modules with your department leads." },
                { hour: "12:00 - 13:00", title: "Lunch Break", description: "Lunch included via Uber Eats or Doordash." },
                { hour: "Custom", title: "Phase 3: Delivery", description: "Hands-on training focused 100% on your specific objectives." }
            ],
            prerequisites: "Varies depending on the chosen curriculum.",
            whoItIsFor: "Organizations with highly specific needs or complex industrial requirements."
        },
        fr: {
            slug: "atelier-sur-mesure",
            title: "Atelier IA Sur Mesure",
            subtitle: "Formation IA Métier conçue pour vos besoins",
            description: "Vous choisissez les modules, nous bâtissons la formation. Immobilier, Juridique, RH, Finance, Industriel.",
            level: "Sur mesure",
            duration: "7 à 14 Heures",
            format: "Consultation & Formation",
            tag: "SUR MESURE",
            skills: ["Applications IA Spécifiques", "Automatisation Industrielle", "Prompting Métier", "Implémentation Stratégique"],
            outcomes: [
                "Résoudre des problèmes métiers spécifiques avec l'IA",
                "Implémenter des outils testés et validés pour votre niche",
                "Former votre équipe sur les logiciels exacts qu'elle utilise",
                "Livrable direct : Une politique IA personnalisée pour votre organisation"
            ],
            syllabus: [
                { hour: "Sur mesure", title: "Phase 1 : Diagnostic", description: "Audit des processus actuels et de l'infrastructure tech." },
                { hour: "Sur mesure", title: "Phase 2 : Design du Programme", description: "Co-création des modules avec vos chefs de départements." },
                { hour: "12h00 - 13h00", title: "Pause Déjeuner", description: "Lunch offert via Uber Eats ou Doordash." },
                { hour: "Sur mesure", title: "Phase 3 : Livraison", description: "Formation pratique focalisée 100% sur vos objectifs." },
            ],
            prerequisites: "Varie selon le programme choisi.",
            whoItIsFor: "Organisations ayant des besoins spécifiques ou complexes."
        }
    },
    "ia-strategie": {
        en: {
            slug: "ai-strategy",
            title: "AI Strategy & Leadership",
            subtitle: "Vision, Risk, and ROI for Decision Makers",
            description: "Beyond individual tools. Learn how AI transforms business models, manage risks, and build a strategic adoption roadmap.",
            level: "Expert",
            duration: "7 Hours",
            format: "Leadership Seminar",
            tag: "STRATEGY",
            prerequisiteSlug: "ai-discovery",
            skills: ["Strategic Planning", "Change Management", "AI Governance", "Risk Assessment"],
            outcomes: [
                "Evaluate AI maturity in your organization",
                "Calculate ROI for AI transformation projects",
                "Master AI Governance and Loi 25 compliance",
                "Build a company-wide AI adoption roadmap"
            ],
            syllabus: [
                { hour: "9:00 - 10:30", title: "The Economic Impact of AI", description: "Beyond the hype: structural changes in your industry." },
                { hour: "10:45 - 12:00", title: "Risk & Governance", description: "Privacy, Loi 25, and building a secure AI infrastructure." },
                { hour: "12:00 - 13:00", title: "Lunch Break", description: "Lunch included via Uber Eats or Doordash." },
                { hour: "13:00 - 14:30", title: "AI Portfolio Management", description: "How to choose and prioritize high-value AI projects." },
                { hour: "14:45 - 16:30", title: "The Human Factor", description: "Upskilling your workforce and managing the transition." },
                { hour: "16:30 - 17:00", title: "Strategic Roadmap", description: "Finalizing your adoption plan." }
            ],
            prerequisites: "IA Discovery (or equivalent) strongly recommended for foundations.",
            whoItIsFor: "Executives, Business Owners, and Department Heads."
        },
        fr: {
            slug: "ia-strategie",
            title: "IA Stratégie & Leadership",
            subtitle: "Vision, Risques et ROI pour les Décideurs",
            description: "Au-delà des outils. Apprenez comment l'IA transforme les modèles d'affaires, gérez les risques et bâtissez une feuille de route stratégique.",
            level: "Expert",
            duration: "7 Heures",
            format: "Séminaire de Direction",
            tag: "STRATÉGIE",
            prerequisiteSlug: "ia-decouverte",
            outcomes: [
                "Évaluer la maturité IA de votre organisation",
                "Calculer le ROI des projets de transformation IA",
                "Maîtriser la gouvernance IA et la conformité Loi 25",
                "Bâtir une feuille de route d'adoption à l'échelle de l'entreprise"
            ],
            skills: ["Planification Stratégique", "Gestion du Changement", "Gouvernance IA", "Analyse de Risques"],
            syllabus: [
                { hour: "9h00 - 10h30", title: "L'Impact Économique de l'IA", description: "Au-delà du hype : changements structurels dans votre industrie." },
                { hour: "10h45 - 12h00", title: "Risques & Gouvernance", description: "Vie privée, Loi 25 et infrastructure IA sécurisée." },
                { hour: "12h00 - 13h00", title: "Pause Déjeuner", description: "Lunch offert via Uber Eats ou Doordash." },
                { hour: "13h00 - 14h30", title: "Gestion de Portfolio IA", description: "Choisir et prioriser les projets IA à haute valeur." },
                { hour: "14h45 - 16h30", title: "Le Facteur Humain", description: "Recyclage des compétences et gestion de la transition." },
                { hour: "16h30 - 17h00", title: "Feuille de Route Stratégique", description: "Finalisation de votre plan d'adoption." }
            ],
            prerequisites: "IA Découverte fortement recommandé pour les fondamentaux.",
            whoItIsFor: "Dirigeants, Entrepreneurs et Chefs de départements."
        }
    },
    "ia-ventes": {
        en: {
            slug: "ai-sales",
            title: "AI for Sales & Growth",
            subtitle: "Automate Prospecting and Close More Deals",
            description: "Turn your sales team into an outbound machine. Master AI-driven personalization and automation to scale your pipeline.",
            level: "Advanced",
            duration: "7 Hours",
            format: "Hands-on Workshop",
            tag: "SALES",
            prerequisiteSlug: "ai-booster",
            skills: ["Outbound Automation", "CRM Optimization", "Generative Copywriting", "Lead Scoring"],
            outcomes: [
                "Automate hyper-personalized cold outreach",
                "Optimize Sales Navigator with AI tools",
                "Create AI-assisted sales triggers and alerts",
                "Draft complex proposals in minutes"
            ],
            syllabus: [
                { hour: "9:00 - 10:30", title: "The Modern Sales Stack", description: "Integrating AI into your CRM and sales processes." },
                { hour: "10:45 - 12:00", title: "Hyper-Personalization", description: "Using LLMs to write outreach that actually gets replies." },
                { hour: "12:00 - 13:00", title: "Lunch Break", description: "Lunch included via Uber Eats or Doordash." },
                { hour: "13:00 - 14:30", title: "Social Selling with AI", description: "Dominating LinkedIn and social platforms with intelligent content." },
                { hour: "14:45 - 16:00", title: "Proposal Automation", description: "Speeding up the BOFU with AI-drafted documents." },
                { hour: "16:00 - 17:00", title: "Growth Lab", description: "Building your automated sales machine." }
            ],
            prerequisites: "IA Booster recommended.",
            whoItIsFor: "Sales Teams, Growth Marketers, and Account Managers."
        },
        fr: {
            slug: "ia-ventes",
            title: "IA pour les Ventes & Croissance",
            subtitle: "Automatisez la Prospection et Concluez plus de Ventes",
            description: "Transformez votre équipe commerciale en une machine de prospection. Maîtrisez la personnalisation et l'automatisation par l'IA.",
            level: "Avancé",
            duration: "7 Heures",
            format: "Atelier Pratique",
            tag: "VENTES",
            prerequisiteSlug: "ia-booster",
            outcomes: [
                "Automatiser une prospection hyper-personnalisée",
                "Optimiser Sales Navigator avec des outils IA",
                "Créer des alertes et déclencheurs de vente intelligents",
                "Rédiger des propositions complexes en quelques minutes"
            ],
            skills: ["Automatisation Outbound", "Optimisation CRM", "Copywriting Génératif", "Lead Scoring"],
            syllabus: [
                { hour: "9h00 - 10h30", title: "Le Stack de Vente Moderne", description: "Intégrer l'IA dans votre CRM et vos processus de vente." },
                { hour: "10h45 - 12h00", title: "Hyper-Personalisation", description: "Utiliser les LLM pour des messages qui obtiennent des réponses." },
                { hour: "12h00 - 13h00", title: "Pause Déjeuner", description: "Lunch offert via Uber Eats ou Doordash." },
                { hour: "13h00 - 14h30", title: "Social Selling & IA", description: "Dominer LinkedIn avec du contenu intelligent et pertinent." },
                { hour: "14h45 - 16h00", title: "Automatisation des Propositions", description: "Accélérer la fin de cycle (BOFU) avec des documents générés." },
                { hour: "16h00 - 17h00", title: "Growth Lab", description: "Construction de votre machine de vente automatisée." }
            ],
            prerequisites: "IA Booster recommandé pour la maîtrise des outils de base.",
            whoItIsFor: "Équipes de Vente, Growth Marketers et Account Managers."
        }
    },
    "ia-rh": {
        en: {
            slug: "ai-hr",
            title: "AI for HR & Talent",
            subtitle: "Streamline Recruitment and Improve Retention",
            description: "Bring AI to your people operations. From screening to engagement, learn how to use AI ethically and effectively in HR.",
            level: "Intermediate",
            duration: "7 Hours",
            format: "Practical Workshop",
            tag: "HR",
            prerequisiteSlug: "ai-discovery",
            skills: ["Talent Acquisition", "Employee Experience", "Process Automation", "Ethical HR AI"],
            outcomes: [
                "Automate initial CV screening and analysis",
                "Create personalized employee onboarding journeys",
                "Improve employee engagement via AI feedback loops",
                "Draft precise job descriptions in seconds"
            ],
            syllabus: [
                { hour: "9:00 - 10:30", title: "AI in the Talent Life-Cycle", description: "From attraction to offboarding: where AI fits." },
                { hour: "10:45 - 12:00", title: "Recruitment Automation", description: "Semantic search and automated screening without bias." },
                { hour: "12:00 - 13:00", title: "Lunch Break", description: "Lunch included via Uber Eats or Doordash." },
                { hour: "13:00 - 14:30", title: "The Employee Experience", description: "Using AI for better sentiment analysis and internal support." },
                { hour: "14:45 - 16:00", title: "Ethical Implementation", description: "Privacy, transparency, and the human-in-the-loop." },
                { hour: "16:00 - 17:00", title: "HR Transformation Lab", description: "Drafting your department's AI policy." }
            ],
            prerequisites: "IA Discovery recommended.",
            whoItIsFor: "HR Managers, Recruiters, and People Operations."
        },
        fr: {
            slug: "ia-rh",
            title: "IA pour les RH & Talents",
            subtitle: "Optimisez le Recrutement et Améliorez la Rétention",
            description: "Intégrez l'IA dans vos opérations humaines. Du tri à l'engagement, apprenez à utiliser l'IA de manière éthique et efficace.",
            level: "Intermédiaire",
            duration: "7 Heures",
            format: "Atelier Pratique",
            tag: "RH",
            prerequisiteSlug: "ia-decouverte",
            outcomes: [
                "Automatiser le tri et l'analyse initiale des CV",
                "Créer des parcours d'onboarding personnalisés",
                "Améliorer l'engagement via des boucles de feedback IA",
                "Rédiger des descriptions de postes précises en secondes"
            ],
            skills: ["Acquisition de Talents", "Expérience Employé", "Automatisation RH", "IA RH Éthique"],
            syllabus: [
                { hour: "9h00 - 10h30", title: "L'IA dans le Cycle de vie du Talent", description: "De l'attraction au départ : où l'IA apporte de la valeur." },
                { hour: "10h45 - 12h00", title: "Automatisation du Recrutement", description: "Recherche sémantique et tri automatisé sans biais." },
                { hour: "12h00 - 13h00", title: "Pause Déjeuner", description: "Lunch offert via Uber Eats ou Doordash." },
                { hour: "13h00 - 14h30", title: "L'Expérience Employé", description: "Utiliser l'IA pour l'analyse de sentiment et le support interne." },
                { hour: "14h45 - 16h00", title: "Implémentation Éthique", description: "Vie privée, transparence et supervision humaine." },
                { hour: "16h30 - 17h00", title: "RH Transformation Lab", description: "Ébauche de la politique IA de votre département." }
            ],
            prerequisites: "IA Découverte recommandé.",
            whoItIsFor: "Gestionnaires RH, Recruteurs et People Operations."
        }
    },
    "ia-finance": {
        en: {
            slug: "ai-finance",
            title: "AI for Accounting & Finance",
            subtitle: "Automate Reports, Analysis & Financial Decisions with AI Agents",
            description: "Transform your financial operations with intelligent AI agents. From automated bookkeeping to real-time cash flow analysis, master the AI tools reshaping the CFO's office.",
            level: "Intermediate",
            duration: "7 Hours",
            format: "Practical Workshop",
            tag: "FINANCE",
            prerequisiteSlug: "ai-discovery",
            skills: ["Financial Analysis Automation", "AI Agents for Accounting", "Cash Flow Forecasting", "Expense Intelligence"],
            outcomes: [
                "Deploy an AI agent to automate invoice processing and reconciliation",
                "Generate instant financial reports and commentary with LLMs",
                "Build cash flow forecasting models using AI-powered spreadsheets",
                "Automate expense classification and audit-ready documentation",
                "Use AI to detect anomalies and reduce financial risk"
            ],
            syllabus: [
                { hour: "9:00 - 10:30", title: "The AI-Powered Finance Department", description: "Overview of AI tools transforming accounting: Claude, ChatGPT, Copilot for Finance, and specialized agents." },
                { hour: "10:45 - 12:00", title: "Invoice & Expense Automation", description: "Building an AI agent to extract, classify, and route invoices automatically. Live demo with real documents." },
                { hour: "12:00 - 13:00", title: "Lunch Break", description: "Lunch included via Uber Eats or Doordash." },
                { hour: "13:00 - 14:30", title: "AI Financial Reporting & Analysis", description: "Using LLMs to generate management commentary, variance analysis, and board-ready summaries from raw data." },
                { hour: "14:45 - 16:00", title: "Cash Flow & Forecasting Agents", description: "Building automated forecasting workflows that pull live data and update predictions in real-time." },
                { hour: "16:00 - 17:00", title: "Risk, Compliance & Audit Trail", description: "AI for anomaly detection, Loi 25 compliance, and keeping an auditable AI paper trail." }
            ],
            prerequisites: "Basic financial management experience. AI Discovery recommended.",
            whoItIsFor: "CFOs, Controllers, Accountants, and Finance Managers."
        },
        fr: {
            slug: "ia-finance",
            title: "IA pour la Comptabilité & Finance",
            subtitle: "Automatisez Rapports, Analyses & Décisions Financières avec les Agents IA",
            description: "Transformez vos opérations financières grâce aux agents IA intelligents. De la comptabilité automatisée à l'analyse de trésorerie en temps réel, maîtrisez les outils IA qui redéfinissent la direction financière.",
            level: "Intermédiaire",
            duration: "7 Heures",
            format: "Atelier Pratique",
            tag: "FINANCE",
            prerequisiteSlug: "ia-decouverte",
            skills: ["Automatisation Analyse Financière", "Agents IA Comptabilité", "Prévision Trésorerie", "Intelligence des Dépenses"],
            outcomes: [
                "Déployer un agent IA pour automatiser le traitement des factures et la réconciliation",
                "Générer des rapports financiers et des commentaires instantanés avec les LLM",
                "Construire des modèles de prévision de trésorerie avec des tableurs IA",
                "Automatiser la classification des dépenses et la documentation audit-ready",
                "Utiliser l'IA pour détecter les anomalies et réduire le risque financier"
            ],
            syllabus: [
                { hour: "9h00 - 10h30", title: "Le Département Financier Propulsé par l'IA", description: "Panorama des outils IA transformant la comptabilité : Claude, ChatGPT, Copilot pour Finance et agents spécialisés." },
                { hour: "10h45 - 12h00", title: "Automatisation Factures & Dépenses", description: "Création d'un agent IA pour extraire, classifier et router les factures automatiquement. Démo en direct avec des documents réels." },
                { hour: "12h00 - 13h00", title: "Pause Déjeuner", description: "Lunch offert via Uber Eats ou Doordash." },
                { hour: "13h00 - 14h30", title: "Reportings & Analyses Financières par IA", description: "Utilisation des LLM pour générer des commentaires de gestion, analyses d'écarts et résumés pour la direction." },
                { hour: "14h45 - 16h00", title: "Agents de Prévision de Trésorerie", description: "Construction de flux de travail de prévision automatisés qui collectent des données en temps réel et mettent à jour les prédictions." },
                { hour: "16h00 - 17h00", title: "Risques, Conformité & Piste d'Audit", description: "IA pour la détection d'anomalies, la conformité Loi 25 et la conservation d'une piste IA auditable." }
            ],
            prerequisites: "Expérience de base en gestion financière. IA Découverte recommandé.",
            whoItIsFor: "DAF, Contrôleurs, Comptables et Responsables Financiers."
        }
    },
    "ia-marketing-agents": {
        en: {
            slug: "ai-marketing-agents",
            title: "AI for Marketing",
            subtitle: "Automate Campaigns, Content & Analytics with AI Agents",
            description: "Scale your marketing without scaling your team. Leverage AI agents to autonomously generate content, run A/B tests, analyze campaign data, and personalize customer journeys at scale.",
            level: "Intermediate",
            duration: "7 Hours",
            format: "Creative & Hands-on Workshop",
            tag: "MARKETING",
            prerequisiteSlug: "ai-discovery",
            skills: ["AI Content Automation", "Campaign Intelligence Agents", "Personalization at Scale", "Marketing Analytics AI"],
            outcomes: [
                "Build a content generation agent that produces on-brand copy in minutes",
                "Automate social media scheduling and A/B headline generation",
                "Use AI agents for competitive intelligence and market analysis",
                "Create personalized email sequences triggered by behavioral data",
                "Analyze campaign performance with AI-powered dashboards"
            ],
            syllabus: [
                { hour: "9:00 - 10:30", title: "The Autonomous Marketing Stack", description: "AI tools transforming marketing: ChatGPT, Jasper, Perplexity, Make.com. Overview of the agentic marketing loop." },
                { hour: "10:45 - 12:00", title: "Content Generation Agent", description: "Build an agent that researches a topic, writes blog posts, social captions, and email copy — all on-brand and autonomously." },
                { hour: "12:00 - 13:00", title: "Lunch Break", description: "Lunch included via Uber Eats or Doordash." },
                { hour: "13:00 - 14:30", title: "Campaign Automation & Personalization", description: "Connecting AI to your CRM: trigger-based email sequences, dynamic segmentation, and personalized landing page copy." },
                { hour: "14:45 - 16:00", title: "AI Analytics & Competitive Intelligence", description: "Using AI agents to monitor competitors, analyze sentiment, and generate actionable insights from campaign data." },
                { hour: "16:00 - 17:00", title: "Your 30-Day AI Marketing Plan", description: "Participants build a concrete AI-powered marketing roadmap they can execute immediately after the session." }
            ],
            prerequisites: "Basic marketing experience. AI Discovery recommended.",
            whoItIsFor: "Marketing Managers, Content Creators, Growth Marketers, and CMOs."
        },
        fr: {
            slug: "ia-marketing-agents",
            title: "IA pour le Marketing",
            subtitle: "Automatisez Campagnes, Contenu & Analytiques avec les Agents IA",
            description: "Scalez votre marketing sans scaler votre équipe. Exploitez des agents IA pour générer du contenu, lancer des tests A/B, analyser vos données et personnaliser les parcours clients à grande échelle.",
            level: "Intermédiaire",
            duration: "7 Heures",
            format: "Atelier Créatif & Pratique",
            tag: "MARKETING",
            prerequisiteSlug: "ia-decouverte",
            skills: ["Automatisation Contenu IA", "Agents Intelligence Campagne", "Personnalisation à Échelle", "Analytiques Marketing IA"],
            outcomes: [
                "Créer un agent de génération de contenu qui produit des textes on-brand en quelques minutes",
                "Automatiser la planification des réseaux sociaux et la génération de titres A/B",
                "Utiliser des agents IA pour la veille concurrentielle et l'analyse de marché",
                "Créer des séquences d'emails personnalisées déclenchées par les données comportementales",
                "Analyser les performances de campagne avec des tableaux de bord IA"
            ],
            syllabus: [
                { hour: "9h00 - 10h30", title: "Le Stack Marketing Autonome", description: "Panorama des outils IA transformant le marketing : ChatGPT, Jasper, Perplexity, Make.com. Vue d'ensemble de la boucle marketing agentique." },
                { hour: "10h45 - 12h00", title: "Agent de Génération de Contenu", description: "Construire un agent qui recherche un sujet, rédige des articles de blog, légendes sociales et textes d'emails — on-brand et de façon autonome." },
                { hour: "12h00 - 13h00", title: "Pause Déjeuner", description: "Lunch offert via Uber Eats ou Doordash." },
                { hour: "13h00 - 14h30", title: "Automatisation Campagnes & Personnalisation", description: "Connecter l'IA à votre CRM : séquences d'emails basées sur des déclencheurs, segmentation dynamique et copie de landing page personnalisée." },
                { hour: "14h45 - 16h00", title: "IA Analytiques & Veille Concurrentielle", description: "Utilisation d'agents IA pour surveiller les concurrents, analyser le sentiment et générer des insights actionnables depuis vos données de campagne." },
                { hour: "16h00 - 17h00", title: "Votre Plan Marketing IA 30 Jours", description: "Les participants construisent une feuille de route marketing IA concrète qu'ils peuvent exécuter immédiatement après la session." }
            ],
            prerequisites: "Expérience marketing de base. IA Découverte recommandé.",
            whoItIsFor: "Responsables Marketing, Créateurs de Contenu, Growth Marketers et CMO."
        }
    },
    "ia-production": {
        en: {
            slug: "ai-production",
            title: "AI for Operations & Production",
            subtitle: "Optimize Workflows, Quality Control & Process Efficiency with AI Agents",
            description: "Deploy intelligent agents on your production floor and operations center. From predictive maintenance to real-time quality control, learn how AI redefines operational excellence.",
            level: "Advanced",
            duration: "7 Hours",
            format: "Technical Hands-on Workshop",
            tag: "OPERATIONS",
            prerequisiteSlug: "ai-booster",
            skills: ["Predictive Maintenance AI", "Process Optimization Agents", "Quality Control Automation", "Operational Intelligence"],
            outcomes: [
                "Design an AI agent for predictive maintenance scheduling",
                "Implement computer vision workflows for automated quality control",
                "Use AI to identify and eliminate production bottlenecks",
                "Build real-time operational dashboards powered by AI insights",
                "Automate production reporting and shift handover documentation"
            ],
            syllabus: [
                { hour: "9:00 - 10:30", title: "AI in Operations: State of the Art", description: "Industrial AI landscape: from IoT sensors to LLM-powered agents. Real-world manufacturing and operations case studies." },
                { hour: "10:45 - 12:00", title: "Predictive Maintenance Agent", description: "Building an AI agent that monitors equipment data, predicts failures, and auto-schedules maintenance tickets." },
                { hour: "12:00 - 13:00", title: "Lunch Break", description: "Lunch included via Uber Eats or Doordash." },
                { hour: "13:00 - 14:30", title: "Quality Control & Computer Vision", description: "Introducing vision AI for defect detection, automated inspections, and real-time quality scoring without specialized hardware." },
                { hour: "14:45 - 16:00", title: "Process Bottleneck Detection", description: "Using AI to analyze workflow data, simulate process changes, and identify the highest-ROI optimizations." },
                { hour: "16:00 - 17:00", title: "AI Operations Roadmap", description: "Participants define their top 3 AI use cases and build a 90-day implementation plan." }
            ],
            prerequisites: "Operational management experience. AI Booster recommended.",
            whoItIsFor: "Operations Managers, Plant Managers, Process Engineers, and Production Supervisors."
        },
        fr: {
            slug: "ia-production",
            title: "IA pour la Production & Opérations",
            subtitle: "Optimisez Vos Flux, Contrôle Qualité & Efficacité avec les Agents IA",
            description: "Déployez des agents intelligents sur votre plancher de production et votre centre d'opérations. De la maintenance prédictive au contrôle qualité en temps réel, maîtrisez comment l'IA redéfinit l'excellence opérationnelle.",
            level: "Avancé",
            duration: "7 Heures",
            format: "Atelier Technique Pratique",
            tag: "PRODUCTION",
            prerequisiteSlug: "ia-booster",
            skills: ["IA Maintenance Prédictive", "Agents Optimisation Processus", "Automatisation Contrôle Qualité", "Intelligence Opérationnelle"],
            outcomes: [
                "Concevoir un agent IA pour la planification de maintenance prédictive",
                "Implémenter des flux de vision par ordinateur pour le contrôle qualité automatisé",
                "Utiliser l'IA pour identifier et éliminer les goulots d'étranglement de production",
                "Construire des tableaux de bord opérationnels en temps réel alimentés par des insights IA",
                "Automatiser les rapports de production et la documentation de passation de poste"
            ],
            syllabus: [
                { hour: "9h00 - 10h30", title: "L'IA en Opérations : État de l'Art", description: "Panorama de l'IA industrielle : des capteurs IoT aux agents alimentés par LLM. Études de cas réels en fabrication et opérations." },
                { hour: "10h45 - 12h00", title: "Agent de Maintenance Prédictive", description: "Construction d'un agent IA qui surveille les données d'équipement, prédit les pannes et planifie automatiquement les tickets de maintenance." },
                { hour: "12h00 - 13h00", title: "Pause Déjeuner", description: "Lunch offert via Uber Eats ou Doordash." },
                { hour: "13h00 - 14h30", title: "Contrôle Qualité & Vision par Ordinateur", description: "Introduction à la vision IA pour la détection de défauts, les inspections automatisées et le scoring qualité en temps réel." },
                { hour: "14h45 - 16h00", title: "Détection de Goulots d'Étranglement", description: "Utilisation de l'IA pour analyser les données de flux de travail, simuler des changements et identifier les optimisations à plus fort ROI." },
                { hour: "16h00 - 17h00", title: "Feuille de Route IA Opérations", description: "Les participants définissent leurs 3 meilleurs cas d'usage IA et construisent un plan d'implémentation sur 90 jours." }
            ],
            prerequisites: "Expérience en gestion opérationnelle. IA Booster recommandé.",
            whoItIsFor: "Directeurs des Opérations, Directeurs d'Usine, Ingénieurs de Procédés et Superviseurs de Production."
        }
    },
    "ia-logistique": {
        en: {
            slug: "ai-logistics",
            title: "AI for Logistics & Transport",
            subtitle: "Optimize Routes, Fleet & Supply Chain with AI Agents",
            description: "Deploy AI agents to revolutionize your logistics. From real-time route optimization to demand forecasting and automated dispatch, learn how to build a smarter, leaner supply chain.",
            level: "Advanced",
            duration: "7 Hours",
            format: "Technical Hands-on Workshop",
            tag: "LOGISTICS",
            prerequisiteSlug: "ai-booster",
            skills: ["Route Optimization AI", "Supply Chain Intelligence", "Fleet Automation Agents", "Demand Forecasting"],
            outcomes: [
                "Build an AI agent for dynamic route optimization and traffic prediction",
                "Automate dispatch and load planning using AI decision agents",
                "Deploy demand forecasting models that reduce inventory costs",
                "Implement AI-powered supplier risk monitoring",
                "Automate freight documentation and customs paperwork"
            ],
            syllabus: [
                { hour: "9:00 - 10:30", title: "AI in Modern Logistics", description: "How leading 3PLs and carriers use AI: route optimization, dynamic pricing, and autonomous dispatch systems." },
                { hour: "10:45 - 12:00", title: "Route Optimization Agent", description: "Building an AI agent that processes live traffic, delivery constraints, and driver hours to generate optimal daily routes." },
                { hour: "12:00 - 13:00", title: "Lunch Break", description: "Lunch included via Uber Eats or Doordash." },
                { hour: "13:00 - 14:30", title: "Supply Chain Intelligence & Forecasting", description: "Using AI to predict demand spikes, optimize inventory levels, and identify supply chain risks before they disrupt operations." },
                { hour: "14:45 - 16:00", title: "Automated Dispatch & Documentation", description: "AI agents for load planning, automated dispatch communication, and freight document generation (BOLs, customs, invoices)." },
                { hour: "16:00 - 17:00", title: "Your AI Logistics Roadmap", description: "Participants identify their highest-ROI logistics use case and build a 90-day action plan." }
            ],
            prerequisites: "Logistics or supply chain management experience. AI Booster recommended.",
            whoItIsFor: "Logistics Managers, Fleet Managers, Supply Chain Directors, and 3PL Operators."
        },
        fr: {
            slug: "ia-logistique",
            title: "IA pour la Logistique & Transport",
            subtitle: "Optimisez Routes, Flotte & Chaîne d'Approvisionnement avec les Agents IA",
            description: "Déployez des agents IA pour révolutionner votre logistique. De l'optimisation des routes en temps réel à la prévision de la demande et à la répartition automatisée, apprenez à construire une chaîne d'approvisionnement plus intelligente.",
            level: "Avancé",
            duration: "7 Heures",
            format: "Atelier Technique Pratique",
            tag: "LOGISTIQUE",
            prerequisiteSlug: "ia-booster",
            skills: ["IA Optimisation Routes", "Intelligence Chaîne d'Approvisionnement", "Agents Automatisation Flotte", "Prévision de Demande"],
            outcomes: [
                "Construire un agent IA pour l'optimisation dynamique des routes et la prédiction du trafic",
                "Automatiser la répartition et la planification des chargements avec des agents de décision IA",
                "Déployer des modèles de prévision de demande qui réduisent les coûts de stock",
                "Implémenter une surveillance des risques fournisseurs alimentée par IA",
                "Automatiser la documentation de fret et les formalités douanières"
            ],
            syllabus: [
                { hour: "9h00 - 10h30", title: "L'IA dans la Logistique Moderne", description: "Comment les principaux 3PL et transporteurs utilisent l'IA : optimisation des routes, tarification dynamique et systèmes de répartition autonomes." },
                { hour: "10h45 - 12h00", title: "Agent d'Optimisation des Routes", description: "Construction d'un agent IA qui traite le trafic en temps réel, les contraintes de livraison et les heures de conduite pour générer des itinéraires quotidiens optimaux." },
                { hour: "12h00 - 13h00", title: "Pause Déjeuner", description: "Lunch offert via Uber Eats ou Doordash." },
                { hour: "13h00 - 14h30", title: "Intelligence & Prévision Chaîne d'Appro", description: "Utilisation de l'IA pour prédire les pics de demande, optimiser les niveaux de stock et identifier les risques de la chaîne d'approvisionnement." },
                { hour: "14h45 - 16h00", title: "Répartition Automatisée & Documentation", description: "Agents IA pour la planification des chargements, la communication de répartition automatisée et la génération de documents de fret." },
                { hour: "16h00 - 17h00", title: "Votre Feuille de Route IA Logistique", description: "Les participants identifient leur cas d'usage logistique à plus fort ROI et construisent un plan d'action sur 90 jours." }
            ],
            prerequisites: "Expérience en gestion logistique ou de la chaîne d'approvisionnement. IA Booster recommandé.",
            whoItIsFor: "Directeurs Logistique, Gestionnaires de Flotte, Directeurs de la Chaîne d'Approvisionnement et Opérateurs 3PL."
        }
    },
    "ia-juridique": {
        en: {
            slug: "ai-legal",
            title: "AI for Legal & Compliance",
            subtitle: "Automate Contract Review, Risk Analysis & Compliance with AI Agents",
            description: "Empower your legal and compliance teams with AI agents. From automated contract analysis to regulatory monitoring, learn how to drastically reduce legal workload while improving accuracy and risk management.",
            level: "Intermediate",
            duration: "7 Hours",
            format: "Practical Workshop",
            tag: "LEGAL",
            prerequisiteSlug: "ai-discovery",
            skills: ["Contract Analysis AI", "Regulatory Compliance Agents", "Legal Document Automation", "Risk & Due Diligence AI"],
            outcomes: [
                "Build an AI agent to review and redline contracts in minutes",
                "Automate regulatory change monitoring and compliance alerts",
                "Use AI to perform due diligence and identify legal risks",
                "Generate first-draft legal documents (NDAs, policies, clauses)",
                "Implement AI workflows for privacy compliance (Loi 25 / GDPR)"
            ],
            syllabus: [
                { hour: "9:00 - 10:30", title: "AI in Law: Opportunities & Guardrails", description: "How AI is transforming legal operations in Canada. Key tools: Harvey, Claude, NotebookLM. Ethical guardrails and privilege considerations." },
                { hour: "10:45 - 12:00", title: "Contract Review Agent", description: "Build an AI agent that reads contracts, flags non-standard clauses, identifies risks, and generates a negotiation summary." },
                { hour: "12:00 - 13:00", title: "Lunch Break", description: "Lunch included via Uber Eats or Doordash." },
                { hour: "13:00 - 14:30", title: "Regulatory Compliance & Monitoring", description: "Deploying an AI agent to monitor regulatory changes (Loi 25, GDPR, PIPEDA), generate compliance reports, and alert teams." },
                { hour: "14:45 - 16:00", title: "Legal Document Drafting", description: "Using AI to first-draft NDAs, employment agreements, privacy policies, and internal compliance documents." },
                { hour: "16:00 - 17:00", title: "Legal AI Governance Framework", description: "Building an internal framework for responsible AI use in legal contexts: oversight, validation, and privilege protection." }
            ],
            prerequisites: "Legal or compliance background recommended. AI Discovery recommended.",
            whoItIsFor: "In-house Counsel, Compliance Officers, Legal Operations Teams, and Privacy Officers."
        },
        fr: {
            slug: "ia-juridique",
            title: "IA pour le Droit & la Conformité",
            subtitle: "Automatisez l'Examen de Contrats, l'Analyse de Risques & la Conformité avec les Agents IA",
            description: "Équipez vos équipes juridiques et de conformité avec des agents IA. De l'analyse automatisée de contrats à la surveillance réglementaire, apprenez à réduire drastiquement la charge juridique tout en améliorant la précision.",
            level: "Intermédiaire",
            duration: "7 Heures",
            format: "Atelier Pratique",
            tag: "JURIDIQUE",
            prerequisiteSlug: "ia-decouverte",
            skills: ["IA Analyse de Contrats", "Agents Conformité Réglementaire", "Automatisation Documents Juridiques", "IA Risques & Due Diligence"],
            outcomes: [
                "Construire un agent IA pour examiner et annoter des contrats en quelques minutes",
                "Automatiser la surveillance des changements réglementaires et les alertes de conformité",
                "Utiliser l'IA pour la due diligence et l'identification des risques juridiques",
                "Générer des premiers jets de documents juridiques (NDA, politiques, clauses)",
                "Implémenter des flux IA pour la conformité à la vie privée (Loi 25 / RGPD)"
            ],
            syllabus: [
                { hour: "9h00 - 10h30", title: "L'IA en Droit : Opportunités & Garde-fous", description: "Comment l'IA transforme les opérations juridiques au Canada. Outils clés : Harvey, Claude, NotebookLM. Garde-fous éthiques et considérations de privilège." },
                { hour: "10h45 - 12h00", title: "Agent d'Examen de Contrats", description: "Construire un agent IA qui lit les contrats, signale les clauses non standard, identifie les risques et génère un résumé de négociation." },
                { hour: "12h00 - 13h00", title: "Pause Déjeuner", description: "Lunch offert via Uber Eats ou Doordash." },
                { hour: "13h00 - 14h30", title: "Conformité & Surveillance Réglementaire", description: "Déploiement d'un agent IA pour surveiller les changements réglementaires (Loi 25, RGPD, LPRPDE), générer des rapports de conformité et alerter les équipes." },
                { hour: "14h45 - 16h00", title: "Rédaction de Documents Juridiques", description: "Utilisation de l'IA pour rédiger les premières versions de NDA, contrats de travail, politiques de confidentialité et documents de conformité internes." },
                { hour: "16h00 - 17h00", title: "Cadre de Gouvernance IA Juridique", description: "Construction d'un cadre interne pour une utilisation responsable de l'IA dans les contextes juridiques : supervision, validation et protection des privilèges." }
            ],
            prerequisites: "Contexte juridique ou de conformité recommandé. IA Découverte recommandé.",
            whoItIsFor: "Conseillers Juridiques Internes, Responsables Conformité, Équipes d'Opérations Juridiques et Délégués à la Protection des Données."
        }
    },
    "cyber-sensibilisation": {
        en: {
            slug: "cyber-awareness",
            title: "Cybersecurity Awareness",
            subtitle: "Train Every Employee to Be Your First Line of Defense",
            description: "Human error is behind 95% of security breaches. Equip all your employees with the reflexes, knowledge, and habits to resist phishing, social engineering, and everyday cyber threats.",
            level: "Beginner",
            duration: "7 Hours",
            format: "Interactive Workshop",
            tag: "CYBER",
            prerequisiteSlug: undefined,
            skills: ["Phishing Recognition", "Password Hygiene", "Social Engineering Defense", "Incident Reporting"],
            outcomes: [
                "Identify and avoid phishing emails, vishing calls, and social engineering attacks",
                "Apply strong password and MFA practices across all accounts",
                "Understand safe remote work and public WiFi practices",
                "Know the exact steps to report a security incident",
                "Recognize ransomware red flags before they detonate"
            ],
            syllabus: [
                { hour: "9:00 - 10:30", title: "The Human Factor in Cybersecurity", description: "Why attackers target people, not systems. Real case studies of breaches caused by employees in SMEs." },
                { hour: "10:45 - 12:00", title: "Phishing & Social Engineering Lab", description: "Live phishing simulation: participants analyze real (anonymized) attack emails, SMS, and LinkedIn messages." },
                { hour: "12:00 - 13:00", title: "Lunch Break", description: "Lunch included via Uber Eats or Doordash." },
                { hour: "13:00 - 14:30", title: "Passwords, MFA & Access Control", description: "Password manager deployment, MFA setup, and the principle of least privilege explained simply." },
                { hour: "14:45 - 16:00", title: "Remote Work, BYOD & Public Networks", description: "Safe practices for home offices, public WiFi, and personal devices accessing company data." },
                { hour: "16:00 - 17:00", title: "Incident Response Drill", description: "Tabletop exercise: what to do when you click on a phishing link, receive a suspicious file, or suspect a breach." }
            ],
            prerequisites: "No technical background required. Suitable for all employees.",
            whoItIsFor: "All Employees, Executives, Administrative Staff, and Remote Workers."
        },
        fr: {
            slug: "cyber-sensibilisation",
            title: "Sensibilisation à la Cybersécurité",
            subtitle: "Faites de Chaque Employé Votre Première Ligne de Défense",
            description: "L'erreur humaine est à l'origine de 95% des brèches de sécurité. Équipez tous vos employés des réflexes, connaissances et habitudes pour résister au phishing, à l'ingénierie sociale et aux cybermenaces du quotidien.",
            level: "Débutant",
            duration: "7 Heures",
            format: "Atelier Interactif",
            tag: "CYBER",
            prerequisiteSlug: undefined,
            skills: ["Reconnaissance Phishing", "Hygiène des Mots de Passe", "Défense Ingénierie Sociale", "Signalement d'Incidents"],
            outcomes: [
                "Identifier et éviter les emails de phishing, appels de vishing et attaques d'ingénierie sociale",
                "Appliquer des pratiques robustes de mots de passe et d'AMF sur tous les comptes",
                "Comprendre les pratiques sécurisées pour le télétravail et les WiFi publics",
                "Connaître les étapes exactes pour signaler un incident de sécurité",
                "Reconnaître les signaux d'alarme de ransomware avant qu'ils ne se déclenchent"
            ],
            syllabus: [
                { hour: "9h00 - 10h30", title: "Le Facteur Humain en Cybersécurité", description: "Pourquoi les attaquants ciblent les personnes, pas les systèmes. Études de cas réels de brèches causées par des employés de PME." },
                { hour: "10h45 - 12h00", title: "Lab Phishing & Ingénierie Sociale", description: "Simulation de phishing en direct : les participants analysent des emails d'attaque réels (anonymisés), SMS et messages LinkedIn." },
                { hour: "12h00 - 13h00", title: "Pause Déjeuner", description: "Lunch offert via Uber Eats ou Doordash." },
                { hour: "13h00 - 14h30", title: "Mots de Passe, AMF & Contrôle d'Accès", description: "Déploiement d'un gestionnaire de mots de passe, configuration de l'AMF et principe du moindre privilège expliqué simplement." },
                { hour: "14h45 - 16h00", title: "Télétravail, BYOD & Réseaux Publics", description: "Pratiques sécurisées pour les bureaux à domicile, WiFi publics et appareils personnels accédant aux données de l'entreprise." },
                { hour: "16h00 - 17h00", title: "Exercice de Réponse aux Incidents", description: "Exercice sur table : que faire si vous cliquez sur un lien de phishing, recevez un fichier suspect, ou suspectez une brèche." }
            ],
            prerequisites: "Aucun bagage technique requis. Convient à tous les employés.",
            whoItIsFor: "Tous les Employés, Cadres, Personnel Administratif et Travailleurs à Distance."
        }
    },
    "cyber-loi25": {
        en: {
            slug: "cyber-compliance",
            title: "Data Security & Privacy Compliance",
            subtitle: "Meet Loi 25, PIPEDA & GDPR Requirements with Confidence",
            description: "Navigate Canadian privacy laws with confidence. Understand your obligations under Loi 25 and PIPEDA, build a compliant data governance framework, and avoid costly fines.",
            level: "Intermediate",
            duration: "7 Hours",
            format: "Compliance Workshop",
            tag: "CONFORMITÉ",
            prerequisiteSlug: undefined,
            skills: ["Data Mapping & Classification", "Loi 25 Compliance", "Privacy by Design", "Incident Response Planning"],
            outcomes: [
                "Understand all obligations of Loi 25 and PIPEDA for your organization",
                "Build a data inventory and classification framework",
                "Implement Privacy Impact Assessments (PIAs) for key processes",
                "Design an incident response plan compliant with notification obligations",
                "Train your team on data minimization and retention principles"
            ],
            syllabus: [
                { hour: "9:00 - 10:30", title: "Canadian Privacy Law Landscape", description: "Loi 25, PIPEDA, GDPR cross-border implications. What changed, what's new, and what businesses must do now." },
                { hour: "10:45 - 12:00", title: "Data Mapping & Governance", description: "Hands-on: building your data inventory, mapping data flows, and classifying personal information by risk level." },
                { hour: "12:00 - 13:00", title: "Lunch Break", description: "Lunch included via Uber Eats or Doordash." },
                { hour: "13:00 - 14:30", title: "Privacy by Design Implementation", description: "Embedding privacy into product design, HR processes, marketing, and third-party vendor management." },
                { hour: "14:45 - 16:00", title: "Breach Response & Notification", description: "When and how to notify the Commission d'accès à l'information. Building your incident response playbook." },
                { hour: "16:00 - 17:00", title: "Your Compliance Roadmap", description: "Participants leave with a gap analysis and prioritized remediation plan tailored to their organization." }
            ],
            prerequisites: "No legal background required, basic business operations understanding helpful.",
            whoItIsFor: "Business Owners, Compliance Officers, IT Managers, HR Leaders, and Marketing Directors."
        },
        fr: {
            slug: "cyber-loi25",
            title: "Sécurité des Données & Conformité",
            subtitle: "Respectez la Loi 25, LPRPDE & RGPD avec Confiance",
            description: "Naviguez les lois canadiennes sur la vie privée avec confiance. Comprenez vos obligations en vertu de la Loi 25 et de la LPRPDE, construisez un cadre de gouvernance conforme et évitez les amendes coûteuses.",
            level: "Intermédiaire",
            duration: "7 Heures",
            format: "Atelier de Conformité",
            tag: "CONFORMITÉ",
            prerequisiteSlug: undefined,
            skills: ["Cartographie & Classification des Données", "Conformité Loi 25", "Protection de la vie privée dès la conception", "Plan de Réponse aux Incidents"],
            outcomes: [
                "Comprendre toutes les obligations de la Loi 25 et de la LPRPDE pour votre organisation",
                "Construire un inventaire des données et un cadre de classification",
                "Réaliser des Évaluations des Facteurs Relatifs à la Vie Privée (EFVP)",
                "Concevoir un plan de réponse aux incidents conforme aux obligations de notification",
                "Former votre équipe aux principes de minimisation et de rétention des données"
            ],
            syllabus: [
                { hour: "9h00 - 10h30", title: "Le Paysage Légal Canadien sur la Vie Privée", description: "Loi 25, LPRPDE, implications transfrontalières du RGPD. Ce qui a changé, quoi de neuf et ce que les entreprises doivent faire maintenant." },
                { hour: "10h45 - 12h00", title: "Cartographie des Données & Gouvernance", description: "Pratique : construire votre inventaire de données, cartographier les flux de données et classer les informations personnelles par niveau de risque." },
                { hour: "12h00 - 13h00", title: "Pause Déjeuner", description: "Lunch offert via Uber Eats ou Doordash." },
                { hour: "13h00 - 14h30", title: "Mise en Œuvre Privacy by Design", description: "Intégrer la confidentialité dans la conception de produits, les processus RH, le marketing et la gestion des fournisseurs tiers." },
                { hour: "14h45 - 16h00", title: "Réponse aux Incidents & Notification", description: "Quand et comment notifier la Commission d'accès à l'information. Construction de votre playbook de réponse aux incidents." },
                { hour: "16h00 - 17h00", title: "Votre Feuille de Route de Conformité", description: "Les participants repartent avec une analyse des écarts et un plan de remédiation priorisé adapté à leur organisation." }
            ],
            prerequisites: "Aucun bagage juridique requis, compréhension de base des opérations commerciales utile.",
            whoItIsFor: "Propriétaires d'Entreprises, Responsables Conformité, Gestionnaires TI, Responsables RH et Directeurs Marketing."
        }
    },
    "cyber-defense": {
        en: {
            slug: "cyber-defense",
            title: "Active Cyber Defense",
            subtitle: "Threat Hunting, Incident Response & Security Operations for IT Teams",
            description: "Elevate your IT team's defensive capabilities. From hands-on threat hunting to building a security baseline and running tabletop exercises, this advanced workshop prepares your team for real-world incidents.",
            level: "Advanced",
            duration: "7 Hours",
            format: "Technical Workshop",
            tag: "CYBER IT",
            prerequisiteSlug: "cyber-awareness",
            skills: ["Threat Hunting", "SIEM & Log Analysis", "Vulnerability Management", "Incident Response"],
            outcomes: [
                "Conduct structured threat hunting exercises on your own environment",
                "Build and tune a security baseline for your network and endpoints",
                "Implement a vulnerability management program with prioritized patching",
                "Run a full tabletop incident response simulation",
                "Configure basic SIEM alerting and log monitoring"
            ],
            syllabus: [
                { hour: "9:00 - 10:30", title: "Threat Landscape & Attack Chains", description: "Current threat actors targeting Canadian SMEs. MITRE ATT&CK framework applied to your environment." },
                { hour: "10:45 - 12:00", title: "Threat Hunting Lab", description: "Hands-on: using freely available tools (Sysmon, Sigma rules, Elastic) to hunt for indicators of compromise in logs." },
                { hour: "12:00 - 13:00", title: "Lunch Break", description: "Lunch included via Uber Eats or Doordash." },
                { hour: "13:00 - 14:30", title: "Vulnerability Management & Hardening", description: "Running your first vulnerability scan, prioritizing CVEs with CVSS, and applying CIS Benchmark hardening steps." },
                { hour: "14:45 - 16:00", title: "Incident Response Tabletop", description: "Full simulation: ransomware hits your network. Teams play attacker and defender roles, making real decisions under time pressure." },
                { hour: "16:00 - 17:00", title: "Security Roadmap & Quick Wins", description: "Participants leave with a prioritized security improvement plan and a list of 10 quick wins they can implement this week." }
            ],
            prerequisites: "IT experience required. Network and systems administration background recommended.",
            whoItIsFor: "IT Administrators, System Administrators, Network Engineers, and Security Officers."
        },
        fr: {
            slug: "cyber-defense",
            title: "Défense Cyber Active",
            subtitle: "Chasse aux Menaces, Réponse aux Incidents & Opérations Sécurité pour les Équipes TI",
            description: "Élevez les capacités défensives de votre équipe TI. De la chasse aux menaces en conditions réelles à la construction d'une ligne de base de sécurité, cet atelier avancé prépare votre équipe aux incidents réels.",
            level: "Avancé",
            duration: "7 Heures",
            format: "Atelier Technique",
            tag: "CYBER TI",
            prerequisiteSlug: "cyber-sensibilisation",
            skills: ["Chasse aux Menaces", "SIEM & Analyse de Logs", "Gestion des Vulnérabilités", "Réponse aux Incidents"],
            outcomes: [
                "Conduire des exercices structurés de chasse aux menaces sur votre propre environnement",
                "Construire et affiner une ligne de base de sécurité pour votre réseau et vos terminaux",
                "Implémenter un programme de gestion des vulnérabilités avec correction priorisée",
                "Exécuter une simulation complète de réponse aux incidents sur table",
                "Configurer des alertes SIEM de base et la surveillance des logs"
            ],
            syllabus: [
                { hour: "9h00 - 10h30", title: "Paysage des Menaces & Chaînes d'Attaque", description: "Acteurs de menace actuels ciblant les PME canadiennes. Cadre MITRE ATT&CK appliqué à votre environnement." },
                { hour: "10h45 - 12h00", title: "Lab de Chasse aux Menaces", description: "Pratique : utilisation d'outils disponibles gratuitement (Sysmon, règles Sigma, Elastic) pour chasser les indicateurs de compromission dans les logs." },
                { hour: "12h00 - 13h00", title: "Pause Déjeuner", description: "Lunch offert via Uber Eats ou Doordash." },
                { hour: "13h00 - 14h30", title: "Gestion des Vulnérabilités & Durcissement", description: "Exécuter votre premier scan de vulnérabilités, prioriser les CVE avec CVSS et appliquer les étapes de durcissement CIS Benchmark." },
                { hour: "14h45 - 16h00", title: "Simulation de Réponse aux Incidents", description: "Simulation complète : un ransomware frappe votre réseau. Les équipes jouent les rôles d'attaquant et de défenseur, prenant de vraies décisions sous pression." },
                { hour: "16h00 - 17h00", title: "Feuille de Route Sécurité & Gains Rapides", description: "Les participants repartent avec un plan d'amélioration sécurité priorisé et une liste de 10 gains rapides qu'ils peuvent implémenter cette semaine." }
            ],
            prerequisites: "Expérience TI requise. Contexte d'administration réseau et systèmes recommandé.",
            whoItIsFor: "Administrateurs TI, Administrateurs Systèmes, Ingénieurs Réseau et Responsables Sécurité."
        }
    }
};

export const getCourseData = (slug: string, lang: string): CourseData | null => {
    const l = lang as "en" | "fr";
    const courseEntry = Object.values(courses).find(c => c[l].slug === slug);
    return courseEntry ? courseEntry[l] : null;
};

export const getAllCoursesData = (lang: string): CourseData[] => {
    const l = lang as "en" | "fr";
    return Object.values(courses).map(c => c[l]);
};

export const getAllCourseParams = (): { lang: string; slug: string }[] => {
    const params: { lang: string; slug: string }[] = [];
    Object.values(courses).forEach(c => {
        params.push({ lang: "en", slug: c.en.slug });
        params.push({ lang: "fr", slug: c.fr.slug });
    });
    return params;
};
