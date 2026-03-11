import React from 'react';

export function JsonLd() {
    const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Stigma Technologies",
        "url": "https://stigmatech.ca",
        "logo": "https://stigmatech.ca/logoStigmaTechnologies188x64.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-844-978-4462",
            "contactType": "customer service",
            "areaServed": "CA",
            "availableLanguage": ["English", "French"]
        },
        "sameAs": [
            "https://www.linkedin.com/company/stigma-technologies/"
        ]
    };

    const serviceData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Managed IT & Cybersecurity",
        "provider": {
            "@type": "Organization",
            "name": "Stigma Technologies"
        },
        "areaServed": {
            "@type": "Country",
            "name": "Canada"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Technology Solutions",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Managed Cybersecurity"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "AI & Machine Learning Solutions"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Corporate AI Training"
                    }
                }
            ]
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
            />
        </>
    );
}
