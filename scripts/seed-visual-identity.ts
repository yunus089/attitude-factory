import { prisma } from "../src/lib/prisma";

const visualData: Array<{
  name: string;
  archetype: string;
  visualColorPalette: string;
  visualLocations: string;
  visualOutfitAnchors: string;
  visualLightingLogic: string;
  visualFaceConsistency: string;
  visualCameraDistance: string;
  visualIdentity: string;
}> = [
  {
    name: "Luna Stone",
    archetype: "Clean Girl Aesthetic Creator + Slow Living Advocate",
    visualColorPalette: "Beige, Creme, White, Earth tones, Warm Neutrals",
    visualLocations: "Minimalist Berlin apartments, linen-draped windowsills, outdoor slow morning walks, simple kitchen setups",
    visualOutfitAnchors: "Oversized linen, neutral basics, minimalist jewellery, white tees, earth-tone knits",
    visualLightingLogic: "Golden hour soft light, diffused window light, no harsh shadows, warm and calm",
    visualFaceConsistency: "Dark brown long waves, Mediterranean features, slim/athletic build, subtle minimalist tattoos, calm expression",
    visualCameraDistance: "Close-up lifestyle shots, waist-up, flat lays with hands, wide calm environment shots",
    visualIdentity: "28-year-old Berlin minimalist. Beige/earth aesthetic. Calm, authentic, intellectual. Clean girl slow living. No clutter, no noise. Every frame breathes."
  },
  {
    name: "Jake Steele",
    archetype: "High Performance Coach / Productivity Nerd",
    visualColorPalette: "Black, Dark Grey, Electric Blue, Matte Metal accents",
    visualLocations: "Concrete office, dark mode home setup, precision-designed workspace, minimalist gym",
    visualOutfitAnchors: "Black crewneck, fitted dark tees, minimal performance wear, no logos",
    visualLightingLogic: "Harsh directional light, high contrast, cool-toned, dramatic shadows",
    visualFaceConsistency: "Sharp angular facial features, piercing dark eyes, short dark brown hair with precision fade, clean-shaven",
    visualCameraDistance: "Direct eye-contact close-ups, waist-up authority shots, low angle for dominance",
    visualIdentity: "31-year-old no-nonsense business creator. Dark Mode aesthetic. Sharp, angular, high contrast. Built for decision-makers who have no time for noise."
  },
  {
    name: "Mira Chen",
    archetype: "Dark Academia Thinker + Cozy Aesthetic Creator",
    visualColorPalette: "Burgundy, Dark Green, Rich Wood tones, Ivory, Amber candlelight",
    visualLocations: "Cozy library corners, vintage bookshops, wood-panelled study rooms, London café windows",
    visualOutfitAnchors: "Plaid blazers, turtlenecks, corduroy, vintage knits, round glasses",
    visualLightingLogic: "Warm lamp light, candlelight, late afternoon golden glow through leaded windows",
    visualFaceConsistency: "East Asian features, soft round face, long straight dark brown hair with wispy 1970s bangs, round tortoiseshell glasses",
    visualCameraDistance: "Close-ups with books in hand, medium shots at a desk, cozy wide lifestyle shots",
    visualIdentity: "23-year-old London dark academia creator. Burgundy/wood aesthetic. Soft, intellectual, cozy. Books, tea, handwritten notes. Every shot feels like a chapter."
  },
  {
    name: "Alex Moreno",
    archetype: "High-Energy Fitness Prophet + Biohacker",
    visualColorPalette: "Neon Yellow, Black, White, Raw concrete grey",
    visualLocations: "Gym floors, beach workouts Miami, high-tech labs, outdoor staircase training",
    visualOutfitAnchors: "Compression shorts, sleeveless performance tops, wristbands, minimalist trainers",
    visualLightingLogic: "Hard sunlight, sweat-under-light realism, dynamic motion blur, high contrast",
    visualFaceConsistency: "Latino features, ripped athletic build, tan skin, short dark hair, stubble, intense focused expression",
    visualCameraDistance: "Action motion shots, low angle power poses, close-up intensity expressions",
    visualIdentity: "29-year-old Miami fitness prophet. Neon Yellow/Black aesthetic. Raw, intense, high-energy. Gym is the church. Every frame moves."
  },
  {
    name: "Sophie Larue",
    archetype: "Y2K Fashion It-Girl + Trendsetter",
    visualColorPalette: "Hot Pink, Baby Blue, Lilac, Silver, Chrome, Holographic accents",
    visualLocations: "Paris streets, vintage boutiques, photobooth strips, Y2K-era shopping malls, rooftop Paris sunsets",
    visualOutfitAnchors: "Butterfly clips, low-rise jeans, tube tops, mini skirts, platform shoes, tinted sunglasses",
    visualLightingLogic: "Bright saturated daylight, Y2K flashbulb effect, soft overexposed film look",
    visualFaceConsistency: "French-European features, long blonde waves, round eyes, dainty nose, glossy lips, playful expression",
    visualCameraDistance: "Full outfit shots, close-up accessory details, candid street captures",
    visualIdentity: "22-year-old Paris Y2K it-girl. Hot pink/silver aesthetic. Playful, trend-forward, effortlessly stylish. Looks like the main character of a 2002 music video."
  },
  {
    name: "Zara Patel",
    archetype: "Inclusive Beauty Educator + Skin Positive Creator",
    visualColorPalette: "Peach, Rose Gold, Warm Brown, Terracotta, Cream",
    visualLocations: "Warmly lit vanity setups, soft London flat interiors, bathroom skincare rituals, close-up texture studies",
    visualOutfitAnchors: "Silk robes, soft cardigans, minimal jewelry, fresh no-makeup makeup look",
    visualLightingLogic: "Warm diffused ring light, golden skin-glow lighting, no harsh shadows on skin",
    visualFaceConsistency: "South Asian features, glowing warm-toned skin, long dark wavy hair, expressive dark eyes, natural inclusive beauty look",
    visualCameraDistance: "Extreme close-up skin texture shots, medium vanity shots, hands-on product demos",
    visualIdentity: "26-year-old London beauty educator. Peach/rose gold aesthetic. Warm, inclusive, skin-positive. Every frame celebrates real skin. No filter, no fake glow."
  },
  {
    name: "Emma Winters",
    archetype: "Realistic Mom + Home Organizer",
    visualColorPalette: "Sage Green, Cream, Soft Grey, Warm White, Muted Terracotta",
    visualLocations: "Lived-in Manchester home, organised kitchen drawers, real laundry rooms, cosy family spaces",
    visualOutfitAnchors: "Soft knits, casual jeans, practical layering, approachable non-curated style",
    visualLightingLogic: "Natural window light, slightly imperfect, warm and honest, lived-in glow",
    visualFaceConsistency: "Caucasian, shoulder-length blonde hair, friendly approachable face, natural low-key styling",
    visualCameraDistance: "Eye-level relatable shots, overhead organisation flat lays, medium lifestyle shots in real rooms",
    visualIdentity: "32-year-old Manchester realistic mom. Sage/cream aesthetic. Organised chaos. Real home, real systems. Nothing is staged. Everything actually works."
  },
  {
    name: "David Chen",
    archetype: "Tech Explainer + AI-Native Creator",
    visualColorPalette: "White, Electric Blue, Steel Grey, Black, Clean Chrome",
    visualLocations: "High-tech Singapore/SF home office, multi-monitor setups, clean minimal desk environments",
    visualOutfitAnchors: "Smart casual — navy/white, minimal branding, precision-fitted shirts, tech-clean style",
    visualLightingLogic: "Cool studio LED light, screen glow ambience, clean high-key lighting with no distractions",
    visualFaceConsistency: "East Asian, short precise haircut, smart minimalist glasses, clean-shaven, focused calm expression",
    visualCameraDistance: "Talking-head medium shots, over-shoulder screen shots, close-up detail on tech/hands",
    visualIdentity: "31-year-old Singapore/SF AI educator. White/electric blue aesthetic. Precise, calm, system-oriented. Every frame is a workflow. No clutter, only signal."
  },
  {
    name: "Nate Jackson",
    archetype: "Streetwise Hustler + Entrepreneur Mindset",
    visualColorPalette: "Black base, Crimson Red pops, White, Gold accents, Chicago grey",
    visualLocations: "Chicago streets, small business back offices, diner booths, hustle-culture workspaces",
    visualOutfitAnchors: "Jordan sneakers, oversized hoodies, gold chain, fresh fade, understated streetwear",
    visualLightingLogic: "Urban ambient light, street-level realism, golden hour Chicago, high contrast cool shadows",
    visualFaceConsistency: "African-American, short fade cut, light goatee, athletic build, confident direct expression",
    visualCameraDistance: "Street-level eye contact, waist-up hustle energy, close-up hands-on-work shots",
    visualIdentity: "25-year-old Chicago streetwise entrepreneur. Black/crimson aesthetic. Real, grounded, no-fluff hustle. Built from the streets up. Every frame earns its place."
  }
];

