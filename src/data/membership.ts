export interface MembershipTier {
    id: string;
    tier: string;
    name: string;
    unlock: string;
    icon: string;
    color: string;
}

export const membershipTiers: MembershipTier[] = [
    {
        id: 'tier-free',
        tier: 'Free',
        name: 'Email List',
        unlock: 'Next show alerts',
        icon: '📧',
        color: 'slate'
    },
    {
        id: 'tier-1',
        tier: '1 Show',
        name: 'Space Invader',
        unlock: '24hr early tickets',
        icon: '🚀',
        color: 'cyan'
    },
    {
        id: 'tier-3',
        tier: '3 Shows',
        name: 'Nebula Insider',
        unlock: 'Secret coordinates + birthday drops',
        icon: '🌌',
        color: 'purple'
    },
    {
        id: 'tier-super',
        tier: 'Superfan',
        name: 'Ice Giant Council',
        unlock: 'Merch design votes + backstage lottery',
        icon: '❄️',
        color: 'pink'
    }
];

export interface LoreChapter {
    id: string;
    title: string;
    year: string;
    content: string;
    image?: string;
}

export const loreChapters: LoreChapter[] = [
    {
        id: 'chapter-1',
        title: 'The Atlanta Genesis',
        year: '2018',
        content: 'Born in the creative crucible of Atlanta, LUNATHELOVEGOD first emerged as a voice in the underground music scene. The cosmic journey began in basement studios and late-night creative sessions that would eventually reshape the sound of independent artistry.'
    },
    {
        id: 'chapter-2',
        title: 'Ice Giant Awakening',
        year: '2021',
        content: 'The Ice Giant persona crystallized during a transformative period of artistic reinvention. Drawing from celestial mythology and personal metamorphosis, a new sonic identity was born—one that merged vulnerability with cosmic power.'
    },
    {
        id: 'chapter-3',
        title: 'The NYC Transmission',
        year: '2023',
        content: 'The pilgrimage to New York City marked a pivotal chapter. Brooklyn became the launchpad for Nebula Bash—immersive nightclub experiences that transformed ordinary venues into portals to other dimensions.'
    },
    {
        id: 'chapter-4',
        title: 'The Rise of The Ice Giants',
        year: '2025',
        content: 'A community of 1,200+ Space Invaders now orbits the mothership. Each sold-out show adds to the collective cosmic energy. The mission continues: to create music and experiences that transcend the ordinary.'
    }
];

export const communityStats = {
    spaceInvaders: 1247,
    showsSoldOut: 23,
    averageSelloutTime: '4 hours',
    citiesReached: 8
};
