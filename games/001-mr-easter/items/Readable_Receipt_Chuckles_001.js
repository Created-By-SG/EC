// games/001-mr-easter/items/Readable_Receipt_Chuckles_001.js
// Chuckles purchase receipt — red herring item
// Numbers look like they could be a code. They are not.
// is_red_herring: true

export const item = {
  id: 'chuckles-receipt',
  name: 'Receipt',
  type: 'Readable_Receipt_001',
  description: 'A crumpled receipt found in Chuckles pocket.',
  combinedWith: null,
  combinationMechanic: null,
  isRedHerring: true,
  content: {
    vendor: 'WAREHOUSE SUPPLIES CO',
    abn: '47 382 910 556',
    date: '18/04/2025',
    time: '23:14',
    items: [
      { qty: 3, desc: 'PACKING TAPE 50MM', price: '12.45' },
      { qty: 12, desc: 'EGG CARTON MEDIUM', price: '28.80' },
      { qty: 1, desc: 'THERMAL LABELS X500', price: '19.99' },
      { qty: 7, desc: 'BUBBLE WRAP 1M', price: '34.65' },
    ],
    total: '95.89',
    paid: 'CASH',
    note: 'Thank you for your purchase',
  },
}
