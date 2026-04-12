export interface Resource {
    slug: string;
    title: {
        en: string;
        fr: string;
    };
    category: "CYBERSECURITY" | "CLOUD COMPUTING" | "DATA GOVERNANCE";
    type: "Whitepaper" | "Research Report" | "Playbook";
    readTime: string;
    description: {
        en: string;
        fr: string;
    };
    highlights: {
        en: string[];
        fr: string[];
    };
    image: string;
}

export const resourcesData: Resource[] = [
    {
        slug: "2026-global-ransomware-threat-report",
        title: {
            en: "2026 Global Ransomware Threat Report",
            fr: "Rapport Mondial 2026 sur les Menaces de Ransomware",
        },
        category: "CYBERSECURITY",
        type: "Research Report",
        readTime: "15 min",
        description: {
            en: "An exhaustive analysis of emerging ransomware vectors targeting enterprise infrastructure, including zero-day tactics and the financial impact on global supply chains.",
            fr: "Une analyse exhaustive des vecteurs émergents de ransomware ciblant les infrastructures d'entreprise, incluant les tactiques zero-day et l'impact financier sur les chaînes d'approvisionnement mondiales.",
        },
        highlights: {
            en: [
                "Analysis of 500+ enterprise breach scenarios.",
                "The rise of AI-automated phishing campaigns.",
                "Actionable defense architectures for 2026.",
            ],
            fr: [
                "Analyse de plus de 500 scénarios de violation en entreprise.",
                "La montée des campagnes de phishing automatisées par l'IA.",
                "Architectures de défense actionnables pour 2026.",
            ],
        },
        image: "/images/resources/ransomware-report-2026-v2.png",
    },
    {
        slug: "cloud-migration-blueprint-manufacturing",
        title: {
            en: "The Cloud Migration Blueprint for Manufacturing",
            fr: "Le Plan de Migration Cloud pour l'Industrie Manufacturière",
        },
        category: "CLOUD COMPUTING",
        type: "Playbook",
        readTime: "25 min",
        description: {
            en: "A step-by-step strategic guide to transitioning legacy ERPs and operational technology (OT) to secure multi-cloud environments without disrupting production lines.",
            fr: "Un guide stratégique étape par étape pour la transition des ERP existants et des technologies opérationnelles (OT) vers des environnements multi-cloud sécurisés sans interrompre les lignes de production.",
        },
        highlights: {
            en: [
                "Minimizing downtime during cutover phases.",
                "Securing IoT and OT endpoints in the Cloud.",
                "Cost-optimization models for hybrid infrastructure.",
            ],
            fr: [
                "Minimiser les temps d'arrêt pendant les phases de transition.",
                "Sécurisation des terminaux IoT et OT dans le Cloud.",
                "Modèles d'optimisation des coûts pour l'infrastructure hybride.",
            ],
        },
        image: "/images/resources/cloud-manufacturing-blueprint-v2.png",
    },
    {
        slug: "ai-data-governance-compliance",
        title: {
            en: "AI & Data Governance: Preparing for Compliance",
            fr: "Gouvernance de l'IA & des Données : Préparation à la Conformité",
        },
        category: "DATA GOVERNANCE",
        type: "Whitepaper",
        readTime: "20 min",
        description: {
            en: "Navigate the complex landscape of international data privacy laws (including GDPR and Loi 25) while deploying predictive AI models on enterprise datasets.",
            fr: "Naviguez dans le paysage complexe des lois internationales sur la confidentialité des données (incluant le RGPD et la Loi 25) tout en déployant des modèles d'IA prédictifs sur des ensembles de données d'entreprise.",
        },
        highlights: {
            en: [
                "Mapping data flows for AI ingestion.",
                "Automated consent and right-to-be-forgotten frameworks.",
                "Executive checklist for global regulatory alignment.",
            ],
            fr: [
                "Cartographie des flux de données pour l'ingestion par l'IA.",
                "Cadres automatisés de consentement et de droit à l'oubli.",
                "Checklist exécutive pour l'alignement réglementaire mondial.",
            ],
        },
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2111&auto=format&fit=crop",
    },
];
