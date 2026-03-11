export type Subsidy = {
    slug: string;
    name: string;
    amount: string;
    coverage: string;
    description: string;
    fullDescription: string;
    icon: string;
    officialUrl: string;
    category: string;
    benefits: string[];
    fundedActivities?: string[];
    eligibleCandidates: string[];
    applicationProcess: string[];
    additionalInfo?: string[];
    relatedCourses?: string[];
};

export const subsidiesData: Record<string, { en: Subsidy; fr: Subsidy }> = {
    "scale-ai": {
        en: {
            slug: "scale-ai",
            name: "Scale AI — Custom AI Training",
            amount: "$5,000 – $1,000,000",
            coverage: "Up to 85% of costs",
            description: "Covers up to 50% of costs (85% for first $100k in Quebec). Ideal for company-wide customized AI training.",
            fullDescription: "The Scale AI Training Program supports Canadian organizations in developing custom training (workshops, coaching, ideation) in digital intelligence or AI. No pre-approved provider list exists—you are free to choose Stigma Technologies. Applications are processed on a continuous basis (no fixed deadline).",
            icon: "auto_awesome",
            officialUrl: "https://www.scaleai.ca/training/",
            category: "Federal & Provincial (QC)",
            benefits: [
                "Significant reduction in investment (85% for the first $100k in QC)",
                "No minimum or maximum training duration required",
                "Wide variety of formats: coaching, workshops, ideation sessions",
                "Freedom of choice: No restricted list of training providers",
                "Includes costs for preparation, animation, and project follow-up"
            ],
            fundedActivities: [
                "Training workshops",
                "Coaching sessions",
                "Ideation and strategy sessions"
            ],
            eligibleCandidates: [
                "Companies of all sizes and sectors",
                "For-profit companies",
                "Non-profit organizations (NPOs)",
                "Cooperatives",
                "Public and parapublic institutions",
                "Exclusion: Government ministries and organizations"
            ],
            applicationProcess: [
                "Step 1: Submit an Eligibility Request (Plan + Service Offer required)",
                "Step 2: Wait for Scale AI contact and project qualification",
                "Step 3: Contract Signing (Exact grant amount confirmed)",
                "Step 4: Conduct the Training (Must NOT start before approval)",
                "Step 5: Submit Reimbursement Documents after completing the training"
            ],
            additionalInfo: [
                "Minimum project value of $5,000",
                "Training must not have started before official approval",
                "Does not apply to general public training or tool-only training (e.g., ChatGPT-only)",
                "No pre-approved provider list; free choice of partner"
            ],
            relatedCourses: ["ia-decouverte", "ia-booster", "ia-strategie", "ia-finance"]
        },
        fr: {
            slug: "scale-ai",
            name: "Scale AI — Formation Personnalisée en IA",
            amount: "5 000$ – 1 000 000$",
            coverage: "Jusqu'à 85% des coûts",
            description: "Couverture jusqu'à 50% des coûts (85% pour les premiers 100k$ au Québec). Idéal pour les formations sur mesure en entreprise.",
            fullDescription: "La subvention soutient les organisations canadiennes dans le développement de formations sur mesure (ateliers, coaching, idéation) en intelligence numérique ou IA. Aucun prestataire pré-approuvé n'est imposé—vous êtes libre de choisir Stigma Technologies. Les demandes sont acceptées en continu (pas de date limite).",
            icon: "auto_awesome",
            officialUrl: "https://www.scaleai.ca/fr/formation/",
            category: "Fédéral & Provincial (QC)",
            benefits: [
                "Réduction massive (85% pour les premiers 100 000$ au Québec)",
                "Aucune durée minimale ou maximale de formation requise",
                "Grande variété de formats : coaching, ateliers, sessions d'idéation",
                "Liberté de choix : Aucun prestataire de formation n'est imposé",
                "Couvre les frais de préparation, d'animation et de suivi du projet"
            ],
            fundedActivities: [
                "Ateliers de formation",
                "Séances de coaching",
                "Séances d'idéation et de stratégie"
            ],
            eligibleCandidates: [
                "Organisations de toute taille et de tout secteur d'activité",
                "Entreprises à but lucratif",
                "Organismes sans but lucratif (OBNL)",
                "Coopératives",
                "Institutions publiques et parapubliques",
                "Exclusion : Ministères et organismes gouvernementaux"
            ],
            applicationProcess: [
                "Étape 1 : Dépôt d'une demande d'admissibilité (Plan + Offre de service)",
                "Étape 2 : Qualification du projet et contact par Scale AI",
                "Étape 3 : Signature du contrat (Montant de la subvention confirmé)",
                "Étape 4 : Réalisation de la formation (Ne doit PAS débuter avant l'approbation)",
                "Étape 5 : Dépôt des documents pour remboursement après la formation"
            ],
            additionalInfo: [
                "Le montant minimal du projet doit être de 5 000 $",
                "La formation ne doit pas avoir débuté avant l'approbation officielle",
                "Ne s'applique pas aux formations grand public ou sur les outils seuls (ex: ChatGPT)",
                "Aucune liste de fournisseurs imposée; libre choix du partenaire"
            ],
            relatedCourses: ["ia-decouverte", "ia-booster", "ia-strategie", "ia-finance"]
        }
    },
    "essor": {
        en: {
            slug: "essor",
            name: "ESSOR – Digital Transformation & Investment",
            amount: "$20,000 – $50,000",
            coverage: "Up to 50% of costs",
            description: "Supports Quebec businesses in their feasibility studies, digital diagnostics, and implementation of digital action plans.",
            fullDescription: "Managed by Investissement Québec, the ESSOR program (Component 1) accelerates the realization of investment projects through preliminary studies. It offers three key sub-volets: A for feasibility studies, B for digital diagnostics and implementation plans, and C for the actual implementation of digital action plans. This program is essential for companies looking to integrate AI and optimize their business processes with non-repayable contributions.",
            icon: "account_balance",
            officialUrl: "https://www.investquebec.com/fr/financement/programmes-gouvernementaux/essor/appui-la-concretisation-de-projets-dinvestissement",
            category: "Provincial (QC)",
            benefits: [
                "Non-repayable financial contributions for your projects",
                "Up to $50,000 for feasibility studies (Volet A)",
                "Up to $20,000 for digital diagnostics and AI roadmaps (Volet B)",
                "Up to $50,000 for implementing your digital action plan (Volet C)",
                "Professional fees and specialized information costs covered"
            ],
            fundedActivities: [
                "Technological and economic feasibility studies (1A)",
                "Digital diagnosis and AI integration roadmaps (1B)",
                "System selection and implementation planning (1B)",
                "Execution of digital transformation & AI action plans (1C)"
            ],
            eligibleCandidates: [
                "For-profit companies and social economy enterprises in Quebec",
                "Companies < 250 employees and >= $2.5M revenue (for Volets B & C)",
                "Available for most sectors, including manufacturing and services",
                "Project must start within 3 months of authorization"
            ],
            applicationProcess: [
                "Step 1: Fill out the online pre-qualification form",
                "Step 2: Submit a formal funding request to Investissement Québec",
                "Step 3: Technical and financial evaluation by IQ advisors",
                "Step 4: Receive a formal letter of offer/authorization",
                "Step 5: Execute the project and submit reimbursement claims"
            ],
            additionalInfo: [
                "Plan B diagnostic must be less than 24 months old for Plan C eligibility",
                "Projects must last a maximum of 12 continuous months",
                "Excludes primary sector (except major greenhouse projects), mining, and public administration",
                "Incomplete applications are automatically refused; technical validation is key"
            ],
            relatedCourses: ["ia-decouverte", "ia-strategie", "ia-production"]
        },
        fr: {
            slug: "essor",
            name: "ESSOR – Transformation Numérique & Investissement",
            amount: "20 000$ – 50 000$",
            coverage: "Jusqu'à 50% des coûts",
            description: "Soutient les entreprises québécoises dans leurs études de faisabilité, diagnostics numériques et mise en œuvre de plans d'action.",
            fullDescription: "Géré par Investissement Québec, le programme ESSOR (Volet 1) accélère la concrétisation de projets d’investissement par des études préalables. Il propose trois sous-volets clés : A pour les études de faisabilité, B pour le diagnostic numérique et le plan de mise en œuvre, et C pour la mise en œuvre effective du plan numérique. C'est un levier financier majeur pour l'intégration de l'IA et l'optimisation des processus via des contributions non remboursables.",
            icon: "account_balance",
            officialUrl: "https://www.investquebec.com/fr/financement/programmes-gouvernementaux/essor/appui-la-concretisation-de-projets-dinvestissement",
            category: "Provincial (QC)",
            benefits: [
                "Contributions financières non remboursables",
                "Jusqu'à 50 000 $ pour les études de faisabilité (Volet A)",
                "Jusqu'à 20 000 $ pour le diagnostic numérique et feuille de route IA (Volet B)",
                "Jusqu'à 50 000 $ pour la mise en œuvre du plan numérique (Volet C)",
                "Couverture des honoraires professionnels et frais de déplacement"
            ],
            fundedActivities: [
                "Études de faisabilité technique et économique (1A)",
                "Diagnostics numériques et intégration de l'IA (1B)",
                "Sélection de systèmes et planification de mise en œuvre (1B)",
                "Exécution du plan d'action numérique et IA (1C)"
            ],
            eligibleCandidates: [
                "Entreprises à but lucratif et d'économie sociale immatriculées au Québec",
                "PME de < 250 employés et CA >= 2,5 M$ (pour Volets B & C)",
                "Admissible pour la majorité des secteurs (Manufacturier, Services, etc.)",
                "Le projet doit débuter maximum 3 mois après l'autorisation"
            ],
            applicationProcess: [
                "Étape 1 : Remplir le formulaire de préqualification en ligne",
                "Étape 2 : Dépôt de la demande d'aide financière à Investissement Québec",
                "Étape 3 : Analyse technique et financière par les conseillers IQ",
                "Étape 4 : Réception de la lettre d'offre de subvention",
                "Étape 5 : Réalisation et dépôt des documents pour remboursement"
            ],
            additionalInfo: [
                "Le diagnostic Volet B doit avoir moins de 24 mois pour être éligible au Volet C",
                "La durée maximale de réalisation est de 12 mois continus",
                "Secteurs exclus : Primaire (sauf serres), Mines et Administration publique",
                "Les demandes incomplètes sont automatiquement refusées"
            ],
            relatedCourses: ["ia-decouverte", "ia-strategie", "ia-production"]
        }
    },
    "productivite-competences": {
        en: {
            slug: "productivite-competences",
            name: "Productivité-Compétences (Gov. QC)",
            amount: "55M$ Envelope over 2 years",
            coverage: "50%+ of training fees",
            description: "Supports workforce training projects tailored to new SME realities, including AI and digital innovation.",
            fullDescription: "This provincial initiative aims to accelerate the training of the Quebec workforce to meet the challenges of the new economy. It is particularly well-suited for organizations undergoing structural changes due to AI integration or digital process re-engineering.",
            icon: "school",
            officialUrl: "https://www.quebec.ca/emploi/entreprises/gerer-ressources-humaines/developpement-competences",
            category: "Provincial (QC)",
            benefits: [
                "Covers both trainer fees and participant salaries during training",
                "Broad range of eligible technical and strategic training",
                "Direct support from regional Emploi-Québec offices",
                "High approval rate for innovative technology projects"
            ],
            eligibleCandidates: [
                "Companies with a minimum of 1 employee in Quebec",
                "Training must address an immediate skill gap or technological transition",
                "Project must include a clear training plan and measurable objectives",
                "Companies must be in good standing with Revenu Québec"
            ],
            applicationProcess: [
                "Step 1: Contact your regional Emploi-Québec commercial advisor",
                "Step 2: Present the Stigma Technologies training catalog",
                "Step 3: Submit the training plan for approval",
                "Step 4: Execute training and track hours",
                "Step 5: Final report and reimbursement"
            ],
            relatedCourses: ["ia-booster", "ia-ventes", "ia-rh", "ia-finance"]
        },
        fr: {
            slug: "productivite-competences",
            name: "Productivité-Compétences (Gouv. QC)",
            amount: "Enveloppe de 55M$ sur 2 ans",
            coverage: "50%+ des frais de formation",
            description: "Soutient les projets de formation adaptés aux nouvelles réalités des PME, incluant l'IA et l'innovation numérique.",
            fullDescription: "Cette initiative provinciale vise à accélérer la formation de la main-d'œuvre québécoise pour répondre aux défis de la nouvelle économie. Elle est particulièrement adaptée aux organisations vivant des changements structurels liés à l'intégration de l'IA ou à la réingénierie des processus numériques.",
            icon: "school",
            officialUrl: "https://www.quebec.ca/emploi/entreprises/gerer-ressources-humaines/developpement-competences",
            category: "Provincial (QC)",
            benefits: [
                "Couvre les honoraires du formateur et les salaires des participants",
                "Large éventail de formations techniques et stratégiques éligibles",
                "Support direct des bureaux régionaux d'Emploi-Québec",
                "Taux d'approbation élevé pour les projets technologiques innovants"
            ],
            eligibleCandidates: [
                "Entreprises ayant au moins 1 employé au Québec",
                "La formation doit répondre à un besoin de compétence immédiat",
                "Le projet doit inclure un plan de formation clair",
                "Être en règle avec Revenu Québec"
            ],
            applicationProcess: [
                "Étape 1 : Contacter votre conseiller aux entreprises d'Emploi-Québec",
                "Étape 2 : Présenter le catalogue de formation Stigma Technologies",
                "Étape 3 : Déposer le plan de formation pour approbation",
                "Étape 4 : Réaliser la formation et le suivi des heures",
                "Étape 5 : Rapport final et remboursement"
            ],
            relatedCourses: ["ia-booster", "ia-ventes", "ia-rh", "ia-finance"]
        }
    },
    "dec-iria": {
        en: {
            slug: "dec-iria",
            name: "DEC — Regional AI Initiative (IRIA)",
            amount: "Up to 50% of costs",
            coverage: "IT, professional services, manufacturing",
            description: "Economic Development Canada funds AI adoption for SMEs across Quebec regions.",
            fullDescription: "The Regional Artificial Intelligence Initiative (IRIA) is a federal program helping Quebec regions catch up in AI adoption. It supports companies that want to integrate AI to improve productivity or develop new intelligent products.",
            icon: "flag",
            officialUrl: "https://ced.canada.ca/en/services-and-programs/",
            category: "Federal (Canada)",
            benefits: [
                "Non-repayable contributions available (in some cases)",
                "Support for equipment, consulting, and training",
                "Fosters regional economic competitiveness",
                "Flexible project durations"
            ],
            eligibleCandidates: [
                "SMEs located in Quebec regions (off-island of Montreal)",
                "Projects with a specific AI adoption or development component",
                "Must demonstrate project viability and economic impact",
                "Priority for IT, professional services, and manufacturing sectors"
            ],
            applicationProcess: [
                "Step 1: Check regional eligibility on the DEC website",
                "Step 2: Prepare a business case with Stigma Technologies",
                "Step 3: Submit a project proposal to Economic Development Canada",
                "Step 4: Due diligence and approval process",
                "Step 5: Funding disbursement based on milestones"
            ],
            relatedCourses: ["ia-production", "ia-logistique", "ia-juridique"]
        },
        fr: {
            slug: "dec-iria",
            name: "DEC — Initiative Régionale en IA (IRIA)",
            amount: "Jusqu'à 50% des coûts",
            coverage: "TI, services prof., fabrication",
            description: "Développement économique Canada finance les projets d'adoption de l'IA pour les PME des régions du Québec.",
            fullDescription: "L'Initiative Régionale en Intelligence Artificielle (IRIA) est un programme fédéral aidant les régions du Québec à rattraper leur retard en matière d'adoption de l'IA. Il soutient les entreprises qui souhaitent intégrer l'IA pour améliorer leur productivité ou développer de nouveaux produits intelligents.",
            icon: "flag",
            officialUrl: "https://dec.canada.ca/fr/services-programmes/",
            category: "Fédéral (Canada)",
            benefits: [
                "Contributions non remboursables disponibles (dans certains cas)",
                "Soutien pour l'équipement, le conseil et la formation",
                "Favorise la compétitivité économique régionale",
                "Calendriers de projets flexibles"
            ],
            eligibleCandidates: [
                "PME situées dans les régions du Québec (hors Montréal)",
                "Projets ayant un volet spécifique d'adoption ou de développement IA",
                "Démontrer la viabilité du projet et son impact économique",
                "Priorité aux secteurs TI, services professionnels et manufacturiers"
            ],
            applicationProcess: [
                "Étape 1 : Vérifier l'éligibilité régionale sur le site du DEC",
                "Étape 2 : Préparer un dossier d'affaires avec Stigma Technologies",
                "Étape 3 : Soumettre une proposition de projet au DEC",
                "Étape 4 : Analyse du dossier et approbation",
                "Étape 5 : Déboursement des fonds selon les jalons"
            ],
            relatedCourses: ["ia-production", "ia-logistique", "ia-juridique"]
        }
    },
    "cdae": {
        en: {
            slug: "cdae",
            name: "CDAE Tax Credit (Revenu Québec)",
            amount: "Up to 30% of eligible salaries",
            coverage: "Refundable tax credit",
            description: "Refundable credit for IT companies developing or integrating AI solutions. Applicable to licensed digital products.",
            fullDescription: "The Tax Credit for the Development of E-Business (CDAE) is a major incentive for the IT sector in Quebec. It applies specifically to salaries of employees working on high-value digital solutions, including those integrating AI for enterprise licensing.",
            icon: "receipt_long",
            officialUrl: "https://www.revenuquebec.ca/en/businesses/tax-credits/cdae/",
            category: "Tax Incentive (QC)",
            benefits: [
                "Direct cash back through a refundable credit",
                "Supports massive R&D efforts in AI",
                "Attracts and retains top-tier technical talent",
                "Stable incentive program for long-term growth"
            ],
            eligibleCandidates: [
                "Company must be in the information technology (IT) sector",
                "At least 75% of activities must be dedicated to IT",
                "Employees must spend minimum 26 hours/week on eligible activities",
                "Technical validation by Investissement Québec is required"
            ],
            applicationProcess: [
                "Step 1: Obtain a corporate eligibility certificate",
                "Step 2: Track employee time on AI development tasks",
                "Step 3: Annual application to Investissement Québec",
                "Step 4: Reporting of the credit on the corporate income tax return",
                "Step 5: Payment of the refundable portion by Revenu Québec"
            ],
            relatedCourses: ["ia-performer", "ia-marketing-agents", "ia-production"]
        },
        fr: {
            slug: "cdae",
            name: "Crédit d'impôt CDAE (Revenu Québec)",
            amount: "Jusqu'à 30% des salaires admissibles",
            coverage: "Crédit remboursable",
            description: "Crédit remboursable pour les entreprises TI développant ou intégrant des solutions IA. Applicable aux produits numériques licenciés.",
            fullDescription: "Le Crédit d'impôt pour le développement des affaires électroniques (CDAE) est une incitation majeure pour le secteur des TI au Québec. Il s'applique spécifiquement aux salaires des employés travaillant sur des solutions numériques à haute valeur ajoutée, notamment celles intégrant l'IA pour des produits licenciables.",
            icon: "receipt_long",
            officialUrl: "https://www.revenuquebec.ca/fr/entreprises/credits-dimpot/cdae/",
            category: "Incentif Fiscal (QC)",
            benefits: [
                "Remise d'argent liquide directe via un crédit remboursable",
                "Soutient les efforts massifs de R&D en IA",
                "Aide à attirer et retenir des talents techniques de haut niveau",
                "Programme stable pour une croissance à long terme"
            ],
            eligibleCandidates: [
                "L'entreprise doit être dans le secteur des TI",
                "Au moins 75% des activités doivent être dédiées aux TI",
                "Employés travaillant au moins 26h/semaine sur des tâches admissibles",
                "Validation technique par Investissement Québec requise"
            ],
            applicationProcess: [
                "Étape 1 : Obtenir un certificat d'éligibilité d'entreprise",
                "Étape 2 : Suivre le temps des employés sur les tâches de développement IA",
                "Étape 3 : Demande annuelle à Investissement Québec",
                "Étape 4 : Déclaration du crédit sur le rapport d'impôt corporatif",
                "Étape 5 : Paiement de la portion remboursable par Revenu Québec"
            ],
            relatedCourses: ["ia-performer", "ia-marketing-agents", "ia-production"]
        }
    },
    "pari-irap": {
        en: {
            slug: "pari-irap",
            name: "IRAP — AI Assist (NRC)",
            amount: "$750,000 – $10,500,000",
            coverage: "Up to 100% of costs",
            description: "NRC support for innovative SMEs working on AI, IT, or tech projects. Covers professional services and education.",
            fullDescription: "The Industrial Research Assistance Program (IRAP) by the National Research Council (NRC) is the primary engine for high-tech innovation in Canada. Its 'AI Assist' component helps companies mitigate the risks and costs of integrating advanced AI systems.",
            icon: "science",
            officialUrl: "https://nrc.canada.ca/en/support-technology-innovation/",
            category: "Federal (NRC-CNRC)",
            benefits: [
                "Non-repayable funding for high-risk innovation",
                "Professional advice from technical specialists (ITAs)",
                "National network of mentors and resources",
                "Funding available for salary and professional fee coverage"
            ],
            eligibleCandidates: [
                "Canadian incorporated SME with fewer than 500 employees",
                "High technical uncertainty or risk in the project",
                "Demonstrated potential for commercialization and growth",
                "Company must show capability to fund its share of project costs"
            ],
            applicationProcess: [
                "Step 1: Contact an Industrial Technology Advisor (ITA)",
                "Step 2: Initial project screening and risk evaluation",
                "Step 3: Development of a full technical proposal",
                "Step 4: Project approval and funding contribution agreement",
                "Step 5: Milestone-based payments and final report"
            ],
            relatedCourses: ["ia-strategie", "ia-performer", "ia-juridique"]
        },
        fr: {
            slug: "pari-irap",
            name: "PARI – AI Assist (CNRC)",
            amount: "750 000$ – 10 500 000$",
            coverage: "Jusqu'à 100% des coûts",
            description: "Soutien du CNRC pour les PME innovantes travaillant sur des projets IA, TI ou technologiques. Couvre services professionnels et éducation.",
            fullDescription: "Le Programme d'aide à la recherche industrielle (PARI) du Conseil national de recherches Canada (CNRC) est le principal moteur de l'innovation technologique au Canada. Son volet 'AI Assist' aide les entreprises à réduire les risques et les coûts liés à l'intégration de systèmes IA avancés.",
            icon: "science",
            officialUrl: "https://nrc.canada.ca/fr/soutien-linnovation-technologique/",
            category: "Fédéral (NRC-CNRC)",
            benefits: [
                "Financement non remboursable pour l'innovation à haut risque",
                "Conseils professionnels de spécialistes techniques (CTA)",
                "Réseau national de mentors et de ressources",
                "Couverture possible des salaires et honoraires professionnels"
            ],
            eligibleCandidates: [
                "PME incorporée au Canada comptant moins de 500 employés",
                "Incertitude ou risque technique élevé dans le projet",
                "Potentiel de commercialisation et de croissance démontré",
                "Capacité de l'entreprise à financer sa part des coûts"
            ],
            applicationProcess: [
                "Étape 1 : Contacter un Conseiller en technologie industrielle (CTI)",
                "Étape 2 : Évaluation initiale du risque et du projet",
                "Étape 3 : Développement d'une proposition technique complète",
                "Étape 4 : Approbation et signature de l'accord de contribution",
                "Étape 5 : Versements selon les jalons et rapport final"
            ],
            relatedCourses: ["ia-strategie", "ia-performer", "ia-juridique"]
        }
    }
};

export const getSubsidyData = (slug: string, lang: string): Subsidy | null => {
    const data = subsidiesData[slug];
    if (!data) return null;
    return lang === "fr" ? data.fr : data.en;
};

export const getAllSubsidies = (lang: string): Subsidy[] => {
    return Object.values(subsidiesData).map(s => lang === "fr" ? s.fr : s.en);
};
