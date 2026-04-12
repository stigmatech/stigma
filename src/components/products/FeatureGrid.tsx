import React from "react";

interface Feature {
    title: string;
    description: string;
    icon: string;
}

interface FeatureGridProps {
    title: string;
    features: Feature[];
    themeColor: "blue" | "purple" | "green" | "red" | "teal";
}

const colorMap = {
    blue: "text-blue-600 bg-blue-50 border-blue-100 hover:bg-blue-600",
    purple: "text-purple-600 bg-purple-50 border-purple-100 hover:bg-purple-600",
    green: "text-emerald-600 bg-emerald-50 border-emerald-100 hover:bg-emerald-600",
    red: "text-red-600 bg-red-50 border-red-100 hover:bg-red-600",
    teal: "text-teal-600 bg-teal-50 border-teal-100 hover:bg-teal-600",
};

const FeatureGrid = ({ title, features, themeColor }: FeatureGridProps) => {
    return (
        <section className="py-24 bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-display font-bold text-[#0b0c10] mb-4">{title}</h2>
                    <div className={`h-1 w-12 mx-auto ${themeColor === 'blue' ? 'bg-blue-600' : themeColor === 'purple' ? 'bg-purple-600' : themeColor === 'green' ? 'bg-emerald-600' : themeColor === 'red' ? 'bg-red-600' : 'bg-teal-600'}`} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <div key={i} className="bg-white border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 group">
                            <div className={`w-14 h-14 rounded-none flex items-center justify-center mb-6 border transition-colors ${colorMap[themeColor].split(' hover:')[0]} group-hover:bg-${themeColor === 'green' ? 'emerald' : themeColor}-600 transition-colors`}>
                                <span className={`material-symbols-outlined text-[28px] group-hover:text-white transition-colors`}>{feature.icon}</span>
                            </div>
                            <h3 className="text-lg font-bold text-[#0b0c10] mb-3">{feature.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureGrid;
