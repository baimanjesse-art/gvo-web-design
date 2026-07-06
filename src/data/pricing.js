/**
 * Canonical pricing data, used by both the Pricing section and the
 * Order form's total calculator. Update prices here only.
 */

export const TIERS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 599,
    monthly: 39,
    popular: false,
    bestFor:
      'Solo operators & small shops who just need to exist online, like landscapers, cleaners, and contractors.',
    includes: ['1-page site (home plus sections: about, services, contact)'],
    turnaround: '5 to 7 business days',
    monthlyIncludes: ['Hosting', 'SSL', 'Uptime monitoring', '1 content update / month'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 799,
    monthly: 59,
    popular: true,
    bestFor:
      'Established small businesses that want to look credible, rank locally, and offer online booking.',
    includes: ['Up to 5 pages (home, about, services, gallery, contact)'],
    turnaround: '7 to 10 business days',
    monthlyIncludes: ['Hosting', 'SSL', 'Backups', 'Uptime monitoring', '2 content updates / month'],
  },
  {
    id: 'exclusive',
    name: 'Exclusive',
    price: 999,
    monthly: 99,
    popular: false,
    bestFor:
      'Growth-minded businesses that want everything we offer: booking, blog/SEO, analytics, and priority support.',
    includes: ['Up to 10 pages'],
    turnaround: '10 to 14 business days',
    monthlyIncludes: [
      'Hosting',
      'SSL',
      'Backups',
      'Uptime monitoring',
      'Analytics reporting',
      '4 content updates / month',
    ],
  },
]

export const CUSTOM_TIER = {
  id: 'custom',
  name: 'Custom',
  price: null,
  monthly: null,
  bestFor: 'E-commerce, multi-location businesses, or anything needing custom integrations.',
  includes: ['Online store / e-commerce functionality'],
  turnaround: 'Project-dependent',
  monthlyIncludes: ['Defined per contract'],
}

export const ADDONS = [
  {
    id: 'featureToBasic',
    label: 'Add a Pro-tier feature to Basic',
    price: 50,
    unit: 'per feature',
    onlyTier: 'basic',
    countable: true,
  },
  {
    id: 'featureToPro',
    label: 'Add an Exclusive-tier feature to Pro',
    price: 100,
    unit: 'per feature',
    onlyTier: 'pro',
    countable: true,
  },
  { id: 'logo', label: 'Logo Design', price: 250 },
  { id: 'copywriting', label: 'Professional Copywriting', pct: 0.25, unit: '+25% of project price' },
  { id: 'rush', label: 'Rush Delivery (50% faster)', price: 150, unit: 'flat fee' },
  {
    id: 'ecommerce',
    label: 'E-commerce Add-On (up to 25 products)',
    price: 600,
    monthly: 25,
    unit: 'one-time + $25/mo',
  },
]

export const PAYMENT_TERMS = [
  '50% deposit due when you sign and we agree to move forward.',
  '50% balance due upon completion, or rolled into your monthly maintenance plan, split evenly over the first 6 months.',
  'If maintenance is canceled before the rolled-in balance is paid off, the remaining balance is due immediately.',
]

export const fmt = (n) => '$' + n.toLocaleString('en-US')
