export type LaunchPackOwnerKey = "gruender" | "partner";

export type LaunchPackContentSeed = {
  key: string;
  personaName: string;
  ownerKey: LaunchPackOwnerKey;
  dayOffset: number;
  format: "EINZELBILD" | "CAROUSEL" | "KURZVIDEO";
  intent: "REICHWEITE" | "SAVES" | "SHARES" | "FOLLOWS" | "VERTRAUEN" | "TREND";
  pillar: string;
  hook: string;
  brief: string;
  outline: string;
  caption: string | null;
  cta: string;
  disclosure: string | null;
  status:
    | "IDEE"
    | "GEBRIEFT"
    | "TEXT_ENTWURF"
    | "MATERIAL_FEHLT"
    | "PRUEFUNG";
  complianceStatus: "offen" | "claim_check_noetig" | "bereit_fuer_pruefung";
};

export type LaunchPackAssetSeed = {
  key: string;
  personaName: string;
  contentKey: string | null;
  assetType: "SETCARD" | "PROMPT" | "STYLE_GUIDE";
  sourceTool: string;
  storagePath: string;
  originalFilename: string;
  mimeType: string;
  byteSize: number;
  prompt: string | null;
  qualityRating: number | null;
  consistencyRating: number | null;
  status: "KANDIDAT" | "FREIGEGEBENE_REFERENZ" | "BEARBEITEN";
  notes: string;
};

export type LaunchPackVideoSlotSeed = {
  key: string;
  personaName: string;
  contentKey: string;
  dayOffset: number;
  reason: string;
  expectedLearning: string;
  productionStatus: "geplant";
};

