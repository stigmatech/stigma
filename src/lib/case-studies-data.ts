export type CaseStudy = {
    slug: string;
    title: { en: string; fr: string };
    category: string;
    categoryIcon: string;
    description: { en: string; fr: string };
    heroImage: string;
    result: { en: string; fr: string };
    challenge: { en: string; fr: string };
    solution: { en: string; fr: string };
    impact: { en: string; fr: string };
    stats: { value: string; label: { en: string; fr: string } }[];
    timeline: {
        phase: { en: string; fr: string };
        title: { en: string; fr: string };
        description: { en: string; fr: string };
    }[];
    testimonial: {
        quote: { en: string; fr: string };
        author: string;
        role: string;
        company: string;
    };
    tags: string[];
    relatedSlugs?: string[];
    relatedBlogPosts?: string[];
    ctaOverride?: {
        title: { en: string; fr: string };
        description: { en: string; fr: string };
    };
    bookingOverride?: {
        title: { en: string; fr: string };
        titleHighlight: { en: string; fr: string };
        description: { en: string; fr: string };
    };
};

export const caseStudies: CaseStudy[] = [
    {
        slug: "ai-loss-prevention",
        title: {
            en: "AI-Powered Loss Prevention Architecture",
            fr: "Architecture de Prévention des Pertes par l'IA",
        },
        category: "DIGITAL TRANSFORMATION",
        categoryIcon: "dynamic_feed",
        description: {
            en: "In-store video surveillance is essential for shoplifting prevention. Discover our software, which detects shoplifting incidents automatically in real-time.",
            fr: "La vidéosurveillance en magasin est essentielle pour la prévention du vol à l'étalage. Découvrez notre logiciel qui détecte automatiquement les incidents en temps réel.",
        },
        heroImage:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop",
        result: {
            en: "45% reduction in shrinkage within the first 6 months of deployment.",
            fr: "Réduction de 45 % des pertes au cours des 6 premiers mois de déploiement.",
        },
        challenge: {
            en: "A major retail chain with 120+ stores across Canada faced an estimated $12M annual shrinkage problem. Traditional CCTV systems required enormous manpower to review footage and could only report incidents after the fact, making real-time prevention impossible.",
            fr: "Une grande chaîne de vente au détail avec plus de 120 magasins au Canada faisait face à un problème de perte estimé à 12 M$ par an. Les systèmes de vidéosurveillance traditionnels nécessitaient une main-d'œuvre considérable et ne permettaient que des rapports après les faits.",
        },
        solution: {
            en: "We architected a real-time computer vision platform built on edge-computing nodes installed directly in each store. The system uses advanced convolutional neural networks (CNNs) trained on proprietary shoplifting behavior datasets to identify and flag suspicious activity within milliseconds — sending instant alerts to loss prevention staff without requiring central cloud processing.",
            fr: "Nous avons conçu une plateforme de vision par ordinateur en temps réel basée sur des nœuds de traitement en périphérie installés directement dans chaque magasin. Le système utilise des réseaux de neurones convolutifs avancés entraînés sur des ensembles de données propriétaires pour identifier les activités suspectes en quelques millisecondes.",
        },
        impact: {
            en: "Beyond the direct 45% reduction in shrinkage, the platform freed up over 2,000 hours per month previously spent reviewing CCTV footage, allowing loss prevention teams to focus on proactive strategies. The client also saw a dramatic improvement in store morale and customer experience as incidents were handled more discretely and effectively.",
            fr: "Au-delà de la réduction directe de 45 % des pertes, la plateforme a libéré plus de 2 000 heures par mois auparavant consacrées à la révision des enregistrements, permettant aux équipes de se concentrer sur des stratégies proactives.",
        },
        stats: [
            { value: "45%", label: { en: "Reduction in shrinkage", fr: "Réduction des pertes" } },
            { value: "120+", label: { en: "Stores deployed", fr: "Magasins déployés" } },
            { value: "<200ms", label: { en: "Incident detection time", fr: "Temps de détection" } },
            { value: "$5.4M", label: { en: "Annual savings", fr: "Économies annuelles" } },
        ],
        timeline: [
            {
                phase: { en: "Phase 1", fr: "Phase 1" },
                title: { en: "Data Audit & Model Training", fr: "Audit des données & Entraînement" },
                description: {
                    en: "Collected 6 months of historical CCTV footage. Labeled and trained initial detection models on over 50,000 annotated shoplifting events.",
                    fr: "Collecte de 6 mois d'historique vidéo. Entraînement des modèles initiaux sur plus de 50 000 événements annotés.",
                },
            },
            {
                phase: { en: "Phase 2", fr: "Phase 2" },
                title: { en: "Edge Infrastructure Deployment", fr: "Déploiement de l'infrastructure" },
                description: {
                    en: "Installed edge computing nodes across 120 stores without disrupting daily operations. Integrated with existing CCTV hardware.",
                    fr: "Installation des nœuds en périphérie dans 120 magasins sans perturber les opérations quotidiennes. Intégration avec le matériel existant.",
                },
            },
            {
                phase: { en: "Phase 3", fr: "Phase 3" },
                title: { en: "Real-time Monitoring & Optimization", fr: "Surveillance et optimisation" },
                description: {
                    en: "Activated live alerting. Ran a continuous feedback loop to retrain models monthly, improving accuracy from 87% to 97%.",
                    fr: "Activation des alertes en direct. Boucle de rétroaction continue améliorant la précision de 87 % à 97 %.",
                },
            },
        ],
        testimonial: {
            quote: {
                en: "This system transformed how we think about loss prevention. We went from reactive to truly proactive almost overnight.",
                fr: "Ce système a transformé notre façon de penser la prévention des pertes. Nous sommes passés du réactif au proactif en un rien de temps.",
            },
            author: "Michael Chen",
            role: "VP of Operations",
            company: "National Retail Group",
        },
        tags: ["AI / ML", "Computer Vision", "Edge Computing", "Retail"],
    },
    {
        slug: "enterprise-it-modernization",
        title: {
            en: "Enterprise Infrastructure Modernization",
            fr: "Modernisation de l'Infrastructure d'Entreprise",
        },
        category: "MANAGED IT",
        categoryIcon: "settings_suggest",
        description: {
            en: "The combination of trusted Microsoft Office applications, professional email services, cloud storage, intelligent tools for streamlining operations and advanced analytics.",
            fr: "La combinaison d'applications Microsoft Office de confiance, de services de courrier électronique professionnels, de stockage cloud et d'outils intelligents.",
        },
        heroImage:
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2670&auto=format&fit=crop",
        result: {
            en: "Seamless migration of 500+ users with zero downtime recorded.",
            fr: "Migration transparente de plus de 500 utilisateurs avec un temps d'arrêt nul enregistré.",
        },
        challenge: {
            en: "A professional services firm with 500+ employees was running on aging on-premise servers and a fragmented set of productivity tools. Shadow IT was rampant, data security was inconsistent, and IT support tickets had increased by 60% year-over-year as legacy systems failed to keep up with growth.",
            fr: "Une société de services professionnels avec plus de 500 employés fonctionnait sur des serveurs vieillissants et un ensemble fragmenté d'outils. Le shadow IT était répandu, la sécurité des données était incohérente et les tickets de support avaient augmenté de 60 % d'une année à l'autre.",
        },
        solution: {
            en: "We designed and executed a zero-downtime Microsoft 365 migration, consolidating all email, document storage, communication, and productivity under a single, governed platform. A phased department-by-department rollout was paired with a comprehensive user adoption program to ensure perfect continuity and buy-in from all stakeholders.",
            fr: "Nous avons conçu et exécuté une migration Microsoft 365 sans temps d'arrêt, consolidant tous les emails, le stockage de documents et la communication sous une plateforme unique. Un déploiement progressif par département a été accompagné d'un programme d'adoption complet.",
        },
        impact: {
            en: "Beyond eliminating the legacy infrastructure, the standardized Microsoft 365 environment reduced IT support tickets by 40% and enabled the firm to adopt advanced security features like conditional access and compliance center monitoring that were previously out of reach.",
            fr: "Au-delà de l'élimination de l'infrastructure héritée, l'environnement Microsoft 365 standardisé a réduit les tickets de support IT de 40 % et a permis à la firme d'adopter des fonctionnalités de sécurité avancées.",
        },
        stats: [
            { value: "500+", label: { en: "Users migrated", fr: "Utilisateurs migrés" } },
            { value: "0", label: { en: "Downtime hours", fr: "Heures d'arrêt" } },
            { value: "40%", label: { en: "Fewer support tickets", fr: "Moins de tickets" } },
            { value: "8 wks", label: { en: "Full rollout", fr: "Déploiement complet" } },
        ],
        timeline: [
            {
                phase: { en: "Phase 1", fr: "Phase 1" },
                title: { en: "Infrastructure Assessment", fr: "Évaluation de l'infrastructure" },
                description: {
                    en: "Full audit of existing servers, licenses, and user workflows. Identified 12 critical integration dependencies and built a migration dependency map.",
                    fr: "Audit complet des serveurs, licences et flux de travail existants. Identification de 12 dépendances critiques et création d'une carte de dépendances de migration.",
                },
            },
            {
                phase: { en: "Phase 2", fr: "Phase 2" },
                title: { en: "Parallel Environment Setup", fr: "Mise en place de l'environnement" },
                description: {
                    en: "Provisioned the Microsoft 365 tenant, configured security policies, and built a staging environment to test all workflows before go-live.",
                    fr: "Provisionnement du tenant Microsoft 365, configuration des politiques de sécurité et construction d'un environnement de test.",
                },
            },
            {
                phase: { en: "Phase 3", fr: "Phase 3" },
                title: { en: "Phased Migration & Adoption", fr: "Migration par phases et adoption" },
                description: {
                    en: "8-week department-by-department rollout with dedicated help desk support and customized training sessions for each team.",
                    fr: "Déploiement sur 8 semaines par département avec support dédié et sessions de formation personnalisées pour chaque équipe.",
                },
            },
        ],
        testimonial: {
            quote: {
                en: "We expected disruption. We got absolutely none. The transition was smoother than any technology project we've ever run internally.",
                fr: "Nous attendions des perturbations. Nous n'en avons eu aucune. La transition a été plus fluide que tout projet technologique que nous avons géré en interne.",
            },
            author: "Laura Sinclair",
            role: "Chief Information Officer",
            company: "Meridian Professional Services",
        },
        tags: ["Microsoft 365", "Cloud Migration", "Managed IT", "Productivity"],
    },
    {
        slug: "financial-security-overhaul",
        title: {
            en: "Financial Sector Security Overhaul",
            fr: "Refonte de la Sécurité du Secteur Financier",
        },
        category: "CYBERSECURITY",
        categoryIcon: "shield_lock",
        description: {
            en: "Implementing a Zero Trust architecture for a major regional bank to protect sensitive financial data and ensure regulatory compliance.",
            fr: "Mise en œuvre d'une architecture Zero Trust pour une grande banque régionale afin de protéger les données financières sensibles.",
        },
        heroImage:
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
        result: {
            en: "Achievement of SOC2 compliance and 100% success rate in external penetration tests.",
            fr: "Obtention de la conformité SOC2 et taux de réussite de 100 % aux tests d'intrusion externes.",
        },
        challenge: {
            en: "A regional bank with $4.2B in assets faced increasing regulatory pressure after a near-miss security incident exposed vulnerabilities in their flat network architecture. Their perimeter-based security model was obsolete against modern threat actors, and an upcoming regulatory audit threatened significant penalties.",
            fr: "Une banque régionale avec 4,2 milliards $ d'actifs faisait face à une pression réglementaire croissante après un incident de sécurité qui avait exposé des vulnérabilités dans leur architecture réseau plate.",
        },
        solution: {
            en: "We designed and implemented a complete Zero Trust Network Architecture (ZTNA) from the ground up — eliminating implicit trust and requiring continuous verification for every user and device. This included microsegmentation of all network zones, privileged identity management (PIM), and implementation of a full SIEM stack with 24/7 SOC monitoring.",
            fr: "Nous avons conçu et implémenté une architecture Zero Trust complète — éliminant la confiance implicite et exigeant une vérification continue pour chaque utilisateur et appareil. Cela incluait la micro-segmentation de toutes les zones réseau.",
        },
        impact: {
            en: "The bank not only passed its regulatory audit with zero findings but also used its new security posture as a competitive differentiator in enterprise client acquisition. The Zero Trust model dramatically reduced the blast radius of any potential future breach, protecting both assets and reputation.",
            fr: "La banque a non seulement réussi son audit réglementaire sans aucune constatation, mais a également utilisé sa nouvelle posture de sécurité comme différenciateur concurrentiel dans l'acquisition de clients d'entreprise.",
        },
        stats: [
            { value: "SOC2", label: { en: "Compliance achieved", fr: "Conformité obtenue" } },
            { value: "100%", label: { en: "Pentest success rate", fr: "Taux de succès pentest" } },
            { value: "0", label: { en: "Audit findings", fr: "Constatations d'audit" } },
            { value: "<1hr", label: { en: "Mean time to detect", fr: "Temps de détection" } },
        ],
        timeline: [
            {
                phase: { en: "Phase 1", fr: "Phase 1" },
                title: { en: "Security Posture Assessment", fr: "Évaluation de la posture" },
                description: {
                    en: "60-day engagement covering penetration testing, threat modeling, and full gap analysis against SOC2, PCI-DSS, and OSFI regulatory frameworks.",
                    fr: "Engagement de 60 jours couvrant les tests d'intrusion, la modélisation des menaces et une analyse des écarts complète.",
                },
            },
            {
                phase: { en: "Phase 2", fr: "Phase 2" },
                title: { en: "Zero Trust Architecture Design", fr: "Conception de l'architecture" },
                description: {
                    en: "Designed the ZTNA blueprint covering identity, device, network, application, and data layers. Mapped all privileged access paths and designed microsegmentation zones.",
                    fr: "Conception du plan ZTNA couvrant les couches d'identité, d'appareils, de réseau, d'applications et de données.",
                },
            },
            {
                phase: { en: "Phase 3", fr: "Phase 3" },
                title: { en: "SOC Deployment & Audit Prep", fr: "Déploiement SOC & Préparation" },
                description: {
                    en: "Deployed full SIEM platform, 24/7 SOC monitoring, and automated compliance evidence collection. Passed external regulatory audit with zero findings.",
                    fr: "Déploiement de la plateforme SIEM complète, surveillance SOC 24h/24, et collecte automatisée des preuves de conformité.",
                },
            },
        ],
        testimonial: {
            quote: {
                en: "Our regulators were impressed. Our board was relieved. Stigma Technologies delivered a security transformation that would have taken us years to accomplish alone.",
                fr: "Nos régulateurs ont été impressionnés. Notre conseil d'administration était soulagé. Stigma Technologies a livré une transformation sécuritaire qui nous aurait pris des années à accomplir seuls.",
            },
            author: "Robert Gallant",
            role: "Chief Risk Officer",
            company: "Laurentian Capital Bank",
        },
        tags: ["Zero Trust", "SOC2", "SIEM", "PCI-DSS", "Banking"],
        relatedBlogPosts: ["zero-trust-evolution-2024", "managed-security-101"],
    },
    {
        slug: "retail-cloud-migration",
        title: {
            en: "Retail Cloud Migration",
            fr: "Migration Cloud pour la Vente au Détail",
        },
        category: "CLOUD COMPUTING",
        categoryIcon: "cloud_upload",
        description: {
            en: "Scaling infrastructure for a global retail brand to handle peak holiday traffic without performance degradation.",
            fr: "Mise à l'échelle de l'infrastructure pour une marque de vente au détail mondiale afin de gérer le trafic de pointe des fêtes.",
        },
        heroImage:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
        result: {
            en: "Infrastructure costs reduced by 30% while increasing peak load capacity by 4x.",
            fr: "Coûts d'infrastructure réduits de 30 % tout en augmentant la capacité de charge de pointe de 4x.",
        },
        challenge: {
            en: "A global retail brand was experiencing catastrophic website outages during Black Friday and the holiday shopping season. Their rigid on-premise infrastructure could not dynamically scale, causing $2.3M in lost sales during the previous holiday season alone. They needed a solution that could absorb 10x normal traffic instantly without over-provisioning year-round.",
            fr: "Une marque de vente au détail mondiale connaissait des pannes catastrophiques lors du Black Friday. Leur infrastructure rigide ne pouvait pas évoluer dynamiquement, causant 2,3 M$ de ventes perdues lors de la dernière saison des fêtes.",
        },
        solution: {
            en: "We architected a fully elastic, multi-cloud infrastructure on AWS, leveraging auto-scaling groups, serverless functions for catalog processing, and a global CDN strategy to distribute load. A sophisticated traffic management layer used real-time demand forecasting to pre-warm compute capacity 2 hours before predicted peak events.",
            fr: "Nous avons conçu une infrastructure multi-cloud entièrement élastique sur AWS, utilisant des groupes d'auto-scaling, des fonctions sans serveur pour le traitement du catalogue et une stratégie CDN mondiale.",
        },
        impact: {
            en: "The client sailed through their next Black Friday, handling over 4x previous peak load with sub-200ms response times globally. The shift from fixed to elastic infrastructure reduced their annual cloud spend by 30% — turning the project into a self-funding initiative within 18 months.",
            fr: "Le client a traversé son prochain Black Friday en gérant plus de 4x la charge maximale précédente avec des temps de réponse inférieurs à 200ms. Le passage à une infrastructure élastique a réduit les dépenses cloud annuelles de 30 %.",
        },
        stats: [
            { value: "4x", label: { en: "Peak capacity increase", fr: "Augmentation capacité" } },
            { value: "30%", label: { en: "Cost reduction", fr: "Réduction des coûts" } },
            { value: "<200ms", label: { en: "Global response time", fr: "Temps de réponse" } },
            { value: "0", label: { en: "Holiday outages", fr: "Pannes de fêtes" } },
        ],
        timeline: [
            {
                phase: { en: "Phase 1", fr: "Phase 1" },
                title: { en: "Load Analysis & Architecture Design", fr: "Analyse de la charge" },
                description: {
                    en: "Analyzed 3 years of traffic data to model peak demand scenarios. Designed the elastic multi-cloud architecture and serverless processing pipelines.",
                    fr: "Analyse de 3 ans de données de trafic pour modéliser les scénarios de demande maximale. Conception de l'architecture multi-cloud élastique.",
                },
            },
            {
                phase: { en: "Phase 2", fr: "Phase 2" },
                title: { en: "Parallel Infrastructure Build", fr: "Construction parallèle" },
                description: {
                    en: "Built the AWS infrastructure alongside the existing on-premise setup. Ran 8 weeks of load testing, simulating 10x peak traffic to validate auto-scaling behavior.",
                    fr: "Construction de l'infrastructure AWS en parallèle avec la configuration existante. Tests de charge sur 8 semaines simulant 10x le trafic de pointe.",
                },
            },
            {
                phase: { en: "Phase 3", fr: "Phase 3" },
                title: { en: "Cutover & First Holiday Season", fr: "Basculement et première saison" },
                description: {
                    en: "Executed a blue-green cutover to the new platform during a low-traffic window. Monitored and optimized through the first full holiday season with zero incidents.",
                    fr: "Exécution d'un basculement blue-green vers la nouvelle plateforme pendant une période de faible trafic. Surveillance et optimisation tout au long de la première saison.",
                },
            },
        ],
        testimonial: {
            quote: {
                en: "For the first time in 3 years, we didn't have war rooms set up during Black Friday. The platform just... worked. Perfectly.",
                fr: "Pour la première fois en 3 ans, nous n'avions pas de salles de guerre mises en place pendant le Black Friday. La plateforme a simplement... fonctionné. Parfaitement.",
            },
            author: "James Fontaine",
            role: "Head of E-Commerce",
            company: "Luxe Brands International",
        },
        tags: ["AWS", "Auto-Scaling", "CDN", "Cloud Computing", "E-Commerce"],
    },
    {
        slug: "aerospace-vision-inspection",
        title: {
            en: "High-Precision AI Inspection for Aerospace Components",
            fr: "Inspection IA Haute Précision pour les Composants Aérospatiaux",
        },
        category: "AI / ML",
        categoryIcon: "visibility",
        description: {
            en: "Implementing multi-spectral computer vision to detect micro-fractures in critical engine components with 99.8% accuracy.",
            fr: "Mise en œuvre de la vision par ordinateur multi-spectrale pour détecter les micro-fissures dans les composants critiques des moteurs.",
        },
        heroImage: "/images/vision-systems-hero.png",
        result: {
            en: "99.8% detection rate of sub-millimeter defects, reducing recall risks by 85%.",
            fr: "Taux de détection de 99,8 % des défauts submillimétriques, réduisant les risques de rappel de 85 %.",
        },
        challenge: {
            en: "A leading Canadian aerospace manufacturer faced significant recall risks due to micro-fractures in titanium engine blades that were invisible to the human eye. Manual inspection was slow and prone to fatigue-induced errors.",
            fr: "Un chef de file canadien de l'aérospatiale faisait face à des risques de rappel importants dus à des micro-fissures dans les aubes de moteur en titane, invisibles à l'œil nu. L'inspection manuelle était lente et sujette à l'erreur.",
        },
        solution: {
            en: "We developed a proprietary multi-spectral computer vision system using thermal and UV imaging. The system utilizes real-time deep learning to analyze surface anomalies and subsurface stress patterns, flagging defects within 500ms.",
            fr: "Nous avons développé un système de vision par ordinateur multi-spectral propriétaire utilisant l'imagerie thermique et UV. Le système utilise l'apprentissage profond en temps réel pour analyser les anomalies.",
        },
        impact: {
            en: "The system achieved a near-perfect detection rate for sub-millimeter defects. Inspection throughput increased by 400%, and the manufacturer successfully avoided three major recall events in the first year of operation.",
            fr: "Le système a atteint un taux de détection quasi parfait. Le débit d'inspection a augmenté de 400 % et le fabricant a évité trois événements de rappel majeurs au cours de la première année.",
        },
        stats: [
            { value: "99.8%", label: { en: "Detection Rate", fr: "Taux de Détection" } },
            { value: "400%", label: { en: "Speed Increase", fr: "Vitesse Accrue" } },
            { value: "85%", label: { en: "Risk Reduction", fr: "Réduction des Risques" } },
            { value: "500ms", label: { en: "Analysis Time", fr: "Temps d'Analyse" } },
        ],
        timeline: [
            {
                phase: { en: "Phase 1", fr: "Phase 1" },
                title: { en: "Multi-spectral Dataset Creation", fr: "Création de Données" },
                description: {
                    en: "Created a comprehensive dataset of known flaws and pristine parts using thermal, UV, and visible light spectrums.",
                    fr: "Création d'un ensemble de données complet de défauts connus et de pièces parfaites.",
                },
            },
            {
                phase: { en: "Phase 2", fr: "Phase 2" },
                title: { en: "CNN Optimization", fr: "Optimisation CNN" },
                description: {
                    en: "Trained specialized convolutional neural networks to detect features across three light spectrums simultaneously.",
                    fr: "Entraînement de réseaux neuronaux spécialisés pour détecter des caractéristiques sur trois spectres lumineux.",
                },
            },
            {
                phase: { en: "Phase 3", fr: "Phase 3" },
                title: { en: "Production Integration", fr: "Intégration Production" },
                description: {
                    en: "Deployed high-speed inspection tunnels directly into the robotic manufacturing line.",
                    fr: "Déploiement de tunnels d'inspection à haute vitesse directement dans la ligne de fabrication robotisée.",
                },
            },
        ],
        testimonial: {
            quote: {
                en: "Stigma Technologies didn't just give us a tool; they gave our manufacturing line a brain and eyes. I sleep better knowing this system is on watch.",
                fr: "Stigma Technologies ne nous a pas seulement donné un outil ; ils ont donné un cerveau et des yeux à notre ligne de fabrication.",
            },
            author: "André Boucher",
            role: "Head of Quality Assurance",
            company: "Aerovance Industries",
        },
        tags: ["Vision Systems", "Aerospace", "AI / ML", "Quality Control"],
        ctaOverride: {
            title: { en: "Optimize Your Quality Control", fr: "Optimisez votre contrôle qualité" },
            description: {
                en: "Implement zero-defect manufacturing with our specialized computer vision systems.",
                fr: "Implémentez une fabrication zéro défaut grâce à nos systèmes de vision par ordinateur spécialisés."
            }
        },
        bookingOverride: {
            title: { en: "Partner with Us for", fr: "Associez-vous à nous pour" },
            titleHighlight: { en: "Aerospace AI Vision", fr: "la Vision IA Aérospatiale" },
            description: {
                en: "Ensure absolute compliance and safety with automated, high-precision visual inspection.",
                fr: "Assurez une conformité et une sécurité absolues grâce à l'inspection visuelle automatisée de haute précision."
            }
        },
        relatedSlugs: ["ai-loss-prevention", "pharma-demand-forecasting"],
        relatedBlogPosts: ["ai-frontier-business"],
    },
    {
        slug: "legal-semantic-search",
        title: {
            en: "Intelligent Semantic Search for Legal Discovery",
            fr: "Recherche Sémantique pour la Découverte Juridique",
        },
        category: "AI / ML",
        categoryIcon: "manage_search",
        description: {
            en: "We created a tool that helps lawyers find specific information in thousands of documents by understanding what they are looking for, rather than just matching exact words. It's like having a super-intelligent assistant that knows the meaning of every sentence.",
            fr: "Nous avons créé un outil qui aide les avocats à trouver des informations précises parmi des milliers de documents en comprenant ce qu'ils cherchent, et pas seulement en vérifiant les mots exacts. C'est comme avoir un assistant super-intelligent qui connaît la signification de chaque phrase.",
        },
        heroImage: "/images/semantic-search-hero.png",
        result: {
            en: "Research time dropped from 40 hours to 12 minutes per case, making information discovery nearly instant.",
            fr: "Le temps de recherche est passé de 40 heures à 12 minutes par dossier, rendant la découverte d'informations presque instantanée.",
        },
        challenge: {
            en: "Lawyers often spend hundreds of hours reading through thousands of pages to find a single piece of evidence. If the person who wrote the document used different words (like 'agreement' instead of 'contract'), traditional search tools would miss it completely. This makes finding crucial facts difficult and slow.",
            fr: "Les avocats passent souvent des centaines d'heures à lire des milliers de pages pour trouver une seule preuve. Si l'auteur d'un document a utilisé des mots différents (comme 'accord' au lieu de 'contrat'), les outils de recherche classiques ne le trouveraient jamais. Cela rend la recherche de faits importants lente et difficile.",
        },
        solution: {
            en: "We built a system that 'reads' and understands the context of legal documents. If a lawyer searches for 'workplace issues,' the tool finds documents about 'salary disputes' and 'hiring policies' automatically, even if the exact words 'workplace issues' aren't used. It can even search across different languages at the same time.",
            fr: "Nous avons construit un système qui 'lit' et comprend le contexte des documents juridiques. Si un avocat cherche 'problèmes de travail', l'outil trouve automatiquement des documents sur les 'conflits de salaire' ou les 'politiques d'embauche', même si les mots exacts ne sont pas utilisés. Il peut même chercher dans plusieurs langues en même temps.",
        },
        impact: {
            en: "Lawyers can now find critical evidence in minutes instead of days. One firm reduced their research time from 40 hours to just 12 minutes. This gives them more time to focus on their clients and winning their cases, knowing they haven't missed any important information.",
            fr: "Les avocats peuvent désormais trouver des preuves critiques en quelques minutes. Un cabinet a réduit son temps de recherche de 40 heures à seulement 12 minutes. Cela leur laisse plus de temps pour s'occuper de leurs clients et gagner leurs procès, avec la certitude de n'avoir rien oublié.",
        },
        stats: [
            { value: "40h → 12m", label: { en: "Search speedup", fr: "Accélération recherche" } },
            { value: "95%", label: { en: "Relevance score", fr: "Score de pertinence" } },
            { value: "15", label: { en: "Languages supported", fr: "Langues supportées" } },
            { value: "10M+", label: { en: "Documents indexed", fr: "Documents indexés" } },
        ],
        timeline: [
            {
                phase: { en: "Phase 1", fr: "Phase 1" },
                title: { en: "Training the AI", fr: "Entraînement de l'IA" },
                description: {
                    en: "We spent time teaching the computer how lawyers talk and what they look for. We made sure it understands that different words can mean the same thing in a legal case.",
                    fr: "Nous avons appris à l'ordinateur comment les avocats s'expriment et ce qu'ils recherchent. Nous nous sommes assurés qu'il comprenne que des mots différents peuvent avoir le même sens.",
                },
            },
            {
                phase: { en: "Phase 2", fr: "Phase 2" },
                title: { en: "Smart Database Setup", fr: "Base de Données Intelligente" },
                description: {
                    en: "We set up a very fast system that can look through millions of pages in less than a second to find the right information for the legal team.",
                    fr: "Nous avons mis en place un système très rapide capable de parcourir des millions de pages en moins d'une seconde pour trouver les bonnes informations.",
                },
            },
            {
                phase: { en: "Phase 3", fr: "Phase 3" },
                title: { en: "Launch & Support", fr: "Lancement & Support" },
                description: {
                    en: "We gave the lawyers an easy search box that not only finds documents but also writes a short summary of what it found, so they don't have to read everything.",
                    fr: "Nous avons donné aux avocats une barre de recherche simple qui trouve les documents et écrit aussi un résumé, pour qu'ils n'aient pas à tout lire.",
                },
            },
        ],
        testimonial: {
            quote: {
                en: "We are no longer looking for words; we are looking for meanings. This changed the fundamental nature of how we practice law in a global context.",
                fr: "Nous ne cherchons plus des mots ; nous cherchons des significations. Cela a changé la nature même de notre pratique du droit.",
            },
            author: "Sarah Jenkins",
            role: "Partner",
            company: "Global Litigate LLP",
        },
        tags: ["Semantic Search", "LegalTech", "RAG", "Natural Language Processing"],
        ctaOverride: {
            title: { en: "Need a Legal AI Strategy?", fr: "Besoin d'une Stratégie IA Juridique ?" },
            description: {
                en: "Discover how our semantic search and document automation can transform your firm's productivity.",
                fr: "Découvrez comment notre recherche sémantique et l'automatisation de documents peuvent transformer la productivité de votre cabinet."
            }
        },
        bookingOverride: {
            title: { en: "Partner with Us for", fr: "Associez-vous à nous pour" },
            titleHighlight: { en: "Legal AI Innovation", fr: "l'Innovation IA Juridique" },
            description: {
                en: "Unlock the full potential of your legal data with our specialized AI discovery solutions.",
                fr: "Libérez tout le potentiel de vos données juridiques grâce à nos solutions spécialisées de découverte par l'IA."
            }
        },
        relatedSlugs: ["pharma-demand-forecasting", "enterprise-it-modernization"],
        relatedBlogPosts: ["ai-frontier-business"],
    },
    {
        slug: "pharma-demand-forecasting",
        title: {
            en: "Predictive Supply Chain for Pharma Distribution",
            fr: "Chaîne d'Approvisionnement Prédictive pour la Pharma",
        },
        category: "AI / ML",
        categoryIcon: "trending_up",
        description: {
            en: "AI-driven forecasting predicting vaccine demand with 92% accuracy, reducing waste by incorporating 50+ external data signals.",
            fr: "Prévisions basées sur l'IA prédisant la demande de vaccins avec une précision de 92 %, réduisant le gaspillage.",
        },
        heroImage: "/images/demand-forecasting-hero.png",
        result: {
            en: "30% reduction in medicine waste and 22% improvement in regional drug availability.",
            fr: "Réduction de 30 % du gaspillage de médicaments et amélioration de 22 % de la disponibilité régionale.",
        },
        challenge: {
            en: "A major pharmaceutical distributor was losing $15M annually to expired medication. Their traditional forecasting models failed to account for sudden weather shifts and hyper-local health trends.",
            fr: "Un distributeur pharmaceutique perdait 15 M$ par an en médicaments périmés. Ses modèles traditionnels ne tenaient pas compte des changements météorologiques.",
        },
        solution: {
            en: "We built a time-series transformer model that ingest historical sales, local weather pattern, social sentiment, and hospital admission data to provide SKU-level demand predictions.",
            fr: "Nous avons construit un modèle transformeur temporel qui ingère les ventes, la météo et les données d'admission hospitalière.",
        },
        impact: {
            en: "Over-stocking was reduced by 30% while stock-out events dropped by 22%. The system now automates 80% of regional ordering, allowing logistical teams to focus on emergency response.",
            fr: "Le surstockage a été réduit de 30 % tandis que les ruptures de stock ont chuté de 22 %. Le système automatise désormais 80 % des commandes.",
        },
        stats: [
            { value: "92%", label: { en: "Forecast Accuracy", fr: "Précision Prévisions" } },
            { value: "30%", label: { en: "Waste reduction", fr: "Réduction gaspillage" } },
            { value: "22%", label: { en: "Higher availability", fr: "Hausse disponibilité" } },
            { value: "$4.5M", label: { en: "ROI (Year 1)", fr: "ROI (An 1)" } },
        ],
        timeline: [
            {
                phase: { en: "Phase 1", fr: "Phase 1" },
                title: { en: "External Data Integration", fr: "Intégration de Données" },
                description: {
                    en: "Integrated 50+ real-time data API streams covering weather, social trends, and public health reports.",
                    fr: "Intégration de plus de 50 flux de données en temps réel (météo, tendances sociales, rapports santé).",
                },
            },
            {
                phase: { en: "Phase 2", fr: "Phase 2" },
                title: { en: "Transformer Modeling", fr: "Modélisation Transformeurs" },
                description: {
                    en: "Developed multi-horizon time-series transformers capable of predicting demand from 1 to 90 days out.",
                    fr: "Développement de transformeurs temporels capables de prédire la demande de 1 à 90 jours.",
                },
            },
            {
                phase: { en: "Phase 3", fr: "Phase 3" },
                title: { en: "Automated replenishment", fr: "Réapprovisionnement Auto" },
                description: {
                    en: "Integrated the prediction engine directly with the ERP to trigger automated regional inventory transfers.",
                    fr: "Intégration du moteur de prédiction avec l'ERP pour déclencher les transferts d'inventaire automatisés.",
                },
            },
        ],
        testimonial: {
            quote: {
                en: "This isn't just about efficiency; it's about getting life-saving medicine where it needs to be, exactly when it's needed. The accuracy is astounding.",
                fr: "Il ne s'agit pas seulement d'efficacité ; il s'agit d'acheminer des médicaments vitaux là où ils doivent être, au moment opportun.",
            },
            author: "Luc Villeneuve",
            role: "Supply Chain Director",
            company: "Nordic Health Logistics",
        },
        tags: ["Demand Forecasting", "Pharma", "Supply Chain", "Predictive AI"],
        ctaOverride: {
            title: { en: "Secure Your Distribution", fr: "Sécurisez votre distribution" },
            description: {
                en: "Eliminate waste and optimize regional inventory transfers with precision AI forecasting.",
                fr: "Éliminez le gaspillage et optimisez les transferts d'inventaire régionaux grâce aux prévisions IA de précision."
            }
        },
        bookingOverride: {
            title: { en: "Partner with Us for", fr: "Associez-vous à nous pour" },
            titleHighlight: { en: "Pharma Supply Chain AI", fr: "l'IA Supply Chain Pharma" },
            description: {
                en: "Build a more resilient and responsive pharmaceutical supply chain with our predictive engine.",
                fr: "Bâtissez une chaîne d'approvisionnement pharmaceutique plus résiliente et réactive grâce à notre moteur prédictif."
            }
        },
        relatedSlugs: ["aerospace-vision-inspection", "retail-cloud-migration"],
        relatedBlogPosts: ["ai-frontier-business"],
    },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
    return caseStudies.find((cs) => cs.slug === slug);
}
