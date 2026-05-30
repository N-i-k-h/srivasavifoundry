import React from 'react';

const Industries: React.FC = () => {
  const industriesList = [
    { icon: "factory", name: "Steel" },
    { icon: "construction", name: "Construction" },
    { icon: "rebase_edit", name: "Mining" },
    { icon: "home_work", name: "Cement" },
    { icon: "foundation", name: "Infrastructure" },
  ];

  return (
    <section className="hidden md:block py-section-gap" id="industries">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.2em]">Market Reach</span>
          <h2 className="font-headline-md text-headline-md uppercase text-on-surface">Industries We Empower</h2>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-gutter">
          {industriesList.map((ind, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center p-8 bg-surface-container rounded-brand hover:bg-secondary group transition-all duration-300 cursor-default shadow-sm hover:shadow-xl hover:-translate-y-2 border border-outline-variant/10"
            >
              <span className="material-symbols-outlined text-[48px] text-secondary group-hover:text-white mb-4 transition-colors">
                {ind.icon}
              </span>
              <span className="font-bold text-on-surface group-hover:text-white transition-colors">
                {ind.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Industries;
