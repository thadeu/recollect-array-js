import RecollectArray from '@/index'

describe('Filter', () => {
  describe('#apply', () => {
    describe('in', () => {
      it('when option_selected empty', () => {
        const conditions = {
          id: '-6OvxlSKISofXqiBDzeDr',
          name: 'Filtro 3',
          direction_eq: 'inbound',
          option_selected: { in: [null, undefined] },
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

      it('when option_selected list contains null values', () => {
        const conditions = {
          id: '-6OvxlSKISofXqiBDzeDr',
          name: 'Filtro 3',
          direction_eq: 'inbound',
          option_selected: { not_in: ['', null, undefined] },
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: '',
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

      it('when option_selected list exists null values', () => {
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
            option_selected: '',
          },
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: '0',
          },
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
        expect(filtered.length).toBe(2)
      })

      it('when option_selected list not_exists null values', () => {
        const conditions = {
          id: '-6OvxlSKISofXqiBDzeDr',
          name: 'Filtro 3',
          direction_eq: 'inbound',
          option_selected: { exists: false },
        }

        const data = [
          {
            event_type: 'finish_call',
            event_time: '1635525542100',
            direction: 'inbound',
            call_status: 'abandoned',
            user_id: '513',
            option_selected: '',
          },
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
            option_selected: undefined,
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
        expect(filtered.length).toBe(3)
      })

      it('option_selected 400', () => {
        const conditions = {
          id: '-6OvxlSKISofXqiBDzeDr',
          name: 'Filtro 3',
          direction_eq: 'inbound',
          option_selected: { in: ['400'] },
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

    it('option_selected 401', () => {
      const conditions = {
        id: '-6OvxlSKISofXqiBDzeDr',
        name: 'Filtro 3',
        direction_eq: 'inbound',
        'options.0.selected.1': { in: ['401'] },
      }

      const data = [
        {
          event_type: 'finish_call',
          event_time: '1635525542100',
          direction: 'inbound',
          call_status: 'abandoned',
          user_id: '513',
          options: [{ selected: ['400', '401'] }],
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
