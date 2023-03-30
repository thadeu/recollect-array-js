import RecollectArray from '@/recollect-array'

describe('Filter', () => {
  describe('#apply', () => {
    describe('matches', () => {
      it('option_selected', () => {
        const conditions = {
          option_selected_matches: ['1', '2'],
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: '1',
          },
        ]

        const filtered = RecollectArray.apply({ conditions, data })
        expect(filtered.length).toBe(1)
      })

      it('user_id', () => {
        const conditions = {
          option_selected_matches: ['1'],
          user_id_matches: ['513'],
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: '1',
          },
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '30',
            option_selected: '1',
          },
        ]

        const filtered = RecollectArray.apply({ conditions, data })
        expect(filtered.length).toBe(1)
      })

      it('option_selected', () => {
        const conditions = {
          id: '-6OvxlSKISofXqiBDzeDr',
          name: 'Filtro 3',
          direction_eq: 'inbound',
          dnis_eq: '',
          user_id_matches: [],
          option_selected_matches: ['400'],
          dialer_id_matches: [],
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: '400',
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

        const filtered = RecollectArray.apply({ conditions, data })
        expect(filtered.length).toBe(1)
      })
    })
  })
})
