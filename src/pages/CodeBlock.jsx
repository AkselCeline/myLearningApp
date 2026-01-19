export const CodeBlock = ({ code, language = "algo" }) => (
    <div className="my-8 rounded-2xl overflow-hidden shadow-2xl bg-[#1e293b] border border-slate-800">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{language}</span>
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
            </div>
        </div>
        <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed text-indigo-100">
            <code>{code}</code>
        </pre>
    </div>
);