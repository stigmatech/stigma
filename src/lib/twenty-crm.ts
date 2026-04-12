export interface LeadData {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    jobTitle?: string;
    message?: string;
    service?: string;
    specificNeeds?: string[];
    industry?: string;
    companySize?: string;
    itSetup?: string;
    timeline?: string;
    tier?: string;
    orchestration?: boolean;
}

export async function createTwentyLead(data: LeadData) {
    const TWENTY_API_URL = process.env.TWENTY_API_URL;
    const TWENTY_API_KEY = process.env.TWENTY_API_KEY;

    if (!TWENTY_API_URL || !TWENTY_API_KEY) {
        console.warn("[Twenty CRM] Credentials missing. Skipping synchronization.");
        return null; // Don't crash the form if CRM isn't fully configured
    }

    try {
        console.log("[Twenty CRM] Synchronizing lead:", data.email);

        // 1. Create a "Person" representing the Lead
        const personPayload = {
            name: {
                firstName: data.firstName,
                lastName: data.lastName
            },
            emails: { primaryEmail: data.email },
            phones: data.phone ? { primaryPhoneNumber: data.phone, primaryPhoneCountryCode: "", primaryPhoneCallingCode: "" } : null,
            jobTitle: data.jobTitle || "",
            // Additional custom context pushed into a single field if necessary
            city: data.service || "", 
            intro: data.message || "",
        };

        const personRes = await fetch(`${TWENTY_API_URL}/rest/people`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TWENTY_API_KEY}`
            },
            body: JSON.stringify(personPayload)
        });

        if (!personRes.ok) {
            const errText = await personRes.text();
            console.error("[Twenty CRM] Failed to create Person:", errText);
            return null;
        }

        const person = await personRes.json();
        console.log("[Twenty CRM] Person creation response:", JSON.stringify(person));
        
        // Twenty REST API typically returns { data: { createPerson: { id: "..." } } }
        const personId = person.data?.createPerson?.id || person.data?.id || person.id;

        if (!personId) {
            console.error("[Twenty CRM] Could not extract personId from response:", person);
            return person;
        }

        // 2. Create the Note
        console.log("[Twenty CRM] Creating note for person:", personId);
        
        // Construct a rich B2B context profile in Markdown
        const contextDetails = [
            `# Strategic Lead: ${data.service || 'Contact'}`,
            `**Source**: AI Agent Configurator`,
            `---`,
            `**Technical Profile**:`,
            data.tier ? `- **Selected Tier**: ${data.tier}` : '',
            data.orchestration ? `- **Orchestration Manager**: Active (+$199/mo)` : '',
            data.industry ? `- **Industry**: ${data.industry}` : '',
            data.companySize ? `- **Company Size**: ${data.companySize}` : '',
            data.itSetup ? `- **Current IT Setup**: ${data.itSetup}` : '',
            data.timeline ? `- **Timeline**: ${data.timeline}` : '',
            data.specificNeeds && data.specificNeeds.length > 0 ? `- **Specific Needs**: ${data.specificNeeds.join(', ')}` : '',
            `\n**Message**:\n${data.message || 'No additional message provided.'}`,
        ].filter(Boolean).join('\n');

        const noteRes = await fetch(`${TWENTY_API_URL}/rest/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TWENTY_API_KEY}`
            },
            body: JSON.stringify({
                title: `Inquiry: ${data.service || "Managed AI Agents"}`,
                bodyV2: {
                    markdown: contextDetails
                }
            })
        });

        if (!noteRes.ok) {
            console.warn("[Twenty CRM] Note creation failed:", await noteRes.text());
            return person;
        }

        const noteData = await noteRes.json();
        const noteId = noteData.data?.createNote?.id;

        // 3. Link Note to Person via NoteTarget
        if (noteId && personId) {
            console.log("[Twenty CRM] Linking note", noteId, "to person", personId);
            const targetRes = await fetch(`${TWENTY_API_URL}/rest/noteTargets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${TWENTY_API_KEY}`
                },
                body: JSON.stringify({
                    noteId: noteId,
                    targetPersonId: personId
                })
            });

            if (!targetRes.ok) {
                console.warn("[Twenty CRM] NoteTarget linkage failed:", await targetRes.text());
            } else {
                console.log("[Twenty CRM] Lead successfully fully synchronized.");
            }
        }

        return person;

    } catch (error) {
        console.error("[Twenty CRM] Fatal integration error:", error);
        return null;
    }
}
