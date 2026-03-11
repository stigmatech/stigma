export function Stats() {
    const stats = [
        { label: "Uptime Moyen", value: "99.9%", icon: "speed", color: "text-green-400" },
        { label: "Menaces Bloquées", value: "1.2M+", icon: "gpp_maybe", color: "text-red-400" },
        { label: "Projets Déployés", value: "500+", icon: "rocket_launch", color: "text-gray-400" },
    ];

    return (
        <section className="bg-primary border-y border-white/10 relative z-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10 items-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center md:items-start md:px-8 space-y-1 pt-8 first:pt-0 md:pt-0">
                            <div className="flex items-center gap-3 text-white">
                                <span className="text-3xl lg:text-4xl font-display font-extrabold tracking-tight">{stat.value}</span>
                                <span className={`material-symbols-outlined ${stat.color} animate-pulse text-xl`}>{stat.icon}</span>
                            </div>
                            <p className="text-xs lg:text-sm font-medium uppercase tracking-widest text-gray-400">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