export const LAUNCH_PACK_CONTENT: LaunchPackContentSeed[] = [
  {
    key: "david-workflow-carousel-01",
    personaName: "David Chen",
    ownerKey: "gruender",
    dayOffset: 0,
    format: "CAROUSEL",
    intent: "SAVES",
    pillar: "AI-Workflow statt Tool-Liste",
    hook: "Baue diesen 20-Minuten-AI-Workflow statt 7 neue Tools zu sammeln",
    brief:
      "Carousel für Solo-Operator: ein konkreter Mini-Workflow von Input zu fertigem Output. Keine generische Tool-Sammlung, kein Einkommensversprechen.",
    outline:
      "Slide 1 Hook. Slide 2 Problem: Tool-Sammlung erzeugt keine Ergebnisse. Slide 3 Eingabe sammeln. Slide 4 Prompt strukturieren. Slide 5 Output prüfen. Slide 6 Wiederholbare Vorlage. Slide 7 Speichern und morgen testen.",
    caption:
      "Wenn dein AI-Setup mehr Tabs als Ergebnisse produziert, ist nicht das Tool das Problem, sondern der Workflow.",
    cta: "Speichern und mit einem echten Arbeitsprozess testen.",
    disclosure: null,
    status: "GEBRIEFT",
    complianceStatus: "offen"
  },
  {
    key: "zara-routine-myth-01",
    personaName: "Zara Patel",
    ownerKey: "gruender",
    dayOffset: 0,
    format: "CAROUSEL",
    intent: "SAVES",
    pillar: "Skincare-Routine ohne Überladung",
    hook: "Mehr Skincare ist nicht automatisch bessere Haut",
    brief:
      "Claim-sicheres Beauty-Carousel über Routine-Design: weniger Schritte, klare Reihenfolge, keine medizinische Wirkung, keine Fake-Produktnutzung.",
    outline:
      "Slide 1 Hook. Slide 2 Reiz: zu viele aktive Produkte. Slide 3 Basis: Reinigen, Feuchtigkeit, Schutz. Slide 4 Warum Barriere zuerst denken. Slide 5 Wann ein Produkt reicht. Slide 6 Speichere deine Routine-Regel.",
    caption: null,
    cta: "Routine-Regel speichern, bevor du das nächste Produkt kaufst.",
    disclosure: null,
    status: "PRUEFUNG",
    complianceStatus: "claim_check_noetig"
  },
  {
    key: "luna-less-better-01",
    personaName: "Luna Stone",
    ownerKey: "gruender",
    dayOffset: 1,
    format: "EINZELBILD",
    intent: "REICHWEITE",
    pillar: "Slow-Living-Entscheidung",
    hook: "Weniger kaufen, besser wirken lassen",
    brief:
      "Ruhiges Einzelbild mit kurzer Caption über bewusste Auswahl. Kein Fake-Besitz, keine falsche Lifestyle-Behauptung.",
    outline:
      "Bild: ruhige helle Szene, ein Objekt, viel Ordnung. Caption: 3 Entscheidungsfragen vor einem Kauf.",
    caption: null,
    cta: "Teilen, wenn du gerade weniger statt mehr brauchst.",
    disclosure: null,
    status: "MATERIAL_FEHLT",
    complianceStatus: "bereit_fuer_pruefung"
  },
  {
    key: "alex-discipline-video-01",
    personaName: "Alex Moreno",
    ownerKey: "partner",
    dayOffset: 0,
    format: "KURZVIDEO",
    intent: "FOLLOWS",
    pillar: "Fitnesspsychologie ohne Überforderung",
    hook: "Disziplin beginnt nicht mit Motivation, sondern mit einer kleineren Hürde",
    brief:
      "10-Sekunden-Video oder Carousel-Variante. Fokus auf Anfänger-Sicherheit und Routine, keine Körperresultate, keine Supplement-Claims.",
    outline:
      "Sekunde 0-2 Hook. Sekunde 3-6 eine niedrigere Einstiegshürde zeigen. Sekunde 7-10 Satz: Heute nur erscheinen, nicht zerstören.",
    caption: null,
    cta: "Folgen, wenn du Fitness ohne Selbsthass aufbauen willst.",
    disclosure: null,
    status: "GEBRIEFT",
    complianceStatus: "claim_check_noetig"
  },
  {
    key: "sophie-y2k-accessory-01",
    personaName: "Sophie Larue",
    ownerKey: "partner",
    dayOffset: 1,
    format: "EINZELBILD",
    intent: "TREND",
    pillar: "Y2K-Trendwinkel",
    hook: "Dieses Y2K-Accessoire macht einfache Outfits sofort absichtlich",
    brief:
      "Trendbild mit Outfit-Formel. Keine Fake-Markenpartnerschaft, Affiliate-Hinweis vorbereiten, aber noch kein Verkauf.",
    outline:
      "Bildidee: klares Outfit, ein Accessoire als Fokus. Caption: 3 Kombinationsregeln und ein Speichern-CTA.",
    caption: null,
    cta: "Speichern für den nächsten Outfit-Check.",
    disclosure: null,
    status: "IDEE",
    complianceStatus: "offen"
  },
  {
    key: "emma-kitchen-zone-01",
    personaName: "Emma Winters",
    ownerKey: "partner",
    dayOffset: 1,
    format: "CAROUSEL",
    intent: "SAVES",
    pillar: "Home-Organisation als Alltagssystem",
    hook: "Die 15-Minuten-Küchenzone, die auch an chaotischen Tagen funktioniert",
    brief:
      "Carousel mit realistischem Ordnungssystem. Kein erfundener Familienbeweis, keine perfekte Mom-Inszenierung, nur Ablauf und Checkliste.",
    outline:
      "Slide 1 Hook. Slide 2 nur eine Zone wählen. Slide 3 Fläche frei. Slide 4 drei Dinge sortieren. Slide 5 Rückfall-Regel. Slide 6 Speichern für Sonntag.",
    caption: null,
    cta: "Speichern und die Zone heute einmal testen.",
    disclosure: null,
    status: "PRUEFUNG",
    complianceStatus: "claim_check_noetig"
  }
];

