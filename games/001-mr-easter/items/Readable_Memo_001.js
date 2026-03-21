// games/001-mr-easter/items/Readable_Memo_001.js
// Internal Easter HQ memo — red herring
// Official looking. Full of numbers and dates.
// Players will spend time cross referencing. None of it is relevant.
// is_red_herring: true

export const item = {
  id: 'hq-memo',
  name: 'Internal memo',
  type: 'Readable_Memo_001',
  description: 'An official memo from Easter HQ. Lots of numbers and policy references.',
  combinedWith: null,
  combinationMechanic: null,
  isRedHerring: true,
  content: {
    from: 'Easter HQ Operations',
    to: 'All Warehouse Staff',
    ref: 'EHQ/OPS/2025/441',
    date: '15 April 2025',
    subject: 'Updated Packing Protocol — Season 2025',
    body: `Please note the following updates to packing protocol effective immediately.

All baskets must be sealed with reference code EHQ-2025 before 23:00 on packing night.

Weight limits have been revised. Baskets must not exceed 4.2kg including liner.

Cold room access is restricted to authorised personnel only. Code updated to 7741. Do not share this code.

Any discrepancies in the manifest must be reported to the shift supervisor within 15 minutes of discovery.

Failure to comply with protocol 7.3(b) may result in suspension of delivery privileges.`,
    signed: 'Operations Division — Easter HQ',
    note: 'Policy reference 7741 supersedes all previous protocols dated before March 2025.',
  },
}
