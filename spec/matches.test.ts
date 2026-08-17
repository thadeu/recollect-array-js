import RecollectArray from '@/index'

describe('Filter', () => {
  describe('#apply', () => {
    describe('matches', () => {
      it('multiples option_selected #1', () => {
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

        const filtered = RecollectArray.filter(data, conditions)
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

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.length).toBe(1)
      })

      it('option_selected #2', () => {
        const conditions = {
          id: '-6OvxlSKISofXqiBDzeDr',
          name: 'Filtro 3',
          direction_eq: 'inbound',
          option_selected_matches: ['400'],
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

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.length).toBe(1)
      })
    })

    describe('not_matches', () => {
      it('keeps only the items outside the list', () => {
        const conditions = {
          option_selected: { not_matches: ['400'] },
        }

        const data = [
          {
            user_id: '513',
            option_selected: '400',
          },
          {
            user_id: '513',
            option_selected: '0',
          },
        ]

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.map((o) => o.option_selected)).toEqual(['0'])
      })

      it('walks an array of objects', () => {
        const conditions = {
          'post_attendances.digits': { not_matches: ['5'] },
        }

        const data = [
          {
            id: 1,
            post_attendances: [{ digits: '1' }, { digits: '5' }],
          },
          {
            id: 2,
            post_attendances: [{ digits: '9' }],
          },
        ]

        const filtered = RecollectArray.filter(data, conditions)
        expect(filtered.map((o) => o.id)).toEqual([2])
      })
    })
  })
})
