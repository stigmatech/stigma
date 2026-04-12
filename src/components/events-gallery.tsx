"use client";

import { useState, useMemo } from "react";
import { EventCard } from "./event-card";
import { Search, ChevronDown, Filter } from "lucide-react";

interface Event {
    id: string;
    slug: string;
    title_en?: string;
    title_fr?: string;
    description_en?: string;
    description_fr?: string;
    title: string;
    description: string;
    event_date: string;
    location: string;
    type: string;
    image_url?: string;
    category?: string;
}

interface EventsGalleryProps {
    events: Event[];
    lang: string;
    dictionary: any;
}

const MONTHS = [
    "all", "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
];

const CATEGORIES = ["all", "cybersecurity", "managed-it"];

export function EventsGallery({ events, lang, dictionary }: EventsGalleryProps) {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedMonth, setSelectedMonth] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const dict = dictionary.common.events.filters;

    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const date = new Date(event.event_date);
            const monthIndex = date.getMonth(); // 0-11
            const monthName = MONTHS[monthIndex + 1];

            const isFr = lang === "fr";
            const title = isFr ? (event.title_fr || event.title) : (event.title_en || event.title);
            const description = isFr ? (event.description_fr || event.description) : (event.description_en || event.description);

            const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
            const matchesMonth = selectedMonth === "all" || monthName === selectedMonth;
            const matchesSearch = searchQuery === "" || 
                title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                description.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesMonth && matchesSearch;
        });
    }, [events, selectedCategory, selectedMonth, searchQuery]);

    return (
        <div className="space-y-12">
            {/* Filters Bar */}
            <div className="bg-white dark:bg-background-dark/50 backdrop-blur-xl border-y border-gray-100 dark:border-white/10 sticky top-[72px] z-30 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
                        
                        {/* Categories */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-4 lg:pb-0 w-full lg:w-auto no-scrollbar">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`whitespace-nowrap px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                                        selectedCategory === cat
                                            ? "bg-surface-dark text-white"
                                            : "bg-gray-50 dark:bg-white/5 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
                                    }`}
                                >
                                    {dict.categories[cat]}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-center">
                            {/* Month Select */}
                            <div className="relative w-full sm:w-48 group">
                                <select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className="w-full appearance-none bg-gray-50 dark:bg-white/5 border-0 px-6 py-3 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-surface-dark/20 transition-all outline-hidden cursor-pointer"
                                >
                                    {MONTHS.map((month) => (
                                        <option key={month} value={month}>
                                            {dict.months[month]}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                            </div>

                            {/* Search */}
                            <div className="relative w-full sm:w-72">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={dict.search}
                                    className="w-full bg-gray-50 dark:bg-white/5 border-0 pl-12 pr-6 py-3 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-surface-dark/20 transition-all outline-hidden"
                                />
                                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {filteredEvents.length === 0 ? (
                    <div className="text-center py-32 border border-dashed border-gray-200 dark:border-white/10">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 flex items-center justify-center mx-auto mb-6">
                            <Filter size={24} className="text-gray-300" />
                        </div>
                        <p className="text-gray-400 font-light italic">
                            {lang === "fr" ? "Aucun événement ne correspond à vos critères." : "No events match your criteria."}
                        </p>
                        <button 
                            onClick={() => { setSelectedCategory("all"); setSelectedMonth("all"); setSearchQuery(""); }}
                            className="mt-6 text-[10px] font-black uppercase tracking-widest text-surface-dark hover:underline"
                        >
                            {dict.reset}
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {filteredEvents.map((event) => (
                            <EventCard key={event.id} event={event} lang={lang} dictionary={dictionary} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