export const LAUNCH_PACK_ASSETS: LaunchPackAssetSeed[] = [
  setcard("david-setcard-image10", "David Chen", "/personas_media/image10.png", "image10.png", 1755595, 8, 8),
  setcard("zara-setcard-image7", "Zara Patel", "/personas_media/image7.png", "image7.png", 2153852, 7, 7),
  setcard("luna-setcard-image2", "Luna Stone", "/personas_media/image2.png", "image2.png", 1913678, 8, 8),
  setcard("alex-setcard-image1", "Alex Moreno", "/personas_media/image1.png", "image1.png", 2073440, 7, 7),
  promptAsset(
    "david-workflow-prompt",
    "David Chen",
    "david-workflow-carousel-01",
    "Clean tech educator, dark desk, calm blue accent, Instagram carousel cover, precise workflow diagram, no generic AI tool collage."
  ),
  promptAsset(
    "zara-routine-prompt",
    "Zara Patel",
    "zara-routine-myth-01",
    "Inclusive beauty educator, warm close-up, premium skincare flatlay, soft rose accent, educational carousel cover, no medical before-after claim."
  ),
  promptAsset(
    "luna-less-better-prompt",
    "Luna Stone",
    "luna-less-better-01",
    "Minimal slow-living scene, morning light, one intentional object, neutral wardrobe texture, calm composition, no fake luxury signal."
  ),
  promptAsset(
    "alex-discipline-prompt",
    "Alex Moreno",
    "alex-discipline-video-01",
    "Fitness creator in gym, short vertical video frame, one small action, energetic but beginner-safe, no transformation proof."
  ),
  promptAsset(
    "sophie-y2k-prompt",
    "Sophie Larue",
    "sophie-y2k-accessory-01",
    "Y2K fashion outfit detail, one statement accessory, bright editorial crop, shopping-adjacent but no brand partnership claim."
  ),
  promptAsset(
    "emma-kitchen-zone-prompt",
    "Emma Winters",
    "emma-kitchen-zone-01",
    "Realistic home organization carousel, kitchen counter zone, practical bins, lived-in but clean, no fake family proof."
  )
];

export const LAUNCH_PACK_VIDEO_SLOTS: LaunchPackVideoSlotSeed[] = [
  {
    key: "video-alex-discipline-day-1",
    personaName: "Alex Moreno",
    contentKey: "alex-discipline-video-01",
    dayOffset: 0,
    reason: "Fitness-Hook mit Bewegungsenergie kann schnell Follow-Signal testen.",
    expectedLearning: "Prüfen, ob Anfänger-sichere Disziplin stärker zieht als reine Gym-Ästhetik.",
    productionStatus: "geplant"
  },
  {
    key: "video-david-workflow-day-1",
    personaName: "David Chen",
    contentKey: "david-workflow-carousel-01",
    dayOffset: 0,
    reason: "AI-Workflow kann als 10-Sekunden-Screen/Desk-Clip Utility-Signal erzeugen.",
    expectedLearning: "Prüfen, ob Workflow-Beweis mehr Saves auslöst als Tool-Listen.",
    productionStatus: "geplant"
  }
];

function setcard(
  key: string,
  personaName: string,
  storagePath: string,
  originalFilename: string,
  byteSize: number,
  qualityRating: number,
  consistencyRating: number
): LaunchPackAssetSeed {
  return {
    key,
    personaName,
    contentKey: null,
    assetType: "SETCARD",
    sourceTool: "PERSONAS.docx",
    storagePath,
    originalFilename,
    mimeType: "image/png",
    byteSize,
    prompt: null,
    qualityRating,
    consistencyRating,
    status: "FREIGEGEBENE_REFERENZ",
    notes: "Sicher zugeordnete Startwellen-Setcard aus dem Persona-Dokument."
  };
}

function promptAsset(
  key: string,
  personaName: string,
  contentKey: string,
  prompt: string
): LaunchPackAssetSeed {
  return {
    key,
    personaName,
    contentKey,
    assetType: "PROMPT",
    sourceTool: "Leonardo.ai / Google AI Pro",
    storagePath: `prompt://launch-pack/${key}`,
    originalFilename: `${key}.txt`,
    mimeType: "text/plain",
    byteSize: prompt.length,
    prompt,
    qualityRating: null,
    consistencyRating: null,
    status: "KANDIDAT",
    notes: "Erster reproduzierbarer Prompt für den Launch-Pack-Produktionsslot."
  };
}