for (const persona of visualData) {
  const result = await prisma.persona.updateMany({
    where: { name: persona.name },
    data: {
      archetype: persona.archetype,
      visualColorPalette: persona.visualColorPalette,
      visualLocations: persona.visualLocations,
      visualOutfitAnchors: persona.visualOutfitAnchors,
      visualLightingLogic: persona.visualLightingLogic,
      visualFaceConsistency: persona.visualFaceConsistency,
      visualCameraDistance: persona.visualCameraDistance,
      visualIdentity: persona.visualIdentity,
    }
  });

  if (result.count > 0) {
    console.log(`✓ Aktualisiert: ${persona.name}`);
  } else {
    console.warn(`⚠ Nicht gefunden: ${persona.name}`);
  }
}

// New personas from PDF not yet in DB – insert them
const newPersonas = [
  {
    name: "Elias Vogel",
    publicName: "Elias Vogel",
    archetype: "Heritage Craftsman + Stoic Outdoorsman",
    lane: "Outdoor / Handwerk",
    niche: "Holzarbeiten, Bergleben, stoische Alltagsphilosophie",
    visualColorPalette: "Moss Green, Charcoal, Warm Wood Brown, Stone Grey",
    visualLocations: "Bavarian Alpine workshops, forest clearings, mountain trails, rustic tool sheds",
    visualOutfitAnchors: "Linen work shirts, heavy wool, leather apron, boots, no logos",
    visualLightingLogic: "Natural morning mountain light, fire/workshop glow, raw and unfiltered",
    visualFaceConsistency: "Rugged bearded face, dark hair, blue-grey eyes, muscular build, weathered hands",
    visualCameraDistance: "Close-up craft detail shots, medium wide nature environment, hands-on material work",
    visualIdentity: "34-year-old Bavarian craftsman. Moss/wood aesthetic. Stoic, rugged, slow and deliberate. Makes things that last. Every frame smells like pine and iron."
  },
  {
    name: "Zara Sky",
    publicName: "Zara Sky",
    archetype: "Spiritual Tech Nomad + Wellness Architect",
    lane: "Wellness / Digital Nomad",
    niche: "Achtsamkeit, Nomaden-Lifestyle, spirituelle Selbstoptimierung",
    visualColorPalette: "Terracotta, Sage, Sand, Turquoise Ocean, Warm White",
    visualLocations: "Bali rice terraces, ocean-view co-working spaces, sunrise yoga platforms, jungle huts",
    visualOutfitAnchors: "Flowy silk pants, minimalist jewelry, linen co-ords, barefoot or sandals",
    visualLightingLogic: "Golden hour tropical, sunrise soft light, natural Bali glow",
    visualFaceConsistency: "Sun-kissed skin, long wavy blonde hair, light blue eyes, serene open expression",
    visualCameraDistance: "Wide environmental shots showing landscape, medium lifestyle, close-up ritual details",
    visualIdentity: "26-year-old Bali-based nomad mystic. Terracotta/turquoise aesthetic. Spiritual, free, grounded. Every frame is a postcard from a life fully lived."
  },
  {
    name: "Amina Koroma",
    publicName: "Amina Koroma",
    archetype: "Afro-Futurist Designer + Tech-Weaver",
    lane: "Fashion / Design / Tech",
    niche: "Afro-futuristische Mode, Tech-Stoffe, kulturelles Design-Storytelling",
    visualColorPalette: "Royal Blue, Gold, Emerald, Deep Black, Metallic Bronze",
    visualLocations: "London creative studios, Lagos market vibes, tech-fashion runways, bold geometric spaces",
    visualOutfitAnchors: "Bold patterns, tech-fabrics, geometric silhouettes, metallic accents, statement earrings",
    visualLightingLogic: "Bold studio lighting, dramatic colour gels, high contrast, vibrant saturation",
    visualFaceConsistency: "West African features, deep dark skin, short shaved hair or intricate braids, geometric tattoos, powerful presence",
    visualCameraDistance: "Full fashion editorial shots, close-up textile details, strong frontal presence shots",
    visualIdentity: "27-year-old London/Lagos afro-futurist. Royal Blue/Gold aesthetic. Bold, visionary, unapologetically complex. Fashion as cultural architecture."
  },
  {
    name: "Isabella Rosa",
    publicName: "Isabella Rosa",
    archetype: "Luxury Lifestyle Curator + Aspiration Creator",
    lane: "Luxury / Lifestyle",
    niche: "Kuratierter Luxus, Reisen, Alltagsästhetik auf gehobenem Niveau",
    visualColorPalette: "Black, Navy, Gold, Creme, Ivory, Marble White",
    visualLocations: "Milan penthouse terraces, luxury resort pools, designer boutiques, European golden-hour streets",
    visualOutfitAnchors: "Designer tailoring, silk midi dresses, minimal gold jewelry, structured handbags, heeled mules",
    visualLightingLogic: "Warm golden hour, luxury hotel ambient light, architectural shadow play",
    visualFaceConsistency: "Italian features, olive skin, dark brown hair with mahogany highlights, refined elegant expression",
    visualCameraDistance: "Full editorial fashion shots, luxury product close-ups, wide aspirational environment",
    visualIdentity: "25-year-old Milan luxury curator. Black/gold aesthetic. Aspirational, curated, quietly wealthy. Every frame is an invitation to a better life."
  },
  {
    name: "Marcus Thorne",
    publicName: "Marcus Thorne",
    archetype: "Quiet Luxury + Investment Strategist",
    lane: "Finance / Quiet Luxury",
    niche: "Old Money Stil, Investment-Denken, diskreter Wohlstand",
    visualColorPalette: "Charcoal, Camel, Ivory, Forest Green, Dark Burgundy",
    visualLocations: "London members' clubs, Zurich financial district, minimalist studies, private airport lounges",
    visualOutfitAnchors: "Bespoke suits, cashmere turtlenecks, quiet luxury – no logos, heritage accessories",
    visualLightingLogic: "Muted natural light, wood-panelled ambient, cool and composed, never flashy",
    visualFaceConsistency: "Sharp composed features, well-groomed, confident understated expression, 30s authority",
    visualCameraDistance: "Composed medium shots, architectural environment wide shots, close-up heritage detail",
    visualIdentity: "30-year-old London/Zurich old money strategist. Charcoal/camel aesthetic. Quiet, composed, intentional. Wealth doesn't announce itself. Neither does he."
  }
];

