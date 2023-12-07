import RecollectArray from '@/index'

describe('Filter', () => {
  describe('#apply', () => {
    describe('exists', () => {
      it('default predicate #1', () => {
        const conditions = {
          id: '-6OvxlSKISofXqiBDzeDr',
          name: 'Filtro 3',
          direction_eq: 'inbound',
          option_selected: { exists: true },
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: null,
          },
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: '0',
          },
        ]

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.length).toBe(1)
      })
    })

    describe('not_exists', () => {
      it('default predicate #1', () => {
        const conditions = {
          id: '-6OvxlSKISofXqiBDzeDr',
          name: 'Filtro 3',
          direction_eq: 'inbound',
          option_selected: { not_exists: true },
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: null,
          },
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: '0',
          },
        ]

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.length).toBe(1)
      })
    })

    describe('ex', () => {
      it('default predicate #1', () => {
        const conditions = {
          id: '-6OvxlSKISofXqiBDzeDr',
          name: 'Filtro 3',
          direction_eq: 'inbound',
          option_selected: { ex: '' },
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: null,
          },
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: '0',
          },
        ]

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.length).toBe(1)
      })
    })

    describe('not_ex', () => {
      it('default predicate #1', () => {
        const conditions = {
          id: '-6OvxlSKISofXqiBDzeDr',
          name: 'Filtro 3',
          direction_eq: 'inbound',
          option_selected: { not_ex: '' },
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: null,
          },
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: '0',
          },
        ]

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.length).toBe(1)
      })
    })
  })
})
