import { useEffect, useMemo, useState } from 'react';
import {
  Star,
  Search,
  Play,
  Plus,
  X,
  FileText,
  Clock3,
  CalendarDays,
  BookOpen,
} from 'lucide-react';
import {
  CONTINUE_READING_PROGRESS,
  DOCUMENT_RAILS,
  DOCUMENTS,
  FEATURED_DOCUMENT_ID,
  type DocumentItem,
} from '../../data/documentShowcaseData';

const ALL_FILTER = 'All';

const uniqueCategories = [ALL_FILTER, ...new Set(DOCUMENTS.map((doc) => doc.category))];

function ratingLabel(rating: number) {
  return rating.toFixed(1);
}

function matchesQuery(doc: DocumentItem, query: string) {
  if (!query.trim()) {
    return true;
  }

  const normalized = query.trim().toLowerCase();
  return (
    doc.title.toLowerCase().includes(normalized) ||
    doc.synopsis.toLowerCase().includes(normalized) ||
    doc.tags.some((tag) => tag.toLowerCase().includes(normalized))
  );
}

function matchesCategory(doc: DocumentItem, category: string) {
  if (category === ALL_FILTER) {
    return true;
  }
  return doc.category === category;
}

function DocumentCard({
  document,
  onSelect,
  showProgress = false,
}: {
  document: DocumentItem;
  onSelect: (doc: DocumentItem) => void;
  showProgress?: boolean;
}) {
  const progress = CONTINUE_READING_PROGRESS[document.id];

  return (
    <button
      onClick={() => onSelect(document)}
      className="group min-w-[220px] max-w-[220px] text-left transition-transform hover:-translate-y-1"
    >
      <div
        className="h-[128px] rounded-md border border-white/10 p-3 flex flex-col justify-between relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, ${document.gradientFrom}, ${document.gradientTo})`,
        }}
      >
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-white/80">
            {document.category}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/35 text-white">
            {document.maturity}
          </span>
        </div>
        <div className="relative z-10">
          <p className="text-white font-semibold leading-tight line-clamp-2">{document.title}</p>
          <p className="text-[11px] mt-1 text-white/85">{document.pages} pages</p>
        </div>
      </div>

      <div className="pt-2 px-0.5">
        <div className="flex items-center gap-2 text-[11px] text-white/70">
          <span className="inline-flex items-center gap-1">
            <Star size={12} className="fill-[#FACC15] text-[#FACC15]" />
            {ratingLabel(document.rating)}
          </span>
          <span>•</span>
          <span>{document.readTime}</span>
        </div>
        <p className="mt-1 text-xs text-white/75 line-clamp-2">{document.synopsis}</p>
      </div>

      {showProgress && typeof progress === 'number' && (
        <div className="mt-2">
          <div className="h-1 w-full rounded bg-white/15 overflow-hidden">
            <div className="h-full bg-[#E50914]" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-1 text-[10px] text-white/60">{progress}% complete</p>
        </div>
      )}
    </button>
  );
}