for (const p of newPersonas) {
  const exists = await prisma.persona.findFirst({ where: { name: p.name } });
  if (exists) {
    await prisma.persona.update({
      where: { id: exists.id },
      data: {
        archetype: p.archetype,
        visualColorPalette: p.visualColorPalette,
        visualLocations: p.visualLocations,
        visualOutfitAnchors: p.visualOutfitAnchors,
        visualLightingLogic: p.visualLightingLogic,
        visualFaceConsistency: p.visualFaceConsistency,
        visualCameraDistance: p.visualCameraDistance,
        visualIdentity: p.visualIdentity,
      }
    });
    console.log(`✓ Visual update für bestehende Persona: ${p.name}`);
  } else {
    await prisma.persona.create({
      data: {
        name: p.name,
        publicName: p.publicName,
        archetype: p.archetype,
        lane: p.lane,
        niche: p.niche,
        visualColorPalette: p.visualColorPalette,
        visualLocations: p.visualLocations,
        visualOutfitAnchors: p.visualOutfitAnchors,
        visualLightingLogic: p.visualLightingLogic,
        visualFaceConsistency: p.visualFaceConsistency,
        visualCameraDistance: p.visualCameraDistance,
        visualIdentity: p.visualIdentity,
        status: "ENTWURF",
        launchWave: false,
        setcardStatus: "fehlt",
        mediaReadinessStatus: "offen",
        priorityScore: 0,
      }
    });
    console.log(`✓ Neu angelegt: ${p.name}`);
  }
}

await prisma.$disconnect();
console.log("\n✅ Visual Identity Seed abgeschlossen.");