export default function DocumentsShowcasePage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(ALL_FILTER);
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);

  const filteredDocuments = useMemo(() => {
    return DOCUMENTS.filter(
      (doc) => matchesQuery(doc, query) && matchesCategory(doc, activeCategory),
    );
  }, [query, activeCategory]);

  const filteredDocumentIds = useMemo(() => new Set(filteredDocuments.map((doc) => doc.id)), [filteredDocuments]);

  const rails = useMemo(() => {
    return DOCUMENT_RAILS.map((rail) => ({
      ...rail,
      documents: rail.documentIds
        .map((id) => DOCUMENTS.find((doc) => doc.id === id))
        .filter((doc): doc is DocumentItem => Boolean(doc) && filteredDocumentIds.has(doc.id)),
    })).filter((rail) => rail.documents.length > 0);
  }, [filteredDocumentIds]);

  const featuredDocument = useMemo(() => {
    const featured = DOCUMENTS.find((doc) => doc.id === FEATURED_DOCUMENT_ID);
    if (featured && filteredDocumentIds.has(featured.id)) {
      return featured;
    }
    return filteredDocuments[0] ?? DOCUMENTS[0];
  }, [filteredDocumentIds, filteredDocuments]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedDocument(null);
      }
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  return (
    <div className="h-screen overflow-y-auto bg-[#141414] text-white">
      <header className="sticky top-0 z-30 bg-gradient-to-b from-black/80 to-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="h-[68px] px-8 flex items-center gap-6">
          <div className="text-[#E50914] text-[28px] tracking-wider font-extrabold">DOCFLIX</div>
          <nav className="hidden md:flex items-center gap-5 text-sm text-white/80">
            <span className="text-white font-medium">Home</span>
            <span>My List</span>
            <span>New & Popular</span>
            <span>By Department</span>
          </nav>

          <div className="ml-auto w-[280px] relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search documents..."
              className="w-full bg-black/35 border border-white/20 rounded-md pl-9 pr-3 py-2 text-sm text-white placeholder:text-white/55 outline-none focus:border-white/45"
            />
          </div>
        </div>
      </header>

      <section
        className="relative min-h-[440px] px-8 py-12 border-b border-white/10"
        style={{
          backgroundImage: `linear-gradient(120deg, ${featuredDocument.gradientFrom}, ${featuredDocument.gradientTo})`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,#00000000_0%,#000000b8_70%)]" />
        <div className="relative z-10 max-w-[680px]">
          <p className="text-[12px] tracking-[0.2em] uppercase text-white/80 mb-3">Featured Document</p>
          <h1 className="text-[44px] leading-[1.05] font-bold mb-4">{featuredDocument.title}</h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-white/85 mb-4">
            <span className="inline-flex items-center gap-1">
              <Star size={14} className="fill-[#FACC15] text-[#FACC15]" />
              {ratingLabel(featuredDocument.rating)}
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays size={14} /> {featuredDocument.year}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock3 size={14} /> {featuredDocument.readTime}
            </span>
            <span className="inline-flex items-center gap-1">
              <BookOpen size={14} /> {featuredDocument.pages} pages
            </span>
          </div>

          <p className="text-base text-white/90 leading-relaxed max-w-[620px]">{featuredDocument.synopsis}</p>

          <div className="mt-7 flex items-center gap-3">
            <button
              onClick={() => setSelectedDocument(featuredDocument)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-white text-black font-semibold hover:bg-white/90 transition-colors"
            >
              <Play size={16} className="fill-black" /> Read now
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white/25 text-white font-semibold hover:bg-white/35 transition-colors">
              <Plus size={16} /> My List
            </button>
          </div>
        </div>
      </section>

      <section className="px-8 pt-6 pb-12">
        <div className="flex flex-wrap items-center gap-2 mb-7">
          {uniqueCategories.map((category) => {
            const active = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                  active
                    ? 'bg-white text-black border-white'
                    : 'bg-white/5 text-white/80 border-white/20 hover:bg-white/15'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {rails.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-white/20 rounded-lg">
            <p className="text-xl font-semibold mb-2">No documents matched your filters</p>
            <p className="text-sm text-white/65">Try a different category or search term.</p>
          </div>
        ) : (
          <div className="space-y-9">
            {rails.map((rail) => (
              <div key={rail.id}>
                <div className="mb-3 flex items-end justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{rail.title}</h2>
                    <p className="text-xs text-white/65">{rail.subtitle}</p>
                  </div>
                </div>

                <div className="overflow-x-auto pb-2">
                  <div className="flex items-start gap-3 min-w-fit pr-2">
                    {rail.documents.map((document) => (
                      <DocumentCard
                        key={document.id}
                        document={document}
                        onSelect={setSelectedDocument}
                        showProgress={rail.id === 'continue'}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {selectedDocument && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[860px] bg-[#181818] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div
              className="h-[240px] p-6 flex items-end relative"
              style={{
                backgroundImage: `linear-gradient(120deg, ${selectedDocument.gradientFrom}, ${selectedDocument.gradientTo})`,
              }}
            >
              <div className="absolute inset-0 bg-black/35" />
              <button
                onClick={() => setSelectedDocument(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/45 hover:bg-black/60 flex items-center justify-center"
                aria-label="Close document preview"
              >
                <X size={16} />
              </button>
              <div className="relative z-10">
                <p className="text-xs uppercase tracking-[0.18em] text-white/80 mb-2">Document Preview</p>
                <h3 className="text-3xl font-bold">{selectedDocument.title}</h3>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80 mb-4">
                <span className="inline-flex items-center gap-1">
                  <Star size={13} className="fill-[#FACC15] text-[#FACC15]" />
                  {ratingLabel(selectedDocument.rating)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <CalendarDays size={13} /> {selectedDocument.year}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock3 size={13} /> {selectedDocument.readTime}
                </span>
                <span className="inline-flex items-center gap-1">
                  <FileText size={13} /> {selectedDocument.pages} pages
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-white/10 border border-white/20">
                  {selectedDocument.maturity}
                </span>
              </div>

              <p className="text-[15px] text-white/90 leading-relaxed mb-5">{selectedDocument.synopsis}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedDocument.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white text-black font-semibold hover:bg-white/90 transition-colors">
                  <BookOpen size={16} /> Open Document
                </button>
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white/20 text-white font-semibold hover:bg-white/30 transition-colors">
                  <Plus size={16} /> Add to My List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
